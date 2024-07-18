


source ~/zephyrproject/.venv/bin/activate
cd ~/zephyrproject
west zephyr-export
cd ~/zephyrproject/zephyr


Sysbuild
The sysbuild makes possible to build and flash all necessary images needed to bootstrap the board with the ESP32 SoC.

To build the sample application using sysbuild use the command:

west build -b esp_wrover_kit --sysbuild samples/hello_world

build/
├── hello_world
│   └── zephyr
│       ├── zephyr.elf
│       └── zephyr.bin
├── mcuboot
│    └── zephyr
│       ├── zephyr.elf
│       └── zephyr.bin
└── domains.yaml

Note

With --sysbuild option the bootloader will be re-build and re-flash every time the pristine build is used.

Manual build

west build -b esp32_devkitc_wroom/esp32/procpu samples/hello_world

FLASH

west flash
west espressif monitor

## CUS

1. 在当前目录下创建一个新的工程文件夹,例如 `my_zephyr_project`:

   ```
   mkdir my_zephyr_project
   cd my_zephyr_project
   ```

2. 使用 `west init` 命令初始化工程:

   ```
    west init
   ```

   这将在当前目录下创建一个新的 Zephyr 工程,并将其链接到之前安装的 Zephyr 源代码。

3. 使用 `west update` 命令更新工程:

   ```
   west update
   west zephyr-export
   ```

   这将从 Zephyr 源代码中获取所需的模块和工具。

4. 创建一个新的应用程序目录,例如 `my_app`:

   ```
   mkdir my_app
   cd my_app
   ```

5. 在 `my_app` 目录下创建以下文件:

   - `CMakeLists.txt`: CMake 构建脚本
   - `prj.conf`: Zephyr 配置文件
   - `src/main.c`: 应用程序的主源文件

   以下是这些文件的基本内容:

   `CMakeLists.txt`:
   ```cmake
   cmake_minimum_required(VERSION 3.20.0)
   find_package(Zephyr REQUIRED HINTS $ENV{ZEPHYR_BASE})
   project(my_app)

   target_sources(app PRIVATE src/main.c)
   ```

   `prj.conf`:
   ```
   CONFIG_GPIO=y
   ```

   `src/main.c`:
   ```c
   #include <zephyr/kernel.h>
   #include <zephyr/drivers/gpio.h>

   void main(void)
   {
       printk("Hello, Zephyr!\n");
   }
   ```

6. 返回到工程根目录,使用 `west build` 命令构建应用程序:

   ```
   cd ..
   west build -b esp32_devkitc_wroom/esp32/procpu my_app
   ```

   这将在 `build/` 目录下生成应用程序的二进制文件。

7. 使用 `west flash` 命令将应用程序烧录到开发板:

   ```
   west flash
   ```

8. 使用 `west espressif monitor` 命令监视开发板的串口输出:

   ```
   west espressif monitor
   ```

west zephyr-export

修改代码后 

```bash
# west build -b esp_wrover_kit --sysbuild my_app
# 與 overlay 匹配
west build -b esp32_devkitc_wroom/esp32/procpu my_app 
west flash
west espressif monitor
```

-- my_app
-- my_app -- boards 
-- my_app -- boards -- esp32_devkitc_wroom_procpu.overlay
-- my_app -- src   
-- my_app -- src    -- main.c
-- my_app -- CMakeLists.txt
-- my_app -- prj.conf

使用 任意引脚调制 PWM 

```txt title="prj.conf"
CONFIG_STDOUT_CONSOLE=y
CONFIG_PRINTK=y
CONFIG_PWM=y
CONFIG_LOG=y
CONFIG_LOG_PRINTK=y
CONFIG_LOG_MODE_IMMEDIATE=y
CONFIG_PWM_LOG_LEVEL_DBG=y
```

```c title="CMakeLists.txt"

cmake_minimum_required(VERSION 3.20.0)
find_package(Zephyr REQUIRED HINTS $ENV{ZEPHYR_BASE})
project(blinky_pwm)

target_sources(app PRIVATE src/main.c)

```

### 单路PWM
```c++ title="single_pwm"
// src/main.c
#include <zephyr/kernel.h>
#include <zephyr/sys/printk.h>
#include <zephyr/device.h>
#include <zephyr/drivers/pwm.h>
#include <stdlib.h>

static const struct pwm_dt_spec pwm_led0 = PWM_DT_SPEC_GET(DT_ALIAS(pwm_led0));

// 定义可能的频率和占空比
#define FREQ_COUNT 5
#define DUTY_COUNT 5

const uint32_t frequencies[FREQ_COUNT] = {10000, 5000, 1000, 100, 10}; // Hz
const uint8_t duty_cycles[DUTY_COUNT] = {10, 25, 30, 50, 80}; // %

int main(void)
{
    int ret;
    uint32_t current_freq;
    uint8_t current_duty;
    uint32_t period_ns;
    uint32_t pulse_ns;

    printk("PWM output with varying frequency and duty cycle\n");

    if (!device_is_ready(pwm_led0.dev)) {
        printk("Error: PWM device %s is not ready\n", pwm_led0.dev->name);
        return 0;
    }

    printk("Configuring PWM on channel %d...\n", pwm_led0.channel);

    while (1) {
        // 随机选择频率和占空比
        current_freq = frequencies[rand() % FREQ_COUNT];
        current_duty = duty_cycles[rand() % DUTY_COUNT];

        // 计算周期和脉冲宽度（纳秒）
        period_ns = NSEC_PER_SEC / current_freq;
        pulse_ns = period_ns * current_duty / 100;

        ret = pwm_set_dt(&pwm_led0, period_ns, pulse_ns);
        if (ret) {
            printk("Error %d: failed to set pulse width\n", ret);
            return 0;
        }

        printk("PWM set to %d Hz with %d%% duty cycle\n", current_freq, current_duty);

        // 等待5秒后更改设置
        k_sleep(K_SECONDS(5));
    }

    return 0;
}
```

```bash
#include <zephyr/dt-bindings/pwm/pwm.h>

/ {
	aliases {
		pwm-0 = &ledc0;
		pwm-led0 = &pwm_led_blue;
	};

	pwmleds {
		compatible = "pwm-leds";
		pwm_led_blue: pwm_led_gpio23 {
			label = "PWM LED0";
			pwms = <&ledc0 0 1000 PWM_POLARITY_NORMAL>;
		};
	};
};

&pinctrl {
	ledc0_default: ledc0_default {
		group1 {
			pinmux = <LEDC_CH0_GPIO23>;
			output-enable;
		};
	};
};

&ledc0 {
	pinctrl-0 = <&ledc0_default>;
	pinctrl-names = "default";
	status = "okay";
	#address-cells = <1>;
	#size-cells = <0>;
	channel0@0 {
		reg = <0x0>;
		timer = <0>;
	};
};
```


### 多路PWM

```c++ title="mult_pwm"
// src/main.c
#include <zephyr/kernel.h>
#include <zephyr/sys/printk.h>
#include <zephyr/device.h>
#include <zephyr/drivers/pwm.h>
#include <stdlib.h>

static const struct pwm_dt_spec pwm_led0 = PWM_DT_SPEC_GET(DT_ALIAS(pwm_led0));
static const struct pwm_dt_spec pwm_led1 = PWM_DT_SPEC_GET(DT_ALIAS(pwm_led1));

#define FREQ_COUNT 5
#define DUTY_COUNT 5

const uint32_t frequencies[FREQ_COUNT] = {10000, 5000, 1000, 100, 10}; // Hz
const uint8_t duty_cycles[DUTY_COUNT] = {10, 25, 30, 50, 80}; // %

void set_pwm(const struct pwm_dt_spec *pwm, uint32_t freq, uint8_t duty)
{
    uint32_t period_ns = NSEC_PER_SEC / freq;
    uint32_t pulse_ns = period_ns * duty / 100;

    int ret = pwm_set_dt(pwm, period_ns, pulse_ns);
    if (ret) {
        printk("Error %d: failed to set pulse width for %s\n", ret, pwm->dev->name);
    } else {
        printk("PWM set for %s: %d Hz with %d%% duty cycle\n", pwm->dev->name, freq, duty);
    }
}

int main(void)
{
    printk("PWM output with varying frequency and duty cycle on two channels\n");

    if (!device_is_ready(pwm_led0.dev) || !device_is_ready(pwm_led1.dev)) {
        printk("Error: PWM device(s) not ready\n");
        return 0;
    }

    printk("Configuring PWM on channels %d and %d...\n", pwm_led0.channel, pwm_led1.channel);

    while (1) {
        uint32_t freq0 = frequencies[rand() % FREQ_COUNT];
        uint8_t duty0 = duty_cycles[rand() % DUTY_COUNT];
        uint32_t freq1 = frequencies[rand() % FREQ_COUNT];
        uint8_t duty1 = duty_cycles[rand() % DUTY_COUNT];

        set_pwm(&pwm_led0, freq0, duty0);
        set_pwm(&pwm_led1, freq1, duty1);

        k_sleep(K_SECONDS(5));
    }

    return 0;
}
```

```bash
#include <zephyr/dt-bindings/pwm/pwm.h>

/ {
    aliases {
        pwm-0 = &ledc0;
        pwm-led0 = &pwm_led_gpio23;
        pwm-led1 = &pwm_led_gpio22;
    };

    pwmleds {
        compatible = "pwm-leds";
        pwm_led_gpio23: pwm_led_gpio23 {
            label = "PWM LED0";
            pwms = <&ledc0 0 1000 PWM_POLARITY_NORMAL>;
        };
        pwm_led_gpio22: pwm_led_gpio22 {
            label = "PWM LED1";
            pwms = <&ledc0 1 1000 PWM_POLARITY_NORMAL>;
        };
    };
};

&pinctrl {
    ledc0_default: ledc0_default {
        group1 {
            pinmux = <LEDC_CH0_GPIO23>, <LEDC_CH1_GPIO22>;
            output-enable;
        };
    };
};

&ledc0 {
    pinctrl-0 = <&ledc0_default>;
    pinctrl-names = "default";
    status = "okay";
    #address-cells = <1>;
    #size-cells = <0>;
    channel0@0 {
        reg = <0x0>;
        timer = <0>;
    };
    channel1@1 {
        reg = <0x1>;
        timer = <1>;
    };
};
```