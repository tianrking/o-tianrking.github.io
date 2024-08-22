---
slug: bouffalo-network-interfaces
title: Exploring Network Interfaces on Bouffalo MCUs
authors:
  - name: w0x7ce
    title: Embedded Systems Engineer
    url: https://github.com/tianrking
    image_url: https://github.com/tianrking.png
tags: [bouffalo, bl602, bl616, iot, networking, wifi, mesh, espnow, embedded development]
---

https://github.com/bouffalolab/bouffalo_sdk

https://github.com/bouffalolab/bouffalo_sdk/tree/9a267ff0f9c40fce3efcd4c92a726349381a9b31

# WIFI

## `wifi_mgmr_ext.h` 头文件中定义的所有状态和接口

1. **Wi-Fi 异步事件定义**:
   - `EV_WIFI`: Wi-Fi 事件主事件标识
   - `CODE_WIFI_ON_INIT_DONE`: Wi-Fi 初始化完成
   - `CODE_WIFI_ON_MGMR_DONE`: Wi-Fi 管理器就绪
   - `CODE_WIFI_CMD_RECONNECT`: 重新连接命令
   - `CODE_WIFI_ON_CONNECTED`: Wi-Fi 连接成功
   - `CODE_WIFI_ON_DISCONNECT`: Wi-Fi 连接断开
   - `CODE_WIFI_ON_PRE_GOT_IP`: 获取 IP 地址前
   - `CODE_WIFI_ON_GOT_IP`: 获取 IP 地址
   - `CODE_WIFI_ON_CONNECTING`: 正在连接
   - `CODE_WIFI_ON_SCAN_DONE`: 扫描完成
   - `CODE_WIFI_ON_SCAN_DONE_ONJOIN`: 在连接时完成扫描
   - `CODE_WIFI_ON_AP_STARTED`: AP 启动
   - `CODE_WIFI_ON_AP_STOPPED`: AP 停止
   - `CODE_WIFI_ON_PROV_SSID`: 配置 SSID
   - `CODE_WIFI_ON_PROV_BSSID`: 配置 BSSID
   - `CODE_WIFI_ON_PROV_PASSWD`: 配置密码
   - `CODE_WIFI_ON_PROV_CONNECT`: 连接配置
   - `CODE_WIFI_ON_PROV_DISCONNECT`: 断开配置
   - `CODE_WIFI_ON_PROV_SCAN_START`: 开始配置扫描
   - `CODE_WIFI_ON_PROV_STATE_GET`: 获取配置状态
   - `CODE_WIFI_ON_MGMR_DENOISE`: 管理器去噪
   - `CODE_WIFI_ON_AP_STA_ADD`: AP 模式下添加 STA
   - `CODE_WIFI_ON_AP_STA_DEL`: AP 模式下删除 STA
   - `CODE_WIFI_ON_EMERGENCY_MAC`: 紧急 MAC
   - `CODE_WIFI_ON_EXIT_PS`: 退出节能模式
   - `CODE_WIFI_ON_GOT_IP6`: 获取 IPv6 地址

2. **Wi-Fi 认证和加密算法定义**:
   - `WIFI_EVENT_BEACON_IND_AUTH_OPEN`: 开放式认证
   - `WIFI_EVENT_BEACON_IND_AUTH_WEP`: WEP 认证
   - `WIFI_EVENT_BEACON_IND_AUTH_WPA_PSK`: WPA-PSK 认证
   - `WIFI_EVENT_BEACON_IND_AUTH_WPA2_PSK`: WPA2-PSK 认证
   - `WIFI_EVENT_BEACON_IND_AUTH_WPA_WPA2_PSK`: WPA/WPA2-PSK 认证
   - `WIFI_EVENT_BEACON_IND_AUTH_WPA_ENT`: WPA 企业级认证
   - `WIFI_EVENT_BEACON_IND_AUTH_WPA3_SAE`: WPA3-SAE 认证
   - `WIFI_EVENT_BEACON_IND_AUTH_WPA2_PSK_WPA3_SAE`: WPA2-PSK/WPA3-SAE 混合认证
   - `WIFI_EVENT_BEACON_IND_AUTH_UNKNOWN`: 未知认证算法

   - `WIFI_EVENT_BEACON_IND_CIPHER_NONE`: 无加密
   - `WIFI_EVENT_BEACON_IND_CIPHER_WEP`: WEP 加密
   - `WIFI_EVENT_BEACON_IND_CIPHER_AES`: AES 加密
   - `WIFI_EVENT_BEACON_IND_CIPHER_TKIP`: TKIP 加密
   - `WIFI_EVENT_BEACON_IND_CIPHER_TKIP_AES`: TKIP/AES 混合加密

3. **数据结构定义**:
   - `wifi_mgmr_vif_type`: 网络接口类型枚举,包括 STA 和 AP
   - `wifi_mgmr_scan_item_t`: 扫描结果项的数据结构,包含 SSID、BSSID、信道、RSSI、认证和加密算法等信息
   - `wifi_mgmr_sniffer_item_t`: 监听模式下的数据包信息,包含接口索引、信道类型、频率等
   - `wifi_mgmr_sta_connect_params_t`: STA 连接 AP 时的参数,包括 SSID、密码、BSSID、AKM、频率等
   - `wifi_mgmr_scan_params_t`: 扫描时的参数,包括 SSID、BSSID、信道列表等
   - `wifi_mgmr_raw_send_params_t`: 发送原始 80211 帧的参数,包括数据包指针、长度、发送信道等
   - `wifi_mgmr_ap_params_t`: AP 模式下的启动参数,包括 SSID、密码、加密算法、信道等
   - `wifi_mgmr_connect_ind_stat_info_t`: STA 连接状态信息,包括状态码、原因码、SSID、BSSID、信道等
   - `wifi_conf_t`: Wi-Fi 配置信息,包括国家码和支持的信道数量
   - `wifi_sta_basic_info_t`: AP 模式下 STA 的基本信息,包括索引、MAC 地址、AID 等
   - `rf_pwr_table_t`: 功率控制(TPC)的功率表数据结构
   - `wifi_mgmr_ap_info_t`: AP 模式下的 AP 信息,包括 SSID、BSSID、安全性、密码、信道等

4. **函数接口定义**:
   - `wifi_sta_connect()`: 连接 AP
   - `wifi_mgmr_sta_quickconnect()`: 快速连接 AP
   - `wifi_mgmr_sta_connect()`: 使用 `wifi_mgmr_sta_connect_params_t` 参数连接 AP
   - `wifi_sta_disconnect()`: 断开 AP 连接
   - `wifi_sta_ip4_addr_get()`: 获取 STA 的 IPv4 地址
   - `wifi_mgmr_sniffer_enable()`: 开启监听模式
   - `wifi_mgmr_sniffer_disable()`: 关闭监听模式
   - `wifi_mgmr_state_get()`: 获取 AP/STA 的状态
   - `wifi_mgmr_sta_rssi_get()`: 获取最后一个信标的 RSSI
   - `wifi_mgmr_sta_channel_get()`: 获取 STA 当前所在的信道
   - `wifi_mgmr_sta_ssid_set()`: 设置 STA 的 SSID
   - `wifi_mgmr_sta_passphr_set()`: 设置 STA 的密码
   - `wifi_mgmr_sta_connect_ind_stat_get()`: 获取 STA 的连接状态信息
   - `wifi_mgmr_sta_scan()`: 扫描 AP
   - `wifi_mgmr_sta_scanlist()`: 列出上次扫描的结果
   - `wifi_mgmr_sta_scanlist_nums_get()`: 获取上次扫描的 AP 数量
   - `wifi_mgmr_sta_scanlist_dump()`: 获取上次扫描的 AP 列表
   - `wifi_mgmr_scan_ap_all()`: 获取所有扫描到的 AP
   - `wifi_mgmr_ap_start()`: 启动 AP 模式
   - `wifi_mgmr_ap_stop()`: 停止 AP 模式
   - `wifi_mgmr_mode_to_str()`: 获取模式字符串
   - `wifi_mgmr_mac_set()`: 设置 MAC 地址
   - `wifi_mgmr_sta_mac_get()`: 获取 STA 的 MAC 地址
   - `wifi_mgmr_ap_mac_get()`: 获取 AP 的 MAC 地址
   - `wifi_mgmr_set_country_code()`: 设置国家码
   - `wifi_mgmr_get_country_code()`: 获取国家码
   - `wifi_mgmr_sta_autoconnect_enable()`: 开启 STA 自动连接
   - `wifi_mgmr_sta_autoconnect_disable()`: 关闭 STA 自动连接
   - `wifi_mgmr_sta_ps_enter()`: 进入 STA 节能模式
   - `wifi_mgmr_sta_ps_exit()`: 退出 STA 节能模式
   - `wifi_mgmr_sta_set_listen_itv()`: 设置 STA 的监听间隔
   - `wifi_mgmr_sta_get_listen_itv()`: 获取 STA 的监听间隔
   - `wifi_mgmr_sta_aid_get()`: 获取 STA 的 AID
   - `wifi_mgmr_sta_get_bssid()`: 获取 STA 的 BSSID
   - `wifi_mgmr_ap_sta_info_get()`: 获取 AP 模式下连接的 STA 信息
   - `wifi_mgmr_tpc_pwr_set()`: 设置功率控制(TPC)的功率表
   - `wifi_mgmr_tpc_pwr_get()`: 获取功率控制(TPC)的功率表
   - `wifi_mgmr_connection_info()`: 获取已连接 AP/路由器的信息
   - `wifi_mgmr_get_ap_info()`: 获取 AP 模式下的 AP 信息
   - `wifi_mgmr_sta_keepalive_time_set()`: 设置 STA 模式下的保活时间
   - `wifi_mgmr_sta_state_get()`: 获取 STA 的连接状态
   - `wifi_mgmr_sta_info_status_code_get()`: 获取 STA 的状态码
   - `wifi_mgmr_ap_state_get()`: 获取 AP 是否已经启动
   - `wifi_mgmr_conf_max_sta()`: 设置 AP 模式下支持的最大 STA 数量
   - `wifi_mgmr_ap_sta_delete()`: 删除 AP 模式下的 STA 连接
   - `wifi_mgmr_raw_80211_send()`: 发送原始 80211 帧
   - `wifi_mgmr_psk_cal()`: 计算 PSK
   - `wifi_mgmr_wifi_pwr_off()`: 关闭 Wi-Fi 电源
   - `wifi_mgmr_wifi_pwr_on()`: 开启 Wi-Fi 电源
   - `wifi_mgmr_sta_start_keep_alive()`: 开始 STA 保活
   - `wifi_mgmr_sta_stop_keep_alive()`: 停止 STA 保活
   - `wifi_mgmr_rate_config()`: 配置数据率
   - `wifi_mgmr_sta_extra_timcnt_get()`: 获取 STA 的 TIM 计数器值

##  `wifi_mgmr.h` 头文件中定义的所有内容:

1. **宏定义**:
   - `MAC_ADDR_LIST(m)`: 用于方便地打印 MAC 地址
   - `WIFI_MGMR_CONFIG_SCAN_ITEM_TIMEOUT`: 设置扫描结果项的超时时间为 15 秒
   - `WIFI_MGMR_SCAN_ITEMS_MAX`: 最多可保存 50 个扫描结果项

2. **数据结构定义**:
   - `struct ieee80211_dot_d`: 定义了国家码与信道数量的对应关系
   - `struct wlan_netif`: 描述了 WLAN 网络接口的基本信息,包括工作模式、MAC 地址以及 DHCP 状态等
   - `wifi_mgmr_sta_basic_info_t`: 保存了 STA 的基本信息,如 STA 索引、MAC 地址和 AID
   - `wifi_mgmr_t`: WLAN 管理器的主数据结构,包含 STA 模式、AP 模式的网络接口信息,扫描结果缓存,连接参数,STA 和 AP 的状态信息等

3. **接口定义**:
   - `wifi_mgmr_init(wifi_conf_t *conf)`: 初始化 WLAN 管理器
   - `wifi_mgmr_get_channel_nums(const char *country_code)`: 根据国家码获取支持的信道数量
   - `wifi_mgmr_auth_to_str(uint8_t auth)`: 将身份验证方式转换为字符串形式
   - `wifi_mgmr_cipher_to_str(uint8_t cipher)`: 将加密算法转换为字符串形式
   - `wifi_mgmr_scan_beacon_save(wifi_mgmr_scan_item_t *scan)`: 保存扫描结果
   - `wifi_mgmr_sta_info_reset()`: 重置 STA 的连接状态信息
   - `wifi_mgmr_sta_info_upatestatus(uint16_t status_code, uint16_t reason_code)`: 更新 STA 的连接状态
   - `wifi_mgmr_sta_info_save(void *param)`: 保存 STA 的连接状态信息
   - `wifi_mgmr_sta_connect_params_get()`: 获取 STA 的连接参数

## `bl_fw_api.h` 头文件中定义的所有内容:

1. **状态码定义**:
   - `WLAN_FW_SUCCESSFUL`: 操作成功
   - `WLAN_FW_TX_AUTH_FRAME_ALLOCATE_FAIILURE`: 分配认证帧失败
   - `WLAN_FW_AUTHENTICATION_FAIILURE`: 认证失败
   - `WLAN_FW_AUTH_ALGO_FAIILURE`: 认证算法失败
   - `WLAN_FW_TX_ASSOC_FRAME_ALLOCATE_FAIILURE`: 分配关联帧失败
   - `WLAN_FW_ASSOCIATE_FAIILURE`: 关联失败
   - `WLAN_FW_DEAUTH_BY_AP_WHEN_NOT_CONNECTION`: AP 在未连接状态下发送去认证
   - `WLAN_FW_DEAUTH_BY_AP_WHEN_CONNECTION`: AP 在连接状态下发送去认证
   - `WLAN_FW_4WAY_HANDSHAKE_ERROR_PSK_TIMEOUT_FAILURE`: 4 向握手超时错误
   - `WLAN_FW_4WAY_HANDSHAKE_TX_DEAUTH_FRAME_TRANSMIT_FAILURE`: 4 向握手时发送去认证帧失败
   - `WLAN_FW_4WAY_HANDSHAKE_TX_DEAUTH_FRAME_ALLOCATE_FAIILURE`: 4 向握手时分配去认证帧失败
   - `WLAN_FW_AUTH_OR_ASSOC_RESPONSE_TIMEOUT_FAILURE`: 认证或关联响应超时
   - `WLAN_FW_SCAN_NO_BSSID_AND_CHANNEL`: 扫描时没有 BSSID 和信道
   - `WLAN_FW_CREATE_CHANNEL_CTX_FAILURE_WHEN_JOIN_NETWORK`: 加入网络时创建信道上下文失败
   - `WLAN_FW_JOIN_NETWORK_FAILURE`: 加入网络失败
   - `WLAN_FW_ADD_STA_FAILURE`: 添加 STA 失败
   - `WLAN_FW_BEACON_LOSS`: 丢失信标
   - `WLAN_FW_NETWORK_SECURITY_NOMATCH`: 网络安全不匹配
   - `WLAN_FW_NETWORK_WEPLEN_ERROR`: WEP 长度错误
   - `WLAN_FW_DISCONNECT_BY_USER_WITH_DEAUTH`: 用户主动断开并发送去认证
   - `WLAN_FW_DISCONNECT_BY_USER_NO_DEAUTH`: 用户主动断开但不发送去认证
   - `WLAN_FW_DISCONNECT_BY_FW_PS_TX_NULLFRAME_FAILURE`: 固件 PS 模式下发送 Null 帧失败导致断开
   - `WLAN_FW_TRAFFIC_LOSS`: 流量丢失
   - `WLAN_FW_SWITCH_CHANNEL_FAILURE`: 切换信道失败
   - `WLAN_FW_AUTH_OR_ASSOC_RESPONSE_CFM_FAILURE`: 认证或关联响应确认失败

2. **AP 模式状态码定义**:
   - `WLAN_FW_APM_SUCCESSFUL`: AP 模式操作成功
   - `WLAN_FW_APM_DELETESTA_BY_USER`: 用户删除 STA
   - `WLAN_FW_APM_DEATUH_BY_STA`: STA 主动去认证
   - `WLAN_FW_APM_DISASSOCIATE_BY_STA`: STA 主动去关联
   - `WLAN_FW_APM_DELETECONNECTION_TIMEOUT`: 连接超时被删除
   - `WLAN_FW_APM_DELETESTA_FOR_NEW_CONNECTION`: 为新连接删除 STA
   - `WLAN_FW_APM_DEAUTH_BY_AUTHENTICATOR`: 认证者发送去认证

3. **接口定义**:
   - `wifi_main(void *param)`: Wi-Fi 固件的入口点
   - `bl_tpc_update_power_table(int8_t *power_table)`: 更新功率控制(TPC)的功率表
   - `bl_tpc_power_table_get(int8_t *power_table)`: 获取 TPC 的功率表
   - `bl_sta_set_keepalive_period(uint8_t time_seconds)`: 设置 STA 模式下的保活时间(单位:秒)
   - `#ifdef CFG_BL_WIFI_PS_ENABLE`: 一些与节能模式相关的接口
     - `bl_sta_send_nullframe(void *arg)`: 发送 Null 帧
     - `bl_nonstandard_ap_detect(void)`: 检测非标准 AP
     - `bl_tim_cnt_get(void)`: 获取 TIM 计数器值


# BLE

## `btble_lib_api.h` 头文件定义了蓝牙和 BLE 控制器的一些基础功能接口

1. **常量和数据结构定义**:
   - `MAX_SWITCHING_PATTERN_LEN`: 最大切换模式长度
   - `struct hci_le_rx_test_v2_cmd`: 定义了 BLE 接收测试的命令参数
   - `struct hci_le_tx_test_v4_cmd`: 定义了 BLE 发送测试的命令参数
   - `struct hci_vs_rx_test_cmd`: 定义了经典蓝牙接收测试的命令参数
   - `struct hci_vs_tx_test_cmd`: 定义了经典蓝牙发送测试的命令参数

2. **初始化和反初始化**:
   - `btble_controller_set_task_stack_size()`: 设置蓝牙/BLE 控制器任务的堆栈大小
   - `btble_controller_init()`: 初始化蓝牙/BLE 控制器
   - `ble_controller_deinit()`: 反初始化蓝牙/BLE 控制器

3. **功耗管理**:
   - `btble_controller_sleep()`: 进入蓝牙/BLE 控制器的睡眠模式
   - `btble_controller_sleep_restore()`: 从睡眠模式恢复
   - `ble_controller_sleep_is_ongoing()`: 检查当前是否处于睡眠状态
   - 一些与睡眠相关的回调函数定义, 如 `btble_before_sleep_cb_t`、`btble_after_sleep_cb_t`、`btble_sleep_aborted_cb_t`

4. **测试模式相关**:
   - `#if defined(CONFIG_BLE_MFG)`: BLE 制造测试相关
     - `hci_le_tx_test_v2_cmd_handler()`: 处理 BLE 发送测试 v2 命令
     - `hci_le_tx_test_v4_cmd_handler()`: 处理 BLE 发送测试 v4 命令
     - `hci_le_rx_test_v2_cmd_handler()`: 处理 BLE 接收测试 v2 命令
     - `hci_le_test_end_cmd_handler()`: 处理 BLE 测试结束命令
     - `ble_check_test_ongoing()`: 检查 BLE 测试是否正在进行
   - `#if defined(CONFIG_BT_MFG)`: 经典蓝牙制造测试相关
     - `hci_vs_rx_test_cmd_handler()`: 处理经典蓝牙接收测试命令
     - `hci_vs_tx_test_cmd_handler()`: 处理经典蓝牙发送测试命令
     - `hci_vs_test_end_cmd_handler()`: 处理经典蓝牙测试结束命令

5. **其他功能**:
   - `btblecontroller_main()`: 蓝牙/BLE 控制器的主入口函数
   - `btblecontroller_change_scan_itl_win()`: 修改扫描间隔和窗口
   - `ble_controller_reset()`: 重置蓝牙/BLE 控制器
   - `btble_controller_get_lib_ver()`: 获取库版本信息
   - `btble_controller_remaining_mem()`: 获取剩余内存
   - `btble_controller_set_cs2()`: 设置 CS2 模式

总的来说,这个头文件定义了蓝牙和 BLE 控制器的一些基本功能,包括初始化、睡眠管理、测试模式以及一些其他辅助功能。这些接口为上层应用程序提供了与蓝牙/BLE 控制器交互的基础。

##  `hci_onchip.h` 头文件定义了一个基于片上的 HCI 接口,用于在蓝牙/BLE 和主机之间进行数据交换

1. **数据包类型定义**:
   - `BT_HCI_CMD`: HCI 命令数据包
   - `BT_HCI_ACL_DATA`: HCI ACL 数据包
   - `BT_HCI_CMD_CMP_EVT`: HCI 命令完成事件
   - `BT_HCI_CMD_STAT_EVT`: HCI 命令状态事件
   - `BT_HCI_LE_EVT`: HCI LE 事件
   - `BT_HCI_EVT`: HCI 事件
   - `BT_HCI_SYNC_DATA`: HCI 同步数据
   - `BT_HCI_DBG_EVT`: HCI 调试事件

2. **数据结构定义**:
   - `bl_hci_cmd_struct`: 定义了 HCI 命令数据包的结构,包括命令码、参数等
   - `bl_hci_acl_data_tx`: 定义了 ACL 数据发送的数据结构,包括连接句柄、数据长度等
   - `hci_pkt_struct`: 定义了一个联合体,可以表示 HCI 命令或 ACL 数据

3. **回调函数定义**:
   - `bt_hci_recv_cb`: 接收 HCI 数据包的回调函数

4. **接口定义**:
   - `bt_onchiphci_interface_init()`: 初始化 HCI 接口,并注册接收数据的回调函数
   - `bt_onchiphci_send()`: 发送 HCI 数据包
   - `bt_onchiphci_hanlde_rx_acl()`: 处理接收到的 ACL 数据包

这个头文件定义了一个基于片上的 HCI 接口,用于在蓝牙/BLE 控制器和主机之间交换各种类型的数据包,包括命令、事件、ACL 数据等。这些接口可以为上层应用程序提供与蓝牙/BLE 控制器进行通信的基础。

## 