---
slug: RP2040 RF24
title: RP2040 RF24

authors:
 - name: w0x7ce
   title: Embedded Systems Engineer
   url: https://github.com/tianrking
   image_url: https://github.com/tianrking.png

tags: [RP2040, PIO, LED Control, Resource Management, Raspberry Pi Pico, embedded systems, state machine optimization]
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

```c++
#include <stdio.h>
#include "pico/stdlib.h"
#include "hardware/spi.h"
#include <RF24.h>

#define CE_PIN 7
#define CSN_PIN 8

RF24 radio(CE_PIN, CSN_PIN);
SPI spi;

const uint8_t address[6] = "00001";

int main() {
    stdio_init_all();
    sleep_ms(2000); // 給串口一些時間初始化

    printf("RF24 Simple Transmitter Test\n");

    // 初始化 SPI，使用 spi0，引腳 2(SCK), 3(TX), 4(RX)
    spi.begin(spi0, 2, 3, 4);

    // 初始化 RF24
    if (!radio.begin(&spi)) {
        printf("Radio hardware is not responding!\n");
        return 1;
    }

    // 設置 RF24
    radio.setPALevel(RF24_PA_LOW);
    radio.setChannel(76);
    radio.openWritingPipe(address);
    radio.setAutoAck(false);
    radio.setDataRate(RF24_250KBPS);

    printf("RF24 setup completed. Starting transmission...\n");

    bool sendA = true;

    while (true) {
        char message = sendA ? 'A' : 'B';
        
        printf("Sending message: %c\n", message);
        
        bool report = radio.write(&message, sizeof(message));
        
        if (report) {
            printf("Transmission successful\n");
        } else {
            printf("Transmission failed\n");
        }

        sendA = !sendA;

        sleep_ms(1000);
    }

    return 0;
}
```