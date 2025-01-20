"use strict";(self.webpackChunkEl_Jardin_Secreto_de_w0x7ce=self.webpackChunkEl_Jardin_Secreto_de_w0x7ce||[]).push([[809],{7644:(n,i,e)=>{e.r(i),e.d(i,{assets:()=>c,contentTitle:()=>o,default:()=>a,frontMatter:()=>r,metadata:()=>t,toc:()=>d});var s=e(4848),l=e(8453);const r={slug:"mastering-pio-programming-rp2040",title:"Mastering PIO Programming on RP2040",authors:[{name:"w0x7ce",title:"Embedded Systems Engineer",url:"https://github.com/tianrking",image_url:"https://github.com/tianrking.png"}],tags:["RP2040","PIO","Raspberry Pi Pico","embedded systems"]},o="RP2040 PIO \u7de8\u7a0b\u6df1\u5165\u63a2\u7d22\uff1a\u5f9e LED \u9583\u720d\u5230\u7cbe\u78ba\u6642\u5e8f\u63a7\u5236",t={id:"micro-controladores/RP2040/mastering-pio-programming",title:"Mastering PIO Programming on RP2040",description:"1. PIO \u7c21\u4ecb",source:"@site/docs/micro-controladores/RP2040/mastering-pio-programming.md",sourceDirName:"micro-controladores/RP2040",slug:"/micro-controladores/RP2040/mastering-pio-programming-rp2040",permalink:"/micro-controladores/RP2040/mastering-pio-programming-rp2040",draft:!1,unlisted:!1,editUrl:"https://github.com/tianrking/tianrking.github.io/tree/V3.4/docs/micro-controladores/RP2040/mastering-pio-programming.md",tags:[{inline:!0,label:"RP2040",permalink:"/tags/rp-2040"},{inline:!0,label:"PIO",permalink:"/tags/pio"},{inline:!0,label:"Raspberry Pi Pico",permalink:"/tags/raspberry-pi-pico"},{inline:!0,label:"embedded systems",permalink:"/tags/embedded-systems"}],version:"current",lastUpdatedAt:1720686461e3,frontMatter:{slug:"mastering-pio-programming-rp2040",title:"Mastering PIO Programming on RP2040",authors:[{name:"w0x7ce",title:"Embedded Systems Engineer",url:"https://github.com/tianrking",image_url:"https://github.com/tianrking.png"}],tags:["RP2040","PIO","Raspberry Pi Pico","embedded systems"]},sidebar:"tutorialSidebar",previous:{title:"Timer and Alarm Usage in RP2040",permalink:"/micro-controladores/RP2040/rp2040-timer-and-alarm-usage"},next:{title:"Implementing UART (TX )with PIO on RP2040",permalink:"/micro-controladores/RP2040/pio-uart-implementation-rp2040"}},c={},d=[{value:"1. PIO \u7c21\u4ecb",id:"1-pio-\u7c21\u4ecb",level:2},{value:"2. LED \u9583\u720d\u793a\u4f8b",id:"2-led-\u9583\u720d\u793a\u4f8b",level:2},{value:"2.1 PIO \u7a0b\u5e8f (blink.pio)",id:"21-pio-\u7a0b\u5e8f-blinkpio",level:3},{value:"2.2 \u4e3b\u7a0b\u5e8f (main.cpp)",id:"22-\u4e3b\u7a0b\u5e8f-maincpp",level:3},{value:"\u4ee3\u78bc\u89e3\u91cb\uff1a",id:"\u4ee3\u78bc\u89e3\u91cb",level:3},{value:"3. PIO \u6307\u4ee4\u9031\u671f\u5206\u6790",id:"3-pio-\u6307\u4ee4\u9031\u671f\u5206\u6790",level:2},{value:"4. \u983b\u7387\u8a08\u7b97",id:"4-\u983b\u7387\u8a08\u7b97",level:2},{value:"5. PIO \u7de8\u7a0b\u9650\u5236",id:"5-pio-\u7de8\u7a0b\u9650\u5236",level:2},{value:"6. \u512a\u5316\u6280\u5de7",id:"6-\u512a\u5316\u6280\u5de7",level:2},{value:"7. \u6ce8\u610f\u4e8b\u9805",id:"7-\u6ce8\u610f\u4e8b\u9805",level:2},{value:"\u5b8c\u6574\u4ee3\u7801",id:"\u5b8c\u6574\u4ee3\u7801",level:2}];function p(n){const i={code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,l.R)(),...n.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(i.h1,{id:"rp2040-pio-\u7de8\u7a0b\u6df1\u5165\u63a2\u7d22\u5f9e-led-\u9583\u720d\u5230\u7cbe\u78ba\u6642\u5e8f\u63a7\u5236",children:"RP2040 PIO \u7de8\u7a0b\u6df1\u5165\u63a2\u7d22\uff1a\u5f9e LED \u9583\u720d\u5230\u7cbe\u78ba\u6642\u5e8f\u63a7\u5236"}),"\n",(0,s.jsx)(i.h2,{id:"1-pio-\u7c21\u4ecb",children:"1. PIO \u7c21\u4ecb"}),"\n",(0,s.jsx)(i.p,{children:"\u53ef\u7de8\u7a0b\u8f38\u5165/\u8f38\u51fa\uff08PIO\uff09\u662f RP2040 \u6676\u7247\u7684\u4e00\u500b\u5f37\u5927\u7279\u6027\u3002\u5b83\u5141\u8a31\u958b\u767c\u8005\u5275\u5efa\u81ea\u5b9a\u7fa9\u7684\u6578\u5b57\u63a5\u53e3\uff0c\u5be6\u73fe\u7cbe\u78ba\u7684\u6642\u5e8f\u63a7\u5236\u3002\u6bcf\u500b RP2040 \u6709\u5169\u500b PIO \u584a\uff0c\u6bcf\u500b\u584a\u6709\u56db\u500b\u72c0\u614b\u6a5f\u3002"}),"\n",(0,s.jsx)(i.h2,{id:"2-led-\u9583\u720d\u793a\u4f8b",children:"2. LED \u9583\u720d\u793a\u4f8b"}),"\n",(0,s.jsx)(i.h3,{id:"21-pio-\u7a0b\u5e8f-blinkpio",children:"2.1 PIO \u7a0b\u5e8f (blink.pio)"}),"\n",(0,s.jsx)(i.p,{children:"\u8b93\u6211\u5011\u5f9e\u4e00\u500b\u7cbe\u78ba\u63a7\u5236\u7684 LED \u9583\u720d\u7a0b\u5e8f\u958b\u59cb\uff1a"}),"\n",(0,s.jsx)(i.pre,{children:(0,s.jsx)(i.code,{children:".program blink\n.wrap_target\n    set pins, 1 [31]    ; \u6253\u958b LED \u4e26\u7b49\u5f85 31 \u500b\u9031\u671f\n    nop         [31]    ; \u7b49\u5f85 32 \u500b\u9031\u671f\n    nop         [31]    ; \u7b49\u5f85 32 \u500b\u9031\u671f\n    nop         [31]    ; \u7b49\u5f85 32 \u500b\u9031\u671f\n    nop         [31]    ; \u7b49\u5f85 32 \u500b\u9031\u671f\n    nop         [31]    ; \u7b49\u5f85 32 \u500b\u9031\u671f\n    nop         [31]    ; \u7b49\u5f85 32 \u500b\u9031\u671f\n    nop         [31]    ; \u7b49\u5f85 32 \u500b\u9031\u671f\n    nop         [31]    ; \u7b49\u5f85 32 \u500b\u9031\u671f\n    nop         [31]    ; \u7b49\u5f85 32 \u500b\u9031\u671f\n    nop         [31]    ; \u7b49\u5f85 32 \u500b\u9031\u671f\n    nop         [31]    ; \u7b49\u5f85 32 \u500b\u9031\u671f\n    nop         [31]    ; \u7b49\u5f85 32 \u500b\u9031\u671f\n    nop         [31]    ; \u7b49\u5f85 32 \u500b\u9031\u671f\n    nop         [31]    ; \u7b49\u5f85 32 \u500b\u9031\u671f\n    nop         [19]    ; \u7b49\u5f85 20 \u500b\u9031\u671f\n    set pins, 0 [31]    ; \u95dc\u9589 LED \u4e26\u7b49\u5f85 31 \u500b\u9031\u671f\n    nop         [31]    ; \u7b49\u5f85 32 \u500b\u9031\u671f\n    nop         [31]    ; \u7b49\u5f85 32 \u500b\u9031\u671f\n    nop         [31]    ; \u7b49\u5f85 32 \u500b\u9031\u671f\n    nop         [31]    ; \u7b49\u5f85 32 \u500b\u9031\u671f\n    nop         [31]    ; \u7b49\u5f85 32 \u500b\u9031\u671f\n    nop         [31]    ; \u7b49\u5f85 32 \u500b\u9031\u671f\n    nop         [31]    ; \u7b49\u5f85 32 \u500b\u9031\u671f\n    nop         [31]    ; \u7b49\u5f85 32 \u500b\u9031\u671f\n    nop         [31]    ; \u7b49\u5f85 32 \u500b\u9031\u671f\n    nop         [31]    ; \u7b49\u5f85 32 \u500b\u9031\u671f\n    nop         [31]    ; \u7b49\u5f85 32 \u500b\u9031\u671f\n    nop         [31]    ; \u7b49\u5f85 32 \u500b\u9031\u671f\n    nop         [31]    ; \u7b49\u5f85 32 \u500b\u9031\u671f\n    nop         [31]    ; \u7b49\u5f85 32 \u500b\u9031\u671f\n    nop         [19]    ; \u7b49\u5f85 20 \u500b\u9031\u671f\n.wrap\n\n% c-sdk {\n// Helper function to initialize PIO program\nvoid blink_program_init(PIO pio, uint sm, uint offset, uint pin, float freq) {\n    pio_sm_config c = blink_program_get_default_config(offset);\n    pio_gpio_init(pio, pin);\n    sm_config_set_set_pins(&c, pin, 1);\n    pio_sm_set_consecutive_pindirs(pio, sm, pin, 1, true);\n    float div = clock_get_hz(clk_sys) / freq;\n    sm_config_set_clkdiv(&c, div);\n    pio_sm_init(pio, sm, offset, &c);\n}\n%}\n"})}),"\n",(0,s.jsx)(i.h3,{id:"22-\u4e3b\u7a0b\u5e8f-maincpp",children:"2.2 \u4e3b\u7a0b\u5e8f (main.cpp)"}),"\n",(0,s.jsx)(i.p,{children:"\u73fe\u5728\u8b93\u6211\u5011\u770b\u770b\u5982\u4f55\u5728\u4e3b\u7a0b\u5e8f\u4e2d\u8a2d\u7f6e\u548c\u904b\u884c\u9019\u500b PIO \u7a0b\u5e8f\uff1a"}),"\n",(0,s.jsx)(i.pre,{children:(0,s.jsx)(i.code,{className:"language-cpp",children:'#include "pico/stdlib.h"\n#include "hardware/pio.h"\n#include "hardware/clocks.h"\n#include "blink.pio.h"\n\nint main() {\n    static const uint LED_PIN = 25;\n    static const float PIO_FREQ = 2000;  // \u8a2d\u7f6e PIO \u983b\u7387\u70ba 2000 Hz\n\n    // \u9078\u64c7 PIO \u5be6\u4f8b\uff080 \u6216 1\uff09\n    PIO pio = pio0;\n\n    // \u7372\u53d6 PIO \u7a0b\u5e8f\u4e2d\u7684\u7b2c\u4e00\u500b\u7a7a\u9592\u72c0\u614b\u6a5f\n    uint sm = pio_claim_unused_sm(pio, true);\n\n    // \u5c07 PIO \u7a0b\u5e8f\u6dfb\u52a0\u5230 PIO \u6307\u4ee4\u5167\u5b58\u4e2d\n    uint offset = pio_add_program(pio, &blink_program);\n\n    // \u8a08\u7b97 PIO \u6642\u9418\u5206\u983b\u5668\n    float div = (float)clock_get_hz(clk_sys) / PIO_FREQ;\n\n    // \u4f7f\u7528\u6211\u5011\u7684 .pio \u6587\u4ef6\u4e2d\u7684\u8f14\u52a9\u51fd\u6578\u521d\u59cb\u5316\u7a0b\u5e8f\n    blink_program_init(pio, sm, offset, LED_PIN, PIO_FREQ);\n\n    // \u555f\u52d5 PIO \u7a0b\u5e8f\n    pio_sm_set_enabled(pio, sm, true);\n\n    // \u4e3b\u5faa\u74b0\u4fdd\u6301\u7a0b\u5e8f\u904b\u884c\n    while (true) {\n        sleep_ms(1000);\n    }\n}\n'})}),"\n",(0,s.jsx)(i.h3,{id:"\u4ee3\u78bc\u89e3\u91cb",children:"\u4ee3\u78bc\u89e3\u91cb\uff1a"}),"\n",(0,s.jsxs)(i.ul,{children:["\n",(0,s.jsxs)(i.li,{children:[(0,s.jsx)(i.code,{children:"PIO_FREQ"})," \u8a2d\u7f6e\u70ba 2000 Hz\uff0c\u9019\u6c7a\u5b9a\u4e86 PIO \u72c0\u614b\u6a5f\u7684\u904b\u884c\u901f\u5ea6\u3002"]}),"\n",(0,s.jsxs)(i.li,{children:[(0,s.jsx)(i.code,{children:"blink_program_init"})," \u51fd\u6578\u7528\u65bc\u8a2d\u7f6e PIO \u72c0\u614b\u6a5f\uff0c\u5305\u62ec\u8a2d\u7f6e\u6642\u9418\u5206\u983b\u5668\u3002"]}),"\n",(0,s.jsxs)(i.li,{children:["\u6642\u9418\u5206\u983b\u5668\u7684\u8a08\u7b97\uff1a",(0,s.jsx)(i.code,{children:"div = clock_get_hz(clk_sys) / PIO_FREQ"}),"\n",(0,s.jsxs)(i.ul,{children:["\n",(0,s.jsxs)(i.li,{children:[(0,s.jsx)(i.code,{children:"clock_get_hz(clk_sys)"})," \u7372\u53d6\u7cfb\u7d71\u6642\u9418\u983b\u7387\uff08\u901a\u5e38\u70ba 125 MHz\uff09"]}),"\n",(0,s.jsx)(i.li,{children:"\u5206\u983b\u5f8c\uff0cPIO \u5c07\u4ee5 2000 Hz \u7684\u983b\u7387\u904b\u884c"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(i.h2,{id:"3-pio-\u6307\u4ee4\u9031\u671f\u5206\u6790",children:"3. PIO \u6307\u4ee4\u9031\u671f\u5206\u6790"}),"\n",(0,s.jsx)(i.p,{children:"\u6bcf\u689d PIO \u6307\u4ee4\u7684\u57f7\u884c\u9031\u671f\u7531\u5169\u90e8\u5206\u7d44\u6210\uff1a"}),"\n",(0,s.jsxs)(i.ol,{children:["\n",(0,s.jsx)(i.li,{children:"\u6307\u4ee4\u672c\u8eab\u7684\u57f7\u884c\uff081 \u500b\u9031\u671f\uff09"}),"\n",(0,s.jsx)(i.li,{children:"\u6307\u4ee4\u5f8c\u7684\u984d\u5916\u5ef6\u9072\uff080 \u5230 31 \u500b\u9031\u671f\uff09"}),"\n"]}),"\n",(0,s.jsx)(i.p,{children:"\u4f8b\u5982\uff1a"}),"\n",(0,s.jsxs)(i.ul,{children:["\n",(0,s.jsxs)(i.li,{children:[(0,s.jsx)(i.code,{children:"set pins, 1 [31]"})," \u7e3d\u5171\u57f7\u884c 32 \u500b\u9031\u671f\uff1a1 \u500b\u7528\u65bc\u6307\u4ee4\u57f7\u884c\uff0c31 \u500b\u7528\u65bc\u5ef6\u9072"]}),"\n",(0,s.jsxs)(i.li,{children:[(0,s.jsx)(i.code,{children:"nop [31]"})," \u4e5f\u57f7\u884c 32 \u500b\u9031\u671f"]}),"\n",(0,s.jsxs)(i.li,{children:[(0,s.jsx)(i.code,{children:"nop [19]"})," \u57f7\u884c 20 \u500b\u9031\u671f\uff1a1 \u500b\u7528\u65bc\u6307\u4ee4\u57f7\u884c\uff0c19 \u500b\u7528\u65bc\u5ef6\u9072"]}),"\n"]}),"\n",(0,s.jsx)(i.h2,{id:"4-\u983b\u7387\u8a08\u7b97",children:"4. \u983b\u7387\u8a08\u7b97"}),"\n",(0,s.jsx)(i.p,{children:"\u6839\u64da\u6211\u5011\u7684\u8a2d\u7f6e\uff0cPIO \u6642\u9418\u983b\u7387\u70ba 2000 Hz\uff1a"}),"\n",(0,s.jsxs)(i.ul,{children:["\n",(0,s.jsx)(i.li,{children:"LED \u958b\u555f\u72c0\u614b\uff1a(1 + 14) * 32 + 20 = 500 \u500b\u9031\u671f"}),"\n",(0,s.jsx)(i.li,{children:"LED \u95dc\u9589\u72c0\u614b\uff1a\u540c\u6a23\u662f 500 \u500b\u9031\u671f"}),"\n",(0,s.jsx)(i.li,{children:"\u5b8c\u6574\u5faa\u74b0\uff1a500 + 500 = 1000 \u500b\u9031\u671f"}),"\n",(0,s.jsx)(i.li,{children:"\u9583\u720d\u983b\u7387\uff1a2000 Hz / 1000 = 2 Hz"}),"\n"]}),"\n",(0,s.jsx)(i.p,{children:"\u9019\u89e3\u91cb\u4e86\u70ba\u4ec0\u9ebc LED \u4ee5 2 Hz \u7684\u983b\u7387\u9583\u720d\uff08\u6bcf\u79d2\u9583\u720d\u5169\u6b21\uff09\u3002"}),"\n",(0,s.jsx)(i.h2,{id:"5-pio-\u7de8\u7a0b\u9650\u5236",children:"5. PIO \u7de8\u7a0b\u9650\u5236"}),"\n",(0,s.jsxs)(i.ol,{children:["\n",(0,s.jsxs)(i.li,{children:["\n",(0,s.jsx)(i.p,{children:"\u6307\u4ee4\u5ef6\u9072\u9650\u5236\uff1a"}),"\n",(0,s.jsxs)(i.ul,{children:["\n",(0,s.jsx)(i.li,{children:"\u6bcf\u689d\u6307\u4ee4\u7684\u5ef6\u9072\u5fc5\u9808 \u2264 31"}),"\n",(0,s.jsx)(i.li,{children:"\u539f\u56e0\uff1a\u5ef6\u9072\u503c\u5728\u6307\u4ee4\u7de8\u78bc\u4e2d\u4f54\u7528 5 \u4f4d"}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(i.li,{children:["\n",(0,s.jsx)(i.p,{children:"\u7a0b\u5e8f\u5927\u5c0f\u9650\u5236\uff1a"}),"\n",(0,s.jsxs)(i.ul,{children:["\n",(0,s.jsx)(i.li,{children:"\u6bcf\u500b PIO \u7a0b\u5e8f\u6700\u591a\u53ea\u80fd\u5305\u542b 32 \u689d\u6307\u4ee4"}),"\n",(0,s.jsx)(i.li,{children:"\u539f\u56e0\uff1a\u786c\u4ef6\u8a2d\u8a08\u9650\u5236\uff0c\u6bcf\u500b PIO \u584a\u6709 32 \u500b\u6307\u4ee4\u69fd"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(i.h2,{id:"6-\u512a\u5316\u6280\u5de7",children:"6. \u512a\u5316\u6280\u5de7"}),"\n",(0,s.jsxs)(i.ol,{children:["\n",(0,s.jsx)(i.li,{children:"\u5229\u7528\u5faa\u74b0\u6e1b\u5c11\u6307\u4ee4\u6578\u91cf"}),"\n",(0,s.jsx)(i.li,{children:"\u4f7f\u7528\u5074\u8a2d\uff08side-set\uff09\u529f\u80fd\u540c\u6642\u57f7\u884c GPIO \u64cd\u4f5c\u548c\u5176\u4ed6\u6307\u4ee4"}),"\n",(0,s.jsx)(i.li,{children:"\u9069\u7576\u8a2d\u7f6e\u6642\u9418\u5206\u983b\u4ee5\u9054\u5230\u6240\u9700\u7684\u6642\u5e8f"}),"\n"]}),"\n",(0,s.jsx)(i.h2,{id:"7-\u6ce8\u610f\u4e8b\u9805",children:"7. \u6ce8\u610f\u4e8b\u9805"}),"\n",(0,s.jsx)(i.p,{children:"\u5728\u4f7f\u7528 RP2040 \u7684 PIO \u9032\u884c\u7de8\u7a0b\u6642\uff0c\u9700\u8981\u6ce8\u610f\u4ee5\u4e0b\u5e7e\u500b\u91cd\u8981\u7684\u9650\u5236\u548c\u8003\u616e\u56e0\u7d20\uff1a"}),"\n",(0,s.jsxs)(i.ol,{children:["\n",(0,s.jsxs)(i.li,{children:["\n",(0,s.jsxs)(i.p,{children:[(0,s.jsx)(i.strong,{children:"\u6307\u4ee4\u5ef6\u9072\u9650\u5236"}),":"]}),"\n",(0,s.jsxs)(i.ul,{children:["\n",(0,s.jsx)(i.li,{children:"\u6bcf\u689d\u6307\u4ee4\u7684\u5ef6\u9072\u5fc5\u9808\u5c0f\u65bc\u6216\u7b49\u65bc 31 \u500b\u9031\u671f"}),"\n",(0,s.jsx)(i.li,{children:'\u932f\u8aa4\u4fe1\u606f: "instruction delay must be < = 31"'}),"\n",(0,s.jsx)(i.li,{children:"\u539f\u56e0: \u5ef6\u9072\u503c\u5728\u6307\u4ee4\u7de8\u78bc\u4e2d\u50c5\u4f54\u7528 5 \u4f4d\u4e8c\u9032\u5236"}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(i.li,{children:["\n",(0,s.jsxs)(i.p,{children:[(0,s.jsx)(i.strong,{children:"\u7a0b\u5e8f\u5927\u5c0f\u9650\u5236"}),":"]}),"\n",(0,s.jsxs)(i.ul,{children:["\n",(0,s.jsx)(i.li,{children:"\u6bcf\u500b PIO \u7a0b\u5e8f\u6700\u591a\u53ea\u80fd\u5305\u542b 32 \u689d\u6307\u4ee4"}),"\n",(0,s.jsx)(i.li,{children:'\u932f\u8aa4\u4fe1\u606f: "program instruction limit of 32 instruction(s) exceeded"'}),"\n",(0,s.jsx)(i.li,{children:"\u539f\u56e0: \u786c\u4ef6\u8a2d\u8a08\u9650\u5236\uff0c\u6bcf\u500b PIO \u584a\u6709 32 \u500b\u6307\u4ee4\u69fd"}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(i.li,{children:["\n",(0,s.jsxs)(i.p,{children:[(0,s.jsx)(i.strong,{children:"\u6642\u9418\u5206\u983b\u5668 (div) \u7bc4\u570d"}),":"]}),"\n",(0,s.jsxs)(i.ul,{children:["\n",(0,s.jsx)(i.li,{children:"\u6709\u6548\u7bc4\u570d: 1.0 \u5230 65536.0"}),"\n",(0,s.jsx)(i.li,{children:"\u6700\u5c0f\u503c 1.0 \u5c0d\u61c9\u6700\u5feb\u901f\u5ea6\uff08\u7cfb\u7d71\u6642\u9418\u983b\u7387\uff09"}),"\n",(0,s.jsx)(i.li,{children:"\u6700\u5927\u503c 65536.0 \u5c0d\u61c9\u6700\u6162\u901f\u5ea6\uff08\u7cfb\u7d71\u6642\u9418\u983b\u7387\u9664\u4ee5 65536\uff09"}),"\n",(0,s.jsx)(i.li,{children:"\u6ce8\u610f: \u7576\u8a08\u7b97\u51fa\u7684 div \u503c\u8d85\u51fa\u6b64\u7bc4\u570d\u6642\uff0c\u5be6\u969b\u904b\u884c\u983b\u7387\u53ef\u80fd\u8207\u9810\u671f\u4e0d\u7b26"}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(i.li,{children:["\n",(0,s.jsxs)(i.p,{children:[(0,s.jsx)(i.strong,{children:"GPIO \u5f15\u8173\u9650\u5236"}),":"]}),"\n",(0,s.jsxs)(i.ul,{children:["\n",(0,s.jsx)(i.li,{children:"PIO \u53ef\u4ee5\u8a2a\u554f\u7684 GPIO \u5f15\u8173\u7bc4\u570d: 0-29"}),"\n",(0,s.jsx)(i.li,{children:"\u67d0\u4e9b\u7279\u6b8a\u529f\u80fd\u5f15\u8173\u53ef\u80fd\u6709\u984d\u5916\u9650\u5236"}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(i.li,{children:["\n",(0,s.jsxs)(i.p,{children:[(0,s.jsx)(i.strong,{children:"\u72c0\u614b\u6a5f\u6578\u91cf"}),":"]}),"\n",(0,s.jsxs)(i.ul,{children:["\n",(0,s.jsx)(i.li,{children:"\u6bcf\u500b PIO \u584a\u6709 4 \u500b\u7368\u7acb\u7684\u72c0\u614b\u6a5f"}),"\n",(0,s.jsx)(i.li,{children:"\u7e3d\u5171\u6709 8 \u500b\u72c0\u614b\u6a5f\uff082 \u500b PIO \u584a * 4 \u500b\u72c0\u614b\u6a5f\uff09"}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(i.li,{children:["\n",(0,s.jsxs)(i.p,{children:[(0,s.jsx)(i.strong,{children:"FIFO \u6df1\u5ea6"}),":"]}),"\n",(0,s.jsxs)(i.ul,{children:["\n",(0,s.jsx)(i.li,{children:"\u6bcf\u500b\u72c0\u614b\u6a5f\u6709 4 \u500b\u5b57\uff0832 \u4f4d\uff09\u7684 TX FIFO \u548c 4 \u500b\u5b57\u7684 RX FIFO"}),"\n",(0,s.jsx)(i.li,{children:"\u5728\u6578\u64da\u5bc6\u96c6\u578b\u61c9\u7528\u4e2d\u9700\u8981\u8b39\u614e\u7ba1\u7406 FIFO"}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(i.li,{children:["\n",(0,s.jsxs)(i.p,{children:[(0,s.jsx)(i.strong,{children:"\u57f7\u884c\u901f\u5ea6\u8003\u616e"}),":"]}),"\n",(0,s.jsxs)(i.ul,{children:["\n",(0,s.jsx)(i.li,{children:"PIO \u6307\u4ee4\u57f7\u884c\u901f\u5ea6\u53ef\u4ee5\u975e\u5e38\u5feb\uff08\u6700\u9ad8\u53ef\u9054\u7cfb\u7d71\u6642\u9418\u983b\u7387\uff09"}),"\n",(0,s.jsx)(i.li,{children:"\u9700\u8981\u4ed4\u7d30\u8a08\u7b97\u6642\u5e8f\u4ee5\u78ba\u4fdd\u9810\u671f\u7684\u64cd\u4f5c\u983b\u7387"}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(i.li,{children:["\n",(0,s.jsxs)(i.p,{children:[(0,s.jsx)(i.strong,{children:"\u8207 CPU \u4ea4\u4e92"}),":"]}),"\n",(0,s.jsxs)(i.ul,{children:["\n",(0,s.jsx)(i.li,{children:"PIO \u64cd\u4f5c\u662f\u7368\u7acb\u65bc CPU \u7684\uff0c\u9700\u8981\u6b63\u78ba\u914d\u7f6e\u4e2d\u65b7\u548c DMA \u4ee5\u5be6\u73fe\u9ad8\u6548\u7684\u6578\u64da\u4ea4\u63db"}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(i.li,{children:["\n",(0,s.jsxs)(i.p,{children:[(0,s.jsx)(i.strong,{children:"\u5074\u8a2d\uff08Side-set\uff09\u9650\u5236"}),":"]}),"\n",(0,s.jsxs)(i.ul,{children:["\n",(0,s.jsx)(i.li,{children:"\u6700\u591a\u53ef\u4ee5\u4f7f\u7528 5 \u500b\u5074\u8a2d\u4f4d"}),"\n",(0,s.jsx)(i.li,{children:"\u4f7f\u7528\u5074\u8a2d\u6703\u6e1b\u5c11\u53ef\u7528\u65bc\u5ef6\u9072\u7684\u4f4d\u6578"}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(i.li,{children:["\n",(0,s.jsxs)(i.p,{children:[(0,s.jsx)(i.strong,{children:"\u8abf\u8a66\u96e3\u5ea6"}),":"]}),"\n",(0,s.jsxs)(i.ul,{children:["\n",(0,s.jsx)(i.li,{children:"PIO \u7a0b\u5e8f\u96e3\u4ee5\u76f4\u63a5\u8abf\u8a66"}),"\n",(0,s.jsx)(i.li,{children:"\u5efa\u8b70\u4f7f\u7528\u6a21\u64ec\u5668\u6216\u793a\u6ce2\u5668\u7b49\u5de5\u5177\u8f14\u52a9\u958b\u767c\u548c\u6e2c\u8a66"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(i.h2,{id:"\u5b8c\u6574\u4ee3\u7801",children:"\u5b8c\u6574\u4ee3\u7801"}),"\n",(0,s.jsx)(i.pre,{children:(0,s.jsx)(i.code,{className:"language-c++",metastring:'title="main.cpp"',children:'#include "pico/stdlib.h"\n#include "hardware/pio.h"\n#include "hardware/clocks.h"\n#include "hello.pio.h"\n\nint main() {\n\n    static const uint led_pin = 25;\n    static const float pio_freq = 2000;\n\n    // Choose PIO instance (0 or 1)\n    PIO pio = pio0;\n\n    // Get first free state machine in PIO 0\n    uint sm = pio_claim_unused_sm(pio, true);\n\n    // Add PIO program to PIO instruction memory. SDK will find location and\n    // return with the memory offset of the program.\n    uint offset = pio_add_program(pio, &blink_program);\n\n    // Calculate the PIO clock divider\n    float div = (float)clock_get_hz(clk_sys) / pio_freq;\n\n    // Initialize the program using the helper function in our .pio file\n    blink_program_init(pio, sm, offset, led_pin, div); //div\u6700\u5927\u5141\u8bb8\u6570\u503c65535\n\n    // Start running our PIO program in the state machine\n    pio_sm_set_enabled(pio, sm, true);\n\n    // Do nothing\n    while (true) {\n        sleep_ms(1000);\n    }\n}\n'})}),"\n",(0,s.jsx)(i.pre,{children:(0,s.jsx)(i.code,{className:"language-c++",metastring:'title="hello.pio"',children:".program blink\n\n; Turn on LED for 100 cycles and off for 100 cycles.\n; At 2 kHz, this will toggle pin at 10 Hz (200 cycles / 2000 Hz = 0.1 sec)\n\n; instruction delay must be <= 31\n; program instruction limit of 32 instruction(s) exceeded\n.wrap_target\n    set pins, 1 [31]    ; Turn LED on and wait another 19 cycles\n    nop         [31]\n    nop         [31]\n\n    nop         [31]\n    nop         [31]\n    nop         [31]\n    \n    nop         [31]    ; Wait 20 cycles\n    nop         [31]    ; Wait 20 cycles\n    nop         [31]    ; Wait 20 cycles\n    \n    nop         [31]    ; Wait 20 cycles\n    nop         [31]    ; Wait 20 cycles\n    nop         [31]    ; Wait 20 cycles\n    \n    nop         [31]    ; Wait 20 cycles\n    nop         [31]    ; Wait 20 cycles\n    nop         [31] \n    \n    nop         [19] \n\n    set pins, 0 [31]    ; Turn LED off and wait another 19 cycles\n    nop         [31]\n    nop         [31]\n\n    nop         [31]\n    nop         [31]\n    nop         [31]\n    \n    nop         [31]    ; Wait 20 cycles\n    nop         [31]    ; Wait 20 cycles\n    nop         [31]    ; Wait 20 cycles\n    \n    nop         [31]    ; Wait 20 cycles\n    nop         [31]    ; Wait 20 cycles\n    nop         [31]    ; Wait 20 cycles\n    \n    nop         [31]    ; Wait 20 cycles\n    nop         [31]    ; Wait 20 cycles\n    nop         [31] \n    \n    nop         [19] \n\n.wrap\n\n% c-sdk {\n\n// Helper function (for use in C program) to initialize this PIO program\nvoid blink_program_init(PIO pio, uint sm, uint offset, uint pin, float div) {\n\n    // Sets up state machine and wrap target. This function is automatically\n    // generated in blink.pio.h.\n    pio_sm_config c = blink_program_get_default_config(offset);\n\n    // Allow PIO to control GPIO pin (as output)\n    pio_gpio_init(pio, pin);\n\n    // Connect pin to SET pin (control with 'set' instruction)\n    sm_config_set_set_pins(&c, pin, 1);\n\n    // Set the pin direction to output (in PIO)\n    pio_sm_set_consecutive_pindirs(pio, sm, pin, 1, true);\n    \n    // Set the clock divider for the state machine\n    sm_config_set_clkdiv(&c, div);\n\n    // Load configuration and jump to start of the program\n    pio_sm_init(pio, sm, offset, &c);\n}\n\n%}\n"})})]})}function a(n={}){const{wrapper:i}={...(0,l.R)(),...n.components};return i?(0,s.jsx)(i,{...n,children:(0,s.jsx)(p,{...n})}):p(n)}},8453:(n,i,e)=>{e.d(i,{R:()=>o,x:()=>t});var s=e(6540);const l={},r=s.createContext(l);function o(n){const i=s.useContext(r);return s.useMemo((function(){return"function"==typeof n?n(i):{...i,...n}}),[i,n])}function t(n){let i;return i=n.disableParentContext?"function"==typeof n.components?n.components(l):n.components||l:o(n.components),s.createElement(r.Provider,{value:i},n.children)}}}]);