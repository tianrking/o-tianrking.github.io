---
slug: esp32-lista-de-ejemplos-de-programacion
title: Guía de Ejemplos de Programación para ESP32 | ESP32 编程示例指南
authors:
  - name: w0x7ce
    title: Ingeniero de Sistemas Embebidos
    url: https://github.com/tianrking
    image_url: https://github.com/tianrking.png
tags: [ESP32, Sistemas Embebidos, Bluetooth, Wi-Fi, USB, Motor Control]
---

# Lista de Ejemplos de Programación para ESP32

framework-arduinoespressif32 @ https://github.com/espressif/arduino-esp32.git#2.0.17

## Ejemplos de Bluetooth (BLE)

| Nombre del Ejemplo | Descripción de la Función | Herramientas de Desarrollo | Chips Compatibles |
| --- | --- | --- | --- |
| BLE5_extended_scan | Demostración de las funciones de publicidad y escaneo extendido de Bluetooth 5.0 | ESP-IDF / PlatformIO | Serie ESP32 |
| BLE5_multi_advertising | Demostración de la función de publicidad múltiple de Bluetooth 5.0 | ESP-IDF / PlatformIO | Serie ESP32 |
| BLE5_periodic_advertising | Demostración de la función de publicidad periódica de Bluetooth 5.0 | ESP-IDF / PlatformIO | Serie ESP32 |
| BLE5_periodic_sync | Demostración de la función de sincronización periódica de Bluetooth 5.0 | ESP-IDF / PlatformIO | Serie ESP32 |
| BLE_Beacon_Scanner | Implementación de un escáner de balizas BLE | ESP-IDF / PlatformIO | Serie ESP32 |
| BLE_EddystoneTLM_Beacon | Implementación de una baliza de telemetría Eddystone | ESP-IDF / PlatformIO | Serie ESP32 |
| BLE_EddystoneURL_Beacon | Implementación de una baliza URL Eddystone | ESP-IDF / PlatformIO | Serie ESP32 |
| BLE_client | Implementación de funciones de cliente BLE | ESP-IDF / PlatformIO | Serie ESP32 |
| BLE_iBeacon | Implementación del protocolo iBeacon | ESP-IDF / PlatformIO | Serie ESP32 |
| BLE_notify | Demostración de la función de notificación de características BLE | ESP-IDF / PlatformIO | Serie ESP32 |
| BLE_scan | Implementación de funciones básicas de escaneo BLE | ESP-IDF / PlatformIO | Serie ESP32 |
| BLE_server | Implementación de funciones de servidor BLE | ESP-IDF / PlatformIO | Serie ESP32 |
| BLE_server_multiconnect | Servidor BLE que admite múltiples conexiones de dispositivos simultáneas | ESP-IDF / PlatformIO | Serie ESP32 |
| BLE_uart | Implementación de comunicación serie a través de BLE | ESP-IDF / PlatformIO | Serie ESP32 |
| BLE_write | Demostración de la función de escritura de características BLE | ESP-IDF / PlatformIO | Serie ESP32 |

## Ejemplos de Bluetooth Clásico (no disponible para ESP32-S2, ESP32-C3, ESP32-S3)

| Nombre del Ejemplo | Descripción de la Función | Herramientas de Desarrollo | Chips Compatibles |
| --- | --- | --- | --- |
| DiscoverConnect | Descubrimiento y conexión de dispositivos Bluetooth clásicos | ESP-IDF / PlatformIO | Serie ESP32 |
| GetLocalMAC | Obtención de la dirección MAC Bluetooth local | ESP-IDF / PlatformIO | Serie ESP32 |
| SerialToSerialBT | Comunicación serie a través de Bluetooth clásico | ESP-IDF / PlatformIO | Serie ESP32 |
| SerialToSerialBTM | Comunicación serie multidispositivo a través de Bluetooth clásico | ESP-IDF / PlatformIO | Serie ESP32 |
| SerialToSerialBT_SSP_pairing | Emparejamiento simple y seguro de Bluetooth clásico | ESP-IDF / PlatformIO | Serie ESP32 |
| bt_classic_device_discovery | Descubrimiento de dispositivos Bluetooth clásicos | ESP-IDF / PlatformIO | Serie ESP32 |
| bt_remove_paired_devices | Eliminación de dispositivos Bluetooth clásicos emparejados | ESP-IDF / PlatformIO | Serie ESP32 |

## Ejemplos de Wi-Fi

| Nombre del Ejemplo | Descripción de la Función | Herramientas de Desarrollo | Chips Compatibles |
| --- | --- | --- | --- |
| FTM_Initiator | Implementación del protocolo 802.11 Fine Timing Measurement (FTM) - Como iniciador | ESP-IDF / PlatformIO | ESP32-S2, ESP32-C3 |
| FTM_Responder | Implementación del protocolo 802.11 Fine Timing Measurement (FTM) - Como respondedor | ESP-IDF / PlatformIO | ESP32-S2, ESP32-C3 |
| SimpleWiFiServer | Implementación de un servidor Wi-Fi simple | ESP-IDF / PlatformIO | Serie ESP32 |
| WPS | Implementación de Wi-Fi Protected Setup (WPS) | ESP-IDF / PlatformIO | Serie ESP32, ESP32-S2 |
| WiFiAccessPoint | Creación de un punto de acceso Wi-Fi | ESP-IDF / PlatformIO | Serie ESP32 |
| WiFiBlueToothSwitch | Alternancia entre Wi-Fi y Bluetooth | ESP-IDF / PlatformIO | Serie ESP32 |
| WiFiClient | Implementación de funciones de cliente Wi-Fi | ESP-IDF / PlatformIO | Serie ESP32 |
| WiFiClientBasic | Implementación de funciones básicas de cliente Wi-Fi | ESP-IDF / PlatformIO | Serie ESP32 |
| WiFiClientConnect | Implementación de reconexión automática de cliente Wi-Fi | ESP-IDF / PlatformIO | Serie ESP32 |
| WiFiClientEnterprise | Implementación de conexión Wi-Fi empresarial | ESP-IDF / PlatformIO | Serie ESP32 |
| WiFiClientEvents | Monitoreo de eventos de cliente Wi-Fi | ESP-IDF / PlatformIO | Serie ESP32 |
| WiFiClientStaticIP | Configuración de IP estática para cliente Wi-Fi | ESP-IDF / PlatformIO | Serie ESP32 |
| WiFiIPv6 | Demostración de funcionalidad IPv6 | ESP-IDF / PlatformIO | Serie ESP32, ESP32-S2 |
| WiFiMulti | Soporte para cambio entre múltiples redes Wi-Fi | ESP-IDF / PlatformIO | Serie ESP32 |
| WiFiScan | Implementación de función de escaneo de redes Wi-Fi | ESP-IDF / PlatformIO | Serie ESP32 |
| WiFiScanDualAntenna | Escaneo Wi-Fi utilizando antena dual | ESP-IDF / PlatformIO | Serie ESP32 |
| WiFiSmartConfig | Implementación de función SmartConfig para configuración Wi-Fi | ESP-IDF / PlatformIO | Serie ESP32 |
| WiFiTelnetToSerial | Acceso al puerto serie ESP32 a través de Telnet | ESP-IDF / PlatformIO | Serie ESP32, ESP32-S2 |
| WiFiUDPClient | Implementación de cliente Wi-Fi UDP | ESP-IDF / PlatformIO | Serie ESP32 |

## Otros Ejemplos de Funcionalidad

| Categoría del Ejemplo | Descripción de la Función | Herramientas de Desarrollo | Chips Compatibles |
| --- | --- | --- | --- |
| AnalogOut | Salida de señal analógica DAC | ESP-IDF / PlatformIO | Serie ESP32 |
| AnalogRead | Adquisición de señal analógica ADC | ESP-IDF / PlatformIO | Serie ESP32 | 
| Camera | Captura de fotos, grabación de video y transmisión de video | ESP-IDF / PlatformIO | ESP32-Camera | 
| DeepSleep | Modo de bajo consumo en sueño profundo | ESP-IDF / PlatformIO | Serie ESP32 |
| ESPNow | Comunicación inalámbrica ESP-NOW | ESP-IDF / PlatformIO | Serie ESP32 | 
| FreeRTOS | Multitarea y sistema en tiempo real | ESP-IDF / PlatformIO | Serie ESP32 |
| GPIO | Control de E/S digital e interrupciones externas | ESP-IDF / PlatformIO | Serie ESP32 |
| I2S | Interfaz de audio digital | ESP-IDF / PlatformIO | Serie ESP32 |
| RMT | Control remoto por infrarrojos, 433MHz, etc. | ESP-IDF / PlatformIO | Serie ESP32 | 
| Serial | Comunicación serie | ESP-IDF / PlatformIO | Serie ESP32 |
| Timer | Temporizador hardware | ESP-IDF / PlatformIO | Serie ESP32 |
| Touch | Detección táctil capacitiva | ESP-IDF / PlatformIO | Serie ESP32 |
| TWAI | Comunicación por bus CAN | ESP-IDF / PlatformIO | Serie ESP32 |

## Ejemplos de Funcionalidad USB

| Nombre del Ejemplo | Descripción de la Función | Herramientas de Desarrollo | Chips Compatibles |
| --- | --- | --- | --- |
| CompositeDevice | Dispositivo USB compuesto | ESP-IDF / PlatformIO | ESP32-S2, ESP32-S3 |
| ConsumerControl | Dispositivo de control de consumo USB | ESP-IDF / PlatformIO | ESP32-S2, ESP32-S3 |
| CustomHIDDevice | Dispositivo USB HID personalizado | ESP-IDF / PlatformIO | ESP32-S2, ESP32-S3 |
| FirmwareMSC | Dispositivo de almacenamiento masivo USB / MSC | ESP-IDF / PlatformIO | ESP32-S2, ESP32-S3 |
| Gamepad | Mando de juego USB | ESP-IDF / PlatformIO | ESP32-S2, ESP32-S3 |
| Keyboard | Teclado USB | ESP-IDF / PlatformIO | ESP32-S2, ESP32-S3 |
| KeyboardAndMouseControl | Combinación de teclado y ratón USB | ESP-IDF / PlatformIO | ESP32-S2, ESP32-S3 |
| Mouse/ButtonMouseControl | Ratón USB | ESP-IDF / PlatformIO | ESP32-S2, ESP32-S3 |
| SystemControl | Dispositivo de control de sistema USB | ESP-IDF / PlatformIO | ESP32-S2, ESP32-S3 |
| USBMSC | Dispositivo de almacenamiento masivo USB / MSC | ESP-IDF / PlatformIO | ESP32-S2, ESP32-S3 |
| USBSerial | Puerto serie virtual USB | ESP-IDF / PlatformIO | ESP32-S2, ESP32-S3 |
| USBVendor | Protocolo de comunicación USB personalizado | ESP-IDF / PlatformIO | ESP32-S2, ESP32-S3 |


# Comparación de Características de la Serie ESP32

La siguiente tabla muestra el soporte de características para los chips de la serie ESP32 en diferentes marcos de desarrollo. Tenga en cuenta que algunas características pueden tener diferentes estados de soporte en los marcos Arduino y ESP-IDF.

| Periférico/Característica | ESP32 | ESP32-S2 | ESP32-C3 | ESP32-S3 | ESP32-C6 | ESP32-H2 |
|---------------------------|-------|----------|----------|----------|----------|----------|
| ADC | Soportado | Soportado | Soportado | Soportado | Soportado | Soportado |
| BT Classic | Soportado | No soportado | No soportado | Soportado | Soportado | No soportado |
| BLE | Soportado | Soportado | Soportado | Soportado | Soportado | Soportado |
| DAC | Soportado | Soportado | No soportado | Soportado | No soportado | No soportado |
| Ethernet | Arduino soportado, ESP-IDF soportado | Arduino no soportado, ESP-IDF soportado | Arduino no soportado, ESP-IDF no soportado | Arduino no soportado, ESP-IDF no soportado | Arduino no soportado, ESP-IDF soportado | Arduino no soportado, ESP-IDF soportado |
| GPIO | Soportado | Soportado | Soportado | Soportado | Soportado | Soportado |
| Sensor Hall | Arduino no soportado, ESP-IDF soportado | Arduino no soportado, ESP-IDF soportado | No soportado | Arduino no soportado, ESP-IDF soportado | Arduino no soportado, ESP-IDF soportado | No soportado |
| I2C | Soportado | Soportado | Soportado | Soportado | Soportado | Soportado |
| I2S | Soportado | Soportado | Soportado | Soportado | Soportado | Soportado |
| LEDC | Soportado | Soportado | Soportado | Soportado | Soportado | Soportado |
| Motor PWM | Arduino no soportado, ESP-IDF soportado | Arduino no soportado, ESP-IDF soportado | Arduino no soportado, ESP-IDF soportado | Arduino no soportado, ESP-IDF soportado | Arduino no soportado, ESP-IDF soportado | Arduino no soportado, ESP-IDF soportado |
| Contador de Pulsos | Arduino no soportado, ESP-IDF soportado | Arduino no soportado, ESP-IDF soportado | Arduino no soportado, ESP-IDF soportado | Arduino no soportado, ESP-IDF soportado | Arduino no soportado, ESP-IDF soportado | Arduino no soportado, ESP-IDF soportado |
| RMT | Soportado | Soportado | Soportado | Soportado | Soportado | Soportado |
| SDIO | Arduino soportado, ESP-IDF no soportado | Arduino soportado, ESP-IDF no soportado | No soportado | Arduino soportado, ESP-IDF no soportado | No soportado | Arduino no soportado, ESP-IDF soportado |
| SDMMC | Soportado | No soportado | No soportado | Soportado | No soportado | No soportado |
| Timer | Soportado | Soportado | Soportado | Soportado | Soportado | Soportado |
| Sensor de Temperatura | Arduino no soportado, ESP-IDF soportado | Soportado | Soportado | Soportado | Soportado | Soportado |
| Touch | Soportado | Soportado | No soportado | Soportado | No soportado | No soportado |
| TWAI | Arduino no soportado, ESP-IDF soportado | Arduino no soportado, ESP-IDF soportado | Arduino no soportado, ESP-IDF soportado | Arduino no soportado, ESP-IDF soportado | Arduino no soportado, ESP-IDF soportado | Arduino no soportado, ESP-IDF soportado |
| UART | Soportado | Soportado | Soportado | Soportado | Soportado | Soportado |
| USB | Soportado | Soportado | Soportado | Soportado | Soportado | Arduino no soportado, ESP-IDF soportado |
| Wi-Fi | Soportado | Soportado | Soportado | Soportado | Soportado | No soportado |
| IEEE 802.15.4 | No soportado | No soportado | Soportado | No soportado | Soportado | Soportado |
| Pila Zigbee | No soportado | No soportado | Soportado | No soportado | Soportado | Soportado |
| Protocolo Thread | No soportado | No soportado | Arduino no soportado, ESP-IDF soportado | No soportado | Soportado | Soportado |
| Bluetooth Clásico | Soportado | No soportado | No soportado | Soportado | Soportado | No soportado |
| Bluetooth LE | Soportado | Soportado | Soportado | Soportado | Soportado | Soportado |
| ESP-NOW | Soportado | Soportado | Soportado | Soportado | Soportado | No soportado |
| Protocolo Matter | No soportado | No soportado | Arduino no soportado, ESP-IDF soportado | No soportado | Soportado | Soportado |

Nota: La información en esta tabla puede cambiar con el tiempo. Por favor, consulte la documentación oficial más reciente para obtener la información más actualizada.