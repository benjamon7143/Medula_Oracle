const sql = require("mssql");
const poolPromise = require("../config/db");


// Crear especialidad
const crearEspecialidad = async (especialidad) => {

    try {

        const pool = await poolPromise;

        const resultado = await pool.request()
            .input("nombre", sql.NVarChar, especialidad.nombre)
            .query(`
                INSERT INTO especialidades (
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
const obtenerEspecialidades = async () => {

    try {

        const pool = await poolPromise;

        const resultado = await pool.request()
            .query(`
                SELECT
                    *
                FROM especialidades 
                order by nombre asc 
            `);

        return resultado.recordset;

    } catch (error) {

        throw error;
    }
};


// Obtener por ID
const obtenerEspecialidadPorId = async (id) => {

    try {

        const pool = await poolPromise;

        const resultado = await pool.request()
            .input("id", sql.Int, id)
            .query(`
                SELECT
                    *
                FROM especialidades 
                WHERE id = @id
            `);

        return resultado.recordset[0];

    } catch (error) {

        throw error;
    }
};


// Actualizar
const actualizarEspecialidad = async (id, especialidad) => {

    try {

        const pool = await poolPromise;

        const resultado = await pool.request()
        .input("id", sql.Int, id)
            .input("nombre", sql.NVarChar, especialidad.nombre)
            .query(`
                UPDATE especialidades
                SET
                    nombre = @nombre
                OUTPUT INSERTED.*
                WHERE id = @id
            `);

        return resultado.recordset[0];

    } catch (error) {

        throw error;
    }
};


// Soft delete
const eliminarEspecialidad = async (id) => {

    try {

        const pool = await poolPromise;

        await pool.request()
            .input("id", sql.Int, id)
            .query(`
                UPDATE especialidades
                SET activo = 0
                WHERE id = @id
            `);

        return true;

    } catch (error) {

        throw error;
    }
};


module.exports = {
    crearEspecialidad,
    obtenerEspecialidades,
    obtenerEspecialidadPorId,
    actualizarEspecialidad,
    eliminarEspecialidad
};