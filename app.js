//añadiremos nuestro servidor, session y uniremos el resto de la aplicación

/*1. Configuración
- Lo primero es hacer npm install para instalar las dependencias de package.json
- Crearemos un servidor http con express en app.js*/
const session = require("express-session");
const express = require("express");
const app = express();

const PORT = 3000;

//REQUERIR Y ACCEDER URLENCODED Y JSON:  Middleware para manejar datos de formulario y JSON///El orden importa tiene que ir aquí arriba!!!!!!!!!!!!!
app.use(express.urlencoded({ extended: true })); 
app.use(express.json());


//- Configuración de sesión
//utilizaremos el session vamos a guardarlas de manera permanente y no tendremos que reestablecer una y otra vez la session del token
app.use(
    session({
    secret: "tu_secreto_secreto", // Clave secreta para firmar el token PTE gener con crypto)
    resave: false, // No guardar cambios en la sesión siempre, solo cuando se realice algún cambio./sólo se guardarán cambios si hay un cambio de session, si no poemos resave se guardará si hay o no cambio de session
    saveUninitialized: true, // Se guarda la inicialización de la sesión.con esto se va a guardad la inciailización de nuestra sessión, se no existe se crea. Siempre lo pondremos en TRUE
    cookie: { secure: false }, // sirve para mantener esta session activa.Cambia a 'true' si estás utilizando HTTPS
    })
    );

//REQUERIR Y ACCEDER RUTAS
const routes = require("./routes/users");
app.use("/", routes);

//REQUERIR Y ACCEDER CRYPTO
const crypto = require("crypto");

//REQUERIR Y ACCEDER ARRAY USUARIOS
const array= require("./data/users")


app.listen(PORT, () => {
    console.log(`Servidor en http://localhost:${PORT}`);
});
    