# Resolução de problemas

*English: [troubleshooting.md](troubleshooting.md).*

| Sintoma | O que fazer |
|---|---|
| O instalador não encontra a porta | Use um cabo USB **de dados**, Chrome ou Edge num computador. v1.x: instale o driver CH340/CP210x. |
| "Failed to connect" (v2.0.0) | Mantenha o botão **BOOT** do XIAO carregado ao ligar o cabo, solte e tente de novo. |
| Não aparece a janela do Wi-Fi | Ligue-se à rede `Hunter-LS Setup` com o telemóvel, ou no instalador carregue nos três pontos → *Configure Wi-Fi*. |
| O Home Assistant não encontra o dispositivo | Mesma rede que o Home Assistant; adicione à mão com `hunter-ls-xxxxxx.local` ou o IP. |
| Uma zona liga e volta a desligar sozinha | O X-Core não abriu a válvula. Verifique o fio REM, que o X-Core não está em "Off", que **Pause Watering** está desligado e os logs. |
| **Pause Watering** não faz nada | O interruptor do sensor do X-Core tem de estar em **Active**. |
| Wi-Fi fraco (v2.0.0) | Use uma antena u.FL e ligue **External Antenna**. |
| A válvula rega mas *Zone N Running* fica desligado | Verifique o fio da zona até à placa. Se piscar, aumente `zone_off_delay` (ver [configuration.md](configuration.md)). |
| Ver os logs | Abra `http://<ip-da-placa>/` (página com os logs) ou os logs do ESPHome Device Builder. |
| Começar do zero | Volte a instalar pelo instalador web e escolha *Erase device*. |

Continua com problemas? [Abra um issue](https://github.com/skydoy/ESPHOME_Hunter/issues) com a versão da placa e os logs.
