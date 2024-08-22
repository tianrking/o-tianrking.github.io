---
slug: esp32-idf-5.3-wifi-interfaces
title: Exploring WiFi Interfaces in ESP-IDF 5.3
authors:
  - name: w0x7ce
    title: Embedded Systems Engineer
    url: https://github.com/tianrking
    image_url: https://github.com/tianrking.png
tags: [esp32, esp-idf, wifi, networking, embedded development]
---

# ESP-IDF5.3

https://github.com/espressif/esp-idf/tree/dbce23f8a449eb436b0b574726fe6ce9a6df67cc

https://github.com/espressif/esp-idf/tree/release/v5.3

## `esp_now.h` 头文件中的所有接口,包括形参、返回值等信息:

1. **状态码定义**:
   - `ESP_ERR_ESPNOW_BASE`: ESPNOW 错误码基数
   - `ESP_ERR_ESPNOW_NOT_INIT`: ESPNOW 未初始化
   - `ESP_ERR_ESPNOW_ARG`: 参数无效
   - `ESP_ERR_ESPNOW_NO_MEM`: 内存不足
   - `ESP_ERR_ESPNOW_FULL`: ESPNOW 对等节点列表已满
   - `ESP_ERR_ESPNOW_NOT_FOUND`: 找不到 ESPNOW 对等节点
   - `ESP_ERR_ESPNOW_INTERNAL`: 内部错误
   - `ESP_ERR_ESPNOW_EXIST`: ESPNOW 对等节点已存在
   - `ESP_ERR_ESPNOW_IF`: 接口错误
   - `ESP_ERR_ESPNOW_CHAN`: 信道错误

2. **常量定义**:
   - `ESP_NOW_ETH_ALEN`: ESPNOW 对等节点 MAC 地址长度
   - `ESP_NOW_KEY_LEN`: ESPNOW 对等节点本地主密钥长度
   - `ESP_NOW_MAX_TOTAL_PEER_NUM`: ESPNOW 总对等节点最大数量
   - `ESP_NOW_MAX_ENCRYPT_PEER_NUM`: ESPNOW 加密对等节点最大数量
   - `ESP_NOW_MAX_DATA_LEN`: ESPNOW 数据最大长度

3. **数据结构定义**:
   - `esp_now_send_status_t`: ESPNOW 数据发送状态
   - `esp_now_peer_info_t`: ESPNOW 对等节点信息参数
   - `esp_now_peer_num_t`: ESPNOW 对等节点数量
   - `esp_now_recv_info_t`: ESPNOW 数据包信息
   - `esp_now_rate_config_t`: ESPNOW 数据率配置

4. **回调函数定义**:
   - `esp_now_recv_cb_t(const esp_now_recv_info_t * esp_now_info, const uint8_t *data, int data_len)`: 接收 ESPNOW 数据的回调函数
   - `esp_now_send_cb_t(const uint8_t *mac_addr, esp_now_send_status_t status)`: 发送 ESPNOW 数据的回调函数

5. **接口定义**:
   - `esp_err_t esp_now_init(void)`: 初始化 ESPNOW
   - `esp_err_t esp_now_deinit(void)`: 反初始化 ESPNOW
   - `esp_err_t esp_now_get_version(uint32_t *version)`: 获取 ESPNOW 版本
   - `esp_err_t esp_now_register_recv_cb(esp_now_recv_cb_t cb)`: 注册接收 ESPNOW 数据的回调函数
   - `esp_err_t esp_now_unregister_recv_cb(void)`: 注销接收 ESPNOW 数据的回调函数
   - `esp_err_t esp_now_register_send_cb(esp_now_send_cb_t cb)`: 注册发送 ESPNOW 数据的回调函数
   - `esp_err_t esp_now_unregister_send_cb(void)`: 注销发送 ESPNOW 数据的回调函数
   - `esp_err_t esp_now_send(const uint8_t *peer_addr, const uint8_t *data, size_t len)`: 发送 ESPNOW 数据
   - `esp_err_t esp_now_add_peer(const esp_now_peer_info_t *peer)`: 添加 ESPNOW 对等节点
   - `esp_err_t esp_now_del_peer(const uint8_t *peer_addr)`: 删除 ESPNOW 对等节点
   - `esp_err_t esp_now_mod_peer(const esp_now_peer_info_t *peer)`: 修改 ESPNOW 对等节点
   - `esp_err_t esp_wifi_config_espnow_rate(wifi_interface_t ifx, wifi_phy_rate_t rate)`: 配置 ESPNOW 数据率 (已弃用,建议使用 `esp_now_set_peer_rate_config()`)
   - `esp_err_t esp_now_set_peer_rate_config(const uint8_t *peer_addr, esp_now_rate_config_t *config)`: 设置 ESPNOW 对等节点的数据率配置
   - `esp_err_t esp_now_get_peer(const uint8_t *peer_addr, esp_now_peer_info_t *peer)`: 获取 ESPNOW 对等节点
   - `esp_err_t esp_now_fetch_peer(bool from_head, esp_now_peer_info_t *peer)`: 从对等节点列表中获取一个对等节点
   - `bool esp_now_is_peer_exist(const uint8_t *peer_addr)`: 检查 ESPNOW 对等节点是否存在
   - `esp_err_t esp_now_get_peer_num(esp_now_peer_num_t *num)`: 获取 ESPNOW 对等节点的数量
   - `esp_err_t esp_now_set_pmk(const uint8_t *pmk)`: 设置主密钥
   - `esp_err_t esp_now_set_wake_window(uint16_t window)`: 设置 ESPNOW 唤醒窗口

##  `esp_smartconfig.h` 头文件的内容:

1. **枚举定义**:
   - `smartconfig_type_t`: SmartConfig 协议类型,包括 ESPTouch、AirKiss、ESPTouch+AirKiss、ESPTouch V2
   - `smartconfig_event_t`: SmartConfig 事件类型,包括扫描完成、找到信道、获取 SSID/密码、发送 ACK 完成

2. **数据结构定义**:
   - `smartconfig_event_got_ssid_pswd_t`: SC_EVENT_GOT_SSID_PSWD 事件的参数结构体,包括 SSID、密码、BSSID、协议类型、token、手机 IP 等
   - `smartconfig_start_config_t`: esp_smartconfig_start() 的配置参数,包括是否打印日志、是否启用 ESPTouch V2 加密、ESPTouch V2 加密密钥

3. **宏定义**:
   - `SMARTCONFIG_START_CONFIG_DEFAULT()`: 提供了 `smartconfig_start_config_t` 的默认值

4. **接口定义**:
   - `const char *esp_smartconfig_get_version(void)`: 获取 SmartConfig 的版本号
   - `esp_err_t esp_smartconfig_start(const smartconfig_start_config_t *config)`: 启动 SmartConfig 过程
   - `esp_err_t esp_smartconfig_stop(void)`: 停止 SmartConfig 过程
   - `esp_err_t esp_esptouch_set_timeout(uint8_t time_s)`: 设置 SmartConfig 超时时间
   - `esp_err_t esp_smartconfig_set_type(smartconfig_type_t type)`: 设置 SmartConfig 协议类型
   - `esp_err_t esp_smartconfig_fast_mode(bool enable)`: 设置 SmartConfig 为快速模式
   - `esp_err_t esp_smartconfig_get_rvd_data(uint8_t *rvd_data, uint8_t len)`: 获取 ESPTouch V2 保留数据

总的来说,这个头文件提供了 SmartConfig 功能的各种配置和控制接口,包括启动/停止 SmartConfig、设置协议类型和超时时间、获取保留数据等,为我们使用 SmartConfig 功能提供了全面的支持。这些接口可能会在实现网络报文分析相关功能时派上用场,比如在 ESPNOW 示例中就使用了 SmartConfig 功能来连接目标 AP。

##  `esp_mesh.h` 头文件的内容:

1. **常量定义**:
   - `MESH_ROOT_LAYER`: 根节点层数
   - `MESH_MTU`: 最大传输单元
   - `MESH_MPS`: 最大负载大小
   - `ESP_ERR_MESH_*`: Mesh 错误码定义

2. **宏定义**:
   - `MESH_DATA_*`: Mesh 数据包标识位
   - `MESH_OPT_*`: Mesh 数据包选项定义
   - `MESH_ASSOC_FLAG_*`: Mesh 网络 IE 标志位

3. **枚举定义**:
   - `mesh_event_id_t`: Mesh 事件类型
   - `mesh_type_t`: 设备类型
   - `mesh_proto_t`: 传输协议类型
   - `mesh_tos_t`: 传输服务类型
   - `mesh_vote_reason_t`: 投票原因
   - `mesh_disconnect_reason_t`: 断开连接原因
   - `esp_mesh_topology_t`: Mesh 拓扑类型

4. **数据结构定义**:
   - `mip_t`: IP 地址和端口
   - `mesh_addr_t`: Mesh 地址
   - `mesh_event_*_t`: Mesh 事件数据结构
   - `mesh_opt_t`: Mesh 数据包选项
   - `mesh_data_t`: Mesh 数据包
   - `mesh_router_t`: 路由器配置
   - `mesh_ap_cfg_t`: Mesh softAP 配置
   - `mesh_cfg_t`: Mesh 初始化配置
   - `mesh_rc_config_t`: 投票地址配置
   - `mesh_vote_t`: 投票配置
   - `mesh_tx_pending_t`: 发送队列信息
   - `mesh_rx_pending_t`: 接收队列信息

5. **全局变量**:
   - `g_wifi_default_mesh_crypto_funcs`: 默认的 Mesh IE 加密回调函数
   - `MESH_INIT_CONFIG_DEFAULT()`: Mesh 初始化配置默认值

6. **接口定义**:
   - `esp_mesh_init()`: 初始化 Mesh
   - `esp_mesh_deinit()`: 反初始化 Mesh
   - `esp_mesh_start()`: 启动 Mesh
   - `esp_mesh_stop()`: 停止 Mesh
   - `esp_mesh_send()`: 发送 Mesh 数据包
   - `esp_mesh_send_block_time()`: 设置 `esp_mesh_send()` 的阻塞时间
   - `esp_mesh_recv()`: 接收 Mesh 数据包
   - `esp_mesh_recv_toDS()`: 接收目的地为外部网络的 Mesh 数据包
   - `esp_mesh_set_config()`: 设置 Mesh 配置
   - `esp_mesh_get_config()`: 获取 Mesh 配置
   - `esp_mesh_set_router()`: 设置路由器配置
   - `esp_mesh_get_router()`: 获取路由器配置
   - `esp_mesh_set_id()`: 设置 Mesh 网络 ID
   - `esp_mesh_get_id()`: 获取 Mesh 网络 ID
   - 一系列 `esp_mesh_set_*()` 和 `esp_mesh_get_*()` 函数用于配置和获取 Mesh 参数
   - `esp_mesh_waive_root()`: 要求根节点放弃根节点地位
   - `esp_mesh_set_vote_percentage()`: 设置投票百分比阈值
   - `esp_mesh_get_vote_percentage()`: 获取投票百分比阈值
   - `esp_mesh_post_toDS_state()`: 发布 toDS 状态
   - `esp_mesh_get_tx_pending()`: 获取发送队列信息
   - `esp_mesh_get_rx_pending()`: 获取接收队列信息
   - `esp_mesh_available_txupQ_num()`: 获取某个地址的发送队列容量
   - `esp_mesh_set_xon_qsize()`: 设置接收队列大小
   - `esp_mesh_get_xon_qsize()`: 获取接收队列大小
   - `esp_mesh_allow_root_conflicts()`: 允许网络中存在多个根节点
   - `esp_mesh_is_root_conflicts_allowed()`: 检查是否允许网络中存在多个根节点
   - 一系列 `esp_mesh_set_group_id()`, `esp_mesh_delete_group_id()`, `esp_mesh_get_group_num()`, `esp_mesh_get_group_list()`, `esp_mesh_is_my_group()` 用于管理组 ID
   - `esp_mesh_set_capacity_num()`: 设置 Mesh 网络容量
   - `esp_mesh_get_capacity_num()`: 获取 Mesh 网络容量
   - `esp_mesh_set_ie_crypto_funcs()`: 设置 Mesh IE 加密函数
   - `esp_mesh_set_ie_crypto_key()`: 设置 Mesh IE 加密密钥
   - `esp_mesh_get_ie_crypto_key()`: 获取 Mesh IE 加密密钥
   - `esp_mesh_set_root_healing_delay()`: 设置根节点重连延迟
   - `esp_mesh_get_root_healing_delay()`: 获取根节点重连延迟
   - `esp_mesh_fix_root()`: 固定根节点
   - `esp_mesh_is_root_fixed()`: 检查是否固定根节点
   - `esp_mesh_set_parent()`: 设置父节点
   - `esp_mesh_scan_get_ap_ie_len()`: 获取 Mesh 网络 IE 长度
   - `esp_mesh_scan_get_ap_record()`: 获取 AP 记录
   - `esp_mesh_flush_upstream_packets()`: 刷新上行数据包
   - `esp_mesh_get_subnet_nodes_num()`: 获取子网节点数量
   - `esp_mesh_get_subnet_nodes_list()`: 获取子网节点列表
   - `esp_mesh_disconnect()`: 断开连接
   - `esp_mesh_connect()`: 连接
   - `esp_mesh_flush_scan_result()`: 刷新扫描结果
   - `esp_mesh_switch_channel()`: 切换信道
   - `esp_mesh_get_router_bssid()`: 获取路由器 BSSID
   - `esp_mesh_get_tsf_time()`: 获取 TSF 时间
   - `esp_mesh_set_topology()`: 设置 Mesh 拓扑
   - `esp_mesh_get_topology()`: 获取 Mesh 拓扑
   - `esp_mesh_enable_ps()`: 启用 Mesh 节能模式
   - `esp_mesh_disable_ps()`: 禁用 Mesh 节能模式
   - `esp_mesh_is_ps_enabled()`: 检查节能模式是否启用
   - `esp_mesh_is_device_active()`: 检查设备是否处于活跃状态
   - `esp_mesh_set_active_duty_cycle()`: 设置设备工作占空比
   - `esp_mesh_get_active_duty_cycle()`: 获取设备工作占空比
   - `esp_mesh_set_network_duty_cycle()`: 设置网络工作占空比
   - `esp_mesh_get_network_duty_cycle()`: 获取网络工作占空比
   - `esp_mesh_get_running_active_duty_cycle()`: 获取当前运行的工作占空比
   - `esp_mesh_ps_duty_signaling()`: 发送工作占空比信号

总的来说,这个头文件定义了 Mesh 网络的各种配置、管理和数据传输相关的功能接口,为我们提供了一个全面的 Mesh 网络编程接口。这些接口可以为我们实现基于 Mesh 网络的网络报文分析功能提供重要的支持。

##  `esp_mesh_internal.h` 头文件定义了一些 Mesh 内部的数据结构和函数:

1. **数据结构定义**:
   - `mesh_attempts_t`: Mesh 自组织网络中的尝试次数相关参数
   - `mesh_switch_parent_t`: Mesh 切换父节点相关的参数
   - `mesh_rssi_threshold_t`: Mesh 的 RSSI 阈值
   - `mesh_assoc_t`: Mesh 网络 IE 的数据结构
   - `mesh_chain_layer_t`: Mesh 链式拓扑的层数信息
   - `mesh_chain_assoc_t`: Mesh 链式拓扑的关联信息
   - `esp_mesh_ps_duties_t`: Mesh 节能模式下的工作占空比信息

2. **接口定义**:
   - `esp_mesh_set_beacon_interval()`: 设置 Mesh softAP 的 beacon 间隔
   - `esp_mesh_get_beacon_interval()`: 获取 Mesh softAP 的 beacon 间隔
   - `esp_mesh_set_attempts()`: 设置 Mesh 自组织网络的尝试次数
   - `esp_mesh_get_attempts()`: 获取 Mesh 自组织网络的尝试次数
   - `esp_mesh_set_switch_parent_paras()`: 设置切换父节点的相关参数
   - `esp_mesh_get_switch_parent_paras()`: 获取切换父节点的相关参数
   - `esp_mesh_set_rssi_threshold()`: 设置当前父节点的 RSSI 阈值
   - `esp_mesh_get_rssi_threshold()`: 获取当前父节点的 RSSI 阈值
   - `esp_mesh_set_6m_rate()`: 启用最小数据率为 6Mbps
   - `esp_mesh_print_txQ_waiting()`: 打印发送队列的等待情况
   - `esp_mesh_print_rxQ_waiting()`: 打印接收队列的等待情况
   - `esp_mesh_set_passive_scan_time()`: 设置被动扫描时间
   - `esp_mesh_get_passive_scan_time()`: 获取被动扫描时间
   - `esp_mesh_set_announce_interval()`: 设置广播间隔
   - `esp_mesh_get_announce_interval()`: 获取广播间隔
   - `esp_mesh_ps_get_duties()`: 获取设备、父节点和子节点的工作占空比
   - `esp_mesh_print_scan_result()`: 启用/禁用 Mesh 扫描结果打印

总的来说,这个头文件定义了一些 Mesh 内部使用的数据结构和函数,包括网络尝试次数、父节点切换、RSSI 阈值、数据率限制、队列监控、扫描时间、广播间隔、节能模式工作占空比等。这些内部接口可能会在实现网络报文分析功能时提供一些参考和支持。

##  `esp_wifi.h` 头文件定义了 ESP-IDF Wi-Fi 编程的各种接口和功能:

1. **错误码定义**:
   - `ESP_ERR_WIFI_*`: 定义了各种 Wi-Fi 相关的错误码

2. **Wi-Fi 初始化配置**:
   - `wifi_init_config_t`: Wi-Fi 初始化配置结构体
   - `WIFI_INIT_CONFIG_DEFAULT()`: 提供了默认的初始化配置

3. **Wi-Fi 基本功能**:
   - `esp_wifi_init()`: 初始化 Wi-Fi
   - `esp_wifi_deinit()`: 反初始化 Wi-Fi
   - `esp_wifi_set_mode()`: 设置 Wi-Fi 工作模式
   - `esp_wifi_get_mode()`: 获取 Wi-Fi 工作模式
   - `esp_wifi_start()`: 启动 Wi-Fi
   - `esp_wifi_stop()`: 停止 Wi-Fi
   - `esp_wifi_restore()`: 恢复 Wi-Fi 配置到默认值

4. **Wi-Fi 连接管理**:
   - `esp_wifi_connect()`: 连接 AP
   - `esp_wifi_disconnect()`: 断开 AP 连接
   - `esp_wifi_deauth_sta()`: 去认证某个 STA

5. **Wi-Fi 扫描**:
   - `esp_wifi_scan_start()`: 开始扫描
   - `esp_wifi_set_scan_parameters()`: 设置扫描参数
   - `esp_wifi_get_scan_parameters()`: 获取扫描参数
   - `esp_wifi_scan_stop()`: 停止扫描
   - `esp_wifi_scan_get_ap_num()`: 获取扫描结果数量
   - `esp_wifi_scan_get_ap_records()`: 获取扫描结果
   - `esp_wifi_scan_get_ap_record()`: 逐个获取扫描结果
   - `esp_wifi_clear_ap_list()`: 清除扫描结果

6. **Wi-Fi 配置管理**:
   - `esp_wifi_sta_get_ap_info()`: 获取连接 AP 的信息
   - `esp_wifi_set_ps()`: 设置省电模式
   - `esp_wifi_get_ps()`: 获取省电模式
   - `esp_wifi_set_protocol()`: 设置协议模式
   - `esp_wifi_get_protocol()`: 获取协议模式
   - `esp_wifi_set_bandwidth()`: 设置带宽
   - `esp_wifi_get_bandwidth()`: 获取带宽
   - `esp_wifi_set_channel()`: 设置信道
   - `esp_wifi_get_channel()`: 获取信道
   - `esp_wifi_set_country()`: 设置国家码
   - `esp_wifi_get_country()`: 获取国家码

7. **Wi-Fi MAC 地址管理**:
   - `esp_wifi_set_mac()`: 设置 MAC 地址
   - `esp_wifi_get_mac()`: 获取 MAC 地址

8. **Wi-Fi 监听模式**:
   - `esp_wifi_set_promiscuous_rx_cb()`: 注册监听模式下的接收回调
   - `esp_wifi_set_promiscuous()`: 启用/禁用监听模式
   - `esp_wifi_get_promiscuous()`: 获取监听模式状态
   - `esp_wifi_set_promiscuous_filter()`: 设置监听模式下的数据包过滤器
   - `esp_wifi_get_promiscuous_filter()`: 获取监听模式下的数据包过滤器
   - `esp_wifi_set_promiscuous_ctrl_filter()`: 设置监听模式下的控制帧过滤器
   - `esp_wifi_get_promiscuous_ctrl_filter()`: 获取监听模式下的控制帧过滤器

9. **Wi-Fi 数据发送/接收**:
   - `esp_wifi_80211_tx()`: 发送原始 802.11 数据包

10. **Wi-Fi 扩展功能**:
    - `esp_wifi_set_vendor_ie()`: 设置 Vendor-Specific IE
    - `esp_wifi_set_vendor_ie_cb()`: 注册 Vendor-Specific IE 回调
    - `esp_wifi_set_max_tx_power()`: 设置最大发射功率
    - `esp_wifi_get_max_tx_power()`: 获取最大发射功率
    - `esp_wifi_set_event_mask()`: 设置 Wi-Fi 事件屏蔽
    - `esp_wifi_get_event_mask()`: 获取 Wi-Fi 事件屏蔽

这个头文件提供了丰富的 Wi-Fi 编程接口,包括基础的初始化、模式设置、连接管理,以及高级功能如监听模式、数据发送/接收等。这些接口为我们使用 ESP-IDF 进行网络报文分析提供了重要的基础支持。

## `esp_wifi_ap_get_sta_list.h` 头文件定义了一些与 Wi-Fi 相关的数据类型和宏定义:

1. **数据类型定义**:
   - `wifi_sta_list_t`: 与连接到 AP 的 STA 相关的数据结构。

2. **宏定义**:
   - `ESP_WIFI_MAX_CONN_NUM`: 最大支持的 Wi-Fi 连接数。如果目标设备没有原生 Wi-Fi 支持且没有使用 `wifi_remote` 组件,则默认为 15。

3. **新增数据结构**:
   - `wifi_sta_mac_ip_list_t`: 包含 AP 所连接的 STA 的 MAC 地址和 IP 地址信息。

4. **新增接口**:
   - `esp_wifi_ap_get_sta_list_with_ip()`: 获取 AP 所连接的 STA 的 MAC 地址和 IP 地址信息。

这个头文件主要定义了与连接到 AP 的 STA 相关的数据结构和接口。与前面分析的 `esp_wifi.h` 头文件相比,这个头文件更加集中于 AP 模式下的 STA 管理功能。

值得注意的是,`esp_wifi_ap_get_sta_list_with_ip()` 接口可以获取 STA 的 IP 地址信息,前提是 LwIP 的 DHCP 服务器功能 (`CONFIG_LWIP_DHCPS`) 已经开启。这对于我们进行网络报文分析可能会有用,比如可以根据 STA 的 IP 地址信息对报文进行过滤和分类。

总的来说,这个头文件为我们提供了一些与 AP 模式下 STA 管理相关的功能支持,可以作为我们分析网络报文的补充。

## `esp_wifi_crypto_types.h` 头文件定义了一些与 WiFi 加密相关的数据结构和回调函数类型:

1. **加密算法枚举**:
   - `esp_crypto_hash_alg_t`: 定义了一些哈希算法,包括 MD5、SHA1、HMAC-MD5、HMAC-SHA1、SHA256 等。
   - `esp_crypto_cipher_alg_t`: 定义了一些对称加密算法,包括 NULL、AES、3DES、DES、RC2、RC4 等。

2. **加密算法结构体**:
   - `esp_crypto_hash_t`: 用于哈希算法的上下文结构体。
   - `esp_crypto_cipher_t`: 用于对称加密算法的上下文结构体。

3. **WiFi 加密回调函数类型**:
   - `esp_aes_128_encrypt_t`: AES-128 加密回调函数。
   - `esp_aes_128_decrypt_t`: AES-128 解密回调函数。
   - `esp_aes_wrap_t`: AES 密钥包装回调函数。
   - `esp_aes_unwrap_t`: AES 密钥解包回调函数。
   - `esp_hmac_sha256_vector_t`: HMAC-SHA256 向量散列回调函数。
   - `esp_sha256_prf_t`: SHA256 伪随机函数回调函数。
   - 一系列 HMAC-MD5、HMAC-SHA1 等散列回调函数。
   - `esp_sha1_prf_t`: SHA1 伪随机函数回调函数。
   - `esp_sha1_vector_t`: SHA1 向量散列回调函数。
   - `esp_pbkdf2_sha1_t`: 基于 SHA1 的 PBKDF2 密钥导出回调函数。
   - `esp_rc4_skip_t`: RC4 跳过流回调函数。
   - `esp_md5_vector_t`: MD5 向量散列回调函数。
   - 一系列 AES 加解密回调函数。
   - `esp_omac1_aes_128_t`: AES-128 OMAC1 散列回调函数。
   - `esp_ccmp_decrypt_t`: CCMP 解密回调函数。
   - `esp_ccmp_encrypt_t`: CCMP 加密回调函数。
   - `esp_aes_gmac_t`: AES GMAC 散列回调函数。
   - `esp_sha256_vector_t`: SHA256 向量散列回调函数。
   - `esp_crc32_le_t`: CRC32 Little-Endian 计算回调函数。

4. **加密回调函数结构体**:
   - `wpa_crypto_funcs_t`: 用于配置 WiFi 使用的加密回调函数的结构体。
   - `mesh_crypto_funcs_t`: 用于 Mesh 加密的回调函数结构体。

这个头文件主要定义了各种加密算法的回调函数类型,这些函数在 WiFi 和 Mesh 中都会使用到。这些回调函数可以是软件实现,也可以是硬件加速的实现。

对于我们分析网络报文来说,这些加密算法相关的接口并不是最主要的,但是如果需要对加密的报文进行分析和解密,了解这些接口定义还是很有帮助的。

##  `esp_wifi_default.h` 头文件定义了一些与默认 WiFi 网络接口相关的功能:

1. **接口定义**:
   - `esp_netif_attach_wifi_station()`: 将 WiFi 站点接口附加到指定的 esp_netif 实例上。
   - `esp_netif_attach_wifi_ap()`: 将 WiFi AP 接口附加到指定的 esp_netif 实例上。
   - `esp_wifi_set_default_wifi_sta_handlers()`: 设置 WiFi 站点接口的默认事件处理程序。
   - `esp_wifi_set_default_wifi_ap_handlers()`: 设置 WiFi AP 接口的默认事件处理程序。
   - `esp_wifi_set_default_wifi_nan_handlers()`: 设置 WiFi NAN 接口的默认事件处理程序。
   - `esp_wifi_clear_default_wifi_driver_and_handlers()`: 清除指定 esp_netif 实例的默认 WiFi 事件处理程序。

2. **默认网络接口创建**:
   - `esp_netif_create_default_wifi_ap()`: 创建默认的 WiFi AP 网络接口。
   - `esp_netif_create_default_wifi_sta()`: 创建默认的 WiFi 站点网络接口。
   - `esp_netif_create_default_wifi_nan()`: 创建默认的 WiFi NAN 网络接口。
   - `esp_netif_destroy_default_wifi()`: 销毁使用 `esp_netif_create_default_wifi_*()` 创建的默认网络接口。

3. **自定义网络接口创建**:
   - `esp_netif_create_wifi()`: 根据自定义配置创建 WiFi 网络接口,但不注册默认事件处理程序。

4. **Mesh 网络接口创建**:
   - `esp_netif_create_default_wifi_mesh_netifs()`: 创建默认的 WiFi Mesh 站点和 AP 网络接口,禁用 DHCP 客户端和服务器。

总的来说,这个头文件提供了一些与 WiFi 网络接口相关的默认设置和创建功能,为上层应用程序提供了一些便利。在进行网络报文分析时,这些接口可能会起到辅助作用,比如在获取网络接口信息时使用。

## `esp_wifi_he_types.h` 头文件定义了与 802.11ax (HE) 相关的接口和数据结构:

1. **接口定义**:
   - `esp_wifi_sta_itwt_setup()`: 设置或修改单播 TWT 协议。
   - `esp_wifi_sta_itwt_teardown()`: 拆除单播 TWT 协议。
   - `esp_wifi_sta_itwt_suspend()`: 暂停或恢复单播 TWT 协议。
   - `esp_wifi_sta_itwt_get_flow_id_status()`: 获取单播 TWT 协议的状态。
   - `esp_wifi_sta_itwt_send_probe_req()`: 发送探测请求以更新 TSF 时间。
   - `esp_wifi_sta_itwt_set_target_wake_time_offset()`: 设置 TWT 唤醒时间偏移。
   - `esp_wifi_enable_rx_statistics()`: 启用接收统计。
   - `esp_wifi_enable_tx_statistics()`: 启用发送统计。
   - `esp_wifi_sta_btwt_setup()`: 设置或修改广播 TWT 协议。
   - `esp_wifi_sta_btwt_teardown()`: 拆除广播 TWT 协议。
   - `esp_wifi_sta_get_btwt_num()`: 获取 AP 支持的广播 TWT 数量。
   - `esp_wifi_sta_btwt_get_info()`: 获取 AP 支持的广播 TWT 信息。
   - `esp_wifi_sta_twt_config()`: 设置 WiFi TWT 配置。

2. **数据结构定义**:
   - `wifi_itwt_setup_config_t`: 单播 TWT 协议设置参数。
   - `wifi_btwt_setup_config_t`: 广播 TWT 协议设置参数。
   - `esp_wifi_btwt_info_t`: 广播 TWT 协议信息。
   - `wifi_twt_config_t`: WiFi TWT 配置参数。

这些接口和数据结构主要与 802.11ax (HE) 协议中的 Target Wake Time (TWT) 机制相关。TWT 是在 WiFi 设备之间通过协商的方式确定唤醒时间,从而实现更好的功耗管理。

在网络报文分析中,这些接口可能会帮助我们理解 WiFi 设备的功耗管理机制,分析 TWT 相关的报文细节。同时,获取 TWT 统计信息也可以为我们提供性能分析的依据。

总的来说,这个头文件定义了一些 802.11ax 特有的功能接口,为我们提供了更丰富的 WiFi 分析能力。

##  `esp_wifi_he_types.h` 头文件定义了与 802.11ax (HE) 相关的数据结构和枚举类型:

1. **枚举定义**:
   - `esp_wifi_aci_t`: 访问类别
   - `esp_csi_acquire_stbc_mode_t`: CSI STBC 相关模式
   - `wifi_twt_setup_cmds_t`: TWT 设置命令
   - `he_su_gi_and_ltf_type_t`: HE SU 保护间隔和 LTF 类型
   - `wifi_rx_bb_format_t`: 接收帧的格式
   - `wifi_btwt_setup_status_t`: 广播 TWT 设置状态
   - `wifi_itwt_teardown_status_t`: 单播 TWT 拆除状态
   - `wifi_btwt_teardown_status_t`: 广播 TWT 拆除状态
   - `wifi_itwt_probe_status_t`: 单播 TWT 探测状态
   - `wifi_twt_type_t`: TWT 类型

2. **数据结构定义**:
   - `wifi_csi_acquire_config_t`: CSI 采集配置
   - `esp_wifi_htc_omc_t`: HE 变体 HT 控制字段
   - `wifi_btwt_setup_config_t`: 广播 TWT 设置参数
   - `wifi_twt_setup_config_t`: 单播 TWT 设置参数 (别名 `wifi_itwt_setup_config_t`)
   - `wifi_event_sta_itwt_setup_t`: 单播 TWT 设置事件参数
   - `wifi_event_sta_itwt_teardown_t`: 单播 TWT 拆除事件参数
   - `wifi_event_sta_btwt_setup_t`: 广播 TWT 设置事件参数
   - `wifi_event_sta_btwt_teardown_t`: 广播 TWT 拆除事件参数
   - `wifi_event_sta_itwt_probe_t`: 单播 TWT 探测事件参数
   - `wifi_event_sta_itwt_suspend_t`: 单播 TWT 挂起事件参数
   - `wifi_twt_config_t`: TWT 配置参数
   - `wifi_event_sta_twt_wakeup_t`: TWT 唤醒事件参数
   - `esp_wifi_btwt_info_t`: 广播 TWT 信息

这些数据结构和枚举类型主要与 802.11ax (HE) 的新特性相关,如 TWT、CSI 采集等。

对于网络报文分析来说,这些接口和数据结构可以帮助我们理解 HE 设备的一些新特性,比如 TWT 机制如何影响设备的功耗管理,CSI 采集配置如何影响信道测量等。通过分析这些参数,我们可以更好地分析 HE 设备的行为。

总的来说,这个头文件定义了 802.11ax 相关的一些新概念和功能,为我们提供了分析 HE 设备网络报文的基础知识。

##  `esp_wifi_netif.h` 头文件定义了 WiFi 网络接口抽象层的一些接口:

1. **常量定义**:
   - `MAX_WIFI_IFS`: 定义了 WiFi 接口的最大数量, 与 `WIFI_IF_MAX` 相同。

2. **数据类型定义**:
   - `wifi_netif_driver_t`: WiFi 网络接口驱动程序的句柄类型。

3. **接口定义**:
   - `esp_wifi_create_if_driver()`: 创建一个 WiFi 网络接口驱动程序实例。
   - `esp_wifi_destroy_if_driver()`: 销毁一个 WiFi 网络接口驱动程序实例。
   - `esp_wifi_get_if_mac()`: 获取指定 WiFi 网络接口驱动程序实例的 MAC 地址。
   - `esp_wifi_is_if_ready_when_started()`: 检查 WiFi 网络接口驱动程序实例是否已准备就绪。
   - `esp_wifi_register_if_rxcb()`: 注册 WiFi 网络接口驱动程序实例的接收回调函数。

这个头文件定义了一些与 WiFi 网络接口驱动程序相关的接口,主要用于创建、销毁和管理 WiFi 网络接口实例,以及注册接收回调函数。

这些接口主要用于在 ESP-NETIF 框架中管理 WiFi 网络接口。在进行网络报文分析时,可以利用这些接口获取和操作 WiFi 网络接口的相关信息,比如获取 MAC 地址、注册接收回调等。

总的来说,这个头文件定义了一些抽象层的 WiFi 网络接口操作接口,为我们提供了一种更高级的方式来管理和使用 WiFi 网络接口。


## `esp_wifi_types.h`:
   - 这个头文件包含了另一个头文件 `esp_wifi_types_generic.h`。
   - 如果存在 `esp_wifi_types_native.h` 头文件,它会被包含进来。否则,该头文件会定义一些不含任何实现的结构体类型,如 `wifi_csi_config_t` 和 `wifi_pkt_rx_ctrl_t`。
   - 这样做是为了在没有原生 Wi-Fi 支持的情况下,仍然可以编译使用一些常见的 Wi-Fi API。

## `smartconfig_ack.h`:
   - 这个头文件定义了两个函数:
     - `sc_send_ack_start()`: 发送 SmartConfig 确认给手机。这个函数只能在收到 `SC_EVENT_GOT_SSID_PSWD` 事件时使用。
     - `sc_send_ack_stop()`: 停止发送 SmartConfig 确认给手机。
   - 这些函数与 SmartConfig 功能相关,用于在 ESP 设备和手机应用程序之间进行确认。

总的来说,这两个头文件提供了一些 Wi-Fi 和 SmartConfig 相关的类型定义和函数声明。其中 `esp_wifi_types.h` 头文件针对不同硬件平台的 Wi-Fi 支持情况做了兼容性处理,而 `smartconfig_ack.h` 则专注于 SmartConfig 功能的实现。这些头文件为 ESP-IDF 的 Wi-Fi 和 SmartConfig 相关功能提供了基础支持。

##  `esp_wifi_types.h` 文件中的内容进行了全面的总结:

1. **宏定义**:
   - `__ESP_WIFI_TYPES_H__`: 文件的保护宏。
   - `WIFI_OFFCHAN_TX_REQ`: 表示一个离线信道传输请求。
   - `WIFI_OFFCHAN_TX_CANCEL`: 表示取消一个离线信道传输请求。
   - `WIFI_ROC_REQ`: 表示一个保持在信道上的请求。
   - `WIFI_ROC_CANCEL`: 表示取消一个保持在信道上的请求。
   - `WIFI_ACTIVE_SCAN_MIN_DEFAULT_TIME`: 主动扫描的最小默认时间。
   - `WIFI_ACTIVE_SCAN_MAX_DEFAULT_TIME`: 主动扫描的最大默认时间。
   - `WIFI_PASSIVE_SCAN_DEFAULT_TIME`: 被动扫描的默认时间。
   - `WIFI_SCAN_HOME_CHANNEL_DWELL_DEFAULT_TIME`: 在 home 信道停留的默认时间。
   - `WIFI_VENDOR_IE_ELEMENT_ID`: 供应商信息元素的 ID。
   - `WIFI_PROMIS_FILTER_MASK_*`: 混杂模式下不同数据包类型的过滤掩码。
   - `WIFI_EVENT_MASK_*`: WiFi 事件的掩码。
   - `WIFI_STATIS_BUFFER`: 统计缓冲区位掩码。
   - `WIFI_STATIS_RXTX`: 接收/发送统计位掩码。
   - `WIFI_STATIS_HW`: 硬件统计位掩码。
   - `WIFI_STATIS_DIAG`: 诊断统计位掩码。
   - `WIFI_STATIS_PS`: 功耗统计位掩码。
   - `WIFI_STATIS_ALL`: 所有统计位掩码。
   - `MAX_SSID_LEN`: SSID 的最大长度。
   - `MAX_PASSPHRASE_LEN`: 密码的最大长度。
   - `MAX_WPS_AP_CRED`: WPS 可接收的 AP 凭证数量。
   - `ESP_WIFI_NAN_MAX_SVC_SUPPORTED`: NAN 最大支持的服务数量。
   - `ESP_WIFI_NAN_DATAPATH_MAX_PEERS`: NAN 最大支持的对端数量。
   - `ESP_WIFI_NDP_ROLE_INITIATOR`: NAN 数据路径发起方角色。
   - `ESP_WIFI_NDP_ROLE_RESPONDER`: NAN 数据路径响应方角色。
   - `ESP_WIFI_MAX_SVC_NAME_LEN`: NAN 服务名称的最大长度。
   - `ESP_WIFI_MAX_FILTER_LEN`: NAN 服务过滤器的最大长度。
   - `ESP_WIFI_MAX_SVC_INFO_LEN`: NAN 服务信息的最大长度。
   - `ESP_WIFI_MAX_NEIGHBOR_REP_LEN`: 邻居报告的最大长度。

2. **数据类型**:
   - `wifi_mode_t`: WiFi 工作模式, 包括 STA、AP、APSTA 和 NAN 模式。
   - `wifi_interface_t`: WiFi 接口, 包括 STA、AP 和 NAN 接口。
   - `wifi_country_policy_t`: WiFi 国家/地区策略, 包括自动和手动。
   - `wifi_country_t`: WiFi 国家/地区的区域限制信息。
   - `wifi_auth_mode_t`: WiFi 认证模式, 从 OPEN 到 DPP。
   - `wifi_err_reason_t`: WiFi 断开连接的原因代码。
   - `wifi_second_chan_t`: WiFi 二级信道的状态, 包括 NONE、ABOVE 和 BELOW。
   - `wifi_scan_type_t`: WiFi 扫描类型, 包括主动扫描和被动扫描。
   - `wifi_active_scan_time_t`: 主动扫描的时间参数。
   - `wifi_scan_time_t`: 主动和被动扫描的时间参数。
   - `wifi_scan_channel_bitmap_t`: WiFi 扫描信道的位图。
   - `wifi_scan_config_t`: WiFi 扫描参数的结构体。
   - `wifi_scan_default_params_t`: 默认的 WiFi 扫描参数。
   - `wifi_cipher_type_t`: WiFi 加密类型。
   - `wifi_ant_t`: WiFi 天线的编号。
   - `wifi_he_ap_info_t`: 802.11ax AP 的相关信息。
   - `wifi_ap_record_t`: 扫描到的 AP 的详细信息。
   - `wifi_scan_method_t`: 两种扫描方法, 快速扫描和全信道扫描。
   - `wifi_sort_method_t`: AP 排序方法, 按信号强度或安全模式。
   - `wifi_scan_threshold_t`: 快速扫描的参数阈值。
   - `wifi_ps_type_t`: WiFi 功耗模式, 包括无电源保护、最小功耗和最大功耗。
   - `wifi_band_t`: WiFi 频段, 包括 2.4GHz 和 5GHz。
   - `wifi_band_mode_t`: WiFi 频段模式, 包括 2.4GHz 模式、5GHz 模式和自动模式。
   - `wifi_protocols_t`: 2.4GHz 和 5GHz 信道支持的协议。
   - `wifi_bandwidth_t`: 各种 WiFi 带宽。
   - `wifi_bandwidths_t`: 2.4GHz 和 5GHz 信道的带宽。
   - `wifi_pmf_config_t`: WiFi 管理帧保护的配置参数。
   - `wifi_sae_pwe_method_t`: SAE PWE 派生方法。
   - `wifi_sae_pk_mode_t`: SAE-PK 认证方法。
   - `wifi_ap_config_t`: AP 配置参数的结构体。
   - `wifi_sta_config_t`: STA 配置参数的结构体。
   - `wifi_nan_config_t`: NAN 发现配置参数的结构体。
   - `wifi_config_t`: AP、STA 和 NAN 配置的联合体。
   - `wifi_sta_info_t`: 连接到 AP 的 STA 的信息。
   - `wifi_storage_t`: WiFi 配置信息的存储位置, 包括 Flash 和 RAM。
   - `wifi_vendor_ie_type_t`: 供应商信息元素关联的帧类型。
   - `wifi_vendor_ie_id_t`: 供应商信息元素的索引。
   - `wifi_phy_mode_t`: 各种物理层模式, 如 11b、11g、HT20 等。
   - `vendor_ie_data_t`: 供应商信息元素的数据结构。
   - `wifi_promiscuous_pkt_type_t`: 混杂模式下接收数据包的类型。
   - `wifi_promiscuous_filter_t`: 混杂模式下的数据包过滤掩码。
   - `wifi_event_t`: 各种 WiFi 事件类型。
   - `wifi_event_sta_scan_done_t`: WIFI_EVENT_SCAN_DONE 事件的参数。
   - `wifi_event_sta_connected_t`: WIFI_EVENT_STA_CONNECTED 事件的参数。
   - `wifi_event_sta_disconnected_t`: WIFI_EVENT_STA_DISCONNECTED 事件的参数。
   - `wifi_event_sta_authmode_change_t`: WIFI_EVENT_STA_AUTHMODE_CHANGE 事件的参数。
   - `wifi_event_sta_wps_er_pin_t`: WIFI_EVENT_STA_WPS_ER_PIN 事件的参数。
   - `wifi_event_sta_wps_fail_reason_t`: WIFI_EVENT_STA_WPS_ER_FAILED 事件的参数。
   - `wifi_event_sta_wps_er_success_t`: WIFI_EVENT_STA_WPS_ER_SUCCESS 事件的参数。
   - `wifi_event_ap_staconnected_t`: WIFI_EVENT_AP_STACONNECTED 事件的参数。
   - `wifi_event_ap_stadisconnected_t`: WIFI_EVENT_AP_STADISCONNECTED 事件的参数。
   - `wifi_event_ap_probe_req_rx_t`: WIFI_EVENT_AP_PROBEREQRECVED 事件的参数。
   - `wifi_event_bss_rssi_low_t`: WIFI_EVENT_STA_BSS_RSSI_LOW 事件的参数。
   - `wifi_event_home_channel_change_t`: WIFI_EVENT_HOME_CHANNEL_CHANGE 事件的参数。
   - `wifi_ftm_status_t`: FTM 操作状态类型。
   - `wifi_ftm_report_entry_t`: FTM 报告条目。
   - `wifi_event_ftm_report_t`: WIFI_EVENT_FTM_REPORT 事件的参数。
   - `wifi_event_action_tx_status_t`: WIFI_EVENT_ACTION_TX_STATUS 事件的参数。
   - `wifi_event_roc_done_t`: WIFI_EVENT_ROC_DONE 事件的参数。
   - `wifi_event_ap_wps_rg_pin_t`: WIFI_EVENT_AP_WPS_RG_PIN 事件的参数。
   - `wps_fail_reason_t`: AP WPS 失败的原因。
   - `wifi_event_ap_wps_rg_fail_reason_t`: WIFI_EVENT_AP_WPS_RG_FAILED 事件的参数。
   - `wifi_event_ap_wps_rg_success_t`: WIFI_EVENT_AP_WPS_RG_SUCCESS 事件的参数。
   - `wifi_event_nan_svc_match_t`: WIFI_EVENT_NAN_SVC_MATCH 事件的参数。
   - `wifi_event_nan_replied_t`: WIFI_EVENT_NAN_REPLIED 事件的参数。
   - `wifi_event_nan_receive_t`: WIFI_EVENT_NAN_RECEIVE 事件的参数。
   - `wifi_event_ndp_indication_t`: WIFI_EVENT_NDP_INDICATION 事件的参数。
   - `wifi_event_ndp_confirm_t`: WIFI_EVENT_NDP_CONFIRM 事件的参数。
   - `wifi_event_ndp_terminated_t`: WIFI_EVENT_NDP_TERMINATED 事件的参数。
   - `wifi_event_neighbor_report_t`: WIFI_EVENT_STA_NEIGHBOR_REP 事件的参数。
   - `wifi_ant_gpio_t`: WiFi 天线 GPIO 配置。
   - `wifi_ant_gpio_config_t`: 一组 WiFi 天线 GPIO 配置。
   - `wifi_ant_mode_t`: WiFi 天线模式。
   - `wifi_ant_config_t`: WiFi 天线配置。
   - `wifi_action_tx_req_t`: 发送 Action 帧的请求。
   - `wifi_ftm_initiator_cfg_t`: FTM 发起方的配置。
   - `wifi_nan_service_type_t`: NAN 服务的类型。
   - `wifi_nan_publish_cfg_t`: NAN 发布服务的配置参数。
   - `wifi_nan_subscribe_cfg_t`: NAN 订阅服务的配置参数。
   - `wifi_nan_followup_params_t`: NAN 跟踪消息的参数。
   - `wifi_nan_datapath_req_t`: NAN 数据路径请求的参数。
   - `wifi_nan_datapath_resp_t`: NAN 数据路径响应的参数。
   - `wifi_nan_datapath_end_req_t`: NAN 数据路径结束请求的参数。
   - `wifi_phy_rate_t`: 不同的 WiFi 物理层速率。

3. **函数接口**:
   该头文件主要定义了数据类型和常量, 没有直接定义函数接口。相关的函数接口定义在其他头文件中, 如 `esp_wifi.h`。

总的来说, `esp_wifi_types.h` 提供了大量的 WiFi 相关数据类型和常量定义, 为上层应用程序提供了全面的配置和控制接口。