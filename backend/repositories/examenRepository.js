const sql = require('mssql');
const db = require('../config/db');

const getAllExamenes = async () => {
    const pool = await db();

    const result = await pool.request().query(`
        SELECT 
            e.id,
            e.consulta_id,
            e.tipo,
            e.resultado,
            e.fecha
        FROM examenes e
        ORDER BY e.fecha DESC
    `);

    return result.recordset;
};

const getExamenById = async (id) => {
    const pool = await db();

    const result = await pool.request()
        .input('id', sql.Int, id)
        .query(`
            SELECT *
            FROM examenes
            WHERE id = @id
        `);

    return result.recordset[0];
};

const createExamen = async (examen) => {
    const pool = await db();

    const result = await pool.request()
        .input('consulta_id', sql.Int, examen.consulta_id)
        .input('tipo', sql.NVarChar(100), examen.tipo)
        .input('resultado', sql.NVarChar(sql.MAX), examen.resultado)
        .query(`
            INSERT INTO examenes (
                consulta_id,
                tipo,
                resultado
            )
            OUTPUT INSERTED.*
            VALUES (
                @consulta_id,
                @tipo,
                @resultado
            )
        `);

    return result.recordset[0];
};

const updateExamen = async (id, examen) => {
    const pool = await db();

    const result = await pool.request()
        .input('id', sql.Int, id)
        .input('consulta_id', sql.Int, examen.consulta_id)
        .input('tipo', sql.NVarChar(100), examen.tipo)
        .input('resultado', sql.NVarChar(sql.MAX), examen.resultado)
        .query(`
            UPDATE examenes
            SET
                consulta_id = @consulta_id,
                tipo = @tipo,
                resultado = @resultado
            OUTPUT INSERTED.*
            WHERE id = @id
        `);

    return result.recordset[0];
};

const deleteExamen = async (id) => {
    const pool = await db();

    await pool.request()
        .input('id', sql.Int, id)
        .query(`
            DELETE FROM examenes
            WHERE id = @id
        `);
};

module.exports = {
    getAllExamenes,
    getExamenById,
    createExamen,
    updateExamen,
    deleteExamen
};