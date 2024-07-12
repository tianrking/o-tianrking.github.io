---
slug: rp2040-pwm-usage-and-examples
title: Detailed Explanation of PWM Usage and Examples in RP2040
authors:
  - name: w0x7ce
    title: Embedded Systems Engineer
    url: https://github.com/tianrking
    image_url: https://github.com/tianrking.png
tags: [RP2040, PWM, Raspberry Pi Pico, Embedded Systems]
---

在這篇文章中,我將為大家詳細講解如何在 RP2040 中使用 PWM（Pulse Width Modulation,脈衝寬度調製）功能。我們將通過三個具體的程序示例,深入了解 PWM 的工作原理,以及如何在 RP2040 中配置和使用 PWM。無論你是想要輸出 PWM 信號、控制 LED 亮度,還是測量 PWM 信號的佔空比,這篇文章都將為你提供詳盡的指導。

## PWM 基礎知識

PWM 是一種常用的數位信號處理技術,通過改變脈衝的寬度來調製信號的平均值。在 RP2040 中,PWM 功能由專門的硬體模組提供,可以生成 PWM 信號並控制其參數,如頻率、佔空比等。

PWM 信號由一系列脈衝組成,每個脈衝的寬度決定了信號的佔空比。佔空比是指脈衝的高電平時間與整個週期的比值,通常以百分比表示。通過改變 PWM 信號的佔空比,我們可以調節輸出的平均電壓,從而實現對連接設備的控制。

RP2040 的 PWM 模組提供了多個 PWM 通道,每個通道都可以獨立配置和控制。這使得我們可以同時輸出多個 PWM 信號,並對它們進行精確的控制。

好的,以下是新增的開頭段落,詳細介紹了 PWM 的各種配置模式、作用以及如何設置:

## PWM 的配置模式及設置

在 RP2040 中,PWM 模組提供了多種配置模式,可以根據不同的應用需求進行設置。每種模式都有其特定的作用和配置方法。下面我們來詳細介紹一下這些模式:

### 自由運行模式（Free-running mode）

自由運行模式是 PWM 的默認模式。在這種模式下,PWM 計數器會不斷地從 0 計數到設定的最大值（通過 `pwm_config_set_wrap` 函數設置）,然後再從 0 開始重複計數。當計數器的值與比較器的值相等時,PWM 輸出會根據設置的電平（高電平或低電平）進行切換。 

适用场景：用於普通的PWM輸出，例如LED亮度調節、電機速度控制等，需要定期的周期性PWM信号。

要將 PWM 配置為自由運行模式,可以使用以下代碼:

```c
pwm_config config = pwm_get_default_config();
pwm_config_set_wrap(&config, 65535);
pwm_init(slice_num, &config, true);
```

在上面的代碼中,我們首先使用 `pwm_get_default_config` 函數獲取 PWM 的默認配置,然後使用 `pwm_config_set_wrap` 函數設置 PWM 計數器的最大值為 65535。最後,使用 `pwm_init` 函數初始化 PWM 切片,並將配置應用到切片上。

### 計數模式（Counter mode）

在計數模式下,PWM 計數器會根據外部輸入的脈衝信號進行計數。這種模式通常用於測量外部信號的頻率或脈衝寬度。
適用場景：用於測量外部脈衝信號的頻率或脈衝寬度，通常與外部輸入信號同步計數。
要將 PWM 配置為計數模式,可以使用以下代碼:

```c
pwm_config config = pwm_get_default_config();
pwm_config_set_clkdiv_mode(&config, PWM_DIV_B_RISING);
pwm_init(slice_num, &config, false);
```

在上面的代碼中,我們使用 `pwm_config_set_clkdiv_mode` 函數將 PWM 的時鐘分頻模式設置為 `PWM_DIV_B_RISING`,表示在輸入信號的上升沿進行計數。然後,使用 `pwm_init` 函數初始化 PWM 切片,並將配置應用到切片上。

### 相位校正模式（Phase-correct mode）

相位校正模式是一種特殊的 PWM 模式,它可以產生對稱的 PWM 信號,並減少輸出信號的諧波失真。在這種模式下,PWM 計數器在達到最大值後會向下計數,而不是直接重置為 0。
适用场景：產生對稱的PWM信号，減少輸出信號的諧波失真，適合對PWM信號質量要求較高的應用。
要將 PWM 配置為相位校正模式,可以使用以下代碼:

```c
pwm_config config = pwm_get_default_config();
pwm_config_set_phase_correct(&config, true);
pwm_init(slice_num, &config, true);
```

在上面的代碼中,我們使用 `pwm_config_set_phase_correct` 函數將 PWM 配置為相位校正模式,然後使用 `pwm_init` 函數初始化 PWM 切片,並將配置應用到切片上。

### 設置 PWM 頻率和佔空比

無論使用哪種 PWM 模式,我們都需要設置 PWM 信號的頻率和佔空比。PWM 頻率決定了 PWM 信號的週期,而佔空比決定了 PWM 信號在一個週期內高電平的時間比例。

要設置 PWM 頻率,我們需要配置 PWM 的時鐘分頻器和包裹值。時鐘分頻器決定了 PWM 計數器的計數速度,而包裹值決定了 PWM 計數器的最大值。PWM 頻率的計算公式如下:

```
PWM 頻率 = 系統時鐘頻率 / (時鐘分頻器 * (包裹值 + 1))
```

例如,如果系統時鐘頻率為 125 MHz,時鐘分頻器設置為 1.0（不分頻）,包裹值設置為 1249,則 PWM 頻率為:

```
PWM 頻率 = 125 MHz / (1.0 * (1249 + 1)) = 100 kHz
```

要設置 PWM 佔空比,我們需要配置 PWM 的比較器值。比較器值決定了 PWM 信號在一個週期內高電平的時間。PWM 佔空比的計算公式如下:

```
PWM 佔空比 = 比較器值 / (包裹值 + 1)
```

例如,如果包裹值設置為 1249,比較器值設置為 624,則 PWM 佔空比為:

```
PWM 佔空比 = 624 / (1249 + 1) = 0.4992 ≈ 50%
```

綜上所述,通過合理配置 PWM 的模式、頻率和佔空比,我們可以產生各種不同特性的 PWM 信號,以滿足不同的應用需求。無論是電機控制、伺服機控制還是信號檢測,都可以通過靈活配置 PWM 來實現。

## 程序示例 1: 輸出 PWM 信號

首先,讓我們來看一個簡單的程序示例,演示如何在 RP2040 上輸出 PWM 信號:

```c
#include "pico/stdlib.h"
#include "hardware/pwm.h"

int main() {
    // 將 GPIO 0 和 GPIO 1 分配給 PWM
    gpio_set_function(0, GPIO_FUNC_PWM);
    gpio_set_function(1, GPIO_FUNC_PWM);

    // 找到連接到 GPIO 0 的 PWM 切片（slice）編號
    uint slice_num = pwm_gpio_to_slice_num(0);

    // 設置 PWM 週期為 4 個循環（0 到 3）
    pwm_set_wrap(slice_num, 3);

    // 設置通道 A 在下降沿之前輸出高電平一個循環
    pwm_set_chan_level(slice_num, PWM_CHAN_A, 1);

    // 設置通道 B 在下降沿之前初始輸出高電平三個循環
    pwm_set_chan_level(slice_num, PWM_CHAN_B, 3);

    // 啟動 PWM
    pwm_set_enabled(slice_num, true);
}
```

:::note
在這個示例中,我們將 GPIO 0 和 GPIO 1 分配給 PWM 功能,並找到連接到 GPIO 0 的 PWM 切片（slice）編號。然後,我們設置 PWM 週期為 4 個循環,並配置通道 A 和通道 B 的輸出電平。最後,我們啟動 PWM,開始輸出 PWM 信號。
:::

值得注意的是,我們也可以使用 `pwm_set_gpio_level(gpio, x)` 函數,它會自動查找給定 GPIO 的正確切片和通道,並設置輸出電平。

## 程序示例 2: 使用 PWM 控制 LED 亮度

接下來,讓我們看一個更實用的例子,演示如何使用 PWM 控制 LED 的亮度:

```c
#include "pico/stdlib.h"
#include <stdio.h>
#include "pico/time.h"
#include "hardware/irq.h"
#include "hardware/pwm.h"

#ifdef PICO_DEFAULT_LED_PIN
void on_pwm_wrap() {
    static int fade = 0;
    static bool going_up = true;

    // 清除中斷標誌
    pwm_clear_irq(pwm_gpio_to_slice_num(PICO_DEFAULT_LED_PIN));

    if (going_up) {
        ++fade;
        if (fade > 255) {
            fade = 255;
            going_up = false;
        }
    } else {
        --fade;
        if (fade < 0) {
            fade = 0;
            going_up = true;
        }
    }

    // 將 fade 值平方,使 LED 的亮度看起來更加線性
    // 注意,這個範圍與 wrap 值匹配
    pwm_set_gpio_level(PICO_DEFAULT_LED_PIN, fade * fade);
}
#endif

int main() {
#ifndef PICO_DEFAULT_LED_PIN
#warning pwm/led_fade example requires a board with a regular LED
#else
    // 告訴 LED 引腳,PWM 負責控制其值
    gpio_set_function(PICO_DEFAULT_LED_PIN, GPIO_FUNC_PWM);

    // 找到連接到 LED 引腳的 PWM 切片編號
    uint slice_num = pwm_gpio_to_slice_num(PICO_DEFAULT_LED_PIN);

    // 將我們的切片的 IRQ 輸出遮罩到 PWM 塊的單個中斷線,
    // 並註冊我們的中斷處理程序
    pwm_clear_irq(slice_num);
    pwm_set_irq_enabled(slice_num, true);
    irq_set_exclusive_handler(PWM_IRQ_WRAP, on_pwm_wrap);
    irq_set_enabled(PWM_IRQ_WRAP, true);

    // 為切片配置獲取一些合理的預設值
    // 預設情況下,計數器可以在其最大範圍（0 到 2^16-1）內包裹
    pwm_config config = pwm_get_default_config();

    // 設置分頻器,將計數器時鐘減少到 sysclock/4
    pwm_config_set_clkdiv(&config, 4.f);

    // 將配置載入到我們的 PWM 切片中,並設置為運行狀態
    pwm_init(slice_num, &config, true);

    // 在這一點之後的所有操作都在 PWM 中斷處理程序中進行,
    // 所以我們可以在主迴圈中什麼也不做
    while (1)
        tight_loop_contents();
#endif
}
```

在這個示例中,我們使用 PWM 控制 LED 的亮度,實現漸變效果。程序的主要步驟如下:

1. 將 LED 引腳設置為 PWM 功能。
2. 找到連接到 LED 引腳的 PWM 切片編號。
3. 設置 PWM 中斷,註冊中斷處理程序 `on_pwm_wrap()`。
4. 配置 PWM 切片,設置分頻器和計數器範圍。
5. 啟動 PWM,並在主迴圈中等待中斷觸發。

在 `on_pwm_wrap()` 中斷處理程序中,我們通過改變 `fade` 值來控制 LED 的亮度。每次中斷觸發時,我們根據 `fade` 值的變化方向（增加或減少）來更新 LED 的亮度。為了使亮度變化看起來更加線性,我們將 `fade` 值平方後再設置給 PWM 輸出。

:::tip
使用中斷處理程序可以在不影響主程序執行的情況下實現 LED 亮度的平滑變化。這種方式非常適合需要持續更新輸出的場景。
:::

## 程序示例 3: 測量 PWM 信號的佔空比

最後,讓我們看一個示例,演示如何使用 RP2040 的 PWM 功能來測量 PWM 信號的佔空比:

```c
#include <stdio.h>
#include "pico/stdlib.h"
#include "hardware/pwm.h"
#include "hardware/clocks.h"

const uint OUTPUT_PIN = 2;
const uint MEASURE_PIN = 5;

float measure_duty_cycle(uint gpio) {
    // 只有 PWM B 引腳可以用作輸入
    assert(pwm_gpio_to_channel(gpio) == PWM_CHAN_B);

    uint slice_num = pwm_gpio_to_slice_num(gpio);

    // 每 100 個循環,PWM B 輸入為高電平時計數一次
    pwm_config cfg = pwm_get_default_config();
    pwm_config_set_clkdiv_mode(&cfg, PWM_DIV_B_HIGH);
    pwm_config_set_clkdiv(&cfg, 100);
    pwm_init(slice_num, &cfg, false);

    gpio_set_function(gpio, GPIO_FUNC_PWM);
    pwm_set_enabled(slice_num, true);
    sleep_ms(10);
    pwm_set_enabled(slice_num, false);

    float counting_rate = clock_get_hz(clk_sys) / 100;
    float max_possible_count = counting_rate * 0.01;

    return pwm_get_counter(slice_num) / max_possible_count;
}

const float test_duty_cycles[] = {
        0.f,
        0.1f,
        0.5f,
        0.9f,
        1.f
};

int main() {
    stdio_init_all();
    printf("\nPWM duty cycle measurement example\n");

    // 配置 PWM 切片並設置為運行狀態
    const uint count_top = 1000;
    pwm_config cfg = pwm_get_default_config();
    pwm_config_set_wrap(&cfg, count_top);
    pwm_init(pwm_gpio_to_slice_num(OUTPUT_PIN), &cfg, true);

    // 注意,我們還沒有觸碰另一個引腳 -- PWM 引腳預設為輸出,
    // 但一旦分頻器模式從自由運行改變,就會變為輸入。
    // 將兩個輸出直接連接在一起是不明智的!
    gpio_set_function(OUTPUT_PIN, GPIO_FUNC_PWM);

    // 對於每個測試佔空比,在輸出引腳上驅動該電平,
    // 然後使用另一個引腳讀回實際的輸出佔空比。這兩個值應該非常接近!
    for (int i = 0; i < count_of(test_duty_cycles); ++i) {
        float output_duty_cycle = test_duty_cycles[i];
        pwm_set_gpio_level(OUTPUT_PIN, (uint16_t)(output_duty_cycle * (count_top + 1)));

        float measured_duty_cycle = measure_duty_cycle(MEASURE_PIN);
        printf("Output duty cycle = %.1f%%, measured input duty cycle = %.1f%%\n",
               output_duty_cycle * 100.f, measured_duty_cycle * 100.f);
    }
}
```

在這個示例中,我們演示了如何使用 RP2040 的 PWM 功能來測量 PWM 信號的佔空比。程序的主要步驟如下:

1. 定義輸出引腳 `OUTPUT_PIN` 和測量引腳 `MEASURE_PIN`。
2. 實現 `measure_duty_cycle()` 函數,用於測量給定 GPIO 引腳上的 PWM 信號佔空比。
   - 配置 PWM 切片,設置分頻器模式為 `PWM_DIV_B_HIGH`,即每 100 個循環計數一次。
   - 啟動 PWM,等待一段時間,然後停止 PWM。
   - 計算最大可能計數值,並根據實際計數值計算佔空比。
3. 在 `main()` 函數中,配置輸出引腳的 PWM 切片,設置包裹值為 `count_top`。
4. 對於每個測試佔空比,在輸出引腳上設置相應的電平,然後使用測量引腳讀回實際的輸出佔空比。
5. 將輸出佔空比和測量佔空比打印出來,檢查它們是否接近。

:::caution
在將兩個引腳連接在一起之前,需要注意 PWM 引腳的默認狀態。PWM 引腳預設為輸出,但一旦分頻器模式從自由運行改變,就會變為輸入。將兩個輸出直接連接在一起是不明智的!
:::

通過這個示例,我們可以看到如何使用 RP2040 的 PWM 功能來精確測量 PWM 信號的佔空比。這在需要對 PWM 信號進行分析和控制的場景中非常有用。

## 單獨使用 PWM

除了上述示例中的用法,我們還可以單獨使用 PWM 來控制各種設備,如直流電機、步進電機、伺服機等。下面我們將詳細介紹如何使用 PWM 來控制這些設備,以及如何使用 PWM 作為輸入捕獲來檢測輸入信號的頻率、脈寬和佔空比。

### 控制直流電機

使用 PWM 可以方便地控制直流電機的轉速。通過改變 PWM 信號的佔空比,我們可以調節輸出到電機的平均電壓,從而控制電機的轉速。以下是一個使用 PWM 控制直流電機的示例:

```c
#include "pico/stdlib.h"
#include "hardware/pwm.h"

const uint MOTOR_PIN = 2;

int main() {
    // 將電機引腳設置為 PWM 功能
    gpio_set_function(MOTOR_PIN, GPIO_FUNC_PWM);

    // 獲取 PWM 切片編號和通道
    uint slice_num = pwm_gpio_to_slice_num(MOTOR_PIN);
    uint channel = pwm_gpio_to_channel(MOTOR_PIN);

    // 配置 PWM 切片
    pwm_config config = pwm_get_default_config();
    pwm_config_set_wrap(&config, 65535);
    pwm_init(slice_num, &config, true);

    while (1) {
        // 設置佔空比,控制電機轉速
        pwm_set_chan_level(slice_num, channel, 32768); // 50% 佔空比
        sleep_ms(2000);
        pwm_set_chan_level(slice_num, channel, 16384); // 25% 佔空比
        sleep_ms(2000);
        pwm_set_chan_level(slice_num, channel, 49152); // 75% 佔空比
        sleep_ms(2000);
    }
}
```

在這個示例中,我們將電機連接到 GPIO2 引腳,並將其設置為 PWM 功能。然後,我們配置 PWM 切片,設置包裹值為 65535,以獲得更高的解析度。在主迴圈中,我們通過設置不同的佔空比來控制電機轉速。佔空比的取值範圍為 0 到 65535,分別對應 0% 到 100% 的佔空比。

:::tip
根據電機的規格和電源電壓,你可能需要使用 H 橋或電機驅動器來安全地驅動電機。PWM 信號可以用來控制 H 橋或電機驅動器的輸入,從而調節電機轉速。
:::

### 控制步進電機

步進電機是一種常用的精密定位設備,可以通過控制脈衝信號來實現精確的角度控制。使用 PWM,我們可以生成控制步進電機所需的脈衝信號。以下是一個使用 PWM 控制步進電機的示例:

```c
#include "pico/stdlib.h"
#include "hardware/pwm.h"

const uint STEP_PIN = 2;
const uint DIR_PIN = 3;

int main() {
    // 將步進引腳和方向引腳設置為 PWM 功能
    gpio_set_function(STEP_PIN, GPIO_FUNC_PWM);
    gpio_set_function(DIR_PIN, GPIO_FUNC_PWM);

    // 獲取 PWM 切片編號和通道
    uint slice_num_step = pwm_gpio_to_slice_num(STEP_PIN);
    uint channel_step = pwm_gpio_to_channel(STEP_PIN);
    uint slice_num_dir = pwm_gpio_to_slice_num(DIR_PIN);
    uint channel_dir = pwm_gpio_to_channel(DIR_PIN);

    // 配置 PWM 切片
    pwm_config config = pwm_get_default_config();
    pwm_config_set_wrap(&config, 65535);
    pwm_init(slice_num_step, &config, true);
    pwm_init(slice_num_dir, &config, true);

    // 設置方向為正向
    pwm_set_chan_level(slice_num_dir, channel_dir, 0);

    while (1) {
        // 生成步進脈衝
        for (int i = 0; i < 200; i++) {
            pwm_set_chan_level(slice_num_step, channel_step, 32768);
            sleep_us(500);
            pwm_set_chan_level(slice_num_step, channel_step, 0);
            sleep_us(500);
        }
        sleep_ms(1000);

        // 改變方向為反向
        pwm_set_chan_level(slice_num_dir, channel_dir, 65535);

        // 生成步進脈衝
        for (int i = 0; i < 200; i++) {
            pwm_set_chan_level(slice_num_step, channel_step, 32768);
            sleep_us(500);
            pwm_set_chan_level(slice_num_step, channel_step, 0);
            sleep_us(500);
        }
        sleep_ms(1000);
    }
}
```

在這個示例中,我們使用兩個 PWM 通道來控制步進電機。一個通道用於生成步進脈衝,另一個通道用於控制步進電機的方向。我們通過設置脈衝的佔空比和頻率來生成所需的步進脈衝,並通過改變方向通道的電平來控制步進電機的旋轉方向。

:::note
步進電機通常需要較高的電流驅動,因此建議使用專用的步進電機驅動器來控制步進電機。PWM 信號可以作為步進電機驅動器的輸入,用於控制步進脈衝和方向。
:::

好的,我會根據您的要求,進一步優化這部分內容,並善用 Markdown 和 Docusaurus 的特性,使目錄更加清晰。以下是優化後的內容:

#### 詳解步進電機控制程式碼

讓我們來詳細講解上述控制步進電機的程式碼,並解釋其中涉及的參數和設置。

##### 定義步進引腳和方向引腳

```c
const uint STEP_PIN = 2;
const uint DIR_PIN = 3;
```

首先,我們定義了兩個常量 `STEP_PIN` 和 `DIR_PIN`,分別表示連接步進電機的步進引腳和方向引腳。這裡我們將它們設置為 GPIO2 和 GPIO3。

##### 設置引腳功能為 PWM

```c
gpio_set_function(STEP_PIN, GPIO_FUNC_PWM);
gpio_set_function(DIR_PIN, GPIO_FUNC_PWM);
```

在 `main` 函數中,我們首先使用 `gpio_set_function` 函數將步進引腳和方向引腳設置為 PWM 功能。這樣我們就可以通過 PWM 來控制這兩個引腳的輸出。

##### 獲取 PWM 切片編號和通道

```c
uint slice_num_step = pwm_gpio_to_slice_num(STEP_PIN);
uint channel_step = pwm_gpio_to_channel(STEP_PIN);
uint slice_num_dir = pwm_gpio_to_slice_num(DIR_PIN);
uint channel_dir = pwm_gpio_to_channel(DIR_PIN);
```

接下來,我們使用 `pwm_gpio_to_slice_num` 和 `pwm_gpio_to_channel` 函數獲取步進引腳和方向引腳所對應的 PWM 切片編號和通道。每個 PWM 切片可以控制兩個通道,通常標記為 A 和 B。

##### 配置 PWM 切片

```c
pwm_config config = pwm_get_default_config();
pwm_config_set_wrap(&config, 65535);
pwm_init(slice_num_step, &config, true);
pwm_init(slice_num_dir, &config, true);
```

然後,我們使用 `pwm_get_default_config` 函數獲取 PWM 的默認配置,並使用 `pwm_config_set_wrap` 函數設置 PWM 計數器的最大值為 65535。這個值決定了 PWM 的解析度,設置為 65535 可以提供較高的解析度。

接著,我們使用 `pwm_init` 函數初始化步進引腳和方向引腳所在的 PWM 切片,並將 `config` 應用到這些切片上。最後一個參數設置為 `true`,表示立即啟用 PWM 輸出。

##### 設置步進電機旋轉方向

```c
pwm_set_chan_level(slice_num_dir, channel_dir, 0);
```

在設置方向為正向時,我們使用 `pwm_set_chan_level` 函數將方向引腳的 PWM 輸出電平設置為 0。這通常表示步進電機的正向旋轉。

##### 生成步進脈衝

```c
for (int i = 0; i < 200; i++) {
    pwm_set_chan_level(slice_num_step, channel_step, 32768);
    sleep_us(500);
    pwm_set_chan_level(slice_num_step, channel_step, 0);
    sleep_us(500);
}
```

在主循環中,我們首先生成 200 個步進脈衝。每個脈衝由一個高電平和一個低電平組成,高電平持續 500 微秒,低電平持續 500 微秒。我們使用 `pwm_set_chan_level` 函數設置步進引腳的 PWM 輸出電平為 32768（50% 佔空比）來生成高電平,然後延遲 500 微秒。接著,我們將步進引腳的 PWM 輸出電平設置為 0 來生成低電平,再延遲 500 微秒。這樣就生成了一個完整的步進脈衝。

:::note
生成步進脈衝的過程可以分為以下幾個步驟:
1. 設置步進引腳的 PWM 輸出電平為高電平（50% 佔空比）。
2. 延遲一段時間（脈衝的高電平持續時間）。
3. 設置步進引腳的 PWM 輸出電平為低電平。
4. 延遲一段時間（脈衝的低電平持續時間）。
5. 重複步驟 1-4,直到生成足夠數量的步進脈衝。
:::

##### 改變步進電機旋轉方向

```c
pwm_set_chan_level(slice_num_dir, channel_dir, 65535);
```

生成完 200 個步進脈衝後,我們延遲 1 秒鐘,然後將方向引腳的 PWM 輸出電平設置為 65535,表示步進電機的反向旋轉。

接下來,我們再次生成 200 個步進脈衝,但這次步進電機將向相反方向旋轉。最後,我們再次延遲 1 秒鐘,然後重複整個過程。

##### 程式碼中的數字參數

:::note
這段程式碼中的數字參數的含義如下:
- `32768`: 表示 50% 的 PWM 佔空比。因為我們將 PWM 計數器的最大值設置為 65535,所以 32768 大約是最大值的一半,對應 50% 的佔空比。
- `500`: 表示步進脈衝的高電平和低電平持續時間,單位為微秒。這個值決定了步進電機的速度。增大這個值會降低步進電機的速度,減小這個值會提高步進電機的速度。
- `200`: 表示生成的步進脈衝數量。這個值決定了步進電機旋轉的角度。增大這個值會增加步進電機旋轉的角度,減小這個值會減小步進電機旋轉的角度。
- `65535`: 表示 PWM 計數器的最大值,也表示 100% 的 PWM 佔空比。當方向引腳的 PWM 輸出電平設置為 65535 時,表示步進電機的反向旋轉。
:::

##### 其他 PWM 配置

除了上述參數,我們還可以設置其他的 PWM 配置,例如:

- `pwm_config_set_clkdiv`: 設置 PWM 時鐘分頻器,可以改變 PWM 的頻率。增大分頻值會降低 PWM 頻率,減小分頻值會提高 PWM 頻率。
- `pwm_config_set_phase_correct`: 設置是否使用相位校正模式。在相位校正模式下,PWM 計數器在達到最大值後會向下計數,而不是直接重置為 0。這可以減少 PWM 輸出的尖峰噪聲。
- `pwm_config_set_output_polarity`: 設置 PWM 輸出的極性。可以選擇在 PWM 計數器達到比較值時輸出高電平還是低電平。

調整這些 PWM 配置可以改變 PWM 輸出的特性,從而影響步進電機的運行方式,如速度、扭矩、噪聲等。

:::caution
需要注意的是,這段程式碼只是一個基本的示例,用於演示如何使用 PWM 控制步進電機。在實際應用中,你可能需要根據具體的步進電機型號和驅動器來調整參數和設置,以獲得最佳的性能和可靠性。此外,步進電機通常需要較大的電流,因此建議使用專用的步進電機驅動器,而不是直接通過 PWM 引腳驅動。
:::

### 控制伺服機

伺服機是一種常用的位置控制設備,通過改變 PWM 信號的脈寬來控制伺服機的角度。以下是一個使用 PWM 控制伺服機的示例:

```c
#include "pico/stdlib.h"
#include "hardware/pwm.h"

const uint SERVO_PIN = 2;

int main() {
    // 將伺服機引腳設置為 PWM 功能
    gpio_set_function(SERVO_PIN, GPIO_FUNC_PWM);

    // 獲取 PWM 切片編號和通道
    uint slice_num = pwm_gpio_to_slice_num(SERVO_PIN);
    uint channel = pwm_gpio_to_channel(SERVO_PIN);

    // 配置 PWM 切片
    pwm_config config = pwm_get_default_config();
    pwm_config_set_wrap(&config, 19999);
    pwm_config_set_clkdiv(&config, 9.6f);
    pwm_init(slice_num, &config, true);

    while (1) {
        // 設置脈寬,控制伺服機角度
        pwm_set_chan_level(slice_num, channel, 1000); // 0 度
        sleep_ms(2000);
        pwm_set_chan_level(slice_num, channel, 1500); // 90 度
        sleep_ms(2000);
        pwm_set_chan_level(slice_num, channel, 2000); // 180 度
        sleep_ms(2000);
    }
}
```

在這個示例中,我們將伺服機連接到 GPIO2 引腳,並將其設置為 PWM 功能。我們配置 PWM 切片,設置包裹值為 19999,時鐘分頻器為 9.6,以獲得 50Hz 的 PWM 頻率。在主迴圈中,我們通過設置不同的脈寬來控制伺服機的角度。脈寬的典型值為 1000us（0 度）、1500us（90 度）和 2000us（180 度）,但具體值可能因伺服機型號而有所不同。

:::caution
伺服機的控制信號需要精確的脈寬和頻率,因此在配置 PWM 時需要仔細計算包裹值和時鐘分頻器,以獲得所需的脈寬和頻率。此外,伺服機通常需要單獨的電源供電,以提供足夠的電流。
:::

### 使用 PWM 作為輸入捕獲

除了用於輸出控制信號,PWM 還可以作為輸入捕獲來檢測輸入信號的頻率、脈寬和佔空比。以下是一個使用 PWM 作為輸入捕獲的示例:

```c
#include <stdio.h>
#include "pico/stdlib.h"
#include "hardware/pwm.h"
#include "hardware/clocks.h"

const uint INPUT_PIN = 2;

int main() {
    // 將輸入引腳設置為 PWM 功能
    gpio_set_function(INPUT_PIN, GPIO_FUNC_PWM);

    // 獲取 PWM 切片編號
    uint slice_num = pwm_gpio_to_slice_num(INPUT_PIN);

    // 配置 PWM 切片作為輸入捕獲模式
    pwm_config config = pwm_get_default_config();
    pwm_config_set_clkdiv_mode(&config, PWM_DIV_B_RISING);
    pwm_init(slice_num, &config, false);
    
    // 使能輸入捕獲
    pwm_set_enabled(slice_num, true);

    while (1) {
        // 等待輸入信號
        while (!(pwm_get_status(slice_num) & PWM_CH0_CSR_RCIF_BITS));

        // 讀取輸入信號的頻率、脈寬和佔空比
        uint32_t period = pwm_get_counter(slice_num);
        uint32_t pulse_width = pwm_get_compare_counter(slice_num, 0);
        float frequency = clock_get_hz(clk_sys) / period;
        float duty_cycle = (float)pulse_width / period;

        printf("Frequency: %.2f Hz, Pulse Width: %u us, Duty Cycle: %.2f%%\n", 
               frequency, pulse_width, duty_cycle * 100);

        // 清除輸入捕獲中斷標誌
        pwm_clear_irq(slice_num);
    }
}
```

在這個示例中,我們將輸入信號連接到 GPIO2 引腳,並將其設置為 PWM 功能。我們配置 PWM 切片作為輸入捕獲模式,並使能輸入捕獲。在主迴圈中,我們等待輸入信號觸發輸入捕獲中斷,然後讀取輸入信號的頻率、脈寬和佔空比。頻率可以通過時鐘頻率除以週期計數器值來計算,脈寬可以直接從捕獲比較計數器中讀取,佔空比可以通過脈寬除以週期來計算。

:::note
輸入捕獲模式下,PWM 切片會在輸入信號的上升沿或下降沿觸發輸入捕獲中斷,並記錄當前的計數器值。通過比較連續兩次捕獲的計數器值,可以計算出輸入信號的頻率、脈寬和佔空比。
:::

## 總結

在本文中,我們詳細探討了如何在 RP2040 中使用 PWM 功能。除了之前介紹的基本用法,我們還深入講解了如何使用 PWM 控制直流電機、步進電機和伺服機,以及如何使用 PWM 作為輸入捕獲來檢測輸入信號的頻率、脈寬和佔空比。

通過學習本文提供的詳細解釋和示例代碼,你應該能夠掌握 RP2040 中 PWM 的各種用法,並將其應用到自己的嵌入式項目中。無論是電機控制、伺服機控制還是信號檢測,PWM 都是一個強大而靈活的工具。

希望本文能夠幫助你更好地理解和應用 RP2040 中的 PWM 功能。如果你有任何問題或建議,歡迎在評論區留言討論。

