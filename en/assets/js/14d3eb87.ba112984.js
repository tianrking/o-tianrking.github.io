"use strict";(self.webpackChunkEl_Jardin_Secreto_de_w0x7ce=self.webpackChunkEl_Jardin_Secreto_de_w0x7ce||[]).push([[6725],{5427:(n,i,e)=>{e.r(i),e.d(i,{assets:()=>c,contentTitle:()=>r,default:()=>h,frontMatter:()=>t,metadata:()=>o,toc:()=>d});var l=e(4848),s=e(8453);const t={slug:"pio-uart-implementation-rp2040",title:"Implementing UART (TX )with PIO on RP2040",authors:[{name:"w0x7ce",title:"Embedded Systems Engineer",url:"https://github.com/tianrking",image_url:"https://github.com/tianrking.png"}],tags:["RP2040","PIO","UART","Raspberry Pi Pico","embedded systems","serial communication"]},r="RP2040 PIO UART(TX) \u5be6\u73fe\u7d9c\u5408\u7e3d\u7d50",o={id:"micro-controladores/RP2040/pio-uart-implementation",title:"Implementing UART (TX )with PIO on RP2040",description:"1. UART \u57fa\u672c\u539f\u7406",source:"@site/docs/micro-controladores/RP2040/pio-uart-implementation.md",sourceDirName:"micro-controladores/RP2040",slug:"/micro-controladores/RP2040/pio-uart-implementation-rp2040",permalink:"/en/micro-controladores/RP2040/pio-uart-implementation-rp2040",draft:!1,unlisted:!1,editUrl:"https://github.com/tianrking/tianrking.github.io/tree/V3.4/docs/micro-controladores/RP2040/pio-uart-implementation.md",tags:[{inline:!0,label:"RP2040",permalink:"/en/tags/rp-2040"},{inline:!0,label:"PIO",permalink:"/en/tags/pio"},{inline:!0,label:"UART",permalink:"/en/tags/uart"},{inline:!0,label:"Raspberry Pi Pico",permalink:"/en/tags/raspberry-pi-pico"},{inline:!0,label:"embedded systems",permalink:"/en/tags/embedded-systems"},{inline:!0,label:"serial communication",permalink:"/en/tags/serial-communication"}],version:"current",lastUpdatedAt:1720686461e3,frontMatter:{slug:"pio-uart-implementation-rp2040",title:"Implementing UART (TX )with PIO on RP2040",authors:[{name:"w0x7ce",title:"Embedded Systems Engineer",url:"https://github.com/tianrking",image_url:"https://github.com/tianrking.png"}],tags:["RP2040","PIO","UART","Raspberry Pi Pico","embedded systems","serial communication"]},sidebar:"tutorialSidebar",previous:{title:"Mastering PIO Programming on RP2040",permalink:"/en/micro-controladores/RP2040/mastering-pio-programming-rp2040"},next:{title:"Advanced PIO LED Control and Resource Management on RP2040",permalink:"/en/micro-controladores/RP2040/advanced-pio-led-control-resource-management-rp2040"}},c={},d=[{value:"1. UART \u57fa\u672c\u539f\u7406",id:"1-uart-\u57fa\u672c\u539f\u7406",level:2},{value:"2. PIO \u7a0b\u5e8f\u7d50\u69cb",id:"2-pio-\u7a0b\u5e8f\u7d50\u69cb",level:2},{value:"2.1 UART TX PIO \u7a0b\u5e8f",id:"21-uart-tx-pio-\u7a0b\u5e8f",level:3},{value:"2.2 FIFO \u4f7f\u7528\u548c\u5b57\u7b26\u5b58\u5132",id:"22-fifo-\u4f7f\u7528\u548c\u5b57\u7b26\u5b58\u5132",level:3},{value:"FIFO \u586b\u5145\u793a\u4f8b\uff08&quot;ABCD&quot;\uff09",id:"fifo-\u586b\u5145\u793a\u4f8babcd",level:4},{value:"2.3 \u6642\u5e8f\u63a7\u5236",id:"23-\u6642\u5e8f\u63a7\u5236",level:3},{value:"3. PIO \u521d\u59cb\u5316\u548c\u914d\u7f6e",id:"3-pio-\u521d\u59cb\u5316\u548c\u914d\u7f6e",level:2},{value:"4. FIFO \u4f7f\u7528\u548c\u7ba1\u7406",id:"4-fifo-\u4f7f\u7528\u548c\u7ba1\u7406",level:2},{value:"5. \u4e3b\u7a0b\u5e8f\u5be6\u73fe",id:"5-\u4e3b\u7a0b\u5e8f\u5be6\u73fe",level:2},{value:"6. \u6ce2\u7279\u7387\u8a08\u7b97\u548c\u7cbe\u5ea6",id:"6-\u6ce2\u7279\u7387\u8a08\u7b97\u548c\u7cbe\u5ea6",level:2},{value:"7. 8 \u4f4d UART \u50b3\u8f38\u8a73\u89e3\uff1a\u767c\u9001 &quot;ABC&quot;",id:"7-8-\u4f4d-uart-\u50b3\u8f38\u8a73\u89e3\u767c\u9001-abc",level:2},{value:"7.1 UART \u5e40\u7d50\u69cb\uff088N1 \u683c\u5f0f\uff09",id:"71-uart-\u5e40\u7d50\u69cb8n1-\u683c\u5f0f",level:3},{value:"7.2 \u5b57\u7b26 &quot;ABC&quot; \u7684\u4e8c\u9032\u5236\u8868\u793a",id:"72-\u5b57\u7b26-abc-\u7684\u4e8c\u9032\u5236\u8868\u793a",level:3},{value:"7.3 \u767c\u9001\u904e\u7a0b\u8a73\u89e3",id:"73-\u767c\u9001\u904e\u7a0b\u8a73\u89e3",level:3},{value:"7.4 FIFO \u64cd\u4f5c",id:"74-fifo-\u64cd\u4f5c",level:3},{value:"7.5 \u6642\u5e8f\u5206\u6790",id:"75-\u6642\u5e8f\u5206\u6790",level:3},{value:"8. \u9ad8\u7d1a\u8003\u616e\u56e0\u7d20",id:"8-\u9ad8\u7d1a\u8003\u616e\u56e0\u7d20",level:2},{value:"9. \u8abf\u8a66\u6280\u5de7",id:"9-\u8abf\u8a66\u6280\u5de7",level:2},{value:"10. \u6027\u80fd\u8003\u616e",id:"10-\u6027\u80fd\u8003\u616e",level:2},{value:"11. \u672a\u4f86\u64f4\u5c55",id:"11-\u672a\u4f86\u64f4\u5c55",level:2},{value:"\u5b8c\u6574\u4ee3\u78bc",id:"\u5b8c\u6574\u4ee3\u78bc",level:2}];function a(n){const i={admonition:"admonition",code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",li:"li",ol:"ol",p:"p",pre:"pre",ul:"ul",...(0,s.R)(),...n.components},{Details:e}=i;return e||function(n,i){throw new Error("Expected "+(i?"component":"object")+" `"+n+"` to be defined: you likely forgot to import, pass, or provide it.")}("Details",!0),(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(i.h1,{id:"rp2040-pio-uarttx-\u5be6\u73fe\u7d9c\u5408\u7e3d\u7d50",children:"RP2040 PIO UART(TX) \u5be6\u73fe\u7d9c\u5408\u7e3d\u7d50"}),"\n",(0,l.jsx)(i.h2,{id:"1-uart-\u57fa\u672c\u539f\u7406",children:"1. UART \u57fa\u672c\u539f\u7406"}),"\n",(0,l.jsxs)(i.admonition,{type:"info",children:[(0,l.jsx)(i.p,{children:"UART\uff08\u901a\u7528\u975e\u540c\u6b65\u6536\u767c\u50b3\u8f38\u5668\uff09\u662f\u4e00\u7a2e\u5e38\u7528\u7684\u4e32\u884c\u901a\u4fe1\u5354\u8b70\u3002\u5728\u6211\u5011\u7684\u5be6\u73fe\u4e2d\uff1a"}),(0,l.jsxs)(i.ul,{children:["\n",(0,l.jsx)(i.li,{children:"\u4f7f\u7528 8 \u6578\u64da\u4f4d\uff0c1 \u8d77\u59cb\u4f4d\uff0c1 \u505c\u6b62\u4f4d\uff088N1 \u683c\u5f0f\uff09"}),"\n",(0,l.jsx)(i.li,{children:"\u4e0d\u4f7f\u7528\u6d41\u63a7\u5236\u548c\u5947\u5076\u6821\u9a57"}),"\n",(0,l.jsx)(i.li,{children:"\u9810\u8a2d\u6ce2\u7279\u7387\u8a2d\u7f6e\u70ba 9600 bps"}),"\n"]})]}),"\n",(0,l.jsx)(i.h2,{id:"2-pio-\u7a0b\u5e8f\u7d50\u69cb",children:"2. PIO \u7a0b\u5e8f\u7d50\u69cb"}),"\n",(0,l.jsx)(i.h3,{id:"21-uart-tx-pio-\u7a0b\u5e8f",children:"2.1 UART TX PIO \u7a0b\u5e8f"}),"\n",(0,l.jsx)(i.pre,{children:(0,l.jsx)(i.code,{className:"language-pio",metastring:'title="uart_tx.pio"',children:".program uart_tx\n.side_set 1 opt\n\n    pull       side 1 [7]  ; \u5f9e FIFO \u7372\u53d6\u6578\u64da\uff0c\u8a2d\u7f6e\u505c\u6b62\u4f4d\uff08\u9ad8\u96fb\u5e73\uff09\n    set x, 7   side 0 [7]  ; \u8a2d\u7f6e\u5faa\u74b0\u8a08\u6578\u5668\uff0c\u767c\u9001\u8d77\u59cb\u4f4d\uff08\u4f4e\u96fb\u5e73\uff09\nbitloop:\n    out pins, 1            ; \u767c\u9001\u4e00\u4f4d\u6578\u64da\n    jmp x-- bitloop   [6]  ; \u5faa\u74b0\u76f4\u5230\u767c\u9001\u5b8c 8 \u4f4d\u6578\u64da\n"})}),"\n",(0,l.jsx)(i.admonition,{title:"\u95dc\u9375\u9ede",type:"tip",children:(0,l.jsxs)(i.ul,{children:["\n",(0,l.jsxs)(i.li,{children:[(0,l.jsx)(i.code,{children:".side_set 1 opt"}),": \u5b9a\u7fa9\u4e00\u500b\u53ef\u9078\u7684 1 \u4f4d\u5074\u8a2d\uff0c\u7528\u65bc\u63a7\u5236 TX \u5f15\u8173"]}),"\n",(0,l.jsxs)(i.li,{children:[(0,l.jsx)(i.code,{children:"pull"}),": \u5f9e TX FIFO \u7372\u53d6 32 \u4f4d\u6578\u64da"]}),"\n",(0,l.jsxs)(i.li,{children:[(0,l.jsx)(i.code,{children:"set x, 7"}),": \u8a2d\u7f6e\u5faa\u74b0\u8a08\u6578\u5668\u70ba 7\uff088\u4f4d\u6578\u64da\uff09"]}),"\n",(0,l.jsxs)(i.li,{children:[(0,l.jsx)(i.code,{children:"out pins, 1"}),": \u8f38\u51fa\u4e00\u4f4d\u6578\u64da"]}),"\n",(0,l.jsxs)(i.li,{children:[(0,l.jsx)(i.code,{children:"jmp x-- bitloop [6]"}),": \u5faa\u74b0\u767c\u9001 8 \u4f4d\u6578\u64da\uff0c\u6bcf\u6b21\u8fed\u4ee3 8 \u500b\u9031\u671f"]}),"\n"]})}),"\n",(0,l.jsx)(i.h3,{id:"22-fifo-\u4f7f\u7528\u548c\u5b57\u7b26\u5b58\u5132",children:"2.2 FIFO \u4f7f\u7528\u548c\u5b57\u7b26\u5b58\u5132"}),"\n",(0,l.jsxs)(e,{children:[(0,l.jsx)("summary",{children:"FIFO \u57fa\u672c\u5bb9\u91cf\u548c\u5408\u4f75"}),(0,l.jsxs)(i.ul,{children:["\n",(0,l.jsx)(i.li,{children:"\u6bcf\u500b\u65b9\u5411\uff08TX \u6216 RX\uff09\u7684 FIFO \u53ef\u4ee5\u5b58\u5132 4 \u500b 32 \u4f4d\u5b57\u3002"}),"\n",(0,l.jsx)(i.li,{children:"1 \u500b 32 \u4f4d\u5b57\u7406\u8ad6\u4e0a\u53ef\u5b58\u5132 4 \u500b char\uff08\u6bcf\u500b char 8 \u4f4d\uff09\u3002"}),"\n",(0,l.jsx)(i.li,{children:"TX \u548c RX FIFO \u5408\u4f75\u5f8c\uff0c\u6df1\u5ea6\u589e\u52a0\u5230 8 \u500b 32 \u4f4d\u5b57\u3002"}),"\n",(0,l.jsx)(i.li,{children:"\u7406\u8ad6\u4e0a\u5408\u4f75\u5f8c\u53ef\u5b58\u5132 32 \u500b char\u3002"}),"\n"]})]}),"\n",(0,l.jsx)(i.admonition,{title:"\u5be6\u969b\u4f7f\u7528\u4e2d\u7684 char \u5b58\u5132",type:"caution",children:(0,l.jsxs)(i.ul,{children:["\n",(0,l.jsx)(i.li,{children:"\u5178\u578b UART \u5be6\u73fe\u4e2d\uff0c\u901a\u5e38\u6bcf\u6b21\u53ea\u653e\u5165\u4e00\u500b char\uff088 \u4f4d\uff09\u5230 FIFO\u3002"}),"\n",(0,l.jsx)(i.li,{children:"PIO \u7a0b\u5e8f\u6bcf\u6b21\u5f9e FIFO \u53d6\u51fa 32 \u4f4d\u6578\u64da\uff0c\u4f46\u901a\u5e38\u53ea\u4f7f\u7528\u5176\u4e2d\u7684 8 \u4f4d\u3002"}),"\n"]})}),"\n",(0,l.jsx)(i.h4,{id:"fifo-\u586b\u5145\u793a\u4f8babcd",children:'FIFO \u586b\u5145\u793a\u4f8b\uff08"ABCD"\uff09'}),"\n",(0,l.jsx)(i.pre,{children:(0,l.jsx)(i.code,{children:"32\u4f4dFIFO\u689d\u76ee1: [A] [ ] [ ] [ ]  \uff08\u53ea\u6709 'A' \u88ab\u5b58\u5132\uff0c\u5176\u9918\u672a\u4f7f\u7528\uff09\n32\u4f4dFIFO\u689d\u76ee2: [B] [ ] [ ] [ ]  \uff08\u53ea\u6709 'B' \u88ab\u5b58\u5132\uff09\n32\u4f4dFIFO\u689d\u76ee3: [C] [ ] [ ] [ ]  \uff08\u53ea\u6709 'C' \u88ab\u5b58\u5132\uff09\n32\u4f4dFIFO\u689d\u76ee4: [D] [ ] [ ] [ ]  \uff08\u53ea\u6709 'D' \u88ab\u5b58\u5132\uff09\n"})}),"\n",(0,l.jsx)(i.admonition,{title:"FIFO \u4f7f\u7528\u7b56\u7565",type:"note",children:(0,l.jsxs)(i.ul,{children:["\n",(0,l.jsx)(i.li,{children:"\u901a\u5e38\u9010\u500b char \u586b\u5145 FIFO\uff0c\u7c21\u5316 PIO \u7a0b\u5e8f\u908f\u8f2f\u3002"}),"\n",(0,l.jsx)(i.li,{children:"PIO \u7a0b\u5e8f\u8a2d\u8a08\u70ba\u5728 FIFO \u6709\u6578\u64da\u6642\u7acb\u5373\u8655\u7406\uff0c\u4e0d\u7b49\u5f85 FIFO \u586b\u6eff\u3002"}),"\n"]})}),"\n",(0,l.jsx)(i.h3,{id:"23-\u6642\u5e8f\u63a7\u5236",children:"2.3 \u6642\u5e8f\u63a7\u5236"}),"\n",(0,l.jsxs)(i.ul,{children:["\n",(0,l.jsx)(i.li,{children:"\u6bcf\u500b UART \u4f4d\u4f7f\u7528 8 \u500b PIO \u6642\u9418\u9031\u671f"}),"\n",(0,l.jsxs)(i.li,{children:["\u4f7f\u7528\u6307\u4ee4\u5f8c\u7684\u5ef6\u9072\uff08\u5982 ",(0,l.jsx)(i.code,{children:"[7]"}),"\uff09\u4f86\u7cbe\u78ba\u63a7\u5236\u6642\u5e8f"]}),"\n",(0,l.jsx)(i.li,{children:"\u7e3d\u5e40\u9577\u5ea6\uff1a1\uff08\u8d77\u59cb\u4f4d\uff09+ 8\uff08\u6578\u64da\u4f4d\uff09+ 1\uff08\u505c\u6b62\u4f4d\uff09= 10 \u4f4d * 8 \u9031\u671f = 80 PIO \u6642\u9418\u9031\u671f/\u5e40"}),"\n"]}),"\n",(0,l.jsx)(i.h2,{id:"3-pio-\u521d\u59cb\u5316\u548c\u914d\u7f6e",children:"3. PIO \u521d\u59cb\u5316\u548c\u914d\u7f6e"}),"\n",(0,l.jsx)(i.pre,{children:(0,l.jsx)(i.code,{className:"language-c",metastring:'title="uart_tx_init.c"',children:"static inline void uart_tx_program_init(PIO pio, uint sm, uint offset, uint pin_tx, uint baud) {\n    pio_sm_config c = uart_tx_program_get_default_config(offset);\n    \n    sm_config_set_sideset_pins(&c, pin_tx);\n    sm_config_set_out_pins(&c, pin_tx, 1);\n    sm_config_set_fifo_join(&c, PIO_FIFO_JOIN_TX);\n    \n    float div = (float)clock_get_hz(clk_sys) / (8 * baud);\n    sm_config_set_clkdiv(&c, div);\n\n    pio_gpio_init(pio, pin_tx);\n    pio_sm_set_consecutive_pindirs(pio, sm, pin_tx, 1, true);\n    \n    pio_sm_init(pio, sm, offset, &c);\n    pio_sm_set_enabled(pio, sm, true);\n}\n"})}),"\n",(0,l.jsx)(i.admonition,{title:"\u95dc\u9375\u914d\u7f6e\u6b65\u9a5f",type:"info",children:(0,l.jsxs)(i.ol,{children:["\n",(0,l.jsx)(i.li,{children:"\u8a2d\u7f6e\u5074\u8a2d\uff08side-set\uff09\u548c\u8f38\u51fa\u5f15\u8173"}),"\n",(0,l.jsx)(i.li,{children:"\u914d\u7f6e FIFO \u70ba\u50c5 TX \u6a21\u5f0f"}),"\n",(0,l.jsx)(i.li,{children:"\u8a08\u7b97\u4e26\u8a2d\u7f6e\u6642\u9418\u5206\u983b\u4ee5\u5339\u914d\u76ee\u6a19\u6ce2\u7279\u7387"}),"\n",(0,l.jsx)(i.li,{children:"\u521d\u59cb\u5316 GPIO \u548c\u8a2d\u7f6e\u5f15\u8173\u65b9\u5411"}),"\n",(0,l.jsx)(i.li,{children:"\u521d\u59cb\u5316\u548c\u555f\u7528\u72c0\u614b\u6a5f"}),"\n"]})}),"\n",(0,l.jsx)(i.h2,{id:"4-fifo-\u4f7f\u7528\u548c\u7ba1\u7406",children:"4. FIFO \u4f7f\u7528\u548c\u7ba1\u7406"}),"\n",(0,l.jsxs)(e,{children:[(0,l.jsx)("summary",{children:"FIFO \u64cd\u4f5c\u793a\u4f8b"}),(0,l.jsx)(i.pre,{children:(0,l.jsx)(i.code,{className:"language-c",children:"static inline void uart_tx_program_putc(PIO pio, uint sm, char c) {\n    pio_sm_put_blocking(pio, sm, (uint32_t)c);\n}\n\nstatic inline void uart_tx_program_puts(PIO pio, uint sm, const char *s) {\n    while (*s) {\n        uart_tx_program_putc(pio, sm, *s++);\n    }\n}\n"})})]}),"\n",(0,l.jsx)(i.h2,{id:"5-\u4e3b\u7a0b\u5e8f\u5be6\u73fe",children:"5. \u4e3b\u7a0b\u5e8f\u5be6\u73fe"}),"\n",(0,l.jsx)(i.pre,{children:(0,l.jsx)(i.code,{className:"language-c",metastring:'title="main.c"',children:'#include "pico/stdlib.h"\n#include "hardware/pio.h"\n#include "uart_tx.pio.h"\n\nint main() {\n    const uint PIN_TX = 0;\n    const uint SERIAL_BAUD = 9600;\n\n    PIO pio = pio0;\n    uint sm = 0;\n    uint offset = pio_add_program(pio, &uart_tx_program);\n    uart_tx_program_init(pio, sm, offset, PIN_TX, SERIAL_BAUD);\n\n    while (true) {\n        uart_tx_program_puts(pio, sm, "Hello, world! (from PIO!)\\n");\n        sleep_ms(1000);\n    }\n}\n'})}),"\n",(0,l.jsx)(i.admonition,{title:"\u4e3b\u7a0b\u5e8f\u6b65\u9a5f",type:"tip",children:(0,l.jsxs)(i.ol,{children:["\n",(0,l.jsx)(i.li,{children:"\u9078\u64c7 PIO \u5be6\u4f8b\u548c\u72c0\u614b\u6a5f"}),"\n",(0,l.jsx)(i.li,{children:"\u5c07 PIO \u7a0b\u5e8f\u52a0\u8f09\u5230 PIO \u6307\u4ee4\u5167\u5b58"}),"\n",(0,l.jsx)(i.li,{children:"\u521d\u59cb\u5316 UART TX \u7a0b\u5e8f"}),"\n",(0,l.jsx)(i.li,{children:"\u5728\u4e3b\u5faa\u74b0\u4e2d\u767c\u9001\u6578\u64da"}),"\n"]})}),"\n",(0,l.jsx)(i.h2,{id:"6-\u6ce2\u7279\u7387\u8a08\u7b97\u548c\u7cbe\u5ea6",children:"6. \u6ce2\u7279\u7387\u8a08\u7b97\u548c\u7cbe\u5ea6"}),"\n",(0,l.jsxs)(i.admonition,{title:"\u5be6\u969b\u6ce2\u7279\u7387\u8a08\u7b97",type:"note",children:[(0,l.jsx)(i.p,{children:"\u5be6\u969b\u6ce2\u7279\u7387 = (\u7cfb\u7d71\u6642\u9418\u983b\u7387) / (\u6642\u9418\u5206\u983b * \u6bcf\u5e40\u9031\u671f\u6578)\n= 125,000,000 / (div * 80)"}),(0,l.jsxs)(i.p,{children:["\u5176\u4e2d\uff0c",(0,l.jsx)(i.code,{children:"div"})," \u662f\u521d\u59cb\u5316\u6642\u8a08\u7b97\u7684\u5206\u983b\u503c\u3002"]})]}),"\n",(0,l.jsx)(i.p,{children:"\u6ce8\u610f\uff1a\u5be6\u969b\u6ce2\u7279\u7387\u53ef\u80fd\u8207\u76ee\u6a19\u6ce2\u7279\u7387\u7565\u6709\u504f\u5dee\uff0c\u9019\u53d6\u6c7a\u65bc\u7cfb\u7d71\u6642\u9418\u983b\u7387\u548c\u53ef\u7528\u7684\u5206\u983b\u503c\u3002"}),"\n",(0,l.jsx)(i.h2,{id:"7-8-\u4f4d-uart-\u50b3\u8f38\u8a73\u89e3\u767c\u9001-abc",children:'7. 8 \u4f4d UART \u50b3\u8f38\u8a73\u89e3\uff1a\u767c\u9001 "ABC"'}),"\n",(0,l.jsx)(i.h3,{id:"71-uart-\u5e40\u7d50\u69cb8n1-\u683c\u5f0f",children:"7.1 UART \u5e40\u7d50\u69cb\uff088N1 \u683c\u5f0f\uff09"}),"\n",(0,l.jsx)(i.p,{children:"\u6bcf\u500b UART \u5b57\u7b26\u5e40\u5305\u542b 10 \u4f4d\uff1a"}),"\n",(0,l.jsxs)(i.ul,{children:["\n",(0,l.jsx)(i.li,{children:"1 \u500b\u8d77\u59cb\u4f4d\uff08\u59cb\u7d42\u70ba 0\uff09"}),"\n",(0,l.jsx)(i.li,{children:"8 \u500b\u6578\u64da\u4f4d\uff08\u6700\u4f4e\u6709\u6548\u4f4d LSB \u5148\u767c\u9001\uff09"}),"\n",(0,l.jsx)(i.li,{children:"1 \u500b\u505c\u6b62\u4f4d\uff08\u59cb\u7d42\u70ba 1\uff09"}),"\n"]}),"\n",(0,l.jsx)(i.h3,{id:"72-\u5b57\u7b26-abc-\u7684\u4e8c\u9032\u5236\u8868\u793a",children:'7.2 \u5b57\u7b26 "ABC" \u7684\u4e8c\u9032\u5236\u8868\u793a'}),"\n",(0,l.jsxs)(i.ul,{children:["\n",(0,l.jsx)(i.li,{children:"'A': ASCII 65  = 0100 0001"}),"\n",(0,l.jsx)(i.li,{children:"'B': ASCII 66  = 0100 0010"}),"\n",(0,l.jsx)(i.li,{children:"'C': ASCII 67  = 0100 0011"}),"\n"]}),"\n",(0,l.jsx)(i.h3,{id:"73-\u767c\u9001\u904e\u7a0b\u8a73\u89e3",children:"7.3 \u767c\u9001\u904e\u7a0b\u8a73\u89e3"}),"\n",(0,l.jsxs)(e,{children:[(0,l.jsx)("summary",{children:"\u5b57\u7b26 'A' \u7684\u767c\u9001\u904e\u7a0b"}),(0,l.jsx)(i.p,{children:"\u5b8c\u6574\u5e40\uff1a"}),(0,l.jsx)(i.pre,{children:(0,l.jsx)(i.code,{children:"0 01000001 1\n\u2191 \u2191        \u2191\n| |        |\n| |        \u505c\u6b62\u4f4d\n| \u6578\u64da\u4f4d\n\u8d77\u59cb\u4f4d\n"})}),(0,l.jsx)(i.p,{children:"PIO \u7a0b\u5e8f\u57f7\u884c\u904e\u7a0b\uff1a"}),(0,l.jsxs)(i.ol,{children:["\n",(0,l.jsxs)(i.li,{children:["\n",(0,l.jsxs)(i.p,{children:[(0,l.jsx)(i.code,{children:"pull side 1 [7]"}),":"]}),"\n",(0,l.jsxs)(i.ul,{children:["\n",(0,l.jsx)(i.li,{children:"\u5f9e FIFO \u7372\u53d6 'A'\uff080x41\uff09"}),"\n",(0,l.jsx)(i.li,{children:"TX \u5f15\u8173\u4fdd\u6301\u9ad8\u96fb\u5e73\uff08\u505c\u6b62\u4f4d\u72c0\u614b\uff09"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(i.li,{children:["\n",(0,l.jsxs)(i.p,{children:[(0,l.jsx)(i.code,{children:"set x, 7 side 0 [7]"}),":"]}),"\n",(0,l.jsxs)(i.ul,{children:["\n",(0,l.jsx)(i.li,{children:"\u8a2d\u7f6e\u5faa\u74b0\u8a08\u6578\u5668 x = 7"}),"\n",(0,l.jsx)(i.li,{children:"\u767c\u9001\u8d77\u59cb\u4f4d\uff08\u4f4e\u96fb\u5e73\uff09"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(i.li,{children:["\n",(0,l.jsxs)(i.p,{children:[(0,l.jsx)(i.code,{children:"bitloop:"})," \u5faa\u74b0 8 \u6b21\uff1a"]}),"\n",(0,l.jsxs)(i.ul,{children:["\n",(0,l.jsxs)(i.li,{children:[(0,l.jsx)(i.code,{children:"out pins, 1"}),": \u767c\u9001\u4e00\u4f4d\u6578\u64da"]}),"\n",(0,l.jsxs)(i.li,{children:[(0,l.jsx)(i.code,{children:"jmp x-- bitloop [6]"}),": \u6e1b\u5c11\u8a08\u6578\u5668\u4e26\u8df3\u8f49"]}),"\n",(0,l.jsx)(i.li,{children:"\u767c\u9001\u9806\u5e8f\uff1a1, 0, 0, 0, 0, 0, 1, 0 (LSB first)"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(i.li,{children:["\n",(0,l.jsxs)(i.p,{children:["\u5faa\u74b0\u7d50\u675f\u5f8c\uff0c\u901a\u904e ",(0,l.jsx)(i.code,{children:"side 1"})," \u8a2d\u7f6e\u505c\u6b62\u4f4d\uff08\u9ad8\u96fb\u5e73\uff09"]}),"\n"]}),"\n"]})]}),"\n",(0,l.jsxs)(i.admonition,{title:"\u5b57\u7b26 'B' \u548c 'C' \u7684\u767c\u9001",type:"info",children:[(0,l.jsx)(i.p,{children:"'B' \u548c 'C' \u7684\u767c\u9001\u904e\u7a0b\u8207 'A' \u76f8\u540c\uff0c\u53ea\u662f\u6578\u64da\u4f4d\u4e0d\u540c\uff1a"}),(0,l.jsxs)(i.ul,{children:["\n",(0,l.jsx)(i.li,{children:"'B': 0 01000010 1"}),"\n",(0,l.jsx)(i.li,{children:"'C': 0 01000011 1"}),"\n"]})]}),"\n",(0,l.jsx)(i.h3,{id:"74-fifo-\u64cd\u4f5c",children:"7.4 FIFO \u64cd\u4f5c"}),"\n",(0,l.jsxs)(i.p,{children:["\u7576\u8abf\u7528 ",(0,l.jsx)(i.code,{children:'uart_tx_program_puts(pio, sm, "ABC")'})," \u6642\uff1a"]}),"\n",(0,l.jsxs)(i.ol,{children:["\n",(0,l.jsx)(i.li,{children:"'A' \u88ab\u653e\u5165 FIFO"}),"\n",(0,l.jsx)(i.li,{children:"PIO \u7a0b\u5e8f\u5f9e FIFO \u62c9\u53d6 'A' \u4e26\u958b\u59cb\u767c\u9001"}),"\n",(0,l.jsx)(i.li,{children:"\u540c\u6642\uff0c'B' \u88ab\u653e\u5165 FIFO"}),"\n",(0,l.jsx)(i.li,{children:"'A' \u767c\u9001\u5b8c\u6210\u5f8c\uff0cPIO \u7a0b\u5e8f\u7acb\u5373\u62c9\u53d6\u4e26\u767c\u9001 'B'"}),"\n",(0,l.jsx)(i.li,{children:"'C' \u88ab\u653e\u5165 FIFO"}),"\n",(0,l.jsx)(i.li,{children:"'B' \u767c\u9001\u5b8c\u6210\u5f8c\uff0cPIO \u7a0b\u5e8f\u62c9\u53d6\u4e26\u767c\u9001 'C'"}),"\n"]}),"\n",(0,l.jsx)(i.h3,{id:"75-\u6642\u5e8f\u5206\u6790",children:"7.5 \u6642\u5e8f\u5206\u6790"}),"\n",(0,l.jsx)(i.p,{children:"\u5047\u8a2d UART \u6ce2\u7279\u7387\u70ba 9600 bps\uff1a"}),"\n",(0,l.jsxs)(i.ul,{children:["\n",(0,l.jsx)(i.li,{children:"\u6bcf\u500b\u4f4d\u6301\u7e8c\u6642\u9593\uff1a1/9600 \u79d2 \u2248 104.17 \u5fae\u79d2"}),"\n",(0,l.jsx)(i.li,{children:"\u6bcf\u500b\u5b57\u7b26\uff0810 \u4f4d\uff09\u50b3\u8f38\u6642\u9593\uff1a104.17 * 10 \u2248 1.0417 \u6beb\u79d2"}),"\n",(0,l.jsx)(i.li,{children:'"ABC" \u7e3d\u50b3\u8f38\u6642\u9593\uff1a3 * 1.0417 \u2248 3.125 \u6beb\u79d2'}),"\n"]}),"\n",(0,l.jsx)(i.h2,{id:"8-\u9ad8\u7d1a\u8003\u616e\u56e0\u7d20",children:"8. \u9ad8\u7d1a\u8003\u616e\u56e0\u7d20"}),"\n",(0,l.jsxs)(i.ol,{children:["\n",(0,l.jsxs)(i.li,{children:["\n",(0,l.jsx)(i.p,{children:"\u932f\u8aa4\u8655\u7406\uff1a"}),"\n",(0,l.jsxs)(i.ul,{children:["\n",(0,l.jsx)(i.li,{children:"PIO \u4e0d\u63d0\u4f9b\u5167\u7f6e\u7684\u5e40\u932f\u8aa4\u6aa2\u6e2c"}),"\n",(0,l.jsx)(i.li,{children:"\u53ef\u4ee5\u901a\u904e\u984d\u5916\u7684 PIO \u7a0b\u5e8f\u908f\u8f2f\u6216\u8edf\u4ef6\u5c64\u9762\u5be6\u73fe\u932f\u8aa4\u6aa2\u6e2c"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(i.li,{children:["\n",(0,l.jsx)(i.p,{children:"\u96d9\u5411\u901a\u4fe1\uff1a"}),"\n",(0,l.jsxs)(i.ul,{children:["\n",(0,l.jsx)(i.li,{children:"\u9700\u8981\u55ae\u7368\u7684 RX PIO \u7a0b\u5e8f"}),"\n",(0,l.jsx)(i.li,{children:"\u53ef\u80fd\u9700\u8981\u4f7f\u7528\u984d\u5916\u7684\u72c0\u614b\u6a5f\u6216 PIO \u5be6\u4f8b"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(i.li,{children:["\n",(0,l.jsx)(i.p,{children:"DMA \u4f7f\u7528\uff1a"}),"\n",(0,l.jsxs)(i.ul,{children:["\n",(0,l.jsx)(i.li,{children:"\u5c0d\u65bc\u5927\u91cf\u6578\u64da\u50b3\u8f38\uff0c\u53ef\u4ee5\u914d\u5408 DMA \u4f7f\u7528"}),"\n",(0,l.jsx)(i.li,{children:"DMA \u53ef\u4ee5\u81ea\u52d5\u586b\u5145 TX FIFO\uff0c\u6e1b\u5c11 CPU \u5e72\u9810"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(i.li,{children:["\n",(0,l.jsx)(i.p,{children:"\u8cc7\u6e90\u5229\u7528\uff1a"}),"\n",(0,l.jsxs)(i.ul,{children:["\n",(0,l.jsx)(i.li,{children:"\u4e00\u500b UART \u5be6\u4f8b\u4f54\u7528\u4e00\u500b PIO \u72c0\u614b\u6a5f"}),"\n",(0,l.jsx)(i.li,{children:"\u9700\u8981\u8003\u616e PIO \u6307\u4ee4\u5167\u5b58\u7684\u4f7f\u7528"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(i.li,{children:["\n",(0,l.jsx)(i.p,{children:"\u9748\u6d3b\u6027\uff1a"}),"\n",(0,l.jsxs)(i.ul,{children:["\n",(0,l.jsx)(i.li,{children:"\u53ef\u4ee5\u8f15\u9b06\u4fee\u6539 PIO \u7a0b\u5e8f\u4ee5\u652f\u6301\u4e0d\u540c\u7684\u6578\u64da\u683c\u5f0f\uff08\u5982 7 \u4f4d\u6578\u64da\u30012 \u500b\u505c\u6b62\u4f4d\uff09"}),"\n",(0,l.jsx)(i.li,{children:"\u53ef\u4ee5\u5be6\u73fe\u81ea\u5b9a\u7fa9\u5354\u8b70\u6216\u975e\u6a19\u6e96\u6ce2\u7279\u7387"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(i.h2,{id:"9-\u8abf\u8a66\u6280\u5de7",children:"9. \u8abf\u8a66\u6280\u5de7"}),"\n",(0,l.jsx)(i.admonition,{title:"\u8abf\u8a66\u65b9\u6cd5",type:"tip",children:(0,l.jsxs)(i.ol,{children:["\n",(0,l.jsx)(i.li,{children:"\u4f7f\u7528\u908f\u8f2f\u5206\u6790\u5100\u6216\u793a\u6ce2\u5668\u9a57\u8b49\u4fe1\u865f\u6642\u5e8f"}),"\n",(0,l.jsxs)(i.li,{children:["\u5229\u7528 ",(0,l.jsx)(i.code,{children:"printf"})," \u8abf\u8a66\u8f38\u51fa\u4f86\u76e3\u63a7\u6578\u64da\u6d41"]}),"\n",(0,l.jsx)(i.li,{children:"\u4f7f\u7528 Pico \u7684 LED \u9032\u884c\u7c21\u55ae\u7684\u53ef\u8996\u5316\u8abf\u8a66"}),"\n",(0,l.jsx)(i.li,{children:"\u5728\u95dc\u9375\u9ede\u6dfb\u52a0 GPIO \u89f8\u767c\uff0c\u65b9\u4fbf\u4f7f\u7528\u793a\u6ce2\u5668\u6355\u7372\u7279\u5b9a\u4e8b\u4ef6"}),"\n"]})}),"\n",(0,l.jsx)(i.h2,{id:"10-\u6027\u80fd\u8003\u616e",children:"10. \u6027\u80fd\u8003\u616e"}),"\n",(0,l.jsxs)(i.ul,{children:["\n",(0,l.jsx)(i.li,{children:"PIO UART \u5be6\u73fe\u5141\u8a31\u9ad8\u901f\u6578\u64da\u50b3\u8f38\uff0c\u50c5\u53d7 PIO \u6642\u9418\u983b\u7387\u9650\u5236"}),"\n",(0,l.jsx)(i.li,{children:"\u5c0d\u65bc\u7c21\u55ae\u7684\u6578\u64da\u767c\u9001\uff0cPIO \u65b9\u6cd5\u53ef\u80fd\u6bd4\u786c\u4ef6 UART \u66f4\u9748\u6d3b"}),"\n",(0,l.jsx)(i.li,{children:"\u5c0d\u65bc\u8907\u96dc\u7684\u5354\u8b70\u6216\u9700\u8981\u983b\u7e41\u66f4\u6539\u914d\u7f6e\u7684\u5834\u666f\uff0cPIO \u65b9\u6cd5\u5c24\u5176\u6709\u512a\u52e2"}),"\n"]}),"\n",(0,l.jsx)(i.h2,{id:"11-\u672a\u4f86\u64f4\u5c55",children:"11. \u672a\u4f86\u64f4\u5c55"}),"\n",(0,l.jsx)(i.admonition,{title:"\u53ef\u80fd\u7684\u64f4\u5c55\u65b9\u5411",type:"note",children:(0,l.jsxs)(i.ol,{children:["\n",(0,l.jsx)(i.li,{children:"\u5be6\u73fe UART \u63a5\u6536\u529f\u80fd"}),"\n",(0,l.jsx)(i.li,{children:"\u6dfb\u52a0\u6d41\u63a7\u5236\u652f\u6301"}),"\n",(0,l.jsx)(i.li,{children:"\u5be6\u73fe\u5947\u5076\u6821\u9a57"}),"\n",(0,l.jsx)(i.li,{children:"\u652f\u6301\u53ef\u8b8a\u6578\u64da\u4f4d\u6578\uff085-8 \u4f4d\uff09\u548c\u505c\u6b62\u4f4d\u6578"}),"\n",(0,l.jsx)(i.li,{children:"\u5be6\u73fe\u81ea\u52d5\u6ce2\u7279\u7387\u6aa2\u6e2c"}),"\n"]})}),"\n",(0,l.jsx)(i.h2,{id:"\u5b8c\u6574\u4ee3\u78bc",children:"\u5b8c\u6574\u4ee3\u78bc"}),"\n",(0,l.jsx)(i.pre,{children:(0,l.jsx)(i.code,{className:"language-c++",metastring:'title="main.cpp"',children:'#include "pico/stdlib.h"\n#include "hardware/pio.h"\n#include "uart_tx.pio.h"\n\nint main() {\n    // We\'re going to use PIO to print "Hello, world!" on the same GPIO which we\n    // normally attach UART0 to.\n    const uint PIN_TX = 7;\n    // This is the same as the default UART baud rate on Pico\n    const uint SERIAL_BAUD = 9600;\n\n    PIO pio = pio0;\n    uint sm = 0;\n    uint offset = pio_add_program(pio, &uart_tx_program);\n    uart_tx_program_init(pio, sm, offset, PIN_TX, SERIAL_BAUD);\n\n    while (true) {\n        uart_tx_program_puts(pio, sm, "Hello, world! (from PIO!)\\n");\n        sleep_ms(1000);\n    }\n}\n'})}),"\n",(0,l.jsx)(i.pre,{children:(0,l.jsx)(i.code,{className:"language-c++",metastring:'title="uart_tx.pio"',children:';\n; Copyright (c) 2020 Raspberry Pi (Trading) Ltd.\n;\n; SPDX-License-Identifier: BSD-3-Clause\n;\n\n.program uart_tx\n.side_set 1 opt\n\n; An 8n1 UART transmit program.\n; OUT pin 0 and side-set pin 0 are both mapped to UART TX pin.\n\n    pull       side 1 [7]  ; Assert stop bit, or stall with line in idle state\n    set x, 7   side 0 [7]  ; Preload bit counter, assert start bit for 8 clocks\nbitloop:                   ; This loop will run 8 times (8n1 UART)\n    out pins, 1            ; Shift 1 bit from OSR to the first OUT pin\n    jmp x-- bitloop   [6]  ; Each loop iteration is 8 cycles.\n\n\n% c-sdk {\n#include "hardware/clocks.h"\n\nstatic inline void uart_tx_program_init(PIO pio, uint sm, uint offset, uint pin_tx, uint baud) {\n    // Tell PIO to initially drive output-high on the selected pin, then map PIO\n    // onto that pin with the IO muxes.\n    pio_sm_set_pins_with_mask(pio, sm, 1u << pin_tx, 1u << pin_tx);\n    pio_sm_set_pindirs_with_mask(pio, sm, 1u << pin_tx, 1u << pin_tx);\n    pio_gpio_init(pio, pin_tx);\n\n    pio_sm_config c = uart_tx_program_get_default_config(offset);\n\n    // OUT shifts to right, no autopull\n    sm_config_set_out_shift(&c, true, false, 32);\n\n    // We are mapping both OUT and side-set to the same pin, because sometimes\n    // we need to assert user data onto the pin (with OUT) and sometimes\n    // assert constant values (start/stop bit)\n    sm_config_set_out_pins(&c, pin_tx, 1);\n    sm_config_set_sideset_pins(&c, pin_tx);\n\n    // We only need TX, so get an 8-deep FIFO!\n    sm_config_set_fifo_join(&c, PIO_FIFO_JOIN_TX);\n\n    // SM transmits 1 bit per 8 execution cycles.\n    float div = (float)clock_get_hz(clk_sys) / (8 * baud);\n    sm_config_set_clkdiv(&c, div);\n\n    pio_sm_init(pio, sm, offset, &c);\n    pio_sm_set_enabled(pio, sm, true);\n}\n\nstatic inline void uart_tx_program_putc(PIO pio, uint sm, char c) {\n    pio_sm_put_blocking(pio, sm, (uint32_t)c);\n}\n\nstatic inline void uart_tx_program_puts(PIO pio, uint sm, const char *s) {\n    while (*s)\n        uart_tx_program_putc(pio, sm, *s++);\n}\n\n%}\n\n\n\n'})})]})}function h(n={}){const{wrapper:i}={...(0,s.R)(),...n.components};return i?(0,l.jsx)(i,{...n,children:(0,l.jsx)(a,{...n})}):a(n)}},8453:(n,i,e)=>{e.d(i,{R:()=>r,x:()=>o});var l=e(6540);const s={},t=l.createContext(s);function r(n){const i=l.useContext(t);return l.useMemo((function(){return"function"==typeof n?n(i):{...i,...n}}),[i,n])}function o(n){let i;return i=n.disableParentContext?"function"==typeof n.components?n.components(s):n.components||s:r(n.components),l.createElement(t.Provider,{value:i},n.children)}}}]);