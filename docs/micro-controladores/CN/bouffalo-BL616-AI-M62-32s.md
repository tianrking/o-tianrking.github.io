---
slug: bouffalo-BL616-AI-M62-32s 
title: Bouffalo BL616 AI-M62-32S 使用指南 | Bouffalo BL616 AI-M62-32S User Guide
authors:
  - name: w0x7ce
    title: 嵌入式系統工程師
    url: https://github.com/tianrking
    image_url: https://github.com/tianrking.png
tags: [BL616, 嵌入式系統, 人工智能, 物聯網]
---

https://github.com/bouffalolab/bouffalo_sdk
https://github.com/Ai-Thinker-Open/aithinker_Ai-M6X_SDK

git clone https://github.com/bouffalolab/toolchain_gcc_t-head_linux
export PATH=$PATH:./toolchain_gcc_t-head_linux/bin/

cd examples/helloworld
make CHIP=bl616 BOARD=bl616dk

cd examples/helloworld
make flash CHIP=chip_name COMX=xxx # chip_name should be bl602/bl702/bl616/bl808/bl606p, COMX in Windows, /dev/ttyxxx in Linux

BL808 or BL606P, you need to add CPU_ID with m0 or d0.
cd examples/helloworld
make flash CHIP=chip_name CPU_ID=m0 COMX=xxx # chip_name should be bl602/bl702/bl616/bl808/bl606p, COMX in Windows, /dev/ttyxxx in Linux
