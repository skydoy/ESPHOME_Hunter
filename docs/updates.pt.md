# Atualizações

## Automáticas (imagem do instalador web)

Com a **Atualização automática** ligada (predefinido), a placa procura uma versão nova uma vez por noite às **03:MM** (minuto ao acaso) e instala-a. Também verifica ao arrancar e a cada 6 horas. Só são oferecidas versões testadas do ramo `stable`.

O Home Assistant também mostra um cartão **Firmware Update**: carrega em **Instalar**, espera 1–2 minutos, não desligues. O Wi-Fi e as zonas mantêm-se.

## Device Builder (adotada)

Se adotaste a placa no ESPHome Device Builder, ela só *avisa* que há versão nova (*Update Available*, *Check for Update*, *Update Status*). Carrega em **Install** no Device Builder — a tua configuração já segue `@stable`.

!!! warning "Não graves a imagem de fábrica por cima de uma build adotada"
    Isso apagaria a chave de API e extras. Vê [Segurança](security.md).

## Avisar-me

Importa o blueprint do Home Assistant  
`blueprints/automation/esphome_hunter_update_available.yaml`  
para receberes uma notificação no telemóvel quando *Update Available* passar a ligado.

## v1 (ESP8266)

A v1 não consegue verificar o certificado HTTPS ao descarregar. Funciona na mesma; se preferires, atualiza por USB no [instalador](https://skydoy.github.io/ESPHOME_Hunter/).
