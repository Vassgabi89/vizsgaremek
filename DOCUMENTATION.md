## **1. Az alkalmazás célja**

Ez egy mobilra is optimalizált, bootstrappal támogatott Angular alapú alkalmazás, melyben lehetőség van felhasználóként

- elérhető vonatok megtekintésére
- vonatjegyek megtekintésére és vásárlására
- megvásárolt jegyek megtekintésére
- számlák megtekintésére

illetve adminisztrátorként

- vonatjegyek kezelésére (crud)
- vonatok kezelésére (crud)
- felhasználók kezelésére (crud)

## **2. Az alkalmazás telepítése**

- Forkolni kell az adott GitHub repository tartalmát:

    https://github.com/Vassgabi89/vizsgaremek

- A célgépre le kell klónozni az adott GitHub repository tartalmát.

   `git clone https://github.com/Vassgabi89/vizsgaremek.git`

- Telepíteni kell az alkalmazás függőségeit:

    - Backend

        - A terminálon be kell lépni a /backend mappába és futtatni az `npm i` parancsot.
    
    - Frontend

        - A terminálon be kell lépni a /frontend mappába és futtatni az `npm i` parancsot.  

- Ha még nincsen fenn a célgépen, akkor telepíteni kell az Angular keretrendszert az `npm i -g @angular/cli` paranccsal.
- A terminálban ki kell adni az `ng build` parancsot.
- A /frontend/dist/frontend mappa tartalmát be kell másolni a /backend/public mappába.

VAGY

- A terminálon be kell lépni a /backend mappába és futtatni az `npm run build` parancsot.

## **3. Az alkalmazás konfigurálása**

A /frontend/environments mappában be kell állítani az API végpont elérési útvonalát: 

  - _environment.ts_ állomány: http://127.0.0.1:3000/  
  - _environment.prod.ts_ állomány: http://localhost:3000/ 

## **4. Az alkalmazás indítása**

A megadott Docker container indítása és inicializálása:

- El kell indítani a Docker Desktop alkalmazást.
- A /backend mappába belépve a terminálban ki kell adni az `npm start` parancsot.  
(Ha szükséges, a /frontend mappába belépve a terminálban az `npm start` paranccsal indítható a frontend.) 

_Megjegyzés_:  
A belépéshez egy érvényes e-mail-cím és jelszó páros (példa):  

E-mail | Jelszó
------------ | -------------
seyden0@merriam-webster.com | $2a$10$G6MvO41/2aIVLmu5yGeNZevONGRgrk71kVCvw5ttCkI/1rBXn0DTa
mcomfort6@github.io | $2a$10$ZrOZ40dYWInLc0zpQZ6Cg.CBqjuTRynd6ZaD8bJiEAYoeAnilCI6W

## **5. Az alkalmazás tesztelése**

A /backend mappába belépve a terminálban ki kell adni az `npm test` parancsot.  

## **6. A végpontok dokumentációja**

Swagger 
- Az alábbi URL-t kell beírni a böngészőbe: https://localhost:3000/api-docs

## **Linkek:**  

- [A User Story (adminisztrátori szerepkör) itt érhető el.](https://github.com/Vassgabi89/vizsgaremek/blob/main/README.md)





