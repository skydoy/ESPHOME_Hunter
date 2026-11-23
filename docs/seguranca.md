# Segurança e atualizações pelo ar

🇬🇧 [Read in English](security.md) · [Voltar ao README](../README.pt.md)

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

## O que fica acessível na tua rede
Isto é exatamente o que o firmware abre, tirado da configuração dele. "Qualquer pessoa na tua
rede" quer dizer qualquer telemóvel, PC ou aparelho ligado ao mesmo Wi-Fi ou à mesma LAN.

| O quê | Onde | Proteção no firmware pré-compilado | Quem pode usar |
|---|---|---|---|
| Página web da placa | `http://<ip>/` (porta 80, HTTP simples) | **nenhuma** | Qualquer pessoa na tua rede vê as zonas, liga ou para a rega, muda definições, carrega em **Restart** e lê os registos em direto. |
| Ligação ao Home Assistant (API nativa) | porta 6053 | **sem chave de encriptação** | Qualquer pessoa na tua rede com o Home Assistant ou as ferramentas do ESPHome consegue ligar-se e controlar a placa. |
| Atualizações sem fios (OTA do ESPHome) | porta 3232 na v2.0.0, 8266 na v1.x | **sem palavra-passe** | Qualquer pessoa na tua rede pode enviar outro firmware. |
| Hotspot `ESPHome Hunter Setup` + página de configuração | rede Wi-Fi própria | **aberto** (sem palavra-passe) | Quem estiver perto do programador, **só enquanto o hotspot está ligado**: quando ainda não há Wi-Fi guardado, ou cerca de 90 segundos depois de o Wi-Fi guardado deixar de responder. Desliga-se outra vez quando a placa volta ao teu Wi-Fi. |
| Configurar o Wi-Fi por USB (Improv Serial) | cabo USB | precisa de acesso físico | Só quem ligar um cabo à placa. |
| Nome na rede (mDNS) | porta 5353 | — | Anuncia o nome e o IP da placa para o Home Assistant a encontrar. |
| Bluetooth | — | não é usado | Nada. (Até à 0.1.14, a placa v2.0.0 também deixava configurar o Wi-Fi por Bluetooth; foi retirado.) |

A placa também faz algumas ligações **para fora**, para a internet:

- **Procurar atualizações:** a cada 6 horas (e de madrugada, se o **Auto Update** estiver
  ligado) descarrega um ficheiro pequeno de `https://skydoy.github.io/ESPHOME_Hunter/` para ver
  se há versão nova. Não envia nada sobre ti nem sobre o teu jardim. A placa v2.0.0 confirma o
  certificado HTTPS; a v1.x (ESP8266) não consegue, por isso fia-se na verificação MD5 do
  firmware descarregado.
- **Relógio:** vai buscar a hora ao Home Assistant ou, se ele não estiver, a servidores de hora
  públicos na internet (SNTP).

Mais nada fica à escuta nem "liga para casa". Não há conta na nuvem nem acesso remoto pela
internet, a não ser que tu abras portas no router (**não abras**).

### Formas simples de a proteger
1. **Nunca reencaminhes as portas dela no router.** Deixa-a só na tua rede de casa.
2. **Mete-a numa rede à parte para aparelhos inteligentes** (uma VLAN IoT ou a rede de
   convidados), se o teu router deixar, e deixa só o Home Assistant chegar a ela.
3. **Acrescenta uma chave de API, uma palavra-passe OTA e uma palavra-passe do hotspot** — vê
   [Acrescentar uma chave de API](#acrescentar-uma-chave-de-api-recomendado) mais abaixo.
4. **Protege ou tira a página web** se outras pessoas usarem a tua rede (vê o fim da secção
   seguinte).
5. **Mantém-na atualizada:** deixa o **Auto Update** ligado, ou instala as atualizações quando o
   Home Assistant as mostrar.

## OTA de fábrica vs Device Builder
- **Imagem do instalador / fábrica:** o Home Assistant mostra **Firmware Update**. Carrega em
  **Install**, ou deixa o **Auto Update** ligado para instalar de madrugada. O Wi-Fi e as zonas
  mantêm-se.
- **Adotada no ESPHome Device Builder:** a placa só *avisa* que há versão nova
  (**Update Available**, **Check for Update**, **Update Status**). Carrega em **Install** no
  Device Builder; a config já segue a `@stable`. **Não** instales a imagem genérica de fábrica
  por cima de uma build adotada — isso apaga a tua chave de API e os extras.

Detalhes: [configuration.md → Updates (OTA)](configuration.md#updates-ota) (em inglês).

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
Passo a passo para adotar: [Adopt in the Device Builder](configuration.md#adopt-in-the-device-builder)
(em inglês).

Para proteger a página web da placa com palavra-passe, acrescenta `web_server: auth:` na tua
config; para a remover de todo, sobrescreve o pacote com `web_server: !remove` (vê
`core/web-server.yaml`).

## Reportar uma vulnerabilidade
Vê o [SECURITY.md](../SECURITY.md). **Não** abras um issue público para problemas de segurança.
