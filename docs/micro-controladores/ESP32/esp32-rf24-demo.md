---
slug: esp32-rp2040-nrf24l01-wireless-communication
title: ESP32 and RP2040 Wireless Communication with NRF24L01 | ESP32 與 RP2040 使用 NRF24L01 無線通信模組指南
authors:
 - name: w0x7ce
   title: Embedded Systems Engineer
   url: https://github.com/tianrking
   image_url: https://github.com/tianrking.png
tags: [ESP32, RP2040, NRF24L01, Wireless Communication, Embedded Systems, SPI, IoT]
---

# ESP32 與 RP2040 使用 NRF24L01 無線通信模組指南

在本文中，我們將詳細介紹如何使用 ESP32 和 RP2040 microcontroller 與 NRF24L01 無線通信模組進行通信。我們將涵蓋硬件連接、軟件配置以及示例代碼，幫助您快速建立起基於這些平台的無線通信系統。

## 硬件連接

### RP2040 和 NRF24L01 引腳對應關係

首先，讓我們看看 RP2040 和 NRF24L01 的引腳連接：

| RP2040 引腳 | 功能              | NRF24L01 引腳 |
|-------------|-------------------|--------------| 
| SPI0 SCK (2)| SPI 時鐘 (SCK)    | SCK          |
| SPI0 TX (3) | SPI 主出從入 (MOSI)| MOSI         |
| SPI0 RX (4) | SPI 主入從出 (MISO)| MISO         |
| GPIO 7      | CE（片選使能）    | CE           |
| GPIO 8      | CSN（片選信號）   | CSN          |

### ESP32 和 NRF24L01 引腳對應關係

接下來是 ESP32 和 NRF24L01 的引腳連接：

| ESP32 引腳 | 功能              | NRF24L01 引腳 |
|------------|-------------------|--------------| 
| GPIO 18    | SPI 時鐘 (SCK)    | SCK          |
| GPIO 23    | SPI 主出從入 (MOSI)| MOSI         |
| GPIO 19    | SPI 主入從出 (MISO)| MISO         |
| GPIO 4     | CE（片選使能）    | CE           |
| GPIO 5     | CSN（片選信號）   | CSN          |

:::tip
確保正確連接這些引腳，以保證 NRF24L01 模組能夠與 microcontroller 正常通信。
:::

## RF 參數設置

為了確保兩個設備能夠成功通信，我們需要配置相同的 RF 參數。以下是 RP2040 和 ESP32 的 RF 參數設置：

### RP2040 RF 參數設置：

- PA Level: RF24_PA_HIGH（可以根據具體情況調整）
- Channel: 76
- Data Rate: RF24_250KBPS
- Auto Acknowledgment: 關閉
- 數據管道地址：0x30 0x35 0x30 0x31 0x30

### ESP32 RF 參數設置：

- PA Level: RF24_PA_LOW
- Channel: 76
- Data Rate: RF24_250KBPS
- Auto Acknowledgment: 關閉
- 數據管道地址：0x30 0x35 0x30 0x31 0x30

:::note
請注意，兩個設備的 Channel、Data Rate 和數據管道地址必須相同，以確保它們能夠在同一頻道上進行通信。PA Level 可以根據實際需求和環境進行調整。
:::

## 代碼實現

現在，讓我們來看看如何在代碼中實現這些設置，並進行基本的數據發送和接收。

### 發送端 (Transmitter) 代碼

```cpp
#include <Arduino.h>
#include <SPI.h>
#include <RF24.h>

#define CE_PIN 4
#define CSN_PIN 5

RF24 radio(CE_PIN, CSN_PIN);
const uint8_t address[6] = "00001";

void setup() {
    Serial.begin(115200);
    while (!Serial) {}
    
    if (!radio.begin()) {
        Serial.println("無線模組未響應！");
        while (1) {}
    }
    
    radio.setPALevel(RF24_PA_LOW);
    radio.setChannel(76);
    radio.setDataRate(RF24_250KBPS);
    radio.setAutoAck(false);
    radio.openWritingPipe(address);
    
    Serial.println("發送端就緒。開始發送訊息...");
}

void loop() {
    char message = random(2) ? 'A' : 'B';  // 隨機發送 'A' 或 'B'
    
    bool report = radio.write(&message, sizeof(message));
    
    if (report) {
        Serial.print("發送訊息: ");
        Serial.println(message);
    } else {
        Serial.println("發送失敗");
    }
    
    delay(1000);  // 每秒發送一次
}
```

### 接收端 (Receiver) 代碼

```cpp
#include <Arduino.h>
#include <SPI.h>
#include <RF24.h>

#define CE_PIN 4
#define CSN_PIN 5

RF24 radio(CE_PIN, CSN_PIN);
const uint8_t address[6] = "00001";

void setup() {
    Serial.begin(115200);
    while (!Serial) {}
    
    if (!radio.begin()) {
        Serial.println("無線模組未響應！");
        while (1) {}
    }
    
    radio.setPALevel(RF24_PA_LOW);
    radio.setChannel(76);
    radio.setDataRate(RF24_250KBPS);
    radio.setAutoAck(false);
    radio.openReadingPipe(1, address);
    radio.startListening();
    
    Serial.println("接收端就緒。等待訊息...");
}

void loop() {
    if (radio.available()) {
        char message;
        radio.read(&message, sizeof(message));
        Serial.print("收到訊息: ");
        Serial.println(message);
    }
}
```

## 代碼解析

### 發送端

1. 我們首先包含必要的庫：`Arduino.h`、`SPI.h` 和 `RF24.h`。
2. 定義 CE 和 CSN 引腳。
3. 創建 `RF24` 對象並設置地址。
4. 在 `setup()` 函數中：
   - 初始化串口通信。
   - 初始化無線模組。
   - 設置 RF 參數（PA Level、Channel、Data Rate 等）。
   - 打開寫入管道。
5. 在 `loop()` 函數中：
   - 隨機生成 'A' 或 'B' 作為消息。
   - 發送消息並報告結果。
   - 每秒發送一次。

### 接收端

1. 接收端的初始設置與發送端類似。
2. 主要區別在於：
   - 我們打開的是讀取管道而不是寫入管道。
   - 調用 `radio.startListening()` 開始監聽incoming訊息。
3. 在 `loop()` 函數中：
   - 檢查是否有可用的訊息。
   - 如果有，讀取並打印訊息。

## 注意事項

1. 確保兩個設備使用相同的通道和數據管道地址。
2. PA Level 可能需要根據您的具體應用場景進行調整。
3. 本例中關閉了自動確認（Auto Acknowledgment）功能，這可能會影響通信的可靠性。在實際應用中，您可能需要根據需求開啟此功能。
4. 記得在使用前正確連接 NRF24L01 模組的電源和接地引腳。

## 結論

通過本指南，應該能夠成功地使用 ESP32 或 RP2040 與 NRF24L01 模組進行基本的無線通信。