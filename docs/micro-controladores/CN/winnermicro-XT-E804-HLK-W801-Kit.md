---
slug: winnermicro-XT-E804-HLK-W801-Kit
title: Winnermicro XT-E804 HLK-W801 Kit 使用指南 | Winnermicro XT-E804 HLK-W801 Kit User Guide
authors:
  - name: w0x7ce
    title: 嵌入式系統工程師
    url: https://github.com/tianrking
    image_url: https://github.com/tianrking.png
tags: [XT-E804, HLK-W801, 嵌入式系統, 開發板, Wi-Fi, 物聯網]
---

https://github.com/tianrking/wm_sdk_w80x

W801开发板连上USB后, 会正常开始运行片内烧录的程序
使用Putty, XShell, Cutecom, Minicom这些串口程序连接W801开发板时, 会立即暂停运行, 使用联盛德Upgrade Tools, XCOM等软件则不会, 经检查, 区别在于RTS是否被拉低, 正常运行时RTS必须处于高电平状态.
串口拉低RTS时, W801开发板其实就被重置了, 如果不拉高则一直处于停止状态, 如果拉高则会复位重启
在Cutecom, Minicom这些串口程序断开连接后, RTS恢复高电平, W801开发板会复位重新运行

下载烧录W801时, 需要将rules.mk中的-rs参数修改一下, 从at改为rts

monitor:
	@$(WM_TOOL) -c $(DL_PORT) -sl str -ws 115200

run:all
	@$(WM_TOOL) -c $(DL_PORT) -rs rts -ds $(DL_BAUD) -dl $(FIRMWAREDIR)/$(TARGET)/$(TARGET).fls -sl str -ws 115200

list:
	@$(WM_TOOL) -l

down:
	@$(WM_TOOL) -c $(DL_PORT) -rs rts -ds $(DL_BAUD) -dl $(FIRMWAREDIR)/$(TARGET)/$(TARGET).fls

image:all
	@$(WM_TOOL) -c $(DL_PORT) -rs at -ds $(DL_BAUD) -dl $(FIRMWAREDIR)/$(TARGET)/$(TARGET).img

flash:all
	@$(WM_TOOL) -c $(DL_PORT) -rs rts -ds $(DL_BAUD) -dl $(FIRMWAREDIR)/$(TARGET)/$(TARGET).fls

erase:
	@$(WM_TOOL) -c $(DL_PORT) -rs at -eo all

.subdirs:
	@set -e; $(foreach d, $(SUBDIRS), $(MAKE) -C $(d);)


W801 LED, 分别对应PB5, PB25, PB26, PB18, PB17, PB16, PB11, 但是里面对应PWM复用的只有PB25和PB16
W806 LED, 分别对应PB0, PB1, PB2, 都是对应PWM复用的PIN脚