"use strict";(self.webpackChunkEl_Jardin_Secreto_de_w0x7ce=self.webpackChunkEl_Jardin_Secreto_de_w0x7ce||[]).push([[756],{5145:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>d,contentTitle:()=>a,default:()=>h,frontMatter:()=>r,metadata:()=>o,toc:()=>c});var l=s(4848),i=s(8453);const r={slug:"embedded-development-board-uart-rts",title:"UART RTS Troubleshooting Guide for Embedded Development Boards",authors:[{name:"w0x7ce",title:"Embedded Systems Engineer",url:"https://github.com/tianrking",image_url:"https://github.com/tianrking.png"}],tags:["embedded systems","UART","RTS","debugging techniques","IoT","w801","bl616","bl602","bouffalo","winnermicro"]},a="\u5d4c\u5165\u5f0f\u958b\u767c\u677f UART RTS \u554f\u984c\u89e3\u6c7a\u6307\u5357",o={id:"micro-controladores/CN/warning_uart_rts",title:"UART RTS Troubleshooting Guide for Embedded Development Boards",description:"\u554f\u984c\u63cf\u8ff0",source:"@site/docs/micro-controladores/CN/warning_uart_rts.md",sourceDirName:"micro-controladores/CN",slug:"/micro-controladores/CN/embedded-development-board-uart-rts",permalink:"/micro-controladores/CN/embedded-development-board-uart-rts",draft:!1,unlisted:!1,editUrl:"https://github.com/tianrking/tianrking.github.io/tree/V3.4/docs/micro-controladores/CN/warning_uart_rts.md",tags:[{inline:!0,label:"embedded systems",permalink:"/tags/embedded-systems"},{inline:!0,label:"UART",permalink:"/tags/uart"},{inline:!0,label:"RTS",permalink:"/tags/rts"},{inline:!0,label:"debugging techniques",permalink:"/tags/debugging-techniques"},{inline:!0,label:"IoT",permalink:"/tags/io-t"},{inline:!0,label:"w801",permalink:"/tags/w-801"},{inline:!0,label:"bl616",permalink:"/tags/bl-616"},{inline:!0,label:"bl602",permalink:"/tags/bl-602"},{inline:!0,label:"bouffalo",permalink:"/tags/bouffalo"},{inline:!0,label:"winnermicro",permalink:"/tags/winnermicro"}],version:"current",lastUpdatedAt:1724136333e3,frontMatter:{slug:"embedded-development-board-uart-rts",title:"UART RTS Troubleshooting Guide for Embedded Development Boards",authors:[{name:"w0x7ce",title:"Embedded Systems Engineer",url:"https://github.com/tianrking",image_url:"https://github.com/tianrking.png"}],tags:["embedded systems","UART","RTS","debugging techniques","IoT","w801","bl616","bl602","bouffalo","winnermicro"]},sidebar:"tutorialSidebar",previous:{title:"Exploring Network Interfaces on Bouffalo MCUs",permalink:"/micro-controladores/CN/bouffalo-network-interfaces"},next:{title:"Bouffalo BL602 AI-WB2-32S \u4f7f\u7528\u6307\u5357 | Bouffalo BL602 AI-WB2-32S User Guide",permalink:"/micro-controladores/CN/bouffalo-BL602-AI-WB2-32s"}},d={},c=[{value:"\u554f\u984c\u63cf\u8ff0",id:"\u554f\u984c\u63cf\u8ff0",level:2},{value:"\u89c0\u5bdf\u5230\u7684\u73fe\u8c61",id:"\u89c0\u5bdf\u5230\u7684\u73fe\u8c61",level:3},{value:"\u539f\u56e0\u5206\u6790",id:"\u539f\u56e0\u5206\u6790",level:2},{value:"\u89e3\u6c7a\u65b9\u6848",id:"\u89e3\u6c7a\u65b9\u6848",level:2},{value:"\u8edf\u4ef6\u65b9\u6cd5",id:"\u8edf\u4ef6\u65b9\u6cd5",level:3},{value:"\u786c\u4ef6\u65b9\u6cd5",id:"\u786c\u4ef6\u65b9\u6cd5",level:3},{value:"\u958b\u767c\u6280\u5de7",id:"\u958b\u767c\u6280\u5de7",level:3},{value:"\u6ce8\u610f\u4e8b\u9805",id:"\u6ce8\u610f\u4e8b\u9805",level:2},{value:"Descripci\xf3n del Problema",id:"descripci\xf3n-del-problema",level:2},{value:"Fen\xf3menos Observados",id:"fen\xf3menos-observados",level:3},{value:"An\xe1lisis de Causas",id:"an\xe1lisis-de-causas",level:2},{value:"Soluciones",id:"soluciones",level:2},{value:"M\xe9todos de Software",id:"m\xe9todos-de-software",level:3},{value:"M\xe9todos de Hardware",id:"m\xe9todos-de-hardware",level:3},{value:"T\xe9cnicas de Desarrollo",id:"t\xe9cnicas-de-desarrollo",level:3},{value:"Precauciones",id:"precauciones",level:2},{value:"Conclusi\xf3n",id:"conclusi\xf3n",level:2},{value:"Problem Description",id:"problem-description",level:2},{value:"Observed Phenomena",id:"observed-phenomena",level:3},{value:"Cause Analysis",id:"cause-analysis",level:2},{value:"Solutions",id:"solutions",level:2},{value:"Software Methods",id:"software-methods",level:3},{value:"Hardware Methods",id:"hardware-methods",level:3},{value:"Development Techniques",id:"development-techniques",level:3},{value:"Precautions",id:"precautions",level:2},{value:"Conclusion",id:"conclusion",level:2}];function t(e){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,i.R)(),...e.components};return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(n.h1,{id:"\u5d4c\u5165\u5f0f\u958b\u767c\u677f-uart-rts-\u554f\u984c\u89e3\u6c7a\u6307\u5357",children:"\u5d4c\u5165\u5f0f\u958b\u767c\u677f UART RTS \u554f\u984c\u89e3\u6c7a\u6307\u5357"}),"\n",(0,l.jsx)(n.h2,{id:"\u554f\u984c\u63cf\u8ff0",children:"\u554f\u984c\u63cf\u8ff0"}),"\n",(0,l.jsx)(n.p,{children:"\u5728\u4f7f\u7528\u67d0\u4e9b\u5d4c\u5165\u5f0f\u958b\u767c\u677f\uff08\u5982 Bouffalo \u7cfb\u5217\u3001Winnermicro \u7cfb\u5217\u7b49\uff09\u9032\u884c\u958b\u767c\u6642\uff0c\u6211\u5011\u53ef\u80fd\u6703\u9047\u5230\u8207 UART \u7684 RTS\uff08Ready to Send\uff09\u4fe1\u865f\u76f8\u95dc\u7684\u554f\u984c\u3002\u9019\u500b\u554f\u984c\u53ef\u80fd\u6703\u5f71\u97ff\u958b\u767c\u904e\u7a0b\uff0c\u5c24\u5176\u662f\u5728\u4f7f\u7528\u67d0\u4e9b\u5e38\u898b\u7684\u4e32\u53e3\u8abf\u8a66\u5de5\u5177\u6642\u3002 (winnermicro w801 ;bouffalo bl602,bl616;etc..)"}),"\n",(0,l.jsx)(n.h3,{id:"\u89c0\u5bdf\u5230\u7684\u73fe\u8c61",children:"\u89c0\u5bdf\u5230\u7684\u73fe\u8c61"}),"\n",(0,l.jsxs)(n.ol,{children:["\n",(0,l.jsxs)(n.li,{children:["\n",(0,l.jsxs)(n.p,{children:[(0,l.jsx)(n.strong,{children:"\u6b63\u5e38\u555f\u52d5"}),"\uff1a\u958b\u767c\u677f\u9023\u63a5 USB \u5f8c\uff0c\u80fd\u6b63\u5e38\u904b\u884c\u7247\u5167\u71d2\u9304\u7684\u7a0b\u5e8f\u3002"]}),"\n"]}),"\n",(0,l.jsxs)(n.li,{children:["\n",(0,l.jsxs)(n.p,{children:[(0,l.jsx)(n.strong,{children:"\u4e32\u53e3\u5de5\u5177\u5f71\u97ff"}),"\uff1a"]}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"\u4f7f\u7528\u67d0\u4e9b\u4e32\u53e3\u7a0b\u5e8f\uff08\u5982 Putty\u3001XShell\u3001Cutecom\u3001Minicom\uff09\u9023\u63a5\u6642\uff0c\u958b\u767c\u677f\u53ef\u80fd\u6703\u7acb\u5373\u66ab\u505c\u904b\u884c\u3002"}),"\n",(0,l.jsx)(n.li,{children:"\u800c\u4f7f\u7528\u5176\u4ed6\u8edf\u4ef6\uff08\u5982\u5c08\u7528\u7684\u5347\u7d1a\u5de5\u5177\u6216\u67d0\u4e9b\u7279\u5b9a\u7684\u4e32\u53e3\u5de5\u5177\uff09\u5247\u4e0d\u6703\u51fa\u73fe\u9019\u7a2e\u60c5\u6cc1\u3002"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(n.li,{children:["\n",(0,l.jsxs)(n.p,{children:[(0,l.jsx)(n.strong,{children:"RTS \u4fe1\u865f\u5f71\u97ff"}),"\uff1a"]}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"\u95dc\u9375\u5340\u5225\u5728\u65bc RTS \u4fe1\u865f\u7684\u96fb\u5e73\u72c0\u614b\u3002"}),"\n",(0,l.jsx)(n.li,{children:"\u6b63\u5e38\u904b\u884c\u6642\uff0cRTS \u901a\u5e38\u9700\u8981\u4fdd\u6301\u9ad8\u96fb\u5e73\u3002"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(n.li,{children:["\n",(0,l.jsxs)(n.p,{children:[(0,l.jsx)(n.strong,{children:"\u5fa9\u4f4d\u884c\u70ba"}),"\uff1a"]}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"\u4e32\u53e3\u62c9\u4f4e RTS \u6642\uff0c\u67d0\u4e9b\u958b\u767c\u677f\u53ef\u80fd\u6703\u88ab\u91cd\u7f6e\u3002"}),"\n",(0,l.jsx)(n.li,{children:"\u5982\u679c RTS \u6301\u7e8c\u4f4e\u96fb\u5e73\uff0c\u958b\u767c\u677f\u53ef\u80fd\u4fdd\u6301\u505c\u6b62\u72c0\u614b\u3002"}),"\n",(0,l.jsx)(n.li,{children:"\u5c07 RTS \u62c9\u56de\u9ad8\u96fb\u5e73\uff0c\u958b\u767c\u677f\u53ef\u80fd\u6703\u5fa9\u4f4d\u4e26\u91cd\u65b0\u555f\u52d5\u3002"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(n.h2,{id:"\u539f\u56e0\u5206\u6790",children:"\u539f\u56e0\u5206\u6790"}),"\n",(0,l.jsx)(n.p,{children:"\u9019\u500b\u73fe\u8c61\u7684\u6839\u672c\u539f\u56e0\u53ef\u80fd\u5728\u65bc\u958b\u767c\u677f\u5c0d UART \u7684 RTS \u4fe1\u865f\u7684\u7279\u6b8a\u8655\u7406\uff1a"}),"\n",(0,l.jsxs)(n.ol,{children:["\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.strong,{children:"\u786c\u4ef6\u8a2d\u8a08"}),"\uff1a\u958b\u767c\u677f\u7684\u5fa9\u4f4d\u96fb\u8def\u53ef\u80fd\u8207 RTS \u4fe1\u865f\u76f8\u9023\u3002"]}),"\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.strong,{children:"\u56fa\u4ef6\u914d\u7f6e"}),"\uff1a\u56fa\u4ef6\u53ef\u80fd\u88ab\u8a2d\u7f6e\u70ba\u97ff\u61c9 RTS \u4fe1\u865f\u7684\u8b8a\u5316\u3002"]}),"\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.strong,{children:"\u8abf\u8a66\u8a2d\u8a08"}),"\uff1a\u9019\u53ef\u80fd\u662f\u70ba\u4e86\u65b9\u4fbf\u8abf\u8a66\u548c\u7de8\u7a0b\u800c\u8a2d\u8a08\u7684\u529f\u80fd\u3002"]}),"\n"]}),"\n",(0,l.jsx)(n.h2,{id:"\u89e3\u6c7a\u65b9\u6848",children:"\u89e3\u6c7a\u65b9\u6848"}),"\n",(0,l.jsx)(n.h3,{id:"\u8edf\u4ef6\u65b9\u6cd5",children:"\u8edf\u4ef6\u65b9\u6cd5"}),"\n",(0,l.jsxs)(n.ol,{children:["\n",(0,l.jsxs)(n.li,{children:["\n",(0,l.jsxs)(n.p,{children:[(0,l.jsx)(n.strong,{children:"\u9078\u64c7\u5408\u9069\u7684\u4e32\u53e3\u5de5\u5177"}),"\uff1a"]}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"Windows\uff1a\u63a8\u85a6\u4f7f\u7528\u4e0d\u6703\u81ea\u52d5\u63a7\u5236 RTS \u7684\u5de5\u5177\uff0c\u5982 XCOM \u6216 VOFA+"}),"\n",(0,l.jsxs)(n.li,{children:["Linux\uff1a\u63a8\u85a6\u4f7f\u7528 Cutecom\uff0c\u53ef\u901a\u904e\u4ee5\u4e0b\u547d\u4ee4\u5b89\u88dd\uff1a","\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-bash",children:"sudo apt install cutecom\n"})}),"\n"]}),"\n",(0,l.jsx)(n.li,{children:"\u4e5f\u53ef\u4ee5\u8003\u616e\u4f7f\u7528\u8de8\u5e73\u53f0\u7684\u4e32\u53e3\u5de5\u5177\uff0c\u5982 PuTTY \u6216 TeraTerm\uff0c\u4f46\u9700\u8981\u5728\u8a2d\u7f6e\u4e2d\u7981\u7528 RTS/CTS \u6d41\u63a7\u5236"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(n.li,{children:["\n",(0,l.jsxs)(n.p,{children:[(0,l.jsx)(n.strong,{children:"\u914d\u7f6e\u4e32\u53e3\u5de5\u5177"}),"\uff1a\n\u5728\u4f7f\u7528\u4efb\u4f55\u4e32\u53e3\u5de5\u5177\u6642\uff0c\u78ba\u4fdd\u5728\u8a2d\u7f6e\u4e2d\u7981\u7528\u786c\u4ef6\u6d41\u63a7\u5236\u3002"]}),"\n"]}),"\n",(0,l.jsxs)(n.li,{children:["\n",(0,l.jsxs)(n.p,{children:[(0,l.jsx)(n.strong,{children:"\u7de8\u7a0b\u65b9\u5f0f"}),"\uff1a\n\u4f7f\u7528\u7de8\u7a0b\u8a9e\u8a00\uff08\u5982 Python \u548c pyserial \u5eab\uff09\u76f4\u63a5\u63a7\u5236\u4e32\u53e3\u901a\u4fe1\uff0c\u53ef\u4ee5\u66f4\u7cbe\u78ba\u5730\u63a7\u5236 RTS \u4fe1\u865f\uff1a"]}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-python",children:"import serial\nser = serial.Serial('/dev/ttyUSB0', 115200, rtscts=False)\nser.setRTS(False)  # \u78ba\u4fdd RTS \u4fdd\u6301\u9ad8\u96fb\u5e73\n"})}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(n.h3,{id:"\u786c\u4ef6\u65b9\u6cd5",children:"\u786c\u4ef6\u65b9\u6cd5"}),"\n",(0,l.jsxs)(n.ol,{children:["\n",(0,l.jsxs)(n.li,{children:["\n",(0,l.jsxs)(n.p,{children:[(0,l.jsx)(n.strong,{children:"RTS \u4fe1\u865f\u4e0a\u62c9"}),"\uff1a\n\u5728 RTS \u7dda\u548c VCC\uff08\u901a\u5e38\u662f 3.3V\uff09\u4e4b\u9593\u6dfb\u52a0\u4e00\u500b 10k\u03a9 \u96fb\u963b\uff0c\u78ba\u4fdd RTS \u59cb\u7d42\u4fdd\u6301\u9ad8\u96fb\u5e73\u3002"]}),"\n"]}),"\n",(0,l.jsxs)(n.li,{children:["\n",(0,l.jsxs)(n.p,{children:[(0,l.jsx)(n.strong,{children:"\u4fe1\u865f\u9694\u96e2"}),"\uff1a\n\u4f7f\u7528\u4e09\u6975\u7ba1\u6216 MOSFET \u96fb\u8def\u9694\u96e2 RTS \u4fe1\u865f\u3002"]}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(n.h3,{id:"\u958b\u767c\u6280\u5de7",children:"\u958b\u767c\u6280\u5de7"}),"\n",(0,l.jsxs)(n.ol,{children:["\n",(0,l.jsxs)(n.li,{children:["\n",(0,l.jsxs)(n.p,{children:[(0,l.jsx)(n.strong,{children:"\u9023\u63a5\u9806\u5e8f"}),"\uff1a\u5148\u7d66\u958b\u767c\u677f\u4e0a\u96fb\uff0c\u5f85\u5176\u555f\u52d5\u5f8c\u518d\u9023\u63a5\u4e32\u53e3\u5de5\u5177\u3002"]}),"\n"]}),"\n",(0,l.jsxs)(n.li,{children:["\n",(0,l.jsxs)(n.p,{children:[(0,l.jsx)(n.strong,{children:"\u66ff\u4ee3\u8abf\u8a66\u65b9\u6cd5"}),"\uff1a"]}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"\u4f7f\u7528\u5c08\u7528\u7684 UART \u8f49 USB \u82af\u7247\uff08\u5982 CP2102\u3001CH340 \u7b49\uff09"}),"\n",(0,l.jsx)(n.li,{children:"\u5229\u7528\u908f\u8f2f\u5206\u6790\u5100\u6216\u793a\u6ce2\u5668\u76e3\u63a7 RTS \u4fe1\u865f"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(n.li,{children:["\n",(0,l.jsxs)(n.p,{children:[(0,l.jsx)(n.strong,{children:"\u56fa\u4ef6\u4fee\u6539"}),"\uff1a\n\u5982\u679c\u53ef\u80fd\uff0c\u8003\u616e\u4fee\u6539\u958b\u767c\u677f\u56fa\u4ef6\uff0c\u4f7f\u5176\u4e0d\u4f9d\u8cf4 RTS \u9032\u884c\u5fa9\u4f4d\u3002"]}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(n.h2,{id:"\u6ce8\u610f\u4e8b\u9805",children:"\u6ce8\u610f\u4e8b\u9805"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"\u4e0d\u540c\u958b\u767c\u677f\u53ef\u80fd\u5c0d RTS \u4fe1\u865f\u6709\u4e0d\u540c\u7684\u8655\u7406\u65b9\u5f0f\uff0c\u8acb\u53c3\u8003\u5177\u9ad4\u958b\u767c\u677f\u7684\u6587\u6a94\u3002"}),"\n",(0,l.jsx)(n.li,{children:"\u9032\u884c\u4efb\u4f55\u786c\u4ef6\u4fee\u6539\u6642\uff0c\u8acb\u5c0f\u5fc3\u64cd\u4f5c\uff0c\u907f\u514d\u640d\u58de\u958b\u767c\u677f\u3002"}),"\n",(0,l.jsx)(n.li,{children:"\u5982\u679c\u60a8\u4e0d\u78ba\u5b9a\u5982\u4f55\u8655\u7406\uff0c\u8acb\u806f\u7e6b\u958b\u767c\u677f\u88fd\u9020\u5546\u5c0b\u6c42\u6280\u8853\u652f\u6301\u3002"}),"\n"]}),"\n",(0,l.jsx)(n.h1,{id:"gu\xeda-de-soluci\xf3n-de-problemas-uart-rts-en-placas-de-desarrollo-embebido",children:"Gu\xeda de Soluci\xf3n de Problemas UART RTS en Placas de Desarrollo Embebido"}),"\n",(0,l.jsx)(n.h2,{id:"descripci\xf3n-del-problema",children:"Descripci\xf3n del Problema"}),"\n",(0,l.jsx)(n.p,{children:"Al trabajar con ciertas placas de desarrollo embebido (como las series Bouffalo, Winnermicro, entre otras), podemos encontrar problemas relacionados con la se\xf1al RTS (Ready to Send) de UART. Este problema puede afectar el proceso de desarrollo, especialmente cuando se utilizan herramientas comunes de depuraci\xf3n serial."}),"\n",(0,l.jsx)(n.h3,{id:"fen\xf3menos-observados",children:"Fen\xf3menos Observados"}),"\n",(0,l.jsxs)(n.ol,{children:["\n",(0,l.jsxs)(n.li,{children:["\n",(0,l.jsxs)(n.p,{children:[(0,l.jsx)(n.strong,{children:"Inicio Normal"}),": La placa de desarrollo funciona normalmente con el programa grabado despu\xe9s de conectarse por USB."]}),"\n"]}),"\n",(0,l.jsxs)(n.li,{children:["\n",(0,l.jsxs)(n.p,{children:[(0,l.jsx)(n.strong,{children:"Influencia de Herramientas Seriales"}),":"]}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"Al conectar con programas como Putty, XShell, Cutecom o Minicom, la placa puede dejar de funcionar inmediatamente."}),"\n",(0,l.jsx)(n.li,{children:"Sin embargo, esto no ocurre con herramientas espec\xedficas de actualizaci\xf3n o ciertos programas seriales."}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(n.li,{children:["\n",(0,l.jsxs)(n.p,{children:[(0,l.jsx)(n.strong,{children:"Influencia de la Se\xf1al RTS"}),":"]}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"La diferencia clave est\xe1 en el estado del nivel de la se\xf1al RTS."}),"\n",(0,l.jsx)(n.li,{children:"Para un funcionamiento normal, RTS generalmente debe mantenerse en nivel alto."}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(n.li,{children:["\n",(0,l.jsxs)(n.p,{children:[(0,l.jsx)(n.strong,{children:"Comportamiento de Reinicio"}),":"]}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"Cuando el puerto serial baja RTS, algunas placas pueden reiniciarse."}),"\n",(0,l.jsx)(n.li,{children:"Si RTS se mantiene en nivel bajo, la placa puede permanecer en estado de parada."}),"\n",(0,l.jsx)(n.li,{children:"Al volver RTS a nivel alto, la placa puede reiniciarse y volver a funcionar."}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(n.h2,{id:"an\xe1lisis-de-causas",children:"An\xe1lisis de Causas"}),"\n",(0,l.jsx)(n.p,{children:"La causa fundamental de este fen\xf3meno puede estar en el manejo especial de la se\xf1al RTS UART por parte de la placa de desarrollo:"}),"\n",(0,l.jsxs)(n.ol,{children:["\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.strong,{children:"Dise\xf1o de Hardware"}),": El circuito de reinicio de la placa puede estar conectado a la se\xf1al RTS."]}),"\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.strong,{children:"Configuraci\xf3n de Firmware"}),": El firmware puede estar configurado para responder a cambios en la se\xf1al RTS."]}),"\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.strong,{children:"Dise\xf1o para Depuraci\xf3n"}),": Puede ser una funci\xf3n dise\xf1ada para facilitar la depuraci\xf3n y programaci\xf3n."]}),"\n"]}),"\n",(0,l.jsx)(n.h2,{id:"soluciones",children:"Soluciones"}),"\n",(0,l.jsx)(n.h3,{id:"m\xe9todos-de-software",children:"M\xe9todos de Software"}),"\n",(0,l.jsxs)(n.ol,{children:["\n",(0,l.jsxs)(n.li,{children:["\n",(0,l.jsxs)(n.p,{children:[(0,l.jsx)(n.strong,{children:"Elegir Herramientas Seriales Adecuadas"}),":"]}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"Windows: Se recomienda usar herramientas que no controlen autom\xe1ticamente RTS, como XCOM o VOFA+"}),"\n",(0,l.jsxs)(n.li,{children:["Linux: Se recomienda Cutecom, que se puede instalar con:","\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-bash",children:"sudo apt install cutecom\n"})}),"\n"]}),"\n",(0,l.jsx)(n.li,{children:"Tambi\xe9n se pueden considerar herramientas multiplataforma como PuTTY o TeraTerm, asegur\xe1ndose de desactivar el control de flujo RTS/CTS en la configuraci\xf3n"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(n.li,{children:["\n",(0,l.jsxs)(n.p,{children:[(0,l.jsx)(n.strong,{children:"Configurar Herramientas Seriales"}),":\nAseg\xfarese de desactivar el control de flujo por hardware en la configuraci\xf3n de cualquier herramienta serial."]}),"\n"]}),"\n",(0,l.jsxs)(n.li,{children:["\n",(0,l.jsxs)(n.p,{children:[(0,l.jsx)(n.strong,{children:"M\xe9todo de Programaci\xf3n"}),":\nUse lenguajes de programaci\xf3n como Python con la biblioteca pyserial para controlar directamente la comunicaci\xf3n serial:"]}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-python",children:"import serial\nser = serial.Serial('/dev/ttyUSB0', 115200, rtscts=False)\nser.setRTS(False)  # Asegura que RTS se mantenga en nivel alto\n"})}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(n.h3,{id:"m\xe9todos-de-hardware",children:"M\xe9todos de Hardware"}),"\n",(0,l.jsxs)(n.ol,{children:["\n",(0,l.jsxs)(n.li,{children:["\n",(0,l.jsxs)(n.p,{children:[(0,l.jsx)(n.strong,{children:"Pull-up de la Se\xf1al RTS"}),":\nA\xf1ada una resistencia de 10k\u03a9 entre la l\xednea RTS y VCC (generalmente 3.3V) para mantener RTS en nivel alto."]}),"\n"]}),"\n",(0,l.jsxs)(n.li,{children:["\n",(0,l.jsxs)(n.p,{children:[(0,l.jsx)(n.strong,{children:"Aislamiento de Se\xf1al"}),":\nUse un circuito con transistor o MOSFET para aislar la se\xf1al RTS."]}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(n.h3,{id:"t\xe9cnicas-de-desarrollo",children:"T\xe9cnicas de Desarrollo"}),"\n",(0,l.jsxs)(n.ol,{children:["\n",(0,l.jsxs)(n.li,{children:["\n",(0,l.jsxs)(n.p,{children:[(0,l.jsx)(n.strong,{children:"Orden de Conexi\xf3n"}),": Encienda primero la placa de desarrollo y con\xe9ctela a la herramienta serial despu\xe9s de que haya iniciado."]}),"\n"]}),"\n",(0,l.jsxs)(n.li,{children:["\n",(0,l.jsxs)(n.p,{children:[(0,l.jsx)(n.strong,{children:"M\xe9todos Alternativos de Depuraci\xf3n"}),":"]}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"Use chips UART a USB dedicados (como CP2102, CH340, etc.)"}),"\n",(0,l.jsx)(n.li,{children:"Utilice un analizador l\xf3gico u osciloscopio para monitorear la se\xf1al RTS"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(n.li,{children:["\n",(0,l.jsxs)(n.p,{children:[(0,l.jsx)(n.strong,{children:"Modificaci\xf3n de Firmware"}),":\nSi es posible, considere modificar el firmware de la placa para que no dependa de RTS para el reinicio."]}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(n.h2,{id:"precauciones",children:"Precauciones"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"Diferentes placas de desarrollo pueden manejar la se\xf1al RTS de manera distinta. Consulte la documentaci\xf3n espec\xedfica de su placa."}),"\n",(0,l.jsx)(n.li,{children:"Tenga cuidado al realizar modificaciones de hardware para evitar da\xf1ar la placa."}),"\n",(0,l.jsx)(n.li,{children:"Si no est\xe1 seguro de c\xf3mo proceder, contacte al fabricante de la placa para obtener soporte t\xe9cnico."}),"\n"]}),"\n",(0,l.jsx)(n.h2,{id:"conclusi\xf3n",children:"Conclusi\xf3n"}),"\n",(0,l.jsx)(n.p,{children:"Entender y resolver este problema de UART RTS es crucial para un desarrollo estable y eficiente con varias placas de desarrollo embebido. Adoptando las medidas adecuadas de software y hardware, podemos asegurar un proceso de desarrollo fluido y aprovechar al m\xe1ximo el potencial de estas potentes placas de desarrollo."}),"\n",(0,l.jsx)(n.h1,{id:"uart-rts-troubleshooting-guide-for-embedded-development-boards",children:"UART RTS Troubleshooting Guide for Embedded Development Boards"}),"\n",(0,l.jsx)(n.h2,{id:"problem-description",children:"Problem Description"}),"\n",(0,l.jsx)(n.p,{children:"When working with certain embedded development boards (such as Bouffalo series, Winnermicro series, etc.), we may encounter issues related to the UART RTS (Ready to Send) signal. This problem can affect the development process, especially when using common serial debugging tools."}),"\n",(0,l.jsx)(n.h3,{id:"observed-phenomena",children:"Observed Phenomena"}),"\n",(0,l.jsxs)(n.ol,{children:["\n",(0,l.jsxs)(n.li,{children:["\n",(0,l.jsxs)(n.p,{children:[(0,l.jsx)(n.strong,{children:"Normal Startup"}),": The development board operates normally with the programmed firmware after connecting via USB."]}),"\n"]}),"\n",(0,l.jsxs)(n.li,{children:["\n",(0,l.jsxs)(n.p,{children:[(0,l.jsx)(n.strong,{children:"Influence of Serial Tools"}),":"]}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"When connecting with programs like Putty, XShell, Cutecom, or Minicom, the board may immediately stop working."}),"\n",(0,l.jsx)(n.li,{children:"However, this does not occur with specific upgrade tools or certain serial programs."}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(n.li,{children:["\n",(0,l.jsxs)(n.p,{children:[(0,l.jsx)(n.strong,{children:"RTS Signal Influence"}),":"]}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"The key difference lies in the state of the RTS signal level."}),"\n",(0,l.jsx)(n.li,{children:"For normal operation, RTS usually needs to be maintained at a high level."}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(n.li,{children:["\n",(0,l.jsxs)(n.p,{children:[(0,l.jsx)(n.strong,{children:"Reset Behavior"}),":"]}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"When the serial port pulls RTS low, some boards may reset."}),"\n",(0,l.jsx)(n.li,{children:"If RTS remains low, the board may stay in a stopped state."}),"\n",(0,l.jsx)(n.li,{children:"Pulling RTS back to high may cause the board to reset and restart."}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(n.h2,{id:"cause-analysis",children:"Cause Analysis"}),"\n",(0,l.jsx)(n.p,{children:"The root cause of this phenomenon may lie in the special handling of the UART RTS signal by the development board:"}),"\n",(0,l.jsxs)(n.ol,{children:["\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.strong,{children:"Hardware Design"}),": The board's reset circuit may be connected to the RTS signal."]}),"\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.strong,{children:"Firmware Configuration"}),": The firmware may be set to respond to changes in the RTS signal."]}),"\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.strong,{children:"Debugging Design"}),": This may be a feature designed to facilitate debugging and programming."]}),"\n"]}),"\n",(0,l.jsx)(n.h2,{id:"solutions",children:"Solutions"}),"\n",(0,l.jsx)(n.h3,{id:"software-methods",children:"Software Methods"}),"\n",(0,l.jsxs)(n.ol,{children:["\n",(0,l.jsxs)(n.li,{children:["\n",(0,l.jsxs)(n.p,{children:[(0,l.jsx)(n.strong,{children:"Choose Appropriate Serial Tools"}),":"]}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"Windows: It's recommended to use tools that don't automatically control RTS, such as XCOM or VOFA+"}),"\n",(0,l.jsxs)(n.li,{children:["Linux: Cutecom is recommended, which can be installed with:","\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-bash",children:"sudo apt install cutecom\n"})}),"\n"]}),"\n",(0,l.jsx)(n.li,{children:"Cross-platform tools like PuTTY or TeraTerm can also be considered, but make sure to disable RTS/CTS flow control in the settings"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(n.li,{children:["\n",(0,l.jsxs)(n.p,{children:[(0,l.jsx)(n.strong,{children:"Configure Serial Tools"}),":\nEnsure that hardware flow control is disabled in the settings when using any serial tool."]}),"\n"]}),"\n",(0,l.jsxs)(n.li,{children:["\n",(0,l.jsxs)(n.p,{children:[(0,l.jsx)(n.strong,{children:"Programming Method"}),":\nUse programming languages (such as Python with the pyserial library) to directly control serial communication, allowing more precise control of the RTS signal:"]}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-python",children:"import serial\nser = serial.Serial('/dev/ttyUSB0', 115200, rtscts=False)\nser.setRTS(False)  # Ensure RTS remains high\n"})}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(n.h3,{id:"hardware-methods",children:"Hardware Methods"}),"\n",(0,l.jsxs)(n.ol,{children:["\n",(0,l.jsxs)(n.li,{children:["\n",(0,l.jsxs)(n.p,{children:[(0,l.jsx)(n.strong,{children:"RTS Signal Pull-up"}),":\nAdd a 10k\u03a9 resistor between the RTS line and VCC (usually 3.3V) to ensure RTS always remains high."]}),"\n"]}),"\n",(0,l.jsxs)(n.li,{children:["\n",(0,l.jsxs)(n.p,{children:[(0,l.jsx)(n.strong,{children:"Signal Isolation"}),":\nUse a transistor or MOSFET circuit to isolate the RTS signal."]}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(n.h3,{id:"development-techniques",children:"Development Techniques"}),"\n",(0,l.jsxs)(n.ol,{children:["\n",(0,l.jsxs)(n.li,{children:["\n",(0,l.jsxs)(n.p,{children:[(0,l.jsx)(n.strong,{children:"Connection Order"}),": Power on the development board first, then connect it to the serial tool after it has started."]}),"\n"]}),"\n",(0,l.jsxs)(n.li,{children:["\n",(0,l.jsxs)(n.p,{children:[(0,l.jsx)(n.strong,{children:"Alternative Debugging Methods"}),":"]}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"Use dedicated UART to USB chips (such as CP2102, CH340, etc.)"}),"\n",(0,l.jsx)(n.li,{children:"Use a logic analyzer or oscilloscope to monitor the RTS signal"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(n.li,{children:["\n",(0,l.jsxs)(n.p,{children:[(0,l.jsx)(n.strong,{children:"Firmware Modification"}),":\nIf possible, consider modifying the board's firmware so that it does not rely on RTS for reset."]}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(n.h2,{id:"precautions",children:"Precautions"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"Different development boards may handle the RTS signal differently. Refer to the specific documentation for your board."}),"\n",(0,l.jsx)(n.li,{children:"Be careful when making any hardware modifications to avoid damaging the board."}),"\n",(0,l.jsx)(n.li,{children:"If you are unsure how to proceed, contact the board manufacturer for technical support."}),"\n"]}),"\n",(0,l.jsx)(n.h2,{id:"conclusion",children:"Conclusion"}),"\n",(0,l.jsx)(n.p,{children:"Understanding and resolving this UART RTS issue is crucial for stable and efficient development with various embedded development boards. By adopting appropriate software and hardware measures, we can ensure a smooth development process and fully leverage the potential of these powerful development boards."})]})}function h(e={}){const{wrapper:n}={...(0,i.R)(),...e.components};return n?(0,l.jsx)(n,{...e,children:(0,l.jsx)(t,{...e})}):t(e)}},8453:(e,n,s)=>{s.d(n,{R:()=>a,x:()=>o});var l=s(6540);const i={},r=l.createContext(i);function a(e){const n=l.useContext(r);return l.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function o(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:a(e.components),l.createElement(r.Provider,{value:n},e.children)}}}]);