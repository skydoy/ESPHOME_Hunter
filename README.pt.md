<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="docs/img/logo-dark.png">
    <source media="(prefers-color-scheme: light)" srcset="docs/img/logo-light.png">
    <img src="docs/img/logo-light.png" alt="ESPHome Hunter" width="256">
  </picture>
</p>

<p align="center"><b>Gostas? Ajuda-me a fazer algo ainda melhor.</b><br>
  <a href="https://ko-fi.com/skydoy"><img src="https://img.shields.io/badge/Ko--fi-Support%20me-FF5E5B?logo=ko-fi&logoColor=white" alt="Apoiar no Ko-fi"></a>
  <a href="https://buymeacoffee.com/skydoy"><img src="https://img.shields.io/badge/Buy%20Me%20a%20Coffee-Support%20me-FFDD00?logo=buymeacoffee&logoColor=black" alt="Buy Me a Coffee"></a>
</p>

<p align="center">
  <a href="https://github.com/skydoy/ESPHOME_Hunter/actions/workflows/publish.yml"><img src="https://github.com/skydoy/ESPHOME_Hunter/actions/workflows/publish.yml/badge.svg" alt="Build"></a>
  <a href="https://github.com/skydoy/ESPHOME_Hunter/actions/workflows/validate.yml"><img src="https://github.com/skydoy/ESPHOME_Hunter/actions/workflows/validate.yml/badge.svg" alt="Validate"></a>
  <a href="https://github.com/skydoy/ESPHOME_Hunter/releases/latest"><img src="https://img.shields.io/github/v/release/skydoy/ESPHOME_Hunter?sort=semver" alt="Versão"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-PolyForm%20Noncommercial%201.0.0-blue" alt="Licença: PolyForm Noncommercial"></a>
</p>

<p align="center"><b>O teu programador de rega Hunter X-Core no Home Assistant. Liga por USB, carrega em Instalar, feito. Sem YAML.</b><br>
🇬🇧 <a href="README.md">Read in English</a></p>

<p align="center">
  <a href="https://skydoy.github.io/ESPHOME_Hunter/"><img src="https://img.shields.io/badge/Abrir%20o%20instalador%20web-1784F7?style=for-the-badge&logo=esphome&logoColor=white" alt="Abrir o instalador web" height="40"></a>
</p>

<p align="center">
  <img src="docs/img/wiring.png" alt="Esquema de ligações do Hunter X-Core" width="640">
</p>

## Compatibilidade

Só as **placas Hunter_LS do Luís Soares** — **v1.x** (Wemos D1 mini, 4 zonas) ou **v2.0.0** (XIAO ESP32-C6, até 8 zonas) — num programador Hunter com terminais REM, SEN e das zonas (ex.: X-Core).  
Detalhes: [visão geral](docs/visao-geral.md) · [hardware e pinos](docs/hardware.md)

## Instalar em 3 passos

1. **Instalar o firmware** — Abre o **[instalador web](https://skydoy.github.io/ESPHOME_Hunter/)**, escolhe a placa, liga por USB → **Instalar**.
2. **Wi-Fi** — Escreve a tua rede de 2,4 GHz na mesma janela (ou liga-te depois a `ESPHome Hunter Setup`).
3. **Montar e adicionar** — Desliga o X-Core, põe o interruptor do sensor em **Active**, monta a placa ([ligações](docs/hardware.md#wiring)), volta a ligar. Home Assistant → **Configurar**.

Com imagens: [Guia rápido](docs/guia-rapido.md)

## O que obténs

- Ligar / parar cada zona e ver o estado **real** da válvula
- Programas A / B / C e **Stop All** (iguais aos botões do X-Core)
- **Pause Watering** — bloqueia toda a rega (como um sensor de chuva)
- Tempo de rega configurável (1–240 min)
- Atualizações de firmware com um clique (ou Auto Update de madrugada)
- Página web da placa na tua LAN (`http://<ip-da-placa>/`) — [capturas](docs/pagina-web.md)

## Documentação e mais

[Site de documentação](https://skydoy.github.io/ESPHOME_Hunter/docs/pt/) ·
[Visão geral (placas, OTA, créditos)](docs/visao-geral.md) ·
[Guia rápido](docs/guia-rapido.md) ·
[Hardware e pinos](docs/hardware.md) ·
[Configuração](docs/configuration.md) ·
[Problemas](docs/problemas.md) ·
[Página web da placa](docs/pagina-web.md) ·
[Segurança e OTA](docs/seguranca.md) ·
[Alterações](CHANGELOG.md) ·
[Reportar um problema](https://github.com/skydoy/ESPHOME_Hunter/issues)


[PolyForm Noncommercial 1.0.0](LICENSE) — gratuito para uso pessoal e não comercial; uso comercial não permitido.  
[Política de segurança](SECURITY.md) · [Avisos de terceiros](THIRD_PARTY_NOTICES.md)
