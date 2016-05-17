# Coco Music

[![David](https://img.shields.io/david/Rafaherrero/proyectoDSI.svg?style=flat-square)](https://david-dm.org/Rafaherrero/proyectoDSI#info=dependencies&view=table)
[![David](https://img.shields.io/david/dev/Rafaherrero/proyectoDSI?style=flat-square)](https://david-dm.org/Rafaherrero/proyectoDSI#info=devDependencies&view=table)
[![GitHub issues](https://img.shields.io/github/issues/Rafaherrero/proyectoDSI.svg?style=flat-square)](https://github.com/Rafaherrero/proyectoDSI)


## Descripción del proyecto
Coco music es un proyecto realizado por Rafa Herrero,Daniel Ramos Acosta y Pedro Ramos para la asignatura Desarrollo de Sistemas Informáticos de 3º Grado de Ingeniería Informática en la Universidad de La Laguna (ULL).

Es una plataforma que permite al usuario gestionar sus listas de reproducciones acorde a los gustos musicales.Todo el sistema funciona sin manejar ningún tipo de fichero que tenga que ver con el usuario, todo está en un servidor y se carga automáticamente según el usuario desee. La plataforma permite realizar todas las funciones que tiene un reproductor de música pero todo en una plataforma web. Además, es posible utilizar la aplicación en cualquier dispositivo ya que se adapta a todas las pantallas y funciona sin ningún tipo de problema.

## Estructura de Directorio

La estructura de directorio la hemos seguido usando como base el generador de Express (`express-generator`), y otras que hemos visto por internet para crear usar una arquitectura MVC. Nos han influenciado otros proyectos, como algunos generadores de Yeoman y la estructura de Rails.

En el directorio `bin` tenemos el script de arranque, el cual también se puede llamar usando `npm start`. Dentro de `config`, tenemos lo relativo a la configuración de los paquetes `passport`, `mongoose`, y las rutas de Express.

En `app` es donde está


## Back-end
Para la autenticación en la plataforma se ha utilizado `passport`. Usando únicamente esta paquete, la sesión no persiste en el navegador, por lo que necesitamos `cookie-parser`. Se usó `express` como framework web. Como base de datos se ha utilizado `mongodb`. Para el manejo de ficheros mp3 en la base da datos se usó `glob` y `fs` y una vez está el fichero cargado, recuperamos los datos de las etiquetas mediante el paquete `musicmetadata`. Por último, se usó `base-64js` para transmitir la canción al lado cliente en base 64.

## Front-end

## Tecnologías usadas
* `base64-js`: Converte datos binarios a un string para poder enviarlo y usarlo con JQuery.
* `bcrypt-nodejs`: Nos permite cifrar strings para no almacenar texto plano en la base de datos.
* `body-parser`: Parsea la URL de una petición HTTP y la convierte en un JSON.
* `bower`: Manejador de paquetes de front-end.
* `browsersync`: Nos actualiza el navegador y sincroniza las vistas entre distintos navegadores.
* `connect-flash`: Middleware para indicar si hubo errores en el paso de login/registro
* `cookie-parser`: Parseador de las cookies para Passport.
* `ejs`: Motor de renderizado para las vistas.
* `express`: Framework para hacer aplicaciones web.
* `express-session`: Módulo express para mantener una sesión iniciada que se complementa con Passport.
* `glob`: Nos sirve para poder hacer uso del sistema de ficheros de una manera sencilla.
* `gulp`: Manejador de tareas para node.
* `id3js`: Una alternativa a MusicMetadata.
* `jshint`: Paquete de node para detectar errores en el código
* `mongoose`: Librería de node para interactuar con bases de datos Mongo
* `morgan`: Logger para respuestas HTTP. 
* `musicmetadata`: permite obtener los metadatos de un archivo MP3.
* `passport`: Paquete que permite iniciar sesión con múltiples cuentas.
* `path`: Permite manejar y transformar las rutas de ficheros.
* `sass`: Lenguaje de alto nivel para css.

Para poder desarrollar y usar el lint, tenemos que tener instalada la gema `scss-lint`.

## Comparativa funcionamiento
![Comparativa navegadores](recursos_readme/Comparativa_navegadores.jpg)
En esta sección se compara el comportamiento y el funcionamiento de la aplicación bajo distintos navegadores web.
Como se puede apreciar en el gráfico superior, el que mejor rendimiento ofrece es Microsoft Edge, gracias a sus animaciones "suaves". Sin embargo, se observa el mismo comportamiento tanto en Chrome como en Opera, y en los sistemas operativos Mac y Windows, por lo que reciben la misma puntuación.
En el caso de Firefox, es capaz de renderizar la página correctamente y de funcionar perfectamente, sin embargo, se detectó en un caso de pruebas que no actualizaba el flag de reproduciendo canción. Sin embargo, no conseguimos repetir este error. Por ello, queda relegado a la segunda posición.
Curioso es el caso de los dos últimos navegadores, ya que Internet Explorer reproduce sin ningún problema las canciones, salvo en algunas combinaciones en las que no actualiza el flag y no podremos reproducir más canciones hasta que no refresquemos la página. En el caso de Safari, cuando una canción termina, este saltar dos canciones más adelante, por lo que nos aparece en todo momento el aviso de que se está intentando cargar una canción mientras otra ya está en proceso, aunque no debería. Si eliminamos este flag, el comportamiento de este navegador es más que desastroso.

En cuanto a dispositivos móviles, se ha probado el funcionamiento bajo las plataformas Android e iOS. En el caso de la primera, solo es posible utilizar ficheros de pequeño tamaño (no mas de 1 minuto), ya que aquellos que sobrepasen una determinada cantidad, no hace el intento de cargarlos. En el caso de iOS, el funcionamiento es prácticamente de sobresaliente, ya que incluso se nos integra con el propio reproductor del sistema operativo. Sin embargo, no funciona el control del volumen de la aplicación, si no el nativo, por lo que este se oculta en el caso de que se detecte que se carga la web desde iOS. Además, debido a las restricciones de Apple, para evitar un consumo de datos sobre redes móviles elevado, la aplicación no cargará, por lo que será necesario una conexión WiFi.

### Página de los autores

* [Rafa Herrero](http://rafaherrero.github.io/)
* [Daniel Ramos](http://danielramosacosta.github.io/#/)
* [Pedro Ramos](http://alu0100505078.github.io/)
