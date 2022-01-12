# frontend_project
El objecitu del projecte es una pagina web on es pugen escriure i guardar partitures 
amés de poder compartirles i descarregarles com si fora una red social.
La aplicacio esta desplegada en webpack, utilitza Firebase de backend i JS en el frontend.

## LLIBRERIES
- Webpack per desplegar el projecte
- Mocha i Chai per a fer test
- VexFlow per renderizar i manipular les partitures
- Bootstrap per al css
- rxjs per la programació reactiva

## FIREBASE (BD)
Les conexions i peticions a BD es fan en el fitxer connect.js (inacabat), les conexions que necessiten de la meua clau privada 
fan referencia a la variable "key" la cual esta en un fitxer ignorat apikey.js.

## ESTRUCTURA
Els fitxers principals com son index.html i main.js i el css estan situats en l'arrel del projecte i la resta d'arxius js dins de la carpeta pages.
El index.html conte les etiquetes bàsiques on es pintaran totes les pagines.
Main.js es el primer js que s'executa, espera a carregar el DOM i crida a menu.js que pinta el menu i assigna a cada opcio les funcions
situades en el seu repectiu js per renderizar el contingut.
En els js de les pagines a part de tindre la funcio per renderizar-la te la resta de funcions relacionades amb ella.

## PÀGINES
- menu.js : Gestiona les pàgines.
- compose.js : Pinta una partitura interactiva.
- connect.js : Fetch al firebase.
- login.js : Login de la app necesites estar registrat.
- register.js : Register de la app per crearse un usuari.
- sheets.js : (Necessites estar logejat) Llista les partitures creades.
- test.js : Tests per comprobar les funcions.
- welcome.js : Primera pàgina de benvinguda que carrega.
