# Resolução de problemas

| Sintoma | O que fazer |
|---|---|
| O instalador não encontra a porta | Usa um cabo USB **de dados**, Chrome ou Edge num computador. v1.x: instala o driver CH340/CP210x. |
| "Failed to connect" (v2.0.0) | Mantém o botão **BOOT** do XIAO carregado ao ligar o cabo, solta e tenta de novo. |
| Não aparece a janela do Wi-Fi | Liga-te à rede `ESPHome Hunter Setup` com o telemóvel, ou no instalador carrega nos três pontos → *Configure Wi-Fi*. |
| O Home Assistant não encontra o dispositivo | A placa tem de estar na mesma rede que o Home Assistant; adiciona à mão com `esphome-hunter-xxxxxx.local` ou o IP. |
| Uma zona liga e volta a desligar sozinha | O X-Core não abriu a válvula. Verifica o fio REM, que o X-Core não está em "Off", que **Pause Watering** está desligado e os logs. |
| **Pause Watering** não faz nada | O interruptor do sensor do X-Core tem de estar em **Active**. |
| Wi-Fi fraco (v2.0.0) | Usa uma antena u.FL e liga **External Antenna**. |
| A válvula rega mas *Zone N Running* fica desligado | Verifica o fio da zona até à placa. Se piscar, aumenta `zone_off_delay` (ver [configuration no GitHub](https://github.com/skydoy/ESPHOME_Hunter/blob/main/docs/configuration.md)). |
| Ver os logs | Abre `http://<ip-da-placa>/` (página com os logs) ou os logs do ESPHome Device Builder. |
| Começar do zero | Volta a instalar pelo instalador web e escolhe *Erase device*. |

Continuas com problemas? [Abre um issue](https://github.com/skydoy/ESPHOME_Hunter/issues) com a versão da placa e os logs.

Também: [FAQ](faq.md) · [Ligações](wiring.md) · [Segurança](security.md)
