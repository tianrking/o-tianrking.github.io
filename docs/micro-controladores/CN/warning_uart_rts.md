---
slug: embedded-development-board-uart-rts
title: UART RTS Troubleshooting Guide for Embedded Development Boards
authors:
  - name: w0x7ce
    title: Embedded Systems Engineer
    url: https://github.com/tianrking
    image_url: https://github.com/tianrking.png
tags: [embedded systems, UART, RTS, debugging techniques, IoT , w801, bl616, bl602, bouffalo, winnermicro]
---

# 嵌入式開發板 UART RTS 問題解決指南

## 問題描述

在使用某些嵌入式開發板（如 Bouffalo 系列、Winnermicro 系列等）進行開發時，我們可能會遇到與 UART 的 RTS（Ready to Send）信號相關的問題。這個問題可能會影響開發過程，尤其是在使用某些常見的串口調試工具時。 (winnermicro w801 ;bouffalo bl602,bl616;etc..)

### 觀察到的現象

1. **正常啟動**：開發板連接 USB 後，能正常運行片內燒錄的程序。

2. **串口工具影響**：
   - 使用某些串口程序（如 Putty、XShell、Cutecom、Minicom）連接時，開發板可能會立即暫停運行。
   - 而使用其他軟件（如專用的升級工具或某些特定的串口工具）則不會出現這種情況。

3. **RTS 信號影響**：
   - 關鍵區別在於 RTS 信號的電平狀態。
   - 正常運行時，RTS 通常需要保持高電平。

4. **復位行為**：
   - 串口拉低 RTS 時，某些開發板可能會被重置。
   - 如果 RTS 持續低電平，開發板可能保持停止狀態。
   - 將 RTS 拉回高電平，開發板可能會復位並重新啟動。

## 原因分析

這個現象的根本原因可能在於開發板對 UART 的 RTS 信號的特殊處理：

1. **硬件設計**：開發板的復位電路可能與 RTS 信號相連。
2. **固件配置**：固件可能被設置為響應 RTS 信號的變化。
3. **調試設計**：這可能是為了方便調試和編程而設計的功能。

## 解決方案

### 軟件方法

1. **選擇合適的串口工具**：
   - Windows：推薦使用不會自動控制 RTS 的工具，如 XCOM 或 VOFA+
   - Linux：推薦使用 Cutecom，可通過以下命令安裝：
     ```bash
     sudo apt install cutecom
     ```
   - 也可以考慮使用跨平台的串口工具，如 PuTTY 或 TeraTerm，但需要在設置中禁用 RTS/CTS 流控制

2. **配置串口工具**：
   在使用任何串口工具時，確保在設置中禁用硬件流控制。

3. **編程方式**：
   使用編程語言（如 Python 和 pyserial 庫）直接控制串口通信，可以更精確地控制 RTS 信號：
   ```python
   import serial
   ser = serial.Serial('/dev/ttyUSB0', 115200, rtscts=False)
   ser.setRTS(False)  # 確保 RTS 保持高電平
   ```

### 硬件方法

1. **RTS 信號上拉**：
   在 RTS 線和 VCC（通常是 3.3V）之間添加一個 10kΩ 電阻，確保 RTS 始終保持高電平。

2. **信號隔離**：
   使用三極管或 MOSFET 電路隔離 RTS 信號。

### 開發技巧

1. **連接順序**：先給開發板上電，待其啟動後再連接串口工具。

2. **替代調試方法**：
   - 使用專用的 UART 轉 USB 芯片（如 CP2102、CH340 等）
   - 利用邏輯分析儀或示波器監控 RTS 信號

3. **固件修改**：
   如果可能，考慮修改開發板固件，使其不依賴 RTS 進行復位。

## 注意事項

- 不同開發板可能對 RTS 信號有不同的處理方式，請參考具體開發板的文檔。
- 進行任何硬件修改時，請小心操作，避免損壞開發板。
- 如果您不確定如何處理，請聯繫開發板製造商尋求技術支持。



# Guía de Solución de Problemas UART RTS en Placas de Desarrollo Embebido

## Descripción del Problema

Al trabajar con ciertas placas de desarrollo embebido (como las series Bouffalo, Winnermicro, entre otras), podemos encontrar problemas relacionados con la señal RTS (Ready to Send) de UART. Este problema puede afectar el proceso de desarrollo, especialmente cuando se utilizan herramientas comunes de depuración serial.

### Fenómenos Observados

1. **Inicio Normal**: La placa de desarrollo funciona normalmente con el programa grabado después de conectarse por USB.

2. **Influencia de Herramientas Seriales**:
   - Al conectar con programas como Putty, XShell, Cutecom o Minicom, la placa puede dejar de funcionar inmediatamente.
   - Sin embargo, esto no ocurre con herramientas específicas de actualización o ciertos programas seriales.

3. **Influencia de la Señal RTS**:
   - La diferencia clave está en el estado del nivel de la señal RTS.
   - Para un funcionamiento normal, RTS generalmente debe mantenerse en nivel alto.

4. **Comportamiento de Reinicio**:
   - Cuando el puerto serial baja RTS, algunas placas pueden reiniciarse.
   - Si RTS se mantiene en nivel bajo, la placa puede permanecer en estado de parada.
   - Al volver RTS a nivel alto, la placa puede reiniciarse y volver a funcionar.

## Análisis de Causas

La causa fundamental de este fenómeno puede estar en el manejo especial de la señal RTS UART por parte de la placa de desarrollo:

1. **Diseño de Hardware**: El circuito de reinicio de la placa puede estar conectado a la señal RTS.
2. **Configuración de Firmware**: El firmware puede estar configurado para responder a cambios en la señal RTS.
3. **Diseño para Depuración**: Puede ser una función diseñada para facilitar la depuración y programación.

## Soluciones

### Métodos de Software

1. **Elegir Herramientas Seriales Adecuadas**:
   - Windows: Se recomienda usar herramientas que no controlen automáticamente RTS, como XCOM o VOFA+
   - Linux: Se recomienda Cutecom, que se puede instalar con:
     ```bash
     sudo apt install cutecom
     ```
   - También se pueden considerar herramientas multiplataforma como PuTTY o TeraTerm, asegurándose de desactivar el control de flujo RTS/CTS en la configuración

2. **Configurar Herramientas Seriales**:
   Asegúrese de desactivar el control de flujo por hardware en la configuración de cualquier herramienta serial.

3. **Método de Programación**:
   Use lenguajes de programación como Python con la biblioteca pyserial para controlar directamente la comunicación serial:
   ```python
   import serial
   ser = serial.Serial('/dev/ttyUSB0', 115200, rtscts=False)
   ser.setRTS(False)  # Asegura que RTS se mantenga en nivel alto
   ```

### Métodos de Hardware

1. **Pull-up de la Señal RTS**:
   Añada una resistencia de 10kΩ entre la línea RTS y VCC (generalmente 3.3V) para mantener RTS en nivel alto.

2. **Aislamiento de Señal**:
   Use un circuito con transistor o MOSFET para aislar la señal RTS.

### Técnicas de Desarrollo

1. **Orden de Conexión**: Encienda primero la placa de desarrollo y conéctela a la herramienta serial después de que haya iniciado.

2. **Métodos Alternativos de Depuración**:
   - Use chips UART a USB dedicados (como CP2102, CH340, etc.)
   - Utilice un analizador lógico u osciloscopio para monitorear la señal RTS

3. **Modificación de Firmware**:
   Si es posible, considere modificar el firmware de la placa para que no dependa de RTS para el reinicio.

## Precauciones

- Diferentes placas de desarrollo pueden manejar la señal RTS de manera distinta. Consulte la documentación específica de su placa.
- Tenga cuidado al realizar modificaciones de hardware para evitar dañar la placa.
- Si no está seguro de cómo proceder, contacte al fabricante de la placa para obtener soporte técnico.

## Conclusión

Entender y resolver este problema de UART RTS es crucial para un desarrollo estable y eficiente con varias placas de desarrollo embebido. Adoptando las medidas adecuadas de software y hardware, podemos asegurar un proceso de desarrollo fluido y aprovechar al máximo el potencial de estas potentes placas de desarrollo.

# UART RTS Troubleshooting Guide for Embedded Development Boards

## Problem Description

When working with certain embedded development boards (such as Bouffalo series, Winnermicro series, etc.), we may encounter issues related to the UART RTS (Ready to Send) signal. This problem can affect the development process, especially when using common serial debugging tools.

### Observed Phenomena

1. **Normal Startup**: The development board operates normally with the programmed firmware after connecting via USB.

2. **Influence of Serial Tools**:
   - When connecting with programs like Putty, XShell, Cutecom, or Minicom, the board may immediately stop working.
   - However, this does not occur with specific upgrade tools or certain serial programs.

3. **RTS Signal Influence**:
   - The key difference lies in the state of the RTS signal level.
   - For normal operation, RTS usually needs to be maintained at a high level.

4. **Reset Behavior**:
   - When the serial port pulls RTS low, some boards may reset.
   - If RTS remains low, the board may stay in a stopped state.
   - Pulling RTS back to high may cause the board to reset and restart.

## Cause Analysis

The root cause of this phenomenon may lie in the special handling of the UART RTS signal by the development board:

1. **Hardware Design**: The board's reset circuit may be connected to the RTS signal.
2. **Firmware Configuration**: The firmware may be set to respond to changes in the RTS signal.
3. **Debugging Design**: This may be a feature designed to facilitate debugging and programming.

## Solutions

### Software Methods

1. **Choose Appropriate Serial Tools**:
   - Windows: It's recommended to use tools that don't automatically control RTS, such as XCOM or VOFA+
   - Linux: Cutecom is recommended, which can be installed with:
     ```bash
     sudo apt install cutecom
     ```
   - Cross-platform tools like PuTTY or TeraTerm can also be considered, but make sure to disable RTS/CTS flow control in the settings

2. **Configure Serial Tools**:
   Ensure that hardware flow control is disabled in the settings when using any serial tool.

3. **Programming Method**:
   Use programming languages (such as Python with the pyserial library) to directly control serial communication, allowing more precise control of the RTS signal:
   ```python
   import serial
   ser = serial.Serial('/dev/ttyUSB0', 115200, rtscts=False)
   ser.setRTS(False)  # Ensure RTS remains high
   ```

### Hardware Methods

1. **RTS Signal Pull-up**:
   Add a 10kΩ resistor between the RTS line and VCC (usually 3.3V) to ensure RTS always remains high.

2. **Signal Isolation**:
   Use a transistor or MOSFET circuit to isolate the RTS signal.

### Development Techniques

1. **Connection Order**: Power on the development board first, then connect it to the serial tool after it has started.

2. **Alternative Debugging Methods**:
   - Use dedicated UART to USB chips (such as CP2102, CH340, etc.)
   - Use a logic analyzer or oscilloscope to monitor the RTS signal

3. **Firmware Modification**:
   If possible, consider modifying the board's firmware so that it does not rely on RTS for reset.

## Precautions

- Different development boards may handle the RTS signal differently. Refer to the specific documentation for your board.
- Be careful when making any hardware modifications to avoid damaging the board.
- If you are unsure how to proceed, contact the board manufacturer for technical support.

## Conclusion

Understanding and resolving this UART RTS issue is crucial for stable and efficient development with various embedded development boards. By adopting appropriate software and hardware measures, we can ensure a smooth development process and fully leverage the potential of these powerful development boards.
