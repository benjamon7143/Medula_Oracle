const verificarRol = (...rolesPermitidos) => {

    return (req, res, next) => {

        try {

            const usuario = req.usuario;


            // Verificar usuario autenticado
            if (!usuario) {

                return res.status(401).json({
                    mensaje: "Usuario no autenticado"
                });
            }


            // Verificar rol
            if (!rolesPermitidos.includes(usuario.rol_id)) {

                return res.status(403).json({
                    mensaje: "No tienes permisos para acceder"
                });
            }


            next();

        } catch (error) {

            console.error(error);

            return res.status(500).json({
                mensaje: "Error de autorización"
            });
        }
    };
};


module.exports = {
    verificarRol
};