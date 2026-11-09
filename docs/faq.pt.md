# FAQ

## Que placas são suportadas?

Só as **Hunter_LS do Luís Soares**: **v1.x** (Wemos D1 mini, 4 zonas) e **v2.0.0** (XIAO ESP32-C6, até 8 zonas), num programador Hunter com terminais REM, SEN e das zonas (ex.: X-Core). Outras placas ou controladores não são suportados.

## Preciso de YAML?

Não. Usa o [instalador web](https://skydoy.github.io/ESPHOME_Hunter/). O YAML é opcional se adotares o dispositivo no ESPHome Device Builder.

## Porque é que tem de ser Wi-Fi 2,4 GHz?

Os módulos ESP destas placas só usam 2,4 GHz. Redes de 5 GHz não funcionam.

## O que é a rede `ESPHome Hunter Setup`?

Um hotspot de recurso que a placa abre quando não tem Wi-Fi guardado (ou não o consegue alcançar). Liga-te com o telemóvel para configurares o Wi-Fi. Está aberto e só ativo enquanto o Wi-Fi está em baixo.

## Porque é que o interruptor do sensor tem de estar em Active?

A *Pause Watering* abre o circuito do sensor de chuva. No X-Core o bypass do sensor tem de estar em **Active**, senão a Pause não faz nada.

## Posso usar isto comercialmente?

Não. O firmware é [PolyForm Noncommercial 1.0.0](licence.md): só uso pessoal e não comercial.

## Onde estão as capturas da página web da placa?

[Página web da placa](web-page.md).

## Algo correu mal — onde olho?

[Problemas](troubleshooting.md) · [issues no GitHub](https://github.com/skydoy/ESPHOME_Hunter/issues)
