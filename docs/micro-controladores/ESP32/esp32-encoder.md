
```c++ title="main.c"
#include <stdio.h>
#include <math.h>
#include "freertos/FreeRTOS.h"
#include "freertos/task.h"
#include "freertos/queue.h"
#include "driver/pulse_cnt.h"
#include "driver/gptimer.h"
#include "esp_log.h"
#include "esp_timer.h"

#define PCNT_HIGH_LIMIT 1000
#define PCNT_LOW_LIMIT  -1000
#define EXAMPLE_EC11_GPIO_A 4
#define EXAMPLE_EC11_GPIO_B 2
#define PULSES_PER_REVOLUTION 4
#define TIMER_INTERVAL_MS 100
#define FILTER_DEPTH 5  // 濾波器深度

static const char *TAG = "encoder_example";

pcnt_unit_handle_t pcnt_unit = NULL;
gptimer_handle_t gptimer = NULL;
QueueHandle_t encoder_queue;

typedef struct {
    int total_count;
    int diff_count;
} encoder_data_t;

static int previous_count = 0;
static int filter_buffer[FILTER_DEPTH] = {0};
static int filter_index = 0;
static float cw_error = 1.0;  // 順時針誤差係數
static float ccw_error = 1.0; // 逆時針誤差係數

static void init_pcnt(void)
{
    pcnt_unit_config_t unit_config = {
        .high_limit = PCNT_HIGH_LIMIT,
        .low_limit = PCNT_LOW_LIMIT,
    };
    ESP_ERROR_CHECK(pcnt_new_unit(&unit_config, &pcnt_unit));

    pcnt_glitch_filter_config_t filter_config = {
        .max_glitch_ns = 1000,
    };
    ESP_ERROR_CHECK(pcnt_unit_set_glitch_filter(pcnt_unit, &filter_config));

    pcnt_chan_config_t chan_a_config = {
        .edge_gpio_num = EXAMPLE_EC11_GPIO_A,
        .level_gpio_num = EXAMPLE_EC11_GPIO_B,
    };
    pcnt_channel_handle_t pcnt_chan_a = NULL;
    ESP_ERROR_CHECK(pcnt_new_channel(pcnt_unit, &chan_a_config, &pcnt_chan_a));

    pcnt_chan_config_t chan_b_config = {
        .edge_gpio_num = EXAMPLE_EC11_GPIO_B,
        .level_gpio_num = EXAMPLE_EC11_GPIO_A,
    };
    pcnt_channel_handle_t pcnt_chan_b = NULL;
    ESP_ERROR_CHECK(pcnt_new_channel(pcnt_unit, &chan_b_config, &pcnt_chan_b));

    ESP_ERROR_CHECK(pcnt_channel_set_edge_action(pcnt_chan_a, PCNT_CHANNEL_EDGE_ACTION_DECREASE, PCNT_CHANNEL_EDGE_ACTION_INCREASE));
    ESP_ERROR_CHECK(pcnt_channel_set_level_action(pcnt_chan_a, PCNT_CHANNEL_LEVEL_ACTION_KEEP, PCNT_CHANNEL_LEVEL_ACTION_INVERSE));
    ESP_ERROR_CHECK(pcnt_channel_set_edge_action(pcnt_chan_b, PCNT_CHANNEL_EDGE_ACTION_INCREASE, PCNT_CHANNEL_EDGE_ACTION_DECREASE));
    ESP_ERROR_CHECK(pcnt_channel_set_level_action(pcnt_chan_b, PCNT_CHANNEL_LEVEL_ACTION_KEEP, PCNT_CHANNEL_LEVEL_ACTION_INVERSE));

    ESP_ERROR_CHECK(pcnt_unit_enable(pcnt_unit));
    ESP_ERROR_CHECK(pcnt_unit_clear_count(pcnt_unit));
    ESP_ERROR_CHECK(pcnt_unit_start(pcnt_unit));
}

static int apply_filter(int new_value) {
    filter_buffer[filter_index] = new_value;
    filter_index = (filter_index + 1) % FILTER_DEPTH;
    
    int sum = 0;
    for (int i = 0; i < FILTER_DEPTH; i++) {
        sum += filter_buffer[i];
    }
    return sum / FILTER_DEPTH;
}

static bool IRAM_ATTR timer_callback(gptimer_handle_t timer, const gptimer_alarm_event_data_t *edata, void *user_ctx)
{
    int current_count = 0;
    pcnt_unit_get_count(pcnt_unit, &current_count);

    int diff_count = current_count - previous_count;
    diff_count = apply_filter(diff_count);  // 應用濾波器

    encoder_data_t data = {
        .total_count = current_count,
        .diff_count = diff_count
    };

    previous_count = current_count;
    xQueueSendFromISR(encoder_queue, &data, NULL);

    return false;
}

static void init_timer(void)
{
    gptimer_config_t timer_config = {
        .clk_src = GPTIMER_CLK_SRC_DEFAULT,
        .direction = GPTIMER_COUNT_UP,
        .resolution_hz = 1000000,
    };
    ESP_ERROR_CHECK(gptimer_new_timer(&timer_config, &gptimer));

    gptimer_alarm_config_t alarm_config = {
        .reload_count = 0,
        .alarm_count = TIMER_INTERVAL_MS * 1000,
        .flags.auto_reload_on_alarm = true,
    };
    ESP_ERROR_CHECK(gptimer_set_alarm_action(gptimer, &alarm_config));

    gptimer_event_callbacks_t cbs = {
        .on_alarm = timer_callback,
    };
    ESP_ERROR_CHECK(gptimer_register_event_callbacks(gptimer, &cbs, NULL));

    ESP_ERROR_CHECK(gptimer_enable(gptimer));
    ESP_ERROR_CHECK(gptimer_start(gptimer));
}

void encoder_task(void *pvParameters)
{
    encoder_data_t data;
    float rpm = 0;
    const char *direction = "停止";
    int64_t total_cw_pulses = 0;
    int64_t total_ccw_pulses = 0;

    while (1) {
        if (xQueueReceive(encoder_queue, &data, portMAX_DELAY)) {
            if (data.diff_count > 0) {
                total_cw_pulses += data.diff_count;
                rpm = (float)data.diff_count * (60.0f * 1000 / TIMER_INTERVAL_MS) / PULSES_PER_REVOLUTION ; // cw_error;
                direction = "順時針";
            } else if (data.diff_count < 0) {
                total_ccw_pulses -= data.diff_count;
                rpm = (float)data.diff_count * (60.0f * 1000 / TIMER_INTERVAL_MS) / PULSES_PER_REVOLUTION ; /// ccw_error;
                direction = "逆時針";
            } else {
                rpm = 0;
                direction = "停止";
            }

            // 更新誤差係數
            // if (total_cw_pulses > 0 && total_ccw_pulses > 0) {
            //     float ratio = (float)total_cw_pulses / total_ccw_pulses;
            //     if (ratio > 1.0) {
            //         cw_error = ratio;
            //         ccw_error = 1.0;
            //     } else {
            //         ccw_error = 1.0 / ratio;
            //         cw_error = 1.0;
            //     }
            // }

            // ESP_LOGI(TAG, "位置: %d, 速度: %.2f RPM, 方向: %s, CW誤差: %.3f, CCW誤差: %.3f ,
            //          data.total_count, fabsf(rpm), direction, cw_error, ccw_error);

            ESP_LOGI(TAG, "位置: %d, 速度: %.2f RPM, 方向: %s ", data.total_count, fabsf(rpm), direction);
        }
    }
}

void app_main(void)
{
    ESP_LOGI(TAG, "開始編碼器示例");
    
    encoder_queue = xQueueCreate(10, sizeof(encoder_data_t));
    
    init_pcnt();
    init_timer();

    xTaskCreate(encoder_task, "encoder_task", 2048, NULL, 5, NULL);

    while (1) {
        vTaskDelay(portMAX_DELAY);
    }
}
```