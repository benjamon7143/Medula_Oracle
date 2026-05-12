const sql = require("mssql");

const poolPromise = require("../config/db");


// Crear centro de salud
const crearCentroSalud = async (centro) => {

    try {

        const pool = await poolPromise;

        const resultado = await pool.request()

            .input("nombre", sql.NVarChar, centro.nombre)
            .input("direccion", sql.NVarChar, centro.direccion)
            .input("telefono", sql.NVarChar, centro.telefono)

            .query(`
                INSERT INTO centros_salud (
                    nombre,
                    direccion,
                    telefono
                )
                OUTPUT INSERTED.*
                VALUES (
                    @nombre,
                    @direccion,
                    @telefono
                )
            `);

        return resultado.recordset[0];

    } catch (error) {

        throw error;
    }
};


// Obtener todos
const obtenerCentrosSalud = async () => {

    try {

        const pool = await poolPromise;

        const resultado = await pool.request()

            .query(`
                SELECT *
                FROM centros_salud
                ORDER BY nombre ASC
            `);

        return resultado.recordset;

    } catch (error) {

        throw error;
    }
};


// Obtener por ID
const obtenerCentroSaludPorId = async (id) => {

    try {

        const pool = await poolPromise;

        const resultado = await pool.request()

            .input("id", sql.Int, id)

            .query(`
                SELECT *
                FROM centros_salud
                WHERE id = @id
            `);

        return resultado.recordset[0];

    } catch (error) {

        throw error;
    }
};


// Actualizar
const actualizarCentroSalud = async (id, centro) => {

    try {

        const pool = await poolPromise;

        const resultado = await pool.request()

            .input("id", sql.Int, id)
            .input("nombre", sql.NVarChar, centro.nombre)
            .input("direccion", sql.NVarChar, centro.direccion)
            .input("telefono", sql.NVarChar, centro.telefono)

            .query(`
                UPDATE centros_salud
                SET
                    nombre = @nombre,
                    direccion = @direccion,
                    telefono = @telefono

                OUTPUT INSERTED.*

                WHERE id = @id
            `);

        return resultado.recordset[0];

    } catch (error) {

        throw error;
    }
};


// Eliminar
const eliminarCentroSalud = async (id) => {

    try {

        const pool = await poolPromise;

        await pool.request()

            .input("id", sql.Int, id)

            .query(`
                DELETE FROM centros_salud
                WHERE id = @id
            `);

        return true;

    } catch (error) {

        throw error;
    }
};


module.exports = {
    crearCentroSalud,
    obtenerCentrosSalud,
    obtenerCentroSaludPorId,
    actualizarCentroSalud,
    eliminarCentroSalud
};