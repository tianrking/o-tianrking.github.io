---
slug: ESP32 RF24
title: ESP32 RF24

authors:
 - name: w0x7ce
   title: Embedded Systems Engineer
   url: https://github.com/tianrking
   image_url: https://github.com/tianrking.png

tags: [ESP32, Resource Management,  embedded systems]
---

### RP2040 和 NRF24L01 引腳對應關係及 RF 參數設置

| RP2040 引腳 | 功能                    | NRF24L01 引腳 |
|-------------|-------------------------|--------------|
| SPI0 SCK (2) | SPI 時鐘 (SCK)           | SCK          |
| SPI0 TX (3)  | SPI 主出從入 (MOSI)      | MOSI         |
| SPI0 RX (4)  | SPI 主入從出 (MISO)      | MISO         |
| GPIO 7      | CE（片選使能）           | CE           |
| GPIO 8      | CSN（片選信號）           | CSN          |

#### RP2040 RF 參數設置：
- PA Level: RF24_PA_HIGH (可以根據具體情況調整)
- Channel: 76
- Data Rate: RF24_250KBPS
- Auto Acknowledgment: 關閉
- 數據管道地址：0x30 0x35 0x30 0x31 0x30

### ESP32 和 NRF24L01 引腳對應關係及 RF 參數設置

| ESP32 引腳 | 功能                    | NRF24L01 引腳 |
|------------|-------------------------|--------------|
| GPIO 18    | SPI 時鐘 (SCK)           | SCK          |
| GPIO 23    | SPI 主出從入 (MOSI)      | MOSI         |
| GPIO 19    | SPI 主入從出 (MISO)      | MISO         |
| GPIO 4     | CE（片選使能）           | CE           |
| GPIO 5     | CSN（片選信號）           | CSN          |

#### ESP32 RF 參數設置：
- PA Level: RF24_PA_LOW
- Channel: 76
- Data Rate: RF24_250KBPS
- Auto Acknowledgment: 關閉
- 數據管道地址：0x30 0x35 0x30 0x31 0x30

這些設置和引腳對應關係確保了RP2040和ESP32能夠正確地與NRF24L01模組進行通信，並在相同的RF頻道和數據率下進行數據傳輸。

```
//發送端 (Transmitter) 代碼

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
        Serial.println("Radio hardware not responding!");
        while (1) {}
    }

    radio.setPALevel(RF24_PA_LOW);
    radio.setChannel(76);
    radio.setDataRate(RF24_250KBPS);
    radio.setAutoAck(false);
    radio.openWritingPipe(address);

    Serial.println("Transmitter ready. Sending messages...");
}

void loop() {
    char message = random(2) ? 'A' : 'B';  // 隨機發送 'A' 或 'B'
    
    bool report = radio.write(&message, sizeof(message));
    
    if (report) {
        Serial.print("Sent message: ");
        Serial.println(message);
    } else {
        Serial.println("Transmission failed");
    }

    delay(1000);  // 每秒發送一次
}

// 接收端 (Receiver) 代碼

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
        Serial.println("Radio hardware not responding!");
        while (1) {}
    }

    radio.setPALevel(RF24_PA_LOW);
    radio.setChannel(76);
    radio.setDataRate(RF24_250KBPS);
    radio.setAutoAck(false);
    radio.openReadingPipe(1, address);
    radio.startListening();

    Serial.println("Receiver ready. Waiting for messages...");
}

void loop() {
    if (radio.available()) {
        char message;
        radio.read(&message, sizeof(message));
        Serial.print("Received message: ");
        Serial.println(message);
    }
}

```