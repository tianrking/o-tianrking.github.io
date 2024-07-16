---
slug: esp32-mcpwm-usage-and-examples
title: ESP32 MCPWM Usage Guide and Examples | ESP32 MCPWM 使用指南與範例
authors:
 - name: w0x7ce
   title: Embedded Systems Engineer
   url: https://github.com/tianrking
   image_url: https://github.com/tianrking.png
tags: [ESP32, Embedded Systems, MCPWM, Stepper Motor Control, PWM, Motor Control]
---

# ESP32 MCPWM 使用指南與範例

## 引言

ESP32 是一款功能強大的微控制器,其中 MCPWM (Motor Control Pulse Width Modulation) 模組是一個非常實用的功能,特別適合用於電機控制等應用。本文將詳細介紹 ESP32 的 MCPWM 功能,並提供具體的程式碼範例,包括基本的 PWM 輸出和步進電機控制。

## ESP32 引腳功能推薦

在開始使用 MCPWM 之前,我們先來了解一下 ESP32 的引腳功能。合理選擇引腳可以讓您的項目更加穩定高效。

### 通用 GPIO (輸入/輸出)

以下引腳沒有特殊功能限制,可以安全地用於大多數項目：

- GPIO 13, 14, 16, 17, 18, 19, 21, 22, 23, 25, 26, 27, 32, 33

這些引腳適合用於一般的數位輸入/輸出操作,如控制 LED、讀取按鈕狀態等。

### ADC (類比數位轉換)

ESP32 提供兩組 ADC,推薦使用以下引腳：

- **ADC1**: GPIO 36, 39, 32, 33, 34, 35
- **ADC2** (僅在 Wi-Fi 未啟用時可用): GPIO 4, 0, 2, 15, 13, 12, 14, 27, 25, 26

ADC 用於讀取類比信號,如感測器輸出、電池電壓等。注意 ADC2 在使用 Wi-Fi 時可能不可用。

### DAC (數位類比轉換)

ESP32 有兩個 DAC 通道,僅限以下引腳：

- GPIO 25, 26

DAC 可以輸出類比電壓,適用於音頻輸出或控制類比設備。

### PWM (脈衝寬度調變)

除了 GPIO 34-39 和 SPI flash 引腳 (6-11) 外,所有輸出引腳都可用於 PWM。推薦使用：

- GPIO 13, 14, 16, 17, 18, 19, 21, 22, 23, 25, 26, 27, 32, 33

PWM 可用於 LED 亮度控制、馬達速度控制等應用。

#### MCPWM (高級 PWM)

ESP32 有兩個 MCPWM 單元（MCPWM0 和 MCPWM1）,每個單元有 3 個定時器和 6 個輸出。

- **MCPWM0** 和 **MCPWM1** 可用引腳：GPIO 0, 2, 4, 5, 12, 13, 14, 15, 18, 19, 21, 22, 23, 25, 26, 27, 32, 33
- 推薦使用：GPIO 13, 14, 16, 17, 18, 19, 21, 22, 23, 25, 26, 27, 32, 33

MCPWM 特別適合用於複雜的電機控制應用,如無刷直流電機、步進電機等。

#### 互補輸出

每個 MCPWM 單元的 6 個輸出被分為 3 對,每對可以輸出互補信號。互補對可以分配到幾乎任意 GPIO 組合。對於互補輸出,您需要選擇同一 MCPWM 單元中的一對輸出。例如：

- **MCPWM0**：
  - PWM0A - PWM0B
  - PWM1A - PWM1B
  - PWM2A - PWM2B
- **MCPWM1** 同理

互補輸出在控制 H 橋電路時特別有用,可以確保兩個開關不會同時導通。

### I2C

默認引腳如下：

- SDA：GPIO 21
- SCL：GPIO 22

可配置為其他引腳,但推薦使用默認值以保持一致性。I2C 用於與各種感測器和顯示器通信。

### SPI

ESP32 支持兩組 SPI 引腳：

- **VSPI (默認)**：
  - MOSI：GPIO 23
  - MISO：GPIO 19
  - CLK：GPIO 18
  - CS：GPIO 5
- **HSPI**：
  - MOSI：GPIO 13
  - MISO：GPIO 12
  - CLK：GPIO 14
  - CS：GPIO 15

SPI 用於高速數據傳輸,如讀寫 SD 卡、控制顯示屏等。

### UART

ESP32 有三個 UART 模組,引腳配置如下：

- **UART0 (默認)**：
  - TX：GPIO 1
  - RX：GPIO 3
- **UART1**：
  - TX：GPIO 10
  - RX：GPIO 9
- **UART2**：
  - TX：GPIO 17
  - RX：GPIO 16

UART 用於串列通信,如與電腦通信或連接 GPS 模組等。

### 電容式觸摸傳感器

推薦使用以下引腳,避免使用 Strapping 引腳：

- GPIO 13, 14, 27, 32, 33

這些引腳可用於創建觸摸感應界面。

### RTC GPIO (深度睡眠模式可用)

以下引腳在深度睡眠模式下仍然可用：

- GPIO 0, 2, 4, 12-15, 25-27, 32-39

這些引腳可用於在低功耗模式下喚醒設備。

### 模擬霍爾傳感器

僅限以下引腳：

- GPIO 36, 39

這些引腳專門用於連接霍爾效應感測器,用於檢測磁場。

## MCPWM 基礎知識

MCPWM (Motor Control Pulse Width Modulation) 是 ESP32 中一個強大的功能模組,專為電機控制設計。與普通的 PWM 相比,MCPWM 提供了更多的功能和靈活性：

1. 多通道輸出：每個 MCPWM 單元有 6 個獨立的輸出通道。
2. 高精度：可以產生高頻率、高分辨率的 PWM 信號。
3. 互補輸出：可以生成互補的 PWM 信號對,適用於 H 橋驅動。
4. 死區控制：可以在互補信號之間插入死區時間,防止短路。
5. 故障檢測：具有故障輸入功能,可以在檢測到故障時自動關閉輸出。
6. 同步操作：多個 MCPWM 單元可以同步工作,適合多相電機控制。

## 互補脈寬調製範例

以下是一個使用 MCPWM 產生互補 PWM 輸出的範例程式。這個範例展示了如何設置 MCPWM,並動態調整頻率和占空比。

```c++ title="mcpwm_normal_pwm_demo.c"
#include "freertos/FreeRTOS.h"
#include "freertos/task.h"
#include "esp_log.h"
#include "driver/mcpwm_prelude.h"
#include <inttypes.h>

static const char *TAG = "example";

// 定義 MCPWM 參數
#define MCPWM_TIMER_RESOLUTION_HZ 10000000 // 10MHz, 1 tick = 0.1us
#define MCPWM_FREQ_HZ_INITIAL     10000    // 初始頻率為 10KHz
#define MCPWM_GPIO_A              18       // PWM 輸出 A 的 GPIO
#define MCPWM_GPIO_B              21       // PWM 輸出 B 的 GPIO
#define MCPWM_DUTY_CYCLE_INITIAL  30       // 初始占空比為 30%

// PWM 配置結構體
typedef struct {
    mcpwm_timer_handle_t timer;
    mcpwm_oper_handle_t oper;
    mcpwm_cmpr_handle_t cmpa;
    mcpwm_cmpr_handle_t cmpb;
    mcpwm_gen_handle_t gena;
    mcpwm_gen_handle_t genb;
} pwm_config_t;

// 初始化 PWM
static pwm_config_t init_pwm(void) {
    pwm_config_t config;

    ESP_LOGI(TAG, "初始化 MCPWM 模組");

    // 步驟 1: 創建 MCPWM 定時器
    mcpwm_timer_config_t timer_config = {
        .group_id = 0,
        .clk_src = MCPWM_TIMER_CLK_SRC_DEFAULT,
        .resolution_hz = MCPWM_TIMER_RESOLUTION_HZ,
        .period_ticks = MCPWM_TIMER_RESOLUTION_HZ / MCPWM_FREQ_HZ_INITIAL,
        .count_mode = MCPWM_TIMER_COUNT_MODE_UP,
    };
    ESP_ERROR_CHECK(mcpwm_new_timer(&timer_config, &config.timer));

    // 步驟 2: 創建 MCPWM 運算器
    mcpwm_operator_config_t operator_config = {
        .group_id = 0,
    };
    ESP_ERROR_CHECK(mcpwm_new_operator(&operator_config, &config.oper));

    // 步驟 3: 將定時器連接到運算器
    ESP_ERROR_CHECK(mcpwm_operator_connect_timer(config.oper, config.timer));

    // 步驟 4: 創建比較器
    mcpwm_comparator_config_t comparator_config = {
        .flags.update_cmp_on_tez = true,
    };
    ESP_ERROR_CHECK(mcpwm_new_comparator(config.oper, &comparator_config, &config.cmpa));
    ESP_ERROR_CHECK(mcpwm_new_comparator(config.oper, &comparator_config, &config.cmpb));

    // 步驟 5: 創建 PWM 生成器
    mcpwm_generator_config_t generator_config = {
        .gen_gpio_num = MCPWM_GPIO_A,
    };
    ESP_ERROR_CHECK(mcpwm_new_generator(config.oper, &generator_config, &config.gena));
    generator_config.gen_gpio_num = MCPWM_GPIO_B;
    ESP_ERROR_CHECK(mcpwm_new_generator(config.oper, &generator_config, &config.genb));

    // 步驟 6: 設置生成器 A 的動作 (占空比)
    ESP_ERROR_CHECK(mcpwm_generator_set_actions_on_timer_event(config.gena,
        MCPWM_GEN_TIMER_EVENT_ACTION(MCPWM_TIMER_DIRECTION_UP, MCPWM_TIMER_EVENT_EMPTY, MCPWM_GEN_ACTION_HIGH),
        MCPWM_GEN_TIMER_EVENT_ACTION_END()));
    ESP_ERROR_CHECK(mcpwm_generator_set_actions_on_compare_event(config.gena,
        MCPWM_GEN_COMPARE_EVENT_ACTION(MCPWM_TIMER_DIRECTION_UP, config.cmpa, MCPWM_GEN_ACTION_LOW),
        MCPWM_GEN_COMPARE_EVENT_ACTION_END()));

    // 步驟 7: 設置生成器 B 的動作 (互補輸出)
    ESP_ERROR_CHECK(mcpwm_generator_set_actions_on_timer_event(config.genb,
        MCPWM_GEN_TIMER_EVENT_ACTION(MCPWM_TIMER_DIRECTION_UP, MCPWM_TIMER_EVENT_EMPTY, MCPWM_GEN_ACTION_LOW),
        MCPWM_GEN_TIMER_EVENT_ACTION_END()));
    ESP_ERROR_CHECK(mcpwm_generator_set_actions_on_compare_event(config.genb,
        MCPWM_GEN_COMPARE_EVENT_ACTION(MCPWM_TIMER_DIRECTION_UP, config.cmpa, MCPWM_GEN_ACTION_HIGH),
        MCPWM_GEN_COMPARE_EVENT_ACTION_END()));

    // 步驟 8: 設置初始比較值 (決定初始占空比)
    uint32_t compare_val = (MCPWM_TIMER_RESOLUTION_HZ / MCPWM_FREQ_HZ_INITIAL) * MCPWM_DUTY_CYCLE_INITIAL / 100;
    ESP_ERROR_CHECK(mcpwm_comparator_set_compare_value(config.cmpa, compare_val));
    ESP_ERROR_CHECK(mcpwm_comparator_set_compare_value(config.cmpb, compare_val));

    // 步驟 9: 啟用 MCPWM 定時器
    ESP_ERROR_CHECK(mcpwm_timer_enable(config.timer));

    // 步驟 10: 啟動 MCPWM 定時器
    ESP_ERROR_CHECK(mcpwm_timer_start_stop(config.timer, MCPWM_TIMER_START_NO_STOP));

    ESP_LOGI(TAG, "MCPWM 互補輸出已啟動");
    ESP_LOGI(TAG, "GPIO%d: %d%% 占空比, GPIO%d: %d%% 占空比", 
             MCPWM_GPIO_A, MCPWM_DUTY_CYCLE_INITIAL, MCPWM_GPIO_B, 100 - MCPWM_DUTY_CYCLE_INITIAL);
    ESP_LOGI(TAG, "頻率: %dHz", MCPWM_FREQ_HZ_INITIAL);

    return config;
}

// 設置占空比
static void set_duty_cycle(pwm_config_t* config, float duty_cycle) {
    uint32_t compare_val = (MCPWM_TIMER_RESOLUTION_HZ / MCPWM_FREQ_HZ_INITIAL) * duty_cycle / 100;
    ESP_ERROR_CHECK(mcpwm_comparator_set_compare_value(config->cmpa, compare_val));
    ESP_ERROR_CHECK(mcpwm_comparator_set_compare_value(config->cmpb, compare_val));
}

// 設置頻率
static void set_frequency(pwm_config_t* config, uint32_t freq_hz) {
    ESP_ERROR_CHECK(mcpwm_timer_set_period(config->timer, MCPWM_TIMER_RESOLUTION_HZ / freq_hz));
}

void app_main(void)
{
    // 初始化 PWM 配置
    pwm_config_t pwm_config = init_pwm();

    // 初始占空比和頻率
    float duty_cycle = MCPWM_DUTY_CYCLE_INITIAL;
    uint32_t freq_hz = MCPWM_FREQ_HZ_INITIAL;

    while (1) {
        // 每 5 秒鐘改變一次占空比 (30% -> 70% -> 30% ...)
        duty_cycle = (duty_cycle == 30) ? 70 : 30;
        set_duty_cycle(&pwm_config, duty_cycle);
        ESP_LOGI(TAG, "占空比已設置為 %.0f%%", duty_cycle);

        vTaskDelay(pdMS_TO_TICKS(5000));

        // 每 10 秒鐘改變一次頻率 (10kHz -> 5kHz -> 10kHz ...)
        freq_hz = (freq_hz == 10000) ? 5000 : 10000;
        set_frequency(&pwm_config, freq_hz);
        ESP_LOGI(TAG, "頻率已設置為 %"PRIu32" Hz", freq_hz);

        vTaskDelay(pdMS_TO_TICKS(5000));
    }
}
```

### 程式碼解析

1. **初始化 MCPWM**:
   - 創建 MCPWM 定時器、運算器、比較器和生成器。
   - 設置 PWM 頻率和分辨率。
   - 配置 GPIO 輸出。

2. **設置互補輸出**:
   - 通過設置不同的動作使兩個輸出互補。
   - 當一個輸出為高時，另一個為低，反之亦然。

3. **動態調整**:
   - `set_duty_cycle` 函數用於調整占空比。
   - `set_frequency` 函數用於調整頻率。

4. **主循環**:
   - 每 5 秒改變一次占空比。
   - 每 10 秒改變一次頻率。

這個範例展示了 MCPWM 的基本用法，包括初始化、配置和動態調整。它特別適用於需要精確控制的應用，如電機驅動、LED 調光等。

## 步進電機控制範例

接下來，我們將展示如何使用 MCPWM 控制步進電機。步進電機控制需要精確的脈衝序列，MCPWM 模組非常適合這種應用。

```c++ title="mcpwm_step_motor_demo.c"
#include "freertos/FreeRTOS.h"          // FreeRTOS 標頭檔案
#include "freertos/task.h"              // FreeRTOS 任務管理
#include "esp_log.h"                    // ESP32 日誌記錄
#include "driver/mcpwm_prelude.h"       // MCPWM 驅動
#include "driver/gpio.h"                // GPIO 驅動
#include <inttypes.h>                   // 標準整數類型定義

static const char *TAG = "stepper_example"; // 日誌標籤

#define MCPWM_TIMER_RESOLUTION_HZ 1000000  // MCPWM 計時器分辨率，1MHz，即 1 個 tick 為 1 微秒
#define MCPWM_FREQ_HZ             10000    // MCPWM 頻率，10kHz，可以根據需要調整
#define MCPWM_GPIO_STEP           18       // 步進脈衝輸出的 GPIO
#define MCPWM_GPIO_DIR            22       // 方向控制的 GPIO

// 定義步進電機配置結構體
typedef struct {
    mcpwm_timer_handle_t timer;
    mcpwm_oper_handle_t oper;
    mcpwm_cmpr_handle_t cmpr;
    mcpwm_gen_handle_t gen;
    int target_steps;                // 目標步數
    volatile int current_steps;      // 當前步數
    bool direction;                  // 方向
} stepper_config_t;

static stepper_config_t stepper_config; // 全局步進電機配置

// MCPWM 中斷處理函數
static bool IRAM_ATTR mcpwm_isr_handler(mcpwm_timer_handle_t timer, const mcpwm_timer_event_data_t *edata, void *user_data)
{
    stepper_config_t *config = (stepper_config_t *)user_data; // 取得步進電機配置
    
    if (config->current_steps < config->target_steps) {
        config->current_steps++; // 增加當前步數
        return true;  // 繼續產生脈衝
    } else {
        ESP_ERROR_CHECK(mcpwm_timer_start_stop(config->timer, MCPWM_TIMER_STOP_FULL)); // 停止計時器
        return false;  // 停止計時器
    }
}

// 初始化步進電機的 MCPWM 控制
static void init_stepper_mcpwm(void) {
    ESP_LOGI(TAG, "初始化步進電機 MCPWM 控制");

    // 配置 MCPWM 計時器
    mcpwm_timer_config_t timer_config = {
        .group_id = 0,
        .clk_src = MCPWM_TIMER_CLK_SRC_DEFAULT,
        .resolution_hz = MCPWM_TIMER_RESOLUTION_HZ,
        .period_ticks = MCPWM_TIMER_RESOLUTION_HZ / MCPWM_FREQ_HZ,
        .count_mode = MCPWM_TIMER_COUNT_MODE_UP,
    };
    ESP_ERROR_CHECK(mcpwm_new_timer(&timer_config, &stepper_config.timer));

    // 配置 MCPWM 操作器
    mcpwm_operator_config_t operator_config = {
        .group_id = 0,
    };
    ESP_ERROR_CHECK(mcpwm_new_operator(&operator_config, &stepper_config.oper));

    ESP_ERROR_CHECK(mcpwm_operator_connect_timer(stepper_config.oper, stepper_config.timer));

    // 配置 MCPWM 比較器
    mcpwm_comparator_config_t comparator_config = {
        .flags.update_cmp_on_tez = true,
    };
    ESP_ERROR_CHECK(mcpwm_new_comparator(stepper_config.oper, &comparator_config, &stepper_config.cmpr));

    // 配置 MCPWM 產生器
    mcpwm_generator_config_t generator_config = {
        .gen_gpio_num = MCPWM_GPIO_STEP,
    };
    ESP_ERROR_CHECK(mcpwm_new_generator(stepper_config.oper, &generator_config, &stepper_config.gen));

    // 設置 MCPWM 產生器在計時器事件上的動作
    ESP_ERROR_CHECK(mcpwm_generator_set_actions_on_timer_event(stepper_config.gen,
        MCPWM_GEN_TIMER_EVENT_ACTION(MCPWM_TIMER_DIRECTION_UP, MCPWM_TIMER_EVENT_EMPTY, MCPWM_GEN_ACTION_HIGH),
        MCPWM_GEN_TIMER_EVENT_ACTION_END()));
    ESP_ERROR_CHECK(mcpwm_generator_set_actions_on_compare_event(stepper_config.gen,
        MCPWM_GEN_COMPARE_EVENT_ACTION(MCPWM_TIMER_DIRECTION_UP, stepper_config.cmpr, MCPWM_GEN_ACTION_LOW),
        MCPWM_GEN_COMPARE_EVENT_ACTION_END()));

    // 設置 MCPWM 比較器的比較值
    ESP_ERROR_CHECK(mcpwm_comparator_set_compare_value(stepper_config.cmpr, MCPWM_TIMER_RESOLUTION_HZ / MCPWM_FREQ_HZ / 2));

    // 註冊 MCPWM 計時器事件回調
    ESP_ERROR_CHECK(mcpwm_timer_register_event_callbacks(stepper_config.timer, 
        &(mcpwm_timer_event_callbacks_t){
            .on_full = mcpwm_isr_handler,
        }, &stepper_config));

    // 啟用 MCPWM 計時器
    ESP_ERROR_CHECK(mcpwm_timer_enable(stepper_config.timer));

    // 初始化方向控制 GPIO
    gpio_config_t io_conf = {
        .intr_type = GPIO_INTR_DISABLE,
        .mode = GPIO_MODE_OUTPUT,
        .pin_bit_mask = (1ULL << MCPWM_GPIO_DIR),
        .pull_down_en = 0,
        .pull_up_en = 1  // 啟用內部上拉
    };
    gpio_config(&io_conf);

    // 確保方向引腳初始狀態
    gpio_set_level(MCPWM_GPIO_DIR, 0);

    ESP_LOGI(TAG, "步進電機 MCPWM 控制初始化完成");
    ESP_LOGI(TAG, "MCPWM 步進引腳: %d, 方向引腳: %d", MCPWM_GPIO_STEP, MCPWM_GPIO_DIR);
}

// 控制步進電機移動
static void move_stepper(int steps, bool direction) {
    ESP_LOGI(TAG, "準備移動步進電機：%d 步, 方向：%s", steps, direction ? "正向" : "反向");

    // 檢查當前 GPIO 狀態
    int current_dir = gpio_get_level(MCPWM_GPIO_DIR);
    ESP_LOGI(TAG, "當前方向引腳狀態: %d", current_dir);

    // 確保上一次移動已經完全停止
    while (stepper_config.current_steps < stepper_config.target_steps) {
        vTaskDelay(1);
    }

    // 停止計時器
    ESP_ERROR_CHECK(mcpwm_timer_start_stop(stepper_config.timer, MCPWM_TIMER_STOP_FULL));
    ESP_LOGI(TAG, "MCPWM 計時器已停止");

    // 設置新的方向
    gpio_set_level(MCPWM_GPIO_DIR, direction);
    ESP_LOGI(TAG, "方向已設置為: %d", direction);

    // 添加短暫延遲，確保方向信號穩定
    vTaskDelay(pdMS_TO_TICKS(5));

    // 再次檢查 GPIO 狀態
    current_dir = gpio_get_level(MCPWM_GPIO_DIR);
    ESP_LOGI(TAG, "設置後方向引腳狀態: %d", current_dir);

    // 更新步進配置
    stepper_config.target_steps = steps;
    stepper_config.current_steps = 0;
    stepper_config.direction = direction;

    // 啟動計時器，開始步進
    ESP_ERROR_CHECK(mcpwm_timer_start_stop(stepper_config.timer, MCPWM_TIMER_START_NO_STOP));
    ESP_LOGI(TAG, "MCPWM 計時器已啟動，開始移動");
}

// 主應用程序入口
void app_main(void)
{
    init_stepper_mcpwm(); // 初始化步進電機 MCPWM 控制

    while (1) {
        // 正向旋轉 20000 步
        move_stepper(20000, true);
        while (stepper_config.current_steps < stepper_config.target_steps) {
            vTaskDelay(1);
        }
        ESP_LOGI(TAG, "完成正向旋轉 20000 步");
        vTaskDelay(pdMS_TO_TICKS(2000)); // 延遲 2 秒

        // 反向旋轉 20000 步
        move_stepper(20000, false);
        while (stepper_config.current_steps < stepper_config.target_steps) {
            vTaskDelay(1);
        }
        ESP_LOGI(TAG, "完成反向旋轉 20000 步");
        vTaskDelay(pdMS_TO_TICKS(2000)); // 延遲 2 秒
    }
}
```

### 程式碼解析

1. **初始化 MCPWM**:
   - 設置 MCPWM 計時器、運算器、比較器和生成器。
   - 配置步進脈衝輸出和方向控制 GPIO。

2. **中斷處理**:
   - 使用 MCPWM 的中斷功能來計數步數。
   - 當達到目標步數時停止計時器。

3. **步進電機移動控制**:
   - `move_stepper` 函數控制電機的移動方向和步數。
   - 在改變方向時添加短暫延遲，確保信號穩定。

4. **主循環**:
   - 交替進行正向和反向旋轉，每次 20000 步。
   - 每次移動後等待 2 秒。

這個範例展示了如何使用 MCPWM 精確控制步進電機。它特別適用於需要精確定位的應用，如 3D 打印機、CNC 機床等。

### 步進電機控制的優化建議

1. **加速和減速**:
   為了實現更平滑的運動和減少機械應力，可以實現加速和減速控制。這可以通過動態調整 MCPWM 的頻率來實現。

2. **微步控制**:
   如果步進電機驅動器支持微步控制，可以通過調整 PWM 占空比來實現更精細的位置控制。

3. **位置跟踪**:
   可以添加編碼器反饋來實現閉環控制，提高定位精度。

4. **多軸協調**:
   對於需要多個電機協同工作的應用（如 3D 打印機），可以使用多個 MCPWM 單元並同步它們的操作。

## MCPWM 進階功能

ESP32 的 MCPWM 模組還提供了一些進階功能，可以用於更複雜的應用場景：

### 1. 死區控制

死區控制在驅動半橋或全橋電路時非常重要，可以防止上下管同時導通造成短路。MCPWM 模組支持硬件級的死區插入，使用方法如下：

```c
mcpwm_dead_time_config_t dead_time_config = {
    .posedge_delay_ticks = 50, // 上升沿延遲
    .negedge_delay_ticks = 50  // 下降沿延遲
};
ESP_ERROR_CHECK(mcpwm_generator_set_dead_time(gen_a, gen_b, &dead_time_config));
```

### 2. 故障處理

MCPWM 模組可以配置故障輸入，在檢測到故障信號時自動關閉輸出，提高系統安全性：

```c
mcpwm_fault_config_t fault_config = {
    .fault_gpio_num = FAULT_GPIO,
    .active_level = 0, // 低電平觸發
};
ESP_ERROR_CHECK(mcpwm_new_fault(MCPWM_UNIT_0, &fault_config, &fault_handle));
```

### 3. 同步操作

對於需要精確同步的多電機控制應用，可以使用 MCPWM 的同步功能：

```c
mcpwm_sync_config_t sync_config = {
    .sync_gpio_num = SYNC_GPIO,
    .flags.on_rising_edge = true,
};
ESP_ERROR_CHECK(mcpwm_timer_set_sync_src(timer, &sync_config));
```

## 結論

ESP32 的 MCPWM 模組是一個強大而靈活的工具，特別適合各種電機控制應用。

參考資料：
1. ESP32 技術參考手冊
2. ESP-IDF 編程指南
3. Espressif Systems 官方文檔



## 完整代码

### 互補脈寬調製

```c++ title="mcpwm_normal_pwm_demo.c"
#include "freertos/FreeRTOS.h"
#include "freertos/task.h"
#include "esp_log.h"
#include "driver/mcpwm_prelude.h"
#include <inttypes.h>

static const char *TAG = "example";

// 定義 MCPWM 參數
#define MCPWM_TIMER_RESOLUTION_HZ 10000000 // 10MHz, 1 tick = 0.1us
#define MCPWM_FREQ_HZ_INITIAL     10000    // 初始頻率為 10KHz
#define MCPWM_GPIO_A              18       // PWM 輸出 A 的 GPIO
#define MCPWM_GPIO_B              21       // PWM 輸出 B 的 GPIO
#define MCPWM_DUTY_CYCLE_INITIAL  30       // 初始占空比為 30%

// PWM 配置結構體
typedef struct {
    mcpwm_timer_handle_t timer;
    mcpwm_oper_handle_t oper;
    mcpwm_cmpr_handle_t cmpa;
    mcpwm_cmpr_handle_t cmpb;
    mcpwm_gen_handle_t gena;
    mcpwm_gen_handle_t genb;
} pwm_config_t;

// 初始化 PWM
static pwm_config_t init_pwm(void) {
    pwm_config_t config;

    ESP_LOGI(TAG, "初始化 MCPWM 模組");

    // 步驟 1: 創建 MCPWM 定時器
    mcpwm_timer_config_t timer_config = {
        .group_id = 0,
        .clk_src = MCPWM_TIMER_CLK_SRC_DEFAULT,
        .resolution_hz = MCPWM_TIMER_RESOLUTION_HZ,
        .period_ticks = MCPWM_TIMER_RESOLUTION_HZ / MCPWM_FREQ_HZ_INITIAL,
        .count_mode = MCPWM_TIMER_COUNT_MODE_UP,
    };
    ESP_ERROR_CHECK(mcpwm_new_timer(&timer_config, &config.timer));

    // 步驟 2: 創建 MCPWM 運算器
    mcpwm_operator_config_t operator_config = {
        .group_id = 0,
    };
    ESP_ERROR_CHECK(mcpwm_new_operator(&operator_config, &config.oper));

    // 步驟 3: 將定時器連接到運算器
    ESP_ERROR_CHECK(mcpwm_operator_connect_timer(config.oper, config.timer));

    // 步驟 4: 創建比較器
    mcpwm_comparator_config_t comparator_config = {
        .flags.update_cmp_on_tez = true,
    };
    ESP_ERROR_CHECK(mcpwm_new_comparator(config.oper, &comparator_config, &config.cmpa));
    ESP_ERROR_CHECK(mcpwm_new_comparator(config.oper, &comparator_config, &config.cmpb));

    // 步驟 5: 創建 PWM 生成器
    mcpwm_generator_config_t generator_config = {
        .gen_gpio_num = MCPWM_GPIO_A,
    };
    ESP_ERROR_CHECK(mcpwm_new_generator(config.oper, &generator_config, &config.gena));
    generator_config.gen_gpio_num = MCPWM_GPIO_B;
    ESP_ERROR_CHECK(mcpwm_new_generator(config.oper, &generator_config, &config.genb));

    // 步驟 6: 設置生成器 A 的動作 (占空比)
    ESP_ERROR_CHECK(mcpwm_generator_set_actions_on_timer_event(config.gena,
        MCPWM_GEN_TIMER_EVENT_ACTION(MCPWM_TIMER_DIRECTION_UP, MCPWM_TIMER_EVENT_EMPTY, MCPWM_GEN_ACTION_HIGH),
        MCPWM_GEN_TIMER_EVENT_ACTION_END()));
    ESP_ERROR_CHECK(mcpwm_generator_set_actions_on_compare_event(config.gena,
        MCPWM_GEN_COMPARE_EVENT_ACTION(MCPWM_TIMER_DIRECTION_UP, config.cmpa, MCPWM_GEN_ACTION_LOW),
        MCPWM_GEN_COMPARE_EVENT_ACTION_END()));

    // 步驟 7: 設置生成器 B 的動作 (互補輸出)
    ESP_ERROR_CHECK(mcpwm_generator_set_actions_on_timer_event(config.genb,
        MCPWM_GEN_TIMER_EVENT_ACTION(MCPWM_TIMER_DIRECTION_UP, MCPWM_TIMER_EVENT_EMPTY, MCPWM_GEN_ACTION_LOW),
        MCPWM_GEN_TIMER_EVENT_ACTION_END()));
    ESP_ERROR_CHECK(mcpwm_generator_set_actions_on_compare_event(config.genb,
        MCPWM_GEN_COMPARE_EVENT_ACTION(MCPWM_TIMER_DIRECTION_UP, config.cmpa, MCPWM_GEN_ACTION_HIGH),
        MCPWM_GEN_COMPARE_EVENT_ACTION_END()));

    // 步驟 8: 設置初始比較值 (決定初始占空比)
    uint32_t compare_val = (MCPWM_TIMER_RESOLUTION_HZ / MCPWM_FREQ_HZ_INITIAL) * MCPWM_DUTY_CYCLE_INITIAL / 100;
    ESP_ERROR_CHECK(mcpwm_comparator_set_compare_value(config.cmpa, compare_val));
    ESP_ERROR_CHECK(mcpwm_comparator_set_compare_value(config.cmpb, compare_val));

    //adddd
    // mcpwm_dead_time_config_t dead_time_config = {
    //     .posedge_delay_ticks = 50,
    //     .negedge_delay_ticks = 0,
    // };
    // ESP_ERROR_CHECK(mcpwm_generator_set_dead_time(config.cmpa, config.cmpa, &dead_time_config));
    // dead_time_config.posedge_delay_ticks = 0;
    // dead_time_config.negedge_delay_ticks = 100;
    // ESP_ERROR_CHECK(mcpwm_generator_set_dead_time(config.cmpa, config.cmpb, &dead_time_config));
    //adddd

    // 步驟 9: 啟用 MCPWM 定時器
    ESP_ERROR_CHECK(mcpwm_timer_enable(config.timer));

    // 步驟 10: 啟動 MCPWM 定時器
    ESP_ERROR_CHECK(mcpwm_timer_start_stop(config.timer, MCPWM_TIMER_START_NO_STOP));

    ESP_LOGI(TAG, "MCPWM 互補輸出已啟動");
    ESP_LOGI(TAG, "GPIO%d: %d%% 占空比, GPIO%d: %d%% 占空比", 
             MCPWM_GPIO_A, MCPWM_DUTY_CYCLE_INITIAL, MCPWM_GPIO_B, 100 - MCPWM_DUTY_CYCLE_INITIAL);
    ESP_LOGI(TAG, "頻率: %dHz", MCPWM_FREQ_HZ_INITIAL);

    return config;
}

// 設置占空比
static void set_duty_cycle(pwm_config_t* config, float duty_cycle) {
    uint32_t compare_val = (MCPWM_TIMER_RESOLUTION_HZ / MCPWM_FREQ_HZ_INITIAL) * duty_cycle / 100;
    ESP_ERROR_CHECK(mcpwm_comparator_set_compare_value(config->cmpa, compare_val));
    ESP_ERROR_CHECK(mcpwm_comparator_set_compare_value(config->cmpb, compare_val));
}

// 設置頻率
static void set_frequency(pwm_config_t* config, uint32_t freq_hz) {
    ESP_ERROR_CHECK(mcpwm_timer_set_period(config->timer, MCPWM_TIMER_RESOLUTION_HZ / freq_hz));
}

void app_main(void)
{
    // 初始化 PWM 配置
    pwm_config_t pwm_config = init_pwm();

    // 初始占空比和頻率
    float duty_cycle = MCPWM_DUTY_CYCLE_INITIAL;
    uint32_t freq_hz = MCPWM_FREQ_HZ_INITIAL;

    while (1) {
        // 每 5 秒鐘改變一次占空比 (30% -> 70% -> 30% ...)
        duty_cycle = (duty_cycle == 30) ? 70 : 30;
        set_duty_cycle(&pwm_config, duty_cycle);
        ESP_LOGI(TAG, "占空比已設置為 %.0f%%", duty_cycle);

        vTaskDelay(pdMS_TO_TICKS(5000));

        // 每 10 秒鐘改變一次頻率 (10kHz -> 5kHz -> 10kHz ...)
        freq_hz = (freq_hz == 10000) ? 5000 : 10000;
        set_frequency(&pwm_config, freq_hz);
        ESP_LOGI(TAG, "頻率已設置為 %"PRIu32" Hz", freq_hz);

        vTaskDelay(pdMS_TO_TICKS(5000));
    }
}
```

### 步進電機控制

```c++ title="mcpwm_step_motor_demo.c"
#include "freertos/FreeRTOS.h"          // FreeRTOS 標頭檔案
#include "freertos/task.h"              // FreeRTOS 任務管理
#include "esp_log.h"                    // ESP32 日誌記錄
#include "driver/mcpwm_prelude.h"       // MCPWM 驅動
#include "driver/gpio.h"                // GPIO 驅動
#include <inttypes.h>                   // 標準整數類型定義

static const char *TAG = "stepper_example"; // 日誌標籤

#define MCPWM_TIMER_RESOLUTION_HZ 1000000  // MCPWM 計時器分辨率，1MHz，即 1 個 tick 為 1 微秒
#define MCPWM_FREQ_HZ             10000    // MCPWM 頻率，10kHz，可以根據需要調整
#define MCPWM_GPIO_STEP           18       // 步進脈衝輸出的 GPIO
#define MCPWM_GPIO_DIR            22       // 方向控制的 GPIO

// 定義步進電機配置結構體
typedef struct {
    mcpwm_timer_handle_t timer;
    mcpwm_oper_handle_t oper;
    mcpwm_cmpr_handle_t cmpr;
    mcpwm_gen_handle_t gen;
    int target_steps;                // 目標步數
    volatile int current_steps;      // 當前步數
    bool direction;                  // 方向
} stepper_config_t;

static stepper_config_t stepper_config; // 全局步進電機配置

// MCPWM 中斷處理函數
static bool IRAM_ATTR mcpwm_isr_handler(mcpwm_timer_handle_t timer, const mcpwm_timer_event_data_t *edata, void *user_data)
{
    stepper_config_t *config = (stepper_config_t *)user_data; // 取得步進電機配置
    
    if (config->current_steps < config->target_steps) {
        config->current_steps++; // 增加當前步數
        return true;  // 繼續產生脈衝
    } else {
        ESP_ERROR_CHECK(mcpwm_timer_start_stop(config->timer, MCPWM_TIMER_STOP_FULL)); // 停止計時器
        return false;  // 停止計時器
    }
}

// 初始化步進電機的 MCPWM 控制
static void init_stepper_mcpwm(void) {
    ESP_LOGI(TAG, "初始化步進電機 MCPWM 控制");

    // 配置 MCPWM 計時器
    mcpwm_timer_config_t timer_config = {
        .group_id = 0,
        .clk_src = MCPWM_TIMER_CLK_SRC_DEFAULT,
        .resolution_hz = MCPWM_TIMER_RESOLUTION_HZ,
        .period_ticks = MCPWM_TIMER_RESOLUTION_HZ / MCPWM_FREQ_HZ,
        .count_mode = MCPWM_TIMER_COUNT_MODE_UP,
    };
    ESP_ERROR_CHECK(mcpwm_new_timer(&timer_config, &stepper_config.timer));

    // 配置 MCPWM 操作器
    mcpwm_operator_config_t operator_config = {
        .group_id = 0,
    };
    ESP_ERROR_CHECK(mcpwm_new_operator(&operator_config, &stepper_config.oper));

    ESP_ERROR_CHECK(mcpwm_operator_connect_timer(stepper_config.oper, stepper_config.timer));

    // 配置 MCPWM 比較器
    mcpwm_comparator_config_t comparator_config = {
        .flags.update_cmp_on_tez = true,
    };
    ESP_ERROR_CHECK(mcpwm_new_comparator(stepper_config.oper, &comparator_config, &stepper_config.cmpr));

    // 配置 MCPWM 產生器
    mcpwm_generator_config_t generator_config = {
        .gen_gpio_num = MCPWM_GPIO_STEP,
    };
    ESP_ERROR_CHECK(mcpwm_new_generator(stepper_config.oper, &generator_config, &stepper_config.gen));

    // 設置 MCPWM 產生器在計時器事件上的動作
    ESP_ERROR_CHECK(mcpwm_generator_set_actions_on_timer_event(stepper_config.gen,
        MCPWM_GEN_TIMER_EVENT_ACTION(MCPWM_TIMER_DIRECTION_UP, MCPWM_TIMER_EVENT_EMPTY, MCPWM_GEN_ACTION_HIGH),
        MCPWM_GEN_TIMER_EVENT_ACTION_END()));
    ESP_ERROR_CHECK(mcpwm_generator_set_actions_on_compare_event(stepper_config.gen,
        MCPWM_GEN_COMPARE_EVENT_ACTION(MCPWM_TIMER_DIRECTION_UP, stepper_config.cmpr, MCPWM_GEN_ACTION_LOW),
        MCPWM_GEN_COMPARE_EVENT_ACTION_END()));

    // 設置 MCPWM 比較器的比較值
    ESP_ERROR_CHECK(mcpwm_comparator_set_compare_value(stepper_config.cmpr, MCPWM_TIMER_RESOLUTION_HZ / MCPWM_FREQ_HZ / 2));

    // 註冊 MCPWM 計時器事件回調
    ESP_ERROR_CHECK(mcpwm_timer_register_event_callbacks(stepper_config.timer, 
        &(mcpwm_timer_event_callbacks_t){
            .on_full = mcpwm_isr_handler,
        }, &stepper_config));

    // 啟用 MCPWM 計時器
    ESP_ERROR_CHECK(mcpwm_timer_enable(stepper_config.timer));

    // 初始化方向控制 GPIO
    gpio_config_t io_conf = {
        .intr_type = GPIO_INTR_DISABLE,
        .mode = GPIO_MODE_OUTPUT,
        .pin_bit_mask = (1ULL << MCPWM_GPIO_DIR),
        .pull_down_en = 0,
        .pull_up_en = 1  // 啟用內部上拉
    };
    gpio_config(&io_conf);

    // 確保方向引腳初始狀態
    gpio_set_level(MCPWM_GPIO_DIR, 0);

    ESP_LOGI(TAG, "步進電機 MCPWM 控制初始化完成");
    ESP_LOGI(TAG, "MCPWM 步進引腳: %d, 方向引腳: %d", MCPWM_GPIO_STEP, MCPWM_GPIO_DIR);
}

// 控制步進電機移動
static void move_stepper(int steps, bool direction) {
    ESP_LOGI(TAG, "準備移動步進電機：%d 步, 方向：%s", steps, direction ? "正向" : "反向");

    // 檢查當前 GPIO 狀態
    int current_dir = gpio_get_level(MCPWM_GPIO_DIR);
    ESP_LOGI(TAG, "當前方向引腳狀態: %d", current_dir);

    // 確保上一次移動已經完全停止
    while (stepper_config.current_steps < stepper_config.target_steps) {
        vTaskDelay(1);
    }

    // 停止計時器
    ESP_ERROR_CHECK(mcpwm_timer_start_stop(stepper_config.timer, MCPWM_TIMER_STOP_FULL));
    ESP_LOGI(TAG, "MCPWM 計時器已停止");

    // 設置新的方向
    gpio_set_level(MCPWM_GPIO_DIR, direction);
    ESP_LOGI(TAG, "方向已設置為: %d", direction);

    // 添加短暫延遲，確保方向信號穩定
    vTaskDelay(pdMS_TO_TICKS(5));

    // 再次檢查 GPIO 狀態
    current_dir = gpio_get_level(MCPWM_GPIO_DIR);
    ESP_LOGI(TAG, "設置後方向引腳狀態: %d", current_dir);

    // 更新步進配置
    stepper_config.target_steps = steps;
    stepper_config.current_steps = 0;
    stepper_config.direction = direction;

    // 啟動計時器，開始步進
    ESP_ERROR_CHECK(mcpwm_timer_start_stop(stepper_config.timer, MCPWM_TIMER_START_NO_STOP));
    ESP_LOGI(TAG, "MCPWM 計時器已啟動，開始移動");
}

// 主應用程序入口
void app_main(void)
{
    init_stepper_mcpwm(); // 初始化步進電機 MCPWM 控制

    while (1) {
        // 正向旋轉 20000 步
        move_stepper(20000, true);
        while (stepper_config.current_steps < stepper_config.target_steps) {
            vTaskDelay(1);
        }
        ESP_LOGI(TAG, "完成正向旋轉 20000 步");
        vTaskDelay(pdMS_TO_TICKS(2000)); // 延遲 2 秒

        // 反向旋轉 20000 步
        move_stepper(20000, false);
        while (stepper_config.current_steps < stepper_config.target_steps) {
            vTaskDelay(1);
        }
        ESP_LOGI(TAG, "完成反向旋轉 20000 步");
        vTaskDelay(pdMS_TO_TICKS(2000)); // 延遲 2 秒
    }
}
```