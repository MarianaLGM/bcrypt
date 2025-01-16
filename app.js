//añadiremos nuestro servidor, session y uniremos el resto de la aplicación

/*1. Configuración
- Lo primero es hacer npm install para instalar las dependencias de package.json
- Crearemos un servidor http con express en app.js*/

const express = require('express');
const app = express();


const PORT = 3000;


/*
const generateToken = require(generateToken); //accedo midllewares
const verifyToken = require(verifyToken); //accedo midllewares
//const crypto= require("./crypto/config") //accedo a la carpeta confi crypto*/

const middlewares = require("./middlewares/authMieddleware"); //accedo midllewares
app.use(middlewares);

const routes=require("./routes/users");


routes.rutas(app);



app.listen(PORT, () => {
    console.log(`Servidor en http://localhost:${PORT}`);
});
    