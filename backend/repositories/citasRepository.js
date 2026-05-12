const sql = require("mssql");

const poolPromise = require("../config/db");


// Crear cita
const crearCita = async (cita) => {

    try {

        const pool = await poolPromise;

        const resultado = await pool.request()

            .input("paciente_id", sql.Int, cita.paciente_id)
            .input("medico_id", sql.Int, cita.medico_id)
            .input("centro_salud_id", sql.Int, cita.centro_salud_id)
            .input("fecha", sql.DateTime, cita.fecha)
            .input("estado_id", sql.Int, cita.estado_id)
            .input("motivo", sql.NVarChar, cita.motivo)

            .query(`
                INSERT INTO citas (
                    paciente_id,
                    medico_id,
                    centro_salud_id,
                    fecha,
                    estado_id,
                    motivo
                )
                OUTPUT INSERTED.*
                VALUES (
                    @paciente_id,
                    @medico_id,
                    @centro_salud_id,
                    @fecha,
                    @estado_id,
                    @motivo
                )
            `);

        return resultado.recordset[0];

    } catch (error) {

        throw error;
    }
};


// Obtener todas las citas
const obtenerCitas = async () => {

    try {

        const pool = await poolPromise;

        const resultado = await pool.request()

            .query(`
                SELECT
                    c.id,
                    c.fecha,
                    c.motivo,

                    ec.nombre AS estado,

                    p.id AS paciente_id,
                    up.nombre AS paciente_nombre,

                    m.id AS medico_id,
                    um.nombre AS medico_nombre,

                    es.nombre AS especialidad,

                    cs.nombre AS centro_salud

                FROM citas c

                INNER JOIN pacientes p
                    ON c.paciente_id = p.id

                INNER JOIN usuarios up
                    ON p.usuario_id = up.id

                INNER JOIN medicos m
                    ON c.medico_id = m.id

                INNER JOIN usuarios um
                    ON m.usuario_id = um.id

                INNER JOIN especialidades es
                    ON m.especialidad_id = es.id

                INNER JOIN centros_salud cs
                    ON c.centro_salud_id = cs.id

                INNER JOIN estados_cita ec
                    ON c.estado_id = ec.id

                ORDER BY c.fecha DESC
            `);

        return resultado.recordset;

    } catch (error) {

        throw error;
    }
};


// Obtener cita por ID
const obtenerCitaPorId = async (id) => {

    try {

        const pool = await poolPromise;

        const resultado = await pool.request()

            .input("id", sql.Int, id)

            .query(`
                SELECT *
                FROM citas
                WHERE id = @id
            `);

        return resultado.recordset[0];

    } catch (error) {

        throw error;
    }
};


// Actualizar cita
const actualizarCita = async (id, cita) => {

    try {

        const pool = await poolPromise;

        const resultado = await pool.request()

            .input("id", sql.Int, id)
            .input("fecha", sql.DateTime, cita.fecha)
            .input("estado_id", sql.Int, cita.estado_id)
            .input("motivo", sql.NVarChar, cita.motivo)

            .query(`
                UPDATE citas
                SET
                    fecha = @fecha,
                    estado_id = @estado_id,
                    motivo = @motivo

                OUTPUT INSERTED.*

                WHERE id = @id
            `);

        return resultado.recordset[0];

    } catch (error) {

        throw error;
    }
};


// Eliminar cita
const eliminarCita = async (id) => {

    try {

        const pool = await poolPromise;

        await pool.request()

            .input("id", sql.Int, id)

            .query(`
                DELETE FROM citas
                WHERE id = @id
            `);

        return true;

    } catch (error) {

        throw error;
    }
};


module.exports = {
    crearCita,
    obtenerCitas,
    obtenerCitaPorId,
    actualizarCita,
    eliminarCita
};