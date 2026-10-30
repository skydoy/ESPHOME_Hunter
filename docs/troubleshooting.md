# Troubleshooting / Resolução de problemas

| Symptom | What to do |
|---|---|
| The installer finds no serial port | Use a USB **data** cable (many charge-only cables exist). Use Chrome or Edge on a computer (not a phone). v1.x: install the CH340/CP210x driver of your D1 mini. |
| "Failed to connect" while flashing (v2.0.0) | Hold the XIAO **BOOT** button, plug the cable in, release, then press Connect again. |
| No Wi-Fi window after installing | Join the `Hunter-LS Setup` hotspot from your phone, or press the three dots → *Configure Wi-Fi* in the installer. |
| The device is not discovered by Home Assistant | Same network/VLAN as Home Assistant, mDNS allowed. Add it by hand: ESPHome integration → host `hunter-ls-xxxxxx.local` (or its IP). |
| A zone switch turns itself back off after a second | The X-Core did not open the valve, so the feedback reports "off". Check the REM wire, that the X-Core is not in "Off", that **Pause Watering** is off, and the logs (`Command not sent: …`). |
| The valve runs but *Zone N Running* stays off | Check the zone wire to the board. If it flickers, raise `zone_off_delay` (see [configuration.md](configuration.md)). |
| **Pause Watering** has no effect | The X-Core sensor bypass switch must be on **Active**. |
| Weak Wi-Fi (v2.0.0) | Fit a u.FL antenna and turn on **External Antenna** (Configuration). |
| Logs | Open `http://<device-ip>/` (built-in page with logs) or the ESPHome Device Builder logs. |
| Start over | Re-flash from the web installer and choose *Erase device*. |

## Em português
| Sintoma | O que fazer |
|---|---|
| O instalador não encontra a porta | Use um cabo USB **de dados**, Chrome ou Edge num computador. v1.x: instale o driver CH340/CP210x. |
| "Failed to connect" (v2.0.0) | Mantenha o botão **BOOT** do XIAO carregado ao ligar o cabo, solte e tente de novo. |
| Não aparece a janela do Wi-Fi | Ligue-se à rede `Hunter-LS Setup` com o telemóvel. |
| O Home Assistant não encontra o dispositivo | Mesma rede que o Home Assistant; adicione à mão com `hunter-ls-xxxxxx.local` ou o IP. |
| Uma zona liga e volta a desligar sozinha | O X-Core não abriu a válvula. Verifique o fio REM, que o X-Core não está em "Off", que **Pause Watering** está desligado e os logs. |
| **Pause Watering** não faz nada | O interruptor do sensor do X-Core tem de estar em **Active**. |
| Wi-Fi fraco (v2.0.0) | Use uma antena u.FL e ligue **External Antenna**. |
| Começar do zero | Volte a instalar pelo instalador web e escolha *Erase device*. |
