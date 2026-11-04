# Guia rápido

Da caixa ao Home Assistant em cerca de 10 minutos, sem YAML. *English: [quick-start.md](quick-start.md).*

## Precisas de
- Uma placa **Hunter_LS** (a versão está impressa na PCB: v1.0.0, v1.1.0, v1.1.1 ou v2.0.0).
- Um computador com **Chrome ou Edge** e um cabo USB **de dados** (USB-C na v2.0.0, micro-USB na v1.x).
- O nome e a palavra-passe do Wi-Fi de casa (rede de **2,4 GHz**).
- Home Assistant (a integração ESPHome é sugerida automaticamente).

## 1. Instalar o firmware (2 minutos)
Faz isto **antes de montar a placa no X-Core** (ou com o X-Core desligado da tomada).
1. Abre **https://skydoy.github.io/ESPHOME_Hunter/**.
2. Escolhe a placa: **v2.0.0** (PCB preta, XIAO ESP32-C6) ou **v1.x** (Wemos D1 mini).
3. Liga o módulo ESP ao computador por USB.
4. Carrega em **Instalar**, escolhe a porta ("USB JTAG/serial debug unit" na v2.0.0, "CH340"/"CP210x" na v1.x) → **Install**.

✅ *Deves ver:* uma barra de progresso e depois "Installation complete!".

## 2. Wi-Fi (1 minuto)
- Logo a seguir, a mesma janela pede o Wi-Fi: escolhe a rede, escreve a palavra-passe → **Connect**.
- Saltou este passo? No telemóvel liga-te à rede **`Hunter-LS Setup`**; abre-se uma página, escolhe o teu Wi-Fi.
  Esta rede volta a aparecer sozinha sempre que a placa não conseguir ligar ao Wi-Fi guardado.
- Só na v2.0.0: também podes configurar o Wi-Fi por Bluetooth na app do Home Assistant.

✅ *Deves ver:* "Connected" e um botão **Visit device**. O LED deixa de piscar.

## 3. Montar a placa no X-Core (5 minutos)
1. **Desliga o transformador do X-Core da tomada.**
2. Põe o **interruptor do sensor do X-Core em "Active"** (sem isto a *Pause Watering* não faz nada).
3. Liga os fios da placa aos terminais do X-Core seguindo as legendas impressas na placa (zonas, VAC, REM, SEN).
4. Volta a ligar o transformador.

![Placa ligada aos terminais do X-Core](img/install-wiring.jpg)
![Placa montada dentro do X-Core](img/install-detail.jpg)

*Fotos do Luís Soares (placa v1.0.0; as outras versões montam-se da mesma forma). Mais fotos em [hardware/](../hardware/).*

## 4. Adicionar ao Home Assistant (1 minuto)
**Definições → Dispositivos e serviços**: aparece **Hunter Irrigation** em *Descobertos* → **Configurar**.
Dá-lhe uma divisão (ex.: Jardim).

**Teste:** põe **Run Time** a 1, liga a **Zone 1** e confirma que a válvula abre e que o
interruptor fica ligado. Se voltar a desligar-se sozinho passado um segundo, vê [problemas.md](problemas.md).

| Entidade | Para que serve |
|---|---|
| **Zone 1 … Zone N** | Liga/desliga a zona durante *Run Time* minutos e mostra o estado **real** da válvula. |
| **Watering** / **Active Zone** | Se está a regar e qual a zona. |
| **Run Program A/B/C**, **Stop All** | Iguais aos botões do programador. |
| **Pause Watering** | Bloqueia toda a rega (como um sensor de chuva) até ser desligado. |
| **Firmware Update** | Instala novas versões pelo Wi-Fi. |

Na v2.0.0 aparecem 8 zonas; se o teu X-Core tiver menos, desativa as que não usas no Home Assistant
(ou muda `zone_count`, ver [configuration.md](configuration.md)).

## 5. Atualizações
Quando sair uma versão nova aparece **Firmware Update** no Home Assistant → **Instalar**. Mais nada.

Algum problema? Vê **[problemas.md](problemas.md)**.
