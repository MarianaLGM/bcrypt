
//users.js // Aquí estarán todas las rutas
const express=require("express")
const router=express.Router()
const {generateToken, verifyToken}= require("../middlewares/authMiddleware")  //DESESTRUCTURING de las dos funciones middleware
const users=require("../data/users")
const crypto = require("crypto");
const bcrypt = require("bcrypt")

//Página de Inicio, vamos a montar el login
// GET /: Página de inicio con formulario de inicio de sesión y enlace al panel de control
    router.get('/', (req, res) => {
    const loginForm = `
        <form action="/login" method="post">
        <label for="username">Usuario:</label>
        <input type="text" id="username" name="username" required><br>

        <label for="password">Contraseña:</label>
        <input type="password" id="password" name="password" required><br>

        <button type="submit">Iniciar sesión</button>
        </form>

        <a href="/dashboard">dashboard</a>
        `;

        res.send(loginForm);
    });

//Ruta de Inicio de Sesión, maneja la autenticación del usuario, genera un token y lo almacena en la sesión.
//POST /login: Endpoint para autenticar y generar un token JWT.


//////////////////NO FUNCIONA///////////////////////////////////
    router.post("/login", (req, res) => {
        const {username, password} = req.body;//ERROR desctructurig

        /*DUDA SI VA AQUÍ*/const secret = crypto.randomBytes(64).toString("hex");
        /*DUDA SI VA AQUÍ*/const hashedSecret = bcrypt.hashSync(secret, 10);
        
        const user = users.find( //si ese user está que me busque contraseña
        (user) => user.username === username && user.password === password
        );
    
        if (user) { //ERROR
        const token = generateToken(user);
        req.session.token = token;
        res.redirect("/dashboard");//respuesta al dashboard si hay usuario
        } else { //si no hay usuario respondemos con el status 401
        res.status(401).json({ message: "Credenciales incorrectas" });
        }
    });
  
//Ruta protegida que solo se puede acceder con un token válido. Muestra el panel de control con información del usuario.  
//GET /dashboard: Panel de control accesible solo con un token JWT válido.
//////////////////NO FUNCIONA///////////////////////////////////
    router.get("/dashboard", verifyToken, (req, res) => {
        const userId = req.user;
        const user = users.find((user) => user.id === userId);
        
        if (user) {
        res.send(`<h1>Bienvenido, ${user.name}!</h1> <p>ID: ${user.id}</p> <p>Usuario: ${user.username}</p> <br> <form action="/logout" method="post"> <button type="submit">Cerrar sesión</button> </form> <a href="/">home</a> `);
        } else {
        res.status(401).json({ message: "Usuario no encontrado" });
        }
    });

//Cierre de Sesión. Ruta que destruye la sesión y redirige al usuario a la página de inicio.
//POST /logout: Endpoint para cerrar sesión y destruir la sesión.
    router.post("/logout", (req, res) => {
        req.session.destroy();
        res.redirect("/");
        });


module.exports=router;