//añadiremos nuestro servidor, session y uniremos el resto de la aplicación

/*1. Configuración
- Lo primero es hacer npm install para instalar las dependencias de package.json
- Crearemos un servidor http con express en app.js*/

const express = require('express');
const app = express();
const session = require('express-session');

const PORT = 3000;

//- Configuración de sesiónutilizaremos el session vamos a guardarlas de manera permanente y no tendremos que reestablecer una y otra vez la session del token
app.use(
    session({
    secret: "hola", // Clave secreta para firmar el token (debería ser segura, preferiblemente generada con crypto)
    resave: false, // No guardar cambios en la sesión siempre, solo cuando se realice algún cambio./sólo se guardarán cambios si hay un cambio de session, si no poemos resave se guardará si hay o no cambio de session
    saveUninitialized: true, // Se guarda la inicialización de la sesión.con esto se va a guardad la inciailización de nuestra sessión, se no existe se crea. Siempre lo pondremos en TRUE
    cookie: { secure: false }, // sirve para mantener esta session activa.Cambia a 'true' si estás utilizando HTTPS
    })
    );
/*

const generateToken = require(generateToken); //accedo midllewares
const verifyToken = require(verifyToken); //accedo midllewares
//const crypto= require("./crypto/config") //accedo a la carpeta confi crypto*/

const middlewares = require("middlewares/authMieddleware"); //accedo midllewares

middlewares.generateToken()
middlewares.verifyToken()
routes.rutas(app);

app.listen(PORT, () => {
    console.log(`Servidor en http://localhost:${PORT}`);
});
    