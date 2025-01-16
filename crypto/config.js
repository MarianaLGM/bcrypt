//config.js // Configuraremos Crypto y Bcrypt para hacer más segura nuestra app
const session = require('express-session');
const crypto = require("crypto");

//funcion para hacerla mas segura
const secret = crypto.randomBytes(64).toString('hex');
const hashedSecret = bcrypt.hashSync(secret, 10);

//- Configuración de sesión,utilizaremos el session vamos a guardarlas de manera permanente y no tendremos que reestablecer una y otra vez la session del token
app.use(
    session({
    secret: secret, // Clave secreta para firmar el token (debería ser segura, preferiblemente generada con crypto)
    resave: false, // No guardar cambios en la sesión siempre, solo cuando se realice algún cambio./sólo se guardarán cambios si hay un cambio de session, si no poemos resave se guardará si hay o no cambio de session
    saveUninitialized: true, // Se guarda la inicialización de la sesión.con esto se va a guardad la inciailización de nuestra sessión, se no existe se crea. Siempre lo pondremos en TRUE
    cookie: { secure: false }, // sirve para mantener esta session activa.Cambia a 'true' si estás utilizando HTTPS
    })
    );

/*
hash= crypto.createHash('sha1');
function hashPassword(password) {
  hash.update(password);
  return hash.digest('hex');
}
function comparePassword(inputPass, hashedPass) {
  return hashPassword(inputPass) == hashedPass;
}

comparePassword()*/