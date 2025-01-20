"use strict";(self.webpackChunkEl_Jardin_Secreto_de_w0x7ce=self.webpackChunkEl_Jardin_Secreto_de_w0x7ce||[]).push([[1108],{2996:(n,t,_)=>{_.r(t),_.d(t,{assets:()=>a,contentTitle:()=>r,default:()=>d,frontMatter:()=>i,metadata:()=>o,toc:()=>E});var e=_(4848),c=_(8453);const i={},r=void 0,o={id:"micro-controladores/ESP32/esp32-encoder",title:"esp32-encoder",description:"",source:"@site/docs/micro-controladores/ESP32/esp32-encoder.md",sourceDirName:"micro-controladores/ESP32",slug:"/micro-controladores/ESP32/esp32-encoder",permalink:"/en/micro-controladores/ESP32/esp32-encoder",draft:!1,unlisted:!1,editUrl:"https://github.com/tianrking/tianrking.github.io/tree/V3.4/docs/micro-controladores/ESP32/esp32-encoder.md",tags:[],version:"current",lastUpdatedAt:1722915933e3,frontMatter:{}},a={},E=[];function l(n){const t={code:"code",pre:"pre",...(0,c.R)(),...n.components};return(0,e.jsx)(t.pre,{children:(0,e.jsx)(t.code,{className:"language-c++",metastring:'title="main.c"',children:'#include <stdio.h>\n#include <math.h>\n#include "freertos/FreeRTOS.h"\n#include "freertos/task.h"\n#include "freertos/queue.h"\n#include "driver/pulse_cnt.h"\n#include "driver/gptimer.h"\n#include "esp_log.h"\n// #include "esp_timer.h"\n\n#define PCNT_HIGH_LIMIT 1000\n#define PCNT_LOW_LIMIT  -1000\n#define EXAMPLE_EC11_GPIO_A 4\n#define EXAMPLE_EC11_GPIO_B 2\n#define PULSES_PER_REVOLUTION 4\n#define TIMER_INTERVAL_MS 100\n#define FILTER_DEPTH 5  // \u6ffe\u6ce2\u5668\u6df1\u5ea6\n\nstatic const char *TAG = "encoder_example";\n\npcnt_unit_handle_t pcnt_unit = NULL;\ngptimer_handle_t gptimer = NULL;\nQueueHandle_t encoder_queue;\n\ntypedef struct {\n    int total_count;\n    int diff_count;\n} encoder_data_t;\n\nstatic int previous_count = 0;\nstatic int filter_buffer[FILTER_DEPTH] = {0};\nstatic int filter_index = 0;\nstatic float cw_error = 1.0;  // \u9806\u6642\u91dd\u8aa4\u5dee\u4fc2\u6578\nstatic float ccw_error = 1.0; // \u9006\u6642\u91dd\u8aa4\u5dee\u4fc2\u6578\n\nstatic void init_pcnt(void)\n{\n    pcnt_unit_config_t unit_config = {\n        .high_limit = PCNT_HIGH_LIMIT,\n        .low_limit = PCNT_LOW_LIMIT,\n    };\n    ESP_ERROR_CHECK(pcnt_new_unit(&unit_config, &pcnt_unit));\n\n    pcnt_glitch_filter_config_t filter_config = {\n        .max_glitch_ns = 1000,\n    };\n    ESP_ERROR_CHECK(pcnt_unit_set_glitch_filter(pcnt_unit, &filter_config));\n\n    pcnt_chan_config_t chan_a_config = {\n        .edge_gpio_num = EXAMPLE_EC11_GPIO_A,\n        .level_gpio_num = EXAMPLE_EC11_GPIO_B,\n    };\n    pcnt_channel_handle_t pcnt_chan_a = NULL;\n    ESP_ERROR_CHECK(pcnt_new_channel(pcnt_unit, &chan_a_config, &pcnt_chan_a));\n\n    pcnt_chan_config_t chan_b_config = {\n        .edge_gpio_num = EXAMPLE_EC11_GPIO_B,\n        .level_gpio_num = EXAMPLE_EC11_GPIO_A,\n    };\n    pcnt_channel_handle_t pcnt_chan_b = NULL;\n    ESP_ERROR_CHECK(pcnt_new_channel(pcnt_unit, &chan_b_config, &pcnt_chan_b));\n\n    ESP_ERROR_CHECK(pcnt_channel_set_edge_action(pcnt_chan_a, PCNT_CHANNEL_EDGE_ACTION_DECREASE, PCNT_CHANNEL_EDGE_ACTION_INCREASE));\n    ESP_ERROR_CHECK(pcnt_channel_set_level_action(pcnt_chan_a, PCNT_CHANNEL_LEVEL_ACTION_KEEP, PCNT_CHANNEL_LEVEL_ACTION_INVERSE));\n    ESP_ERROR_CHECK(pcnt_channel_set_edge_action(pcnt_chan_b, PCNT_CHANNEL_EDGE_ACTION_INCREASE, PCNT_CHANNEL_EDGE_ACTION_DECREASE));\n    ESP_ERROR_CHECK(pcnt_channel_set_level_action(pcnt_chan_b, PCNT_CHANNEL_LEVEL_ACTION_KEEP, PCNT_CHANNEL_LEVEL_ACTION_INVERSE));\n\n    ESP_ERROR_CHECK(pcnt_unit_enable(pcnt_unit));\n    ESP_ERROR_CHECK(pcnt_unit_clear_count(pcnt_unit));\n    ESP_ERROR_CHECK(pcnt_unit_start(pcnt_unit));\n}\n\nstatic int apply_filter(int new_value) {\n    filter_buffer[filter_index] = new_value;\n    filter_index = (filter_index + 1) % FILTER_DEPTH;\n    \n    int sum = 0;\n    for (int i = 0; i < FILTER_DEPTH; i++) {\n        sum += filter_buffer[i];\n    }\n    return sum / FILTER_DEPTH;\n}\n\nstatic bool IRAM_ATTR timer_callback(gptimer_handle_t timer, const gptimer_alarm_event_data_t *edata, void *user_ctx)\n{\n    int current_count = 0;\n    pcnt_unit_get_count(pcnt_unit, &current_count);\n\n    int diff_count = current_count - previous_count;\n    diff_count = apply_filter(diff_count);  // \u61c9\u7528\u6ffe\u6ce2\u5668\n\n    encoder_data_t data = {\n        .total_count = current_count,\n        .diff_count = diff_count\n    };\n\n    previous_count = current_count;\n    xQueueSendFromISR(encoder_queue, &data, NULL);\n\n    return false;\n}\n\nstatic void init_timer(void)\n{\n    gptimer_config_t timer_config = {\n        .clk_src = GPTIMER_CLK_SRC_DEFAULT,\n        .direction = GPTIMER_COUNT_UP,\n        .resolution_hz = 1000000,\n    };\n    ESP_ERROR_CHECK(gptimer_new_timer(&timer_config, &gptimer));\n\n    gptimer_alarm_config_t alarm_config = {\n        .reload_count = 0,\n        .alarm_count = TIMER_INTERVAL_MS * 1000,\n        .flags.auto_reload_on_alarm = true,\n    };\n    ESP_ERROR_CHECK(gptimer_set_alarm_action(gptimer, &alarm_config));\n\n    gptimer_event_callbacks_t cbs = {\n        .on_alarm = timer_callback,\n    };\n    ESP_ERROR_CHECK(gptimer_register_event_callbacks(gptimer, &cbs, NULL));\n\n    ESP_ERROR_CHECK(gptimer_enable(gptimer));\n    ESP_ERROR_CHECK(gptimer_start(gptimer));\n}\n\nvoid encoder_task(void *pvParameters)\n{\n    encoder_data_t data;\n    float rpm = 0;\n    const char *direction = "\u505c\u6b62";\n    int64_t total_cw_pulses = 0;\n    int64_t total_ccw_pulses = 0;\n\n    while (1) {\n        if (xQueueReceive(encoder_queue, &data, portMAX_DELAY)) {\n            if (data.diff_count > 0) {\n                total_cw_pulses += data.diff_count;\n                rpm = (float)data.diff_count * (60.0f * 1000 / TIMER_INTERVAL_MS) / PULSES_PER_REVOLUTION ; // cw_error;\n                direction = "\u9806\u6642\u91dd";\n            } else if (data.diff_count < 0) {\n                total_ccw_pulses -= data.diff_count;\n                rpm = (float)data.diff_count * (60.0f * 1000 / TIMER_INTERVAL_MS) / PULSES_PER_REVOLUTION ; /// ccw_error;\n                direction = "\u9006\u6642\u91dd";\n            } else {\n                rpm = 0;\n                direction = "\u505c\u6b62";\n            }\n\n            // \u66f4\u65b0\u8aa4\u5dee\u4fc2\u6578\n            // if (total_cw_pulses > 0 && total_ccw_pulses > 0) {\n            //     float ratio = (float)total_cw_pulses / total_ccw_pulses;\n            //     if (ratio > 1.0) {\n            //         cw_error = ratio;\n            //         ccw_error = 1.0;\n            //     } else {\n            //         ccw_error = 1.0 / ratio;\n            //         cw_error = 1.0;\n            //     }\n            // }\n\n            // ESP_LOGI(TAG, "\u4f4d\u7f6e: %d, \u901f\u5ea6: %.2f RPM, \u65b9\u5411: %s, CW\u8aa4\u5dee: %.3f, CCW\u8aa4\u5dee: %.3f ,\n            //          data.total_count, fabsf(rpm), direction, cw_error, ccw_error);\n\n            ESP_LOGI(TAG, "\u4f4d\u7f6e: %d, \u901f\u5ea6: %.2f RPM, \u65b9\u5411: %s ", data.total_count, fabsf(rpm), direction);\n        }\n    }\n}\n\nvoid app_main(void)\n{\n    ESP_LOGI(TAG, "\u958b\u59cb\u7de8\u78bc\u5668\u793a\u4f8b");\n    \n    encoder_queue = xQueueCreate(10, sizeof(encoder_data_t));\n    \n    init_pcnt();\n    init_timer();\n\n    xTaskCreate(encoder_task, "encoder_task", 2048, NULL, 5, NULL);\n\n    while (1) {\n        vTaskDelay(portMAX_DELAY);\n    }\n}\n'})})}function d(n={}){const{wrapper:t}={...(0,c.R)(),...n.components};return t?(0,e.jsx)(t,{...n,children:(0,e.jsx)(l,{...n})}):l(n)}},8453:(n,t,_)=>{_.d(t,{R:()=>r,x:()=>o});var e=_(6540);const c={},i=e.createContext(c);function r(n){const t=e.useContext(i);return e.useMemo((function(){return"function"==typeof n?n(t):{...t,...n}}),[t,n])}function o(n){let t;return t=n.disableParentContext?"function"==typeof n.components?n.components(c):n.components||c:r(n.components),e.createElement(i.Provider,{value:t},n.children)}}}]);