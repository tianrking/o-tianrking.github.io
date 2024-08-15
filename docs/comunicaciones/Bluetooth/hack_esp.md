
1. 准备ESP32设备和开发环境
2. 编写和部署不使用PMF的Wi-Fi连接代码
3. 设置Wi-Fi数据包捕获环境
4. 捕获和分析Wi-Fi管理帧
5. （可选）演示安全漏洞

详细步骤和代码：

1. ESP32设备准备：
   - 安装ESP-IDF开发环境
   - 创建新项目文件夹

2. ESP32代码（不使用PMF的Wi-Fi连接）：

```c
#include <string.h>
#include "freertos/FreeRTOS.h"
#include "freertos/task.h"
#include "esp_system.h"
#include "esp_wifi.h"
#include "esp_event.h"
#include "esp_log.h"
#include "nvs_flash.h"

#define EXAMPLE_ESP_WIFI_SSID      "YOUR_SSID"
#define EXAMPLE_ESP_WIFI_PASS      "YOUR_PASSWORD"

static const char *TAG = "wifi_no_pmf";

// Wi-Fi事件处理函数
static void wifi_event_handler(void* arg, esp_event_base_t event_base,
                               int32_t event_id, void* event_data)
{
    // 处理Wi-Fi连接事件
}

void app_main(void)
{
    // 初始化NVS
    esp_err_t ret = nvs_flash_init();
    if (ret == ESP_ERR_NVS_NO_FREE_PAGES || ret == ESP_ERR_NVS_NEW_VERSION_FOUND) {
        ESP_ERROR_CHECK(nvs_flash_erase());
        ret = nvs_flash_init();
    }
    ESP_ERROR_CHECK(ret);

    // 初始化Wi-Fi
    ESP_ERROR_CHECK(esp_netif_init());
    ESP_ERROR_CHECK(esp_event_loop_create_default());
    esp_netif_create_default_wifi_sta();

    wifi_init_config_t cfg = WIFI_INIT_CONFIG_DEFAULT();
    ESP_ERROR_CHECK(esp_wifi_init(&cfg));

    // 注册事件处理函数
    ESP_ERROR_CHECK(esp_event_handler_instance_register(WIFI_EVENT,
                                                        ESP_EVENT_ANY_ID,
                                                        &wifi_event_handler,
                                                        NULL,
                                                        NULL));
    ESP_ERROR_CHECK(esp_event_handler_instance_register(IP_EVENT,
                                                        IP_EVENT_STA_GOT_IP,
                                                        &wifi_event_handler,
                                                        NULL,
                                                        NULL));

    // 配置Wi-Fi（禁用PMF）
    wifi_config_t wifi_config = {
        .sta = {
            .ssid = EXAMPLE_ESP_WIFI_SSID,
            .password = EXAMPLE_ESP_WIFI_PASS,
            .pmf_cfg = {
                .capable = false,
                .required = false
            },
        },
    };
    ESP_ERROR_CHECK(esp_wifi_set_mode(WIFI_MODE_STA));
    ESP_ERROR_CHECK(esp_wifi_set_config(WIFI_IF_STA, &wifi_config));

    // 启动Wi-Fi
    ESP_ERROR_CHECK(esp_wifi_start());

    ESP_LOGI(TAG, "Wi-Fi initialized without PMF. Connecting to AP...");
}

```

3. 设置数据包捕获环境（Windows）：
   - 获取支持监听模式的USB Wi-Fi适配器（如基于Atheros AR9271芯片的适配器）
   - 安装适配器驱动程序
   - 安装Wireshark

4. 捕获Wi-Fi管理帧：
   - 打开Wireshark，选择Wi-Fi适配器接口
   - 设置捕获过滤器：
     ```
     wlan.fc.type_subtype == 0x0b || wlan.fc.type_subtype == 0x0c || wlan.fc.type_subtype == 0x00 || wlan.fc.type_subtype == 0x01
     ```
   - 开始捕获
   - 运行ESP32程序，观察连接过程

5. 分析捕获的帧：
   - 在Wireshark中查看捕获的管理帧
   - 特别关注：
     - 身份验证帧（Authentication frames）
     - 关联请求和响应帧（Association request and response frames）
     - 解除关联帧（Deauthentication frames）
   - 验证这些帧是否为明文，是否包含敏感信息

6. （可选）安全漏洞演示：
   - 使用Aircrack-ng套件（需要单独安装）
   - 发送伪造的解除关联帧：
     ```
     aireplay-ng -0 1 -a [AP_MAC] -c [CLIENT_MAC] [INTERFACE]
     ```

安全注意事项：
- 仅在自己的网络和设备上进行测试
- 了解并遵守当地的法律法规
- 不要在未经授权的网络上进行测试

这个实验展示了未启用PMF时Wi-Fi管理帧的脆弱性。在实际应用中，应始终启用PMF以提高安全性。当你继续深入研究网络安全时，可以扩展这个实验，比较启用PMF前后的差异，或探索其他Wi-Fi安全机制。

