const usuarioRepository = require("../repositories/usuarioRepository");


// Obtener todos los usuarios
const obtenerUsuarios = async (req, res) => {

    try {

        const usuarios = await usuarioRepository.obtenerUsuarios();

        res.status(200).json(usuarios);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            mensaje: "Error al obtener usuarios"
        });
    }
};


// Obtener usuario por ID
const obtenerUsuarioPorId = async (req, res) => {

    try {

        const { id } = req.params;

        const usuario = await usuarioRepository.obtenerUsuarioPorId(id);

        if (!usuario) {

            return res.status(404).json({
                mensaje: "Usuario no encontrado"
            });
        }

        res.status(200).json(usuario);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            mensaje: "Error al obtener usuario"
        });
    }
};


// Crear usuario
const crearUsuario = async (req, res) => {

    try {

        const {
            nombre,
            email,
            password_hash,
            rol_id
        } = req.body;

        // Validaciones básicas
        if (!nombre || !email || !password_hash || !rol_id) {

            return res.status(400).json({
                mensaje: "Todos los campos son obligatorios"
            });
        }

        // Verificar si el email ya existe
        const usuarioExistente =
            await usuarioRepository.obtenerUsuarioPorEmail(email);

        if (usuarioExistente) {

            return res.status(400).json({
                mensaje: "El email ya está registrado"
            });
        }

        // Crear usuario
        await usuarioRepository.crearUsuario({
            nombre,
            email,
            password_hash,
            rol_id
        });

        res.status(201).json({
            mensaje: "Usuario creado correctamente"
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            mensaje: "Error al crear usuario"
        });
    }
};


// Actualizar usuario
const actualizarUsuario = async (req, res) => {

    try {

        const { id } = req.params;

        const {
            nombre,
            email,
            rol_id,
            activo
        } = req.body;

        const usuario =
            await usuarioRepository.obtenerUsuarioPorId(id);

        if (!usuario) {

            return res.status(404).json({
                mensaje: "Usuario no encontrado"
            });
        }

        await usuarioRepository.actualizarUsuario(id, {
            nombre,
            email,
            rol_id,
            activo
        });

        res.status(200).json({
            mensaje: "Usuario actualizado correctamente"
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            mensaje: "Error al actualizar usuario"
        });
    }
};


// Eliminar usuario
const eliminarUsuario = async (req, res) => {

    try {

        const { id } = req.params;

        const usuario =
            await usuarioRepository.obtenerUsuarioPorId(id);

        if (!usuario) {

            return res.status(404).json({
                mensaje: "Usuario no encontrado"
            });
        }

        await usuarioRepository.eliminarUsuario(id);

        res.status(200).json({
            mensaje: "Usuario eliminado correctamente"
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            mensaje: "Error al eliminar usuario"
        });
    }
};


module.exports = {
    obtenerUsuarios,
    obtenerUsuarioPorId,
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario
};