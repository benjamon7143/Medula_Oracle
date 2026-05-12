const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const usuarioRepository =
    require("../repositories/usuarioRepository");


// Registrar usuario
const register = async (req, res) => {

    try {

        const {
            nombre,
            email,
            password,
            rol_id
        } = req.body;


        // Validaciones
        if (!nombre || !email || !password || !rol_id) {

            return res.status(400).json({
                mensaje: "Todos los campos son obligatorios"
            });
        }


        // Verificar email existente
        const usuarioExistente =
            await usuarioRepository.obtenerUsuarioPorEmail(email);

        if (usuarioExistente) {

            return res.status(400).json({
                mensaje: "El email ya está registrado"
            });
        }


        // Hashear contraseña
        const salt = await bcrypt.genSalt(10);

        const password_hash =
            await bcrypt.hash(password, salt);


        // Crear usuario
        await usuarioRepository.crearUsuario({
            nombre,
            email,
            password_hash,
            rol_id
        });


        res.status(201).json({
            mensaje: "Usuario registrado correctamente"
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            mensaje: "Error al registrar usuario"
        });
    }
};


// Login
const login = async (req, res) => {

    try {

        const { email, password } = req.body;


        // Validaciones
        if (!email || !password) {

            return res.status(400).json({
                mensaje: "Email y contraseña son obligatorios"
            });
        }


        // Buscar usuario
        const usuario =
            await usuarioRepository.obtenerUsuarioPorEmail(email);

        if (!usuario) {

            return res.status(401).json({
                mensaje: "Credenciales inválidas"
            });
        }


        // Verificar contraseña
        const passwordCorrecta =
            await bcrypt.compare(
                password,
                usuario.password_hash
            );

        if (!passwordCorrecta) {

            return res.status(401).json({
                mensaje: "Credenciales inválidas"
            });
        }


        // Crear token JWT
        const token = jwt.sign(
            {
                id: usuario.id,
                email: usuario.email,
                rol_id: usuario.rol_id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRES_IN
            }
        );


        res.status(200).json({
            mensaje: "Login exitoso",
            token,
            usuario: {
                id: usuario.id,
                nombre: usuario.nombre,
                email: usuario.email,
                rol_id: usuario.rol_id
            }
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            mensaje: "Error al iniciar sesión"
        });
    }
};


module.exports = {
    register,
    login
};