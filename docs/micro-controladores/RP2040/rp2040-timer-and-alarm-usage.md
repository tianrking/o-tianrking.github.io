---
slug: rp2040-timer-and-alarm-usage
title: Timer and Alarm Usage in RP2040
authors:
  - name: w0x7ce
    title: Embedded Systems Engineer
    url: https://github.com/tianrking
    image_url: https://github.com/tianrking.png
tags: [RP2040, timer, alarm, Raspberry Pi Pico, embedded systems]
---

在這篇文章中,我將為大家詳細講解如何在 RP2040 中使用計時器（Timer）和鬧鐘（Alarm）功能。我們將通過一個具體的代碼示例,深入了解計時器和鬧鐘的工作原理,以及如何在程序中靈活運用它們。無論是需要執行定時任務,還是希望在其他程序中使用計時器功能,這篇文章都將為你提供實用的指導。

## 計時器和鬧鐘的基本概念

在 RP2040 中,計時器和鬧鐘是兩個相關但又有所區別的概念。

- 計時器（Timer）: 計時器是一種用於測量時間間隔的硬體設備。在 RP2040 中,我們可以使用計時器來實現精確的時間控制和定時操作。計時器可以被配置為在特定時間間隔後觸發中斷,以執行相應的操作。

- 鬧鐘（Alarm）: 鬧鐘是基於計時器的一種功能擴展。它允許我們在指定的時間點觸發一次性的操作。鬧鐘通常用於在未來的某個時間點執行特定的任務,例如在延遲一段時間後執行某個函數。

## 代碼示例

讓我們通過一個具體的代碼示例來說明如何在 RP2040 中使用計時器和鬧鐘功能:

```c
#include <stdio.h>
#include "pico/stdlib.h"

volatile bool timer_fired = false;

int64_t alarm_callback(alarm_id_t id, void *user_data) {
    printf("Timer %d fired!\n", (int) id);
    timer_fired = true;
    return 0;
}

bool repeating_timer_callback(struct repeating_timer *t) {
    printf("Repeat at %lld\n", time_us_64());
    return true;
}

int main() {
    stdio_init_all();
    printf("Hello Timer!\n");

    // 在 2 秒後調用 alarm_callback
    add_alarm_in_ms(2000, alarm_callback, NULL, false);

    // 等待 alarm_callback 設置 timer_fired
    while (!timer_fired) {
        tight_loop_contents();
    }

    // 創建一個重複計時器,調用 repeating_timer_callback
    struct repeating_timer timer;
    add_repeating_timer_ms(500, repeating_timer_callback, NULL, &timer);
    sleep_ms(3000);

    bool cancelled = cancel_repeating_timer(&timer);
    printf("cancelled... %d\n", cancelled);
    sleep_ms(2000);

    // 使用負延遲,在上一次調用結束後 500ms 調用 repeating_timer_callback
    add_repeating_timer_ms(-500, repeating_timer_callback, NULL, &timer);
    sleep_ms(3000);

    cancelled = cancel_repeating_timer(&timer);
    printf("cancelled... %d\n", cancelled);
    sleep_ms(2000);

    printf("Done\n");
    return 0;
}
```

讓我們逐步分析代碼的各個部分:

### 初始化和鬧鐘回調函數

```c
volatile bool timer_fired = false;

int64_t alarm_callback(alarm_id_t id, void *user_data) {
    printf("Timer %d fired!\n", (int) id);
    timer_fired = true;
    return 0;
}
```

- 我們定義了一個全局變量 `timer_fired`,用於標記計時器是否已經觸發。
- `alarm_callback` 是鬧鐘的回調函數,當鬧鐘觸發時會調用此函數。
- 在回調函數中,我們輸出一條消息,表示計時器已經觸發,並將 `timer_fired` 設置為 `true`。
- 回調函數返回 `0`,表示不需要重複觸發此鬧鐘。

### 重複計時器回調函數

```c
bool repeating_timer_callback(struct repeating_timer *t) {
    printf("Repeat at %lld\n", time_us_64());
    return true;
}
```

- `repeating_timer_callback` 是重複計時器的回調函數,當重複計時器觸發時會調用此函數。
- 在回調函數中,我們輸出當前的時間戳,表示重複計時器已經觸發。
- 回調函數返回 `true`,表示需要繼續觸發此重複計時器。

### 使用鬧鐘（Alarm）

```c
int main() {
    // ...

    // 在 2 秒後調用 alarm_callback
    add_alarm_in_ms(2000, alarm_callback, NULL, false);

    // 等待 alarm_callback 設置 timer_fired
    while (!timer_fired) {
        tight_loop_contents();
    }

    // ...
}
```

- 在 `main` 函數中,我們使用 `add_alarm_in_ms` 函數創建了一個鬧鐘,設置在 2 秒後調用 `alarm_callback` 函數。
- `add_alarm_in_ms` 函數的參數包括延遲時間（以毫秒為單位）、回調函數、用戶數據（這裡設為 NULL）以及是否重複觸發的標誌。
- 創建鬧鐘後,我們使用一個 while 循環等待 `timer_fired` 變量變為 `true`,表示鬧鐘已經觸發。
- `tight_loop_contents()` 函數用於在等待期間避免編譯器優化掉空循環。

### 使用重複計時器（Repeating Timer）

```c
int main() {
    // ...

    // 創建一個重複計時器,調用 repeating_timer_callback
    struct repeating_timer timer;
    add_repeating_timer_ms(500, repeating_timer_callback, NULL, &timer);
    sleep_ms(3000);

    bool cancelled = cancel_repeating_timer(&timer);
    printf("cancelled... %d\n", cancelled);
    sleep_ms(2000);

    // 使用負延遲,在上一次調用結束後 500ms 調用 repeating_timer_callback
    add_repeating_timer_ms(-500, repeating_timer_callback, NULL, &timer);
    sleep_ms(3000);

    cancelled = cancel_repeating_timer(&timer);
    printf("cancelled... %d\n", cancelled);
    sleep_ms(2000);

    // ...
}
```

- 接下來,我們使用 `add_repeating_timer_ms` 函數創建了一個重複計時器,設置每隔 500 毫秒調用一次 `repeating_timer_callback` 函數。
- `add_repeating_timer_ms` 函數的參數包括延遲時間（以毫秒為單位）、回調函數、用戶數據（這裡設為 NULL）以及一個指向 `repeating_timer` 結構體的指針。
- 創建重複計時器後,我們使用 `sleep_ms` 函數等待 3 秒鐘,期間重複計時器會持續觸發。
- 然後,我們使用 `cancel_repeating_timer` 函數取消重複計時器,並輸出取消的結果。我們再次等待 2 秒鐘,觀察重複計時器是否已經停止觸發。
- 接下來,我們再次創建了一個重複計時器,但這次使用了負的延遲時間 `-500`。這意味著重複計時器會在上一次調用結束後 500 毫秒再次觸發,而不管回調函數的執行時間。我們等待 3 秒鐘,觀察重複計時器的行為。
- 最後,我們再次取消重複計時器,等待 2 秒鐘,並輸出 "Done" 表示程序執行完畢。

## 在其他程序中使用計時器

如果你想在其他程序中使用計時器功能,可以將計時器的創建和管理封裝到單獨的函數或模塊中。這樣,你就可以在不同的程序中方便地調用這些函數,實現計時器的重用。

以下是一個簡單的示例,展示了如何將計時器功能封裝到單獨的函數中:

```c
#include <stdio.h>
#include "pico/stdlib.h"

void timer_callback(void) {
    printf("Timer triggered!\n");
    // 執行定時任務
    // ...
}

void start_timer(uint32_t delay_ms) {
    struct repeating_timer timer;
    add_repeating_timer_ms(delay_ms, timer_callback, NULL, &timer);
}

int main() {
    stdio_init_all();
    
    // 啟動定時器,每秒觸發一次
    start_timer(1000);
    
    // 執行其他任務
    // ...
    
    return 0;
}
```

在上面的示例中,我們定義了一個 `timer_callback` 函數,作為計時器的回調函數。然後,我們創建了一個 `start_timer` 函數,用於啟動計時器。在 `main` 函數中,我們調用 `start_timer` 函數,設置計時器每秒觸發一次,然後執行其他任務。

通過這種方式,你可以將計時器功能與其他程序解耦,使得程序的結構更加清晰,且便於維護和擴展。

## 計時器的參數和配置

在使用計時器和鬧鐘時，你可以根據需要配置各種參數，以滿足不同的需求。以下是一些常用的參數和配置選項：

- **延遲時間（Delay）**：
  指定計時器觸發的延遲時間，可以是毫秒（ms）或微秒（us）。你可以根據需要選擇合適的時間單位和值。

- **回調函數（Callback）**：
  指定計時器觸發時要執行的函數。你可以根據實際需求編寫自定義的回調函數，執行所需的操作。

- **用戶數據（User Data）**：
  可以將自定義的數據傳遞給回調函數，以便在回調函數中使用。這可以是指針、結構體或其他類型的數據。

- **重複觸發（Repeat）**：
  指定計時器是否需要重複觸發。對於一次性的計時器，可以將重複觸發設置為 `false`；對於重複觸發的計時器，可以將其設置為 `true`。

- **精度（Precision）**：
  計時器的精度取決於硬體和軟體的實現。RP2040 提供了高精度的計時器，可以達到微秒級別的精度。但是，實際的精度還取決於系統的時鐘頻率和中斷處理的延遲。

## 總結

在本文中,我們深入探討了如何在 RP2040 中使用計時器和鬧鐘功能。通過詳細的代碼示例和解釋,你應該對計時器和鬧鐘的工作原理有了更全面的理解。

我們討論了計時器和鬧鐘的基本概念,並展示了如何創建和使用它們。無論是一次性的鬧鐘還是重複觸發的計時器,你都可以根據需求靈活地配置和使用它們。

此外,我們還探討了如何在其他程序中使用計時器功能,通過將計時器封裝到單獨的函數或模塊中,使其更加通用和可重用。

最後,我們介紹了計時器的一些常用參數和配置選項,幫助你根據實際需求進行靈活的設置。

希望這篇文章能夠幫助你更好地理解和應用 RP2040 中的計時器和鬧鐘功能,為你的嵌入式開發項目提供有力的支持。如果你有任何問題或建議,歡迎在評論區留言討論。

