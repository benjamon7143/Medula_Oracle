const { sql } = require("../config/db");


// Obtener todos los usuarios
const obtenerUsuarios = async () => {

    try {

        const result = await sql.query(`
            SELECT
                u.id,
                u.nombre,
                u.email,
                u.activo,
                r.nombre AS rol,
                u.fecha_creacion
            FROM usuarios u
            INNER JOIN roles r
                ON u.rol_id = r.id
        `);

        return result.recordset;

    } catch (error) {
        throw error;
    }
};


// Obtener usuario por ID
const obtenerUsuarioPorId = async (id) => {

    try {

        const result = await sql.query`
            SELECT
                u.id,
                u.nombre,
                u.email,
                u.activo,
                r.nombre AS rol,
                u.fecha_creacion
            FROM usuarios u
            INNER JOIN roles r
                ON u.rol_id = r.id
            WHERE u.id = ${id}
        `;

        return result.recordset[0];

    } catch (error) {
        throw error;
    }
};


// Obtener usuario por email
const obtenerUsuarioPorEmail = async (email) => {

    try {

        const result = await sql.query`
            SELECT *
            FROM usuarios
            WHERE email = ${email}
        `;

        return result.recordset[0];

    } catch (error) {
        throw error;
    }
};


// Crear usuario
const crearUsuario = async (usuario) => {

    try {

        const {
            nombre,
            email,
            password_hash,
            rol_id
        } = usuario;

        await sql.query`
            INSERT INTO usuarios (
                nombre,
                email,
                password_hash,
                rol_id
            )
            VALUES (
                ${nombre},
                ${email},
                ${password_hash},
                ${rol_id}
            )
        `;

        return {
            mensaje: "Usuario creado correctamente"
        };

    } catch (error) {
        throw error;
    }
};


// Actualizar usuario
const actualizarUsuario = async (id, usuario) => {

    try {

        const {
            nombre,
            email,
            rol_id,
            activo
        } = usuario;

        await sql.query`
            UPDATE usuarios
            SET
                nombre = ${nombre},
                email = ${email},
                rol_id = ${rol_id},
                activo = ${activo},
                fecha_actualizacion = GETDATE()
            WHERE id = ${id}
        `;

        return {
            mensaje: "Usuario actualizado correctamente"
        };

    } catch (error) {
        throw error;
    }
};


// Eliminar usuario
const eliminarUsuario = async (id) => {

    try {

        await sql.query`
            DELETE FROM usuarios
            WHERE id = ${id}
        `;

        return {
            mensaje: "Usuario eliminado correctamente"
        };

    } catch (error) {
        throw error;
    }
};


module.exports = {
    obtenerUsuarios,
    obtenerUsuarioPorId,
    obtenerUsuarioPorEmail,
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario
};