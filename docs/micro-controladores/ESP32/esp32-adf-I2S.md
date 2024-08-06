# ESP-ADF 音频框架: I2S Stream

## 简介

在 ESP-ADF (Espressif Audio Development Framework) 中,audio streams 负责获取音频数据,处理后将数据发送出去。这些处理音频的元素被称为音频流(audio stream)。本文将详细介绍 I2S Stream 的使用方法和配置选项。

## I2S Stream 文件位置

I2S Stream 的相关文件位于:

- `/esp-adf/components/audio_stream/i2s_stream.c`
- `/esp-adf/components/audio_stream/include/i2s_stream.h`

## I2S Stream 初始化

### 初始化函数

```c
audio_element_handle_t i2s_stream_init(i2s_stream_cfg_t *config);
```

此函数用于创建音频元素的句柄,用于在 I2S 流和其他元素之间传输数据。根据流类型的配置(`AUDIO_STREAM_READER` 或 `AUDIO_STREAM_WRITER`),可以从 I2S 读取数据或向 I2S 写入数据。

> **注意**: 如果通过内置 DAC 模式启用了 I2S 流,请不要使用 `I2S_NUM_1`。当前 ESP32 芯片仅在 I2S0 上支持内置 DAC 功能。

### 初始化函数使用示例

```c
// 初始化默认配置
i2s_stream_cfg_t i2s_cfg = I2S_STREAM_CFG_DEFAULT();

// 修改配置中的选项
i2s_cfg.type = AUDIO_STREAM_WRITER; // I2S 流为写入模式
i2s_cfg.multi_out_num = 1; // 多通道输出(同时输出两个音频流)
i2s_cfg.task_core = 1; // I2S stream 运行的内核 (ESP32 有两个 core: core0, core1)

// 初始化 I2S stream, 返回 audio_element_handle_t 指针
i2s_stream_writer = i2s_stream_init(&i2s_cfg);
```

## I2S Stream 操作函数

### 设置 I2S 数据流的时钟

```c
esp_err_t i2s_stream_set_clk(audio_element_handle_t i2s_stream, int rate, int bits, int ch);
```

此函数用于设置 I2S 流的时钟。参数包括:

- `i2s_stream`: I2S 元素句柄
- `rate`: 时钟频率(Hz)
- `bits`: 音频位宽 (8, 16, 24, 32)
- `ch`: 音频通道数 (1: 单声道, 2: 立体声)

### 设置 I2S 流的音量

```c
esp_err_t i2s_alc_volume_set(audio_element_handle_t i2s_stream, int volume);
```

使用 ALC 设置流的音量。

### 获取 I2S 流当前的音量

```c
esp_err_t i2s_alc_volume_get(audio_element_handle_t i2s_stream, int* volume);
```

获取 I2S 流当前的音量值。

## I2S Stream 配置结构体

```c
typedef struct {
    audio_stream_type_t     type;            // 流类型: AUDIO_STREAM_READER 或 AUDIO_STREAM_WRITER
    i2s_config_t            i2s_config;      // I2S 配置,主要配置 I2S 硬件接口的相关信息
    i2s_port_t              i2s_port;        // I2S 端口号 (0 或 1)
    bool                    use_alc;         // 是否使用 ALC
    int                     volume;          // 设定输入音频数据的默认音量
    int                     out_rb_size;     // 输出环形缓冲区的大小
    int                     task_stack;      // 任务堆栈大小
    int                     task_core;       // 任务运行的内核 (0 或 1)
    int                     task_prio;       // 任务优先级
    int                     multi_out_num;   // 输出倍数,如果=1 表示同时可以输出 2 个音频流
    bool                    uninstall_drv;   // 当流销毁时是否卸载 I2S 驱动程序
} i2s_stream_cfg_t;
```

## 默认配置

```c
#define I2S_STREAM_CFG_DEFAULT() {                                              \
    .type = AUDIO_STREAM_WRITER,                                                \
    .task_prio = I2S_STREAM_TASK_PRIO,                                          \
    .task_core = I2S_STREAM_TASK_CORE,                                          \
    .task_stack = I2S_STREAM_TASK_STACK,                                        \
    .out_rb_size = I2S_STREAM_RINGBUFFER_SIZE,                                  \
    .i2s_config = {                                                             \
        .mode = I2S_MODE_MASTER | I2S_MODE_TX | I2S_MODE_RX,                    \
        .sample_rate = 44100,                                                   \
        .bits_per_sample = 16,                                                  \
        .channel_format = I2S_CHANNEL_FMT_RIGHT_LEFT,                           \
        .communication_format = I2S_COMM_FORMAT_I2S,                            \
        .dma_buf_count = 3,                                                     \
        .dma_buf_len = 300,                                                     \
        .use_apll = 1,                                                          \
        .intr_alloc_flags = ESP_INTR_FLAG_LEVEL2,                               \
        .tx_desc_auto_clear = true,                                             \
    },                                                                          \
    .i2s_port = 0,                                                              \
    .use_alc = false,                                                           \
    .volume = 0,                                                                \
    .multi_out_num = 0,                                                         \
    .uninstall_drv = true,                                                      \
}
```

## 注意事项

1. ESP-ADF 对 I2S stream 的操作主要涉及时钟和音量设置。
2. 除了音量外,其他配置只能在初始化阶段设置,不支持实时修改。
3. 使用内置 DAC 模式时,只能使用 I2S0。

## 结语

通过合理配置和使用 I2S Stream,我们可以实现高效的音频数据传输和处理。在实际应用中,需要根据具体需求调整配置参数,以获得最佳的音频性能。
