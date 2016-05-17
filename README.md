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

### Página de los autores

* [Rafa Herrero](http://rafaherrero.github.io/)
* [Daniel Ramos](http://danielramosacosta.github.io/#/)
* [Pedro Ramos](http://alu0100505078.github.io/)
