# Home Assistant

## Adicionar o dispositivo

**Definições → Dispositivos e serviços**: aparece *ESPHome Hunter* em Descobertos → **Configurar**. Dá-lhe uma divisão (ex.: Jardim).

Se não aparecer, adiciona à mão: integração ESPHome → anfitrião `esphome-hunter-xxxxxx.local` (ou o IP). Mesma rede/VLAN que o Home Assistant; mDNS permitido.

## O que obténs

| Entidade | Para que serve |
|---|---|
| **Zone 1 … Zone N** | Liga / desliga uma zona durante *Run Time* minutos. Mostra o estado **real** da válvula. |
| **Watering**, **Active Zone** | Se está a regar, e qual a zona |
| **Run Time** | Minutos quando ligas uma zona pelo Home Assistant (1–240) |
| **Run Program A / B / C**, **Stop All** | Iguais aos botões do programador |
| **Pause Watering** | Bloqueia toda a rega, incluindo os programas do X-Core (como um sensor de chuva) |
| **Firmware Update** | Novas versões pelo Wi-Fi |

## Teste rápido

Põe **Run Time** a 1, liga a **Zone 1**, confirma que a válvula abre e que o interruptor fica ligado. Se desligar sozinho passado um segundo, vê [Problemas](troubleshooting.md).

Na v2 aparecem 8 zonas; se o teu X-Core tiver menos, desativa as que não usas no Home Assistant (ou muda `zone_count` — [configuration no GitHub](https://github.com/skydoy/ESPHOME_Hunter/blob/main/docs/configuration.md)).
