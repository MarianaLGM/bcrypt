//config.js // Configuraremos Crypto y Bcrypt para hacer más segura nuestra app
const session = require('express-session');
const crypto = require("crypto");

//funcion para hacerla mas segura
const secret = crypto.randomBytes(64).toString('hex');
const hashedSecret = bcrypt.hashSync(secret, 10);

//- Configuración de sesión,utilizaremos el session vamos a guardarlas de manera permanente y no tendremos que reestablecer una y otra vez la session del token


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