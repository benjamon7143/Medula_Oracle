const jwt = require("jsonwebtoken");


const verificarToken = (req, res, next) => {

    try {

        // Obtener header
        const authHeader = req.headers.authorization;


        // Verificar si existe
        if (!authHeader) {

            return res.status(401).json({
                mensaje: "Token no proporcionado"
            });
        }


        // Formato esperado:
        // Bearer TOKEN
        const token = authHeader.split(" ")[1];


        if (!token) {

            return res.status(401).json({
                mensaje: "Token inválido"
            });
        }


        // Verificar token
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );


        // Guardar usuario decodificado
        req.usuario = decoded;


        next();

    } catch (error) {

        console.error(error);

        return res.status(401).json({
            mensaje: "Token inválido o expirado"
        });
    }
};


module.exports = {
    verificarToken
};