const sql = require("mssql");
const poolPromise = require("../config/db");


// Crear paciente
const crearPaciente = async (paciente) => {

    try {

        const pool = await poolPromise;

        const resultado = await pool.request()
            .input("usuario_id", sql.Int, paciente.usuario_id)
            .input("rut", sql.NVarChar, paciente.rut)
            .input("fecha_nacimiento", sql.Date, paciente.fecha_nacimiento)
            .input("telefono", sql.NVarChar, paciente.telefono)
            .input("direccion", sql.NVarChar, paciente.direccion)
            .query(`
                INSERT INTO pacientes (
                    usuario_id,
                    rut,
                    fecha_nacimiento,
                    telefono,
                    direccion
                )
                OUTPUT INSERTED.*
                VALUES (
                    @usuario_id,
                    @rut,
                    @fecha_nacimiento,
                    @telefono,
                    @direccion
                )
            `);

        return resultado.recordset[0];

    } catch (error) {

        throw error;
    }
};


// Obtener todos
const obtenerPacientes = async () => {

    try {

        const pool = await poolPromise;

        const resultado = await pool.request()
            .query(`
                SELECT
                    p.*,
                    u.nombre,
                    u.email
                FROM pacientes p
                INNER JOIN usuarios u
                    ON p.usuario_id = u.id
                WHERE p.activo = 1
            `);

        return resultado.recordset;

    } catch (error) {

        throw error;
    }
};


// Obtener por ID
const obtenerPacientePorId = async (id) => {

    try {

        const pool = await poolPromise;

        const resultado = await pool.request()
            .input("id", sql.Int, id)
            .query(`
                SELECT
                    p.*,
                    u.nombre,
                    u.email
                FROM pacientes p
                INNER JOIN usuarios u
                    ON p.usuario_id = u.id
                WHERE p.id = @id
            `);

        return resultado.recordset[0];

    } catch (error) {

        throw error;
    }
};


// Actualizar
const actualizarPaciente = async (id, paciente) => {

    try {

        const pool = await poolPromise;

        const resultado = await pool.request()
            .input("id", sql.Int, id)
            .input("telefono", sql.NVarChar, paciente.telefono)
            .input("direccion", sql.NVarChar, paciente.direccion)
            .query(`
                UPDATE pacientes
                SET
                    telefono = @telefono,
                    direccion = @direccion
                OUTPUT INSERTED.*
                WHERE id = @id
            `);

        return resultado.recordset[0];

    } catch (error) {

        throw error;
    }
};


// Soft delete
const eliminarPaciente = async (id) => {

    try {

        const pool = await poolPromise;

        await pool.request()
            .input("id", sql.Int, id)
            .query(`
                UPDATE pacientes
                SET activo = 0
                WHERE id = @id
            `);

        return true;

    } catch (error) {

        throw error;
    }
};


module.exports = {
    crearPaciente,
    obtenerPacientes,
    obtenerPacientePorId,
    actualizarPaciente,
    eliminarPaciente
};