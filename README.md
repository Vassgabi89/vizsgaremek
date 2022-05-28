# Train360
# Vonatjegyes alkalmazás
> Vizsgaremek feladat

***

## _Leírás_

Az alkalmazás egy mobilra is optimalizált, bootstrappal támogatott Angulat alapú alkalmazás, melyben lehetőség van felhasználóként

- vonatjegyek megtekintésére és vásárlására
- megvásárolt jegyek megtekintésére
- elérhető vonatok megtekintésére

illetve adminisztrátorként

- vonatjegyek kezelésére (crud)
- vonatok kezelésére (crud)
- számlák kezelésére (crud)
- vásárlók kezelésére (crud)

## _Felhasználói történetek_

### Navigációs sáv

| Felhasználó jogköre | Tevékenysége | Haszna | Elfogadási kritériuma |
| --- | --- | --- | --- |
| Felhasználó | szeretném elérni az elérhető aloldalakat | hogy könnyedén navigáljak az oldalon. | Reszponzív menüsáv, amely minden aloldalon megjelenik.|
| Adminként  | be tudjak jelentkezni | hogy elérhetővé váljanak az adminisztrátori szerepkörök | Admin bejelentkezés gomb a menüsávon |

### Főoldal

| Felhasználó jogköre | Tevékenysége | Haszna | Elfogadási kritériuma |
| --- | --- | --- | --- |
| Felhasználóként | szeretnék egy üdvözlő képernyőt | megismerjem az oldal témáját, kellemes benyomást keltsen | Vonatos/utazós képek, némi információ a cégről |
| Adminként  | statisztikák megtekintése | hogy adatokat láthassak az eladott jegyekről, bevételről stb... | Grafikonok megjelenítése |

### Jegyek oldal

| Felhasználó személye | Tevékenység | Haszon | Elfogadási kritérium |
| --- | --- | --- | --- |
| Felhasználóként | szeretném látni az összes jegyet | hogy választani tudjak | Lista az összes jegyről |
| Felhasználóként | sorba rendezni és szűrni a jegyeket | hogy könnyebben megtaláljam, amit keresek | Fejlécre kattintással sorbarendezés, szűrő input felül |
| Felhasználóként | megvásárolni egy jegyet | megvásárolni egy jegyet | Jegy vásárlása gomb a jegy sorában, amely egy modalt nyit (utazók száma és kedvezmény megadásához) majd a jegy át kerül a saját jegyek oldalra. |
| Adminként | szeretnék új jegyet hozzáadni | hogy kiegészítsem az adatbázist az újonnan elérhető jegyekkel. | Új jegy hozzáadása gomb, amely átirányít az új jegy felvétele oldalra. |
| Adminként | szeretném szerkeszteni a meglévő jegyeket | hogy kijavítsam/kibővítsem az jegy adatait. | Módosítás gomb a jegy sorában, amely átirányít az jegy szerkesztése oldalra. |
| Adminként | szeretnék törölni egy jegyet | hogy a már nem elérhető/hibás jegyek ne szerepeljenek az adatbázisban. | Törlés gomb a jegy sorában, amely megerősítés után törli az jegyet. |

### Saját jegyek oldal

| Felhasználó személye | Tevékenység | Haszon | Elfogadási kritérium |
| --- | --- | --- | --- |
| Felhasználóként | szeretném látni a megvásárolt jegyeimet | hogy ellenőrizni és nyomtatni tudjam őket | Lista az összes jegyről, soronként nyomtatási gombbal, ami egy modalt nyit(a jegy nyomtatható formájában) |

### Vonatok oldal

| Felhasználó személye | Tevékenység | Haszon | Elfogadási kritérium |
| --- | --- | --- | --- |
| Felhasználóként | szeretném látni az összes vonatot | hogy választani tudjak | Kártyás lista az összes vonatról |
| Felhasználóként | további információkat akarok látni az egyes vonatokról | hogy könnyebben megtaláljam, amit keresek | kártyára kattintásra vonat-bemutató modal |
| Felhasználóként | jegyet szeretnék venni az adott vonatra | nem kell a jegyek oldalra visszamennem | "Jegy vásárlása" gomb, mely visszairányít a jegyek oldalra és a találatokat az adott vonatra szűri |
| Adminként | szeretnék új vonatot hozzáadni | hogy kiegészítsem az adatbázist az újonnan elérhető vonatokkel. | Új vonat hozzáadása az utolsó kártyán, amely átirányít az új vonat felvétele oldalra. |
| Adminként | szeretném szerkeszteni a meglévő vonatokat | hogy kijavítsam/kibővítsem az vonat adatait. | Módosítás gomb a vonat kártyán, amely átirányít az vonat szerkesztése oldalra. |
| Adminként | szeretnék törölni egy vonatot | hogy a már nem elérhető/hibás jegyek ne szerepeljenek az adatbázisban. | Törlés gomb a vonat kátyán, amely megerősítés után törli az vonatot. |
### Vásárlók oldal

| Felhasználó személye | Tevékenység | Haszon | Elfogadási kritérium |
| --- | --- | --- | --- |
| Adminként | szeretném látni az összes vásárlót | hogy kezelhessem őket | Lista az összes vásárlóról |
| Adminként | szeretném szerkeszteni a meglévő vásárlókat | hogy kijavítsam a vásárló adatait. | Módosítás gomb a vásárló sorában, amely átirányít az vásárló szerkesztése oldalra. |
| Adminként | szeretnék törölni egy vásárlót | hogy már ne szerepeljen az adatbázisban. | Törlés gomb a vásárló sorában, amely megerősítés után törli az vásárlót. |

### Számlák oldal

| Felhasználó személye | Tevékenység | Haszon | Elfogadási kritérium |
| --- | --- | --- | --- |
| Felhasználóként | szeretném látni az összes számlát | hogy választani tudjak | Lista az összes számláról |
| Adminként | szeretnék új számlát hozzáadni | hogy kiegészítsem az adatbázist | Új számla hozzáadása gomb, amely átirányít az új számla felvétele oldalra. |
| Adminként | szeretném szerkeszteni a meglévő számlákat | hogy kijavítsam/kibővítsem az számla adatait. | Módosítás gomb a számla sorában, amely átirányít az számla szerkesztése oldalra. |
| Adminként | szeretnék törölni egy számlát | hogy a már nem elérhető/hibás számlák ne szerepeljenek az adatbázisban. | Törlés gomb a számla sorában, amely megerősítés után törli az számlát. |