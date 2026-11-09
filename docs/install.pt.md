# Instalar

## 1. Abre o instalador

Abre **[https://skydoy.github.io/ESPHOME_Hunter/](https://skydoy.github.io/ESPHOME_Hunter/)** no Chrome ou Edge num computador.

## 2. Escolhe a placa

A versão está impressa na PCB.

- **v2.0.0** — PCB preta, XIAO ESP32-C6, até 8 zonas, USB-C
- **v1.x** — Wemos D1 mini, 4 zonas, micro-USB

## 3. Liga o USB e Instalar

Liga o ESP ao computador com um cabo USB **de dados** **antes** de montar a placa no X-Core. Carrega em **Instalar**, escolhe a porta série e confirma.

Deves ver uma barra de progresso (~1 minuto) e depois a janela do Wi-Fi. Escreve a tua rede de **2,4 GHz** (ou, mais tarde, liga-te à rede `ESPHome Hunter Setup` com o telemóvel).

!!! tip "A placa não aparece?"
    Usa um cabo de dados. Na v2, mantém o **BOOT** ao ligar o cabo. Na v1, instala o driver CH340/CP210x.

## A seguir

[Ligações](wiring.md) → monta a placa, depois [Home Assistant](home-assistant.md).
