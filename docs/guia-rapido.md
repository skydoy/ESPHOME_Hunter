# Guia rápido

Da caixa ao Home Assistant em cerca de 10 minutos, sem YAML. *English: [quick-start.md](quick-start.md).*

> **Estado:** o firmware é compilado e validado automaticamente, mas **ainda não foi testado numa
> placa real**. O mapa de pinos da v2.0.0 ainda tem de ser confirmado pelo Luís Soares. Ver [hardware.md](hardware.md).

## Precisa de
- Uma placa Hunter_LS (v1.x ou v2.0.0; a versão está impressa na PCB).
- Um computador com **Chrome ou Edge** e um cabo USB de dados (USB-C na v2.0.0, micro-USB na v1.x).
- O nome e a palavra-passe do seu Wi-Fi (rede de 2,4 GHz).
- Home Assistant com a integração ESPHome (é sugerida automaticamente).

## 1. Instalar o firmware
1. Abra **https://skydoy.github.io/ESPHOME_Hunter/**.
2. Escolha a placa: **v2.0.0** (PCB preta, XIAO ESP32-C6) ou **v1.x** (PCB vermelha/azul, Wemos D1 mini).
3. Ligue o módulo ESP ao computador. Pode estar na placa, mas a placa **não** deve estar ligada
   ao X-Core enquanto está no USB, salvo se o jumper de alimentação estiver em USB (ver as legendas da placa).
4. Carregue em **Connect**, escolha a porta série ("USB JTAG/serial" ou "CH340/CP210x") e depois **Install**.

## 2. Wi-Fi
- Logo a seguir à instalação, a mesma janela pede o Wi-Fi: introduza-o e carregue em **Connect**.
- Ou, mais tarde: no telemóvel ligue-se à rede **`Hunter-LS Setup`**, abre-se uma página, escolha a sua rede.
  Esta rede volta a aparecer sozinha sempre que o Wi-Fi guardado não estiver disponível.
- Só na v2.0.0: a app do Home Assistant também configura o Wi-Fi por Bluetooth.

## 3. Montar a placa no X-Core
1. **Desligue o transformador do X-Core** da tomada.
2. Ponha o **interruptor do sensor do X-Core em "Active"** (sem isto a *Pause Watering* não faz nada).
3. Ligue os terminais da placa ao X-Core seguindo as legendas impressas na placa (saídas das zonas,
   VAC, REM, SEN). As fotos do Luís no [README](../README.md#pictures-of-pcb-and-installation) mostram uma instalação completa.
4. Volte a ligar o transformador. O LED do ESP pisca até ligar ao Wi-Fi.

## 4. Home Assistant
**Definições → Dispositivos e serviços**: aparece um novo dispositivo "Hunter Irrigation" → **Configurar**.
Dê-lhe um nome e uma divisão. Teste com uma rega curta: ponha **Run Time** a 1, ligue a **Zone 1**
e confirme que a válvula abre e que *Zone 1 Running* fica ligado.

| Entidade | Para que serve |
|---|---|
| **Zone 1 … Zone N** | Liga/desliga a zona durante *Run Time* minutos e mostra o estado **real** da válvula. |
| **Watering** / **Active Zone** | Se está a regar e qual a zona. |
| **Run Program A/B/C**, **Stop All** | Iguais aos botões do programador. |
| **Pause Watering** | Bloqueia toda a rega (como um sensor de chuva) até ser desligado. |
| **Firmware Update** | Instala novas versões pelo Wi-Fi. |

## 5. Atualizações
As novas versões aparecem no Home Assistant como **Firmware Update** → **Instalar**.

Algum problema? Ver [troubleshooting.md](troubleshooting.md) (inclui secção em português).
