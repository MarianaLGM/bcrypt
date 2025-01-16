//authMiddleware.js // Este middleware manejará la generación del token y verificación.

const jwt = require('jsonwebtoken');


//- Middleware para manejar datos de formulario y JSON    
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//-MIDDLEWARE GENERACIÓN Función para generar un token JWT utilizando la información del usuario.
function generateToken(user) {
    return jwt.sign({ user: user.id }, 'tu_secreto_secreto', { expiresIn: '1h' });
    }

//- MIDDLEWARE VERIFICACIÓN: verifica la validez del token almacenado en la sesión.

function verifyToken(req, res, next) {
    const token = req.session.token;
    
    if (!token) {
    return res.status(401).json({ message: 'Token no proporcionado' });
    }   
    jwt.verify(token, 'tu_secreto_secreto', (err, decoded) => {//decoded es el resultado que nos está dando ese usuario con el token
    if (err) {
    return res
    .status(401)
    .json({ message: 'Token inválido', error: err.message });
    } 
        req.user = decoded.user;
        next();
    });
    }


module.exports = {
    generateToken,
    verifyToken,
};
    