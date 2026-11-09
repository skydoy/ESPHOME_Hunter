# Segurança e atualizações pelo ar

🇬🇧 

## Firmware pré-compilado (instalador web)
A imagem do [instalador web](https://skydoy.github.io/ESPHOME_Hunter/) é a mesma para toda a gente,
por isso **não pode conter as tuas chaves nem palavras-passe**. Vem assim:

| Item | Firmware pré-compilado | Porquê |
|---|---|---|
| Chave de encriptação da API do Home Assistant | nenhuma | Qualquer Home Assistant na tua rede a adota com um clique. |
| Palavra-passe OTA (ESPHome) | nenhuma | A mesma imagem pública para todos. |
| Rede de recurso (`ESPHome Hunter Setup`) | aberta, só enquanto o Wi-Fi não está ligado | Para configurares o Wi-Fi no telemóvel. |
| Página web da placa (`http://<ip>/`) | **sem palavra-passe** (só na LAN) | De propósito, para controlo local e registos em direto. Quem estiver na tua rede consegue ver e ligar ou parar zonas. |
| Atualizações de firmware | **Firmware Update** + **Auto Update** | Descarregadas por HTTPS do GitHub Pages deste projeto; o manifesto traz um MD5 que a placa confirma antes de reiniciar. |

Numa rede doméstica de confiança, esta é a configuração habitual dos firmwares ESPHome
prontos a usar. Se outras pessoas ou dispositivos partilharem essa rede, protege-a como se
explica a seguir (ou mete o programador numa VLAN de confiança).

## OTA de fábrica vs Device Builder
- **Imagem do instalador / fábrica:** o Home Assistant mostra **Firmware Update**. Carrega em
  **Install**, ou deixa o **Auto Update** ligado para instalar de madrugada. O Wi-Fi e as zonas
  mantêm-se.
- **Adotada no ESPHome Device Builder:** a placa só *avisa* que há versão nova
  (**Update Available**, **Check for Update**, **Update Status**). Carrega em **Install** no
  Device Builder; a config já segue a `@stable`. **Não** instales a imagem genérica de fábrica
  por cima de uma build adotada — isso apaga a tua chave de API e os extras.

Detalhes: [configuration.md → Updates (OTA)](https://github.com/skydoy/ESPHOME_Hunter/blob/main/docs/configuration.md#updates-ota) (em inglês).

## Acrescentar uma chave de API (recomendado)
Adota a placa no ESPHome Device Builder (ele gera-te uma chave de encriptação) e acrescenta uma
palavra-passe OTA e da rede de recurso ao YAML (e aos Secrets):

```yaml
api:
  encryption:
    key: !secret api_key   # openssl rand -base64 32  (ou mantém a chave que o Builder gerou)

ota:
  - platform: esphome
    password: !secret ota_password

wifi:
  ap:
    password: !secret ap_password   # pelo menos 8 caracteres
```

Instala com **Install → Wirelessly**. O Home Assistant pede a mesma `api_key` se a mudares.
Passo a passo para adotar: [Adopt in the Device Builder](https://github.com/skydoy/ESPHOME_Hunter/blob/main/docs/configuration.md#adopt-in-the-device-builder)
(em inglês).

Para proteger a página web da placa com palavra-passe, acrescenta `web_server: auth:` na tua
config; para a remover de todo, sobrescreve o pacote com `web_server: !remove` (vê
`core/web-server.yaml`).

## Reportar uma vulnerabilidade
Vê o [SECURITY.md](https://github.com/skydoy/ESPHOME_Hunter/blob/main/SECURITY.md). **Não** abras um issue público para problemas de segurança.
