# Bowling_palya_webker

## Bowling pálya időpont foglalás

Az app JSON fájl-ban tárolja az ideiglenes adatokat, ezért még mielőtt elindítanád **szükség van egy JSON szerver futtatására**. Ehhez szükséges lesz telepíteni a **Node.js**-t. Ha megvan a Node.js, érdemes először egy IDE-ben megnyitni a projektet, majd a terminálban ezeket a lépéseket követni:

**1. lépés:** JSON szerver telepítése

    npm install -g json-server

A `-g` flag globálisan telepít. Ha csak lokálisan szeretnéd telepíteni, ezt a parancsot futtasd le:

    npm i json-server

**2. lépés:** JSON szerver elindítása

    json-server --watch data.json

Fontos, hogy a szerver a 3000-es porton fusson (ez az alapértelmezett). Ha bármi okból mégsem ezen a porton fut, a parancsot egészítsd ki ezzel: `--port 3000` !
