const sql = require("mssql");

const poolPromise = require("../config/db");


// Crear médico
const crearMedico = async (medico) => {

    try {

        const pool = await poolPromise;

        const resultado = await pool.request()
            .input("usuario_id", sql.Int, medico.usuario_id)
            .input("especialidad_id", sql.Int, medico.especialidad_id)
            .query(`
                INSERT INTO medicos (
                    usuario_id,
                    especialidad_id
                )
                OUTPUT INSERTED.*
                VALUES (
                    @usuario_id,
                    @especialidad_id
                )
            `);

        return resultado.recordset[0];

    } catch (error) {

        throw error;
    }
};


// Obtener todos
const obtenerMedicos = async () => {

    try {

        const pool = await poolPromise;

        const resultado = await pool.request()
            .query(`
                SELECT
                    m.id,
                    m.usuario_id,
                    m.especialidad_id,
                    m.activo,
                    m.fecha_creacion,

                    u.nombre,
                    u.email,

                    e.nombre AS especialidad

                FROM medicos m

                INNER JOIN usuarios u
                    ON m.usuario_id = u.id

                INNER JOIN especialidades e
                    ON m.especialidad_id = e.id

                WHERE m.activo = 1
            `);

        return resultado.recordset;

    } catch (error) {

        throw error;
    }
};


// Obtener por ID
const obtenerMedicoPorId = async (id) => {

    try {

        const pool = await poolPromise;

        const resultado = await pool.request()
            .input("id", sql.Int, id)
            .query(`
                SELECT
                    m.*,
                    u.nombre,
                    u.email,
                    e.nombre AS especialidad

                FROM medicos m

                INNER JOIN usuarios u
                    ON m.usuario_id = u.id

                INNER JOIN especialidades e
                    ON m.especialidad_id = e.id

                WHERE m.id = @id
            `);

        return resultado.recordset[0];

    } catch (error) {

        throw error;
    }
};


// Actualizar especialidad
const actualizarMedico = async (id, medico) => {

    try {

        const pool = await poolPromise;

        const resultado = await pool.request()
            .input("id", sql.Int, id)
            .input("especialidad_id", sql.Int, medico.especialidad_id)
            .query(`
                UPDATE medicos
                SET especialidad_id = @especialidad_id
                OUTPUT INSERTED.*
                WHERE id = @id
            `);

        return resultado.recordset[0];

    } catch (error) {

        throw error;
    }
};


// Soft delete
const eliminarMedico = async (id) => {

    try {

        const pool = await poolPromise;

        await pool.request()
            .input("id", sql.Int, id)
            .query(`
                UPDATE medicos
                SET activo = 0
                WHERE id = @id
            `);

        return true;

    } catch (error) {

        throw error;
    }
};


module.exports = {
    crearMedico,
    obtenerMedicos,
    obtenerMedicoPorId,
    actualizarMedico,
    eliminarMedico
};