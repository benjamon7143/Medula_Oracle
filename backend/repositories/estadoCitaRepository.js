const sql = require("mssql");

const poolPromise = require("../config/db");


// Crear estado
const crearEstadoCita = async (estado) => {

    try {

        const pool = await poolPromise;

        const resultado = await pool.request()

            .input("nombre", sql.NVarChar, estado.nombre)

            .query(`
                INSERT INTO estados_cita (
                    nombre
                )
                OUTPUT INSERTED.*
                VALUES (
                    @nombre
                )
            `);

        return resultado.recordset[0];

    } catch (error) {

        throw error;
    }
};


// Obtener todos
const obtenerEstadosCita = async () => {

    try {

        const pool = await poolPromise;

        const resultado = await pool.request()

            .query(`
                SELECT *
                FROM estados_cita
                ORDER BY id ASC
            `);

        return resultado.recordset;

    } catch (error) {

        throw error;
    }
};


// Obtener por ID
const obtenerEstadoCitaPorId = async (id) => {

    try {

        const pool = await poolPromise;

        const resultado = await pool.request()

            .input("id", sql.Int, id)

            .query(`
                SELECT *
                FROM estados_cita
                WHERE id = @id
            `);

        return resultado.recordset[0];

    } catch (error) {

        throw error;
    }
};


// Actualizar
const actualizarEstadoCita = async (id, estado) => {

    try {

        const pool = await poolPromise;

        const resultado = await pool.request()

            .input("id", sql.Int, id)
            .input("nombre", sql.NVarChar, estado.nombre)

            .query(`
                UPDATE estados_cita
                SET nombre = @nombre

                OUTPUT INSERTED.*

                WHERE id = @id
            `);

        return resultado.recordset[0];

    } catch (error) {

        throw error;
    }
};


// Eliminar
const eliminarEstadoCita = async (id) => {

    try {

        const pool = await poolPromise;

        await pool.request()

            .input("id", sql.Int, id)

            .query(`
                DELETE FROM estados_cita
                WHERE id = @id
            `);

        return true;

    } catch (error) {

        throw error;
    }
};


module.exports = {
    crearEstadoCita,
    obtenerEstadosCita,
    obtenerEstadoCitaPorId,
    actualizarEstadoCita,
    eliminarEstadoCita
};