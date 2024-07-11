---
slug: mastering-pio-programming-rp2040
title: Mastering PIO Programming on RP2040 
authors:
 - name: w0x7ce
   title: Embedded Systems Engineer
   url: https://github.com/tianrking
   image_url: https://github.com/tianrking.png
tags: [RP2040, PIO, Raspberry Pi Pico, embedded systems]
---

# RP2040 PIO 編程深入探索：從 LED 閃爍到精確時序控制

## 1. PIO 簡介

可編程輸入/輸出（PIO）是 RP2040 晶片的一個強大特性。它允許開發者創建自定義的數字接口，實現精確的時序控制。每個 RP2040 有兩個 PIO 塊，每個塊有四個狀態機。

## 2. LED 閃爍示例

### 2.1 PIO 程序 (blink.pio)

讓我們從一個精確控制的 LED 閃爍程序開始：

```
.program blink
.wrap_target
    set pins, 1 [31]    ; 打開 LED 並等待 31 個週期
    nop         [31]    ; 等待 32 個週期
    nop         [31]    ; 等待 32 個週期
    nop         [31]    ; 等待 32 個週期
    nop         [31]    ; 等待 32 個週期
    nop         [31]    ; 等待 32 個週期
    nop         [31]    ; 等待 32 個週期
    nop         [31]    ; 等待 32 個週期
    nop         [31]    ; 等待 32 個週期
    nop         [31]    ; 等待 32 個週期
    nop         [31]    ; 等待 32 個週期
    nop         [31]    ; 等待 32 個週期
    nop         [31]    ; 等待 32 個週期
    nop         [31]    ; 等待 32 個週期
    nop         [31]    ; 等待 32 個週期
    nop         [19]    ; 等待 20 個週期
    set pins, 0 [31]    ; 關閉 LED 並等待 31 個週期
    nop         [31]    ; 等待 32 個週期
    nop         [31]    ; 等待 32 個週期
    nop         [31]    ; 等待 32 個週期
    nop         [31]    ; 等待 32 個週期
    nop         [31]    ; 等待 32 個週期
    nop         [31]    ; 等待 32 個週期
    nop         [31]    ; 等待 32 個週期
    nop         [31]    ; 等待 32 個週期
    nop         [31]    ; 等待 32 個週期
    nop         [31]    ; 等待 32 個週期
    nop         [31]    ; 等待 32 個週期
    nop         [31]    ; 等待 32 個週期
    nop         [31]    ; 等待 32 個週期
    nop         [31]    ; 等待 32 個週期
    nop         [19]    ; 等待 20 個週期
.wrap

% c-sdk {
// Helper function to initialize PIO program
void blink_program_init(PIO pio, uint sm, uint offset, uint pin, float freq) {
    pio_sm_config c = blink_program_get_default_config(offset);
    pio_gpio_init(pio, pin);
    sm_config_set_set_pins(&c, pin, 1);
    pio_sm_set_consecutive_pindirs(pio, sm, pin, 1, true);
    float div = clock_get_hz(clk_sys) / freq;
    sm_config_set_clkdiv(&c, div);
    pio_sm_init(pio, sm, offset, &c);
}
%}
```

### 2.2 主程序 (main.cpp)

現在讓我們看看如何在主程序中設置和運行這個 PIO 程序：

```cpp
#include "pico/stdlib.h"
#include "hardware/pio.h"
#include "hardware/clocks.h"
#include "blink.pio.h"

int main() {
    static const uint LED_PIN = 25;
    static const float PIO_FREQ = 2000;  // 設置 PIO 頻率為 2000 Hz

    // 選擇 PIO 實例（0 或 1）
    PIO pio = pio0;

    // 獲取 PIO 程序中的第一個空閒狀態機
    uint sm = pio_claim_unused_sm(pio, true);

    // 將 PIO 程序添加到 PIO 指令內存中
    uint offset = pio_add_program(pio, &blink_program);

    // 計算 PIO 時鐘分頻器
    float div = (float)clock_get_hz(clk_sys) / PIO_FREQ;

    // 使用我們的 .pio 文件中的輔助函數初始化程序
    blink_program_init(pio, sm, offset, LED_PIN, PIO_FREQ);

    // 啟動 PIO 程序
    pio_sm_set_enabled(pio, sm, true);

    // 主循環保持程序運行
    while (true) {
        sleep_ms(1000);
    }
}
```

### 代碼解釋：
- `PIO_FREQ` 設置為 2000 Hz，這決定了 PIO 狀態機的運行速度。
- `blink_program_init` 函數用於設置 PIO 狀態機，包括設置時鐘分頻器。
- 時鐘分頻器的計算：`div = clock_get_hz(clk_sys) / PIO_FREQ`
  - `clock_get_hz(clk_sys)` 獲取系統時鐘頻率（通常為 125 MHz）
  - 分頻後，PIO 將以 2000 Hz 的頻率運行

## 3. PIO 指令週期分析

每條 PIO 指令的執行週期由兩部分組成：
1. 指令本身的執行（1 個週期）
2. 指令後的額外延遲（0 到 31 個週期）

例如：
- `set pins, 1 [31]` 總共執行 32 個週期：1 個用於指令執行，31 個用於延遲
- `nop [31]` 也執行 32 個週期
- `nop [19]` 執行 20 個週期：1 個用於指令執行，19 個用於延遲

## 4. 頻率計算

根據我們的設置，PIO 時鐘頻率為 2000 Hz：

- LED 開啟狀態：(1 + 14) * 32 + 20 = 500 個週期
- LED 關閉狀態：同樣是 500 個週期
- 完整循環：500 + 500 = 1000 個週期
- 閃爍頻率：2000 Hz / 1000 = 2 Hz

這解釋了為什麼 LED 以 2 Hz 的頻率閃爍（每秒閃爍兩次）。

## 5. PIO 編程限制

1. 指令延遲限制：
   - 每條指令的延遲必須 ≤ 31
   - 原因：延遲值在指令編碼中佔用 5 位

2. 程序大小限制：
   - 每個 PIO 程序最多只能包含 32 條指令
   - 原因：硬件設計限制，每個 PIO 塊有 32 個指令槽

## 6. 優化技巧

1. 利用循環減少指令數量
2. 使用側設（side-set）功能同時執行 GPIO 操作和其他指令
3. 適當設置時鐘分頻以達到所需的時序

## 7. 注意事項

在使用 RP2040 的 PIO 進行編程時，需要注意以下幾個重要的限制和考慮因素：

1. **指令延遲限制**:
   - 每條指令的延遲必須小於或等於 31 個週期
   - 錯誤信息: "instruction delay must be < = 31"
   - 原因: 延遲值在指令編碼中僅佔用 5 位二進制

2. **程序大小限制**:
   - 每個 PIO 程序最多只能包含 32 條指令
   - 錯誤信息: "program instruction limit of 32 instruction(s) exceeded"
   - 原因: 硬件設計限制，每個 PIO 塊有 32 個指令槽

3. **時鐘分頻器 (div) 範圍**:
   - 有效範圍: 1.0 到 65536.0
   - 最小值 1.0 對應最快速度（系統時鐘頻率）
   - 最大值 65536.0 對應最慢速度（系統時鐘頻率除以 65536）
   - 注意: 當計算出的 div 值超出此範圍時，實際運行頻率可能與預期不符

4. **GPIO 引腳限制**:
   - PIO 可以訪問的 GPIO 引腳範圍: 0-29
   - 某些特殊功能引腳可能有額外限制

5. **狀態機數量**:
   - 每個 PIO 塊有 4 個獨立的狀態機
   - 總共有 8 個狀態機（2 個 PIO 塊 * 4 個狀態機）

6. **FIFO 深度**:
   - 每個狀態機有 4 個字（32 位）的 TX FIFO 和 4 個字的 RX FIFO
   - 在數據密集型應用中需要謹慎管理 FIFO

7. **執行速度考慮**:
   - PIO 指令執行速度可以非常快（最高可達系統時鐘頻率）
   - 需要仔細計算時序以確保預期的操作頻率

8. **與 CPU 交互**:
   - PIO 操作是獨立於 CPU 的，需要正確配置中斷和 DMA 以實現高效的數據交換

9. **側設（Side-set）限制**:
   - 最多可以使用 5 個側設位
   - 使用側設會減少可用於延遲的位數

10. **調試難度**:
    - PIO 程序難以直接調試
    - 建議使用模擬器或示波器等工具輔助開發和測試

## 完整代码

```c++ title="main.cpp"
#include "pico/stdlib.h"
#include "hardware/pio.h"
#include "hardware/clocks.h"
#include "hello.pio.h"

int main() {

    static const uint led_pin = 25;
    static const float pio_freq = 2000;

    // Choose PIO instance (0 or 1)
    PIO pio = pio0;

    // Get first free state machine in PIO 0
    uint sm = pio_claim_unused_sm(pio, true);

    // Add PIO program to PIO instruction memory. SDK will find location and
    // return with the memory offset of the program.
    uint offset = pio_add_program(pio, &blink_program);

    // Calculate the PIO clock divider
    float div = (float)clock_get_hz(clk_sys) / pio_freq;

    // Initialize the program using the helper function in our .pio file
    blink_program_init(pio, sm, offset, led_pin, div); //div最大允许数值65535

    // Start running our PIO program in the state machine
    pio_sm_set_enabled(pio, sm, true);

    // Do nothing
    while (true) {
        sleep_ms(1000);
    }
}
```

```c++ title="hello.pio"
.program blink

; Turn on LED for 100 cycles and off for 100 cycles.
; At 2 kHz, this will toggle pin at 10 Hz (200 cycles / 2000 Hz = 0.1 sec)

; instruction delay must be <= 31
; program instruction limit of 32 instruction(s) exceeded
.wrap_target
    set pins, 1 [31]    ; Turn LED on and wait another 19 cycles
    nop         [31]
    nop         [31]

    nop         [31]
    nop         [31]
    nop         [31]
    
    nop         [31]    ; Wait 20 cycles
    nop         [31]    ; Wait 20 cycles
    nop         [31]    ; Wait 20 cycles
    
    nop         [31]    ; Wait 20 cycles
    nop         [31]    ; Wait 20 cycles
    nop         [31]    ; Wait 20 cycles
    
    nop         [31]    ; Wait 20 cycles
    nop         [31]    ; Wait 20 cycles
    nop         [31] 
    
    nop         [19] 

    set pins, 0 [31]    ; Turn LED off and wait another 19 cycles
    nop         [31]
    nop         [31]

    nop         [31]
    nop         [31]
    nop         [31]
    
    nop         [31]    ; Wait 20 cycles
    nop         [31]    ; Wait 20 cycles
    nop         [31]    ; Wait 20 cycles
    
    nop         [31]    ; Wait 20 cycles
    nop         [31]    ; Wait 20 cycles
    nop         [31]    ; Wait 20 cycles
    
    nop         [31]    ; Wait 20 cycles
    nop         [31]    ; Wait 20 cycles
    nop         [31] 
    
    nop         [19] 

.wrap

% c-sdk {

// Helper function (for use in C program) to initialize this PIO program
void blink_program_init(PIO pio, uint sm, uint offset, uint pin, float div) {

    // Sets up state machine and wrap target. This function is automatically
    // generated in blink.pio.h.
    pio_sm_config c = blink_program_get_default_config(offset);

    // Allow PIO to control GPIO pin (as output)
    pio_gpio_init(pio, pin);

    // Connect pin to SET pin (control with 'set' instruction)
    sm_config_set_set_pins(&c, pin, 1);

    // Set the pin direction to output (in PIO)
    pio_sm_set_consecutive_pindirs(pio, sm, pin, 1, true);
    
    // Set the clock divider for the state machine
    sm_config_set_clkdiv(&c, div);

    // Load configuration and jump to start of the program
    pio_sm_init(pio, sm, offset, &c);
}

%}
```

