<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="docs/img/logo-dark.png">
    <source media="(prefers-color-scheme: light)" srcset="docs/img/logo-light.png">
    <img src="docs/img/logo-light.png" alt="ESPHome Hunter" width="280">
  </picture>
</p>

<p align="center"><b>O seu programador de rega Hunter X-Core no Home Assistant. Ligar, carregar em Instalar, feito. Sem YAML.</b><br>
🇬🇧 <a href="README.md">Read in English</a></p>

<p align="center">
  <a href="https://skydoy.github.io/ESPHOME_Hunter/"><img src="https://img.shields.io/badge/Abrir%20o%20instalador%20web-0A8FD8?style=for-the-badge&logo=esphome&logoColor=white" alt="Abrir o instalador web" height="40"></a>
</p>

Firmware para a **[placa Hunter_LS do Luís Soares](docs/original-hunter-ls.md)**, uma pequena PCB que
cabe dentro do X-Core, liga as zonas como o comando Hunter e confirma se cada válvula abriu mesmo.
Tudo local: sem nuvem, sem app, sem conta.

## Instalar em 3 passos
1. **Instalar o firmware.** Abra o **[instalador web](https://skydoy.github.io/ESPHOME_Hunter/)** no Chrome ou Edge,
   escolha a placa (a versão está impressa na PCB), ligue o ESP ao computador por USB → **Instalar**.
2. **Wi-Fi.** Escreva o seu Wi-Fi na mesma janela. (Ou mais tarde: ligue-se à rede `Hunter-LS Setup` com o telemóvel.)
3. **Montar e adicionar.** Desligue o X-Core da tomada, ponha o interruptor do sensor em **Active**, monte a placa e volte a ligar.
   O Home Assistant mostra *Hunter Irrigation* em **Definições → Dispositivos e serviços** → **Configurar**.

Passo a passo com fotos: **[Guia rápido](docs/guia-rapido.md)** · **[Quick start (EN)](docs/quick-start.md)**

## O que aparece no Home Assistant
| Entidade | Para que serve |
|---|---|
| **Zone 1 … Zone N** | Liga / desliga uma zona durante *Run Time* minutos. Mostra o estado **real** da válvula. |
| **Watering**, **Active Zone** | Se está a regar, e qual a zona. |
| **Run Time** | Minutos de rega quando liga uma zona pelo Home Assistant (1–240). |
| **Run Program A / B / C**, **Stop All** | Iguais aos botões do programador. |
| **Pause Watering** | Bloqueia toda a rega, incluindo os programas do X-Core (como um sensor de chuva). |
| **Firmware Update** | Novas versões instalam-se pelo Wi-Fi com um clique. |

## Placas
| | **v2.0.0** (PCB preta) | **v1.x** (v1.0.0 / v1.1.0 / v1.1.1) |
|---|---|---|
| Módulo ESP | Seeed XIAO ESP32-C6 | Wemos D1 mini (ESP8266) |
| Zonas | até 8 (2/4/6/8) | 4 |
| Configurar o Wi-Fi | USB, Bluetooth ou hotspot | USB ou hotspot |

> **Estado:** a v0.1.0 é compilada e verificada automaticamente, mas ainda não foi testada numa placa real.
> Os pinos da v2.0.0 vêm do firmware do próprio Luís. Experimentou? [Conte-nos](https://github.com/skydoy/ESPHOME_Hunter/issues).

## Documentação
[Problemas](docs/problemas.md) · [Troubleshooting (EN)](docs/troubleshooting.md) ·
[Configuração avançada (EN)](docs/configuration.md) · [Hardware e pinos (EN)](docs/hardware.md) ·
[Alterações](CHANGELOG.md) · [Reportar um problema](https://github.com/skydoy/ESPHOME_Hunter/issues)

## Créditos
- **Hardware: [Luís Soares](https://github.com/luisfosoares)**, [luisfosoares/Hunter_LS](https://github.com/luisfosoares/Hunter_LS).
  A PCB, as versões e as fotos são trabalho dele. [README original do Luís](docs/original-hunter-ls.md)
  (inclui como obter uma placa) · [fotos](hardware/).
- Esquema e abordagem ESPHome original: **[CZSmith](https://github.com/czsmith)**, [HunterMonitor](https://github.com/czsmith/HunterMonitor) (MIT, ver [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md)).
- Drivers do protocolo Hunter ROAM: [javiervidao/Hunter_Roam](https://github.com/javiervidao/Hunter_Roam) (v1.x) e
  [luisfosoares/Hunter_ESP_IDF](https://github.com/luisfosoares/Hunter_ESP_IDF) (v2.0.0).
- Firmware, instalador e logótipo: [skydoy](https://github.com/skydoy).

Hunter e X-Core são marcas registadas da Hunter Industries. Projeto comunitário independente,
sem ligação nem aprovação da Hunter Industries.
