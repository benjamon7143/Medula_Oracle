const sql = require('mssql');
const db = require('../config/db');

const getAllRoles = async () => {
    const pool = await db();

    const result = await pool.request().query(`
        SELECT
            id,
            nombre
        FROM roles
        ORDER BY id
    `);

    return result.recordset;
};

const getRolById = async (id) => {
    const pool = await db();

    const result = await pool.request()
        .input('id', sql.Int, id)
        .query(`
            SELECT
                id,
                nombre
            FROM roles
            WHERE id = @id
        `);

    return result.recordset[0];
};

const createRol = async (rol) => {
    const pool = await db();

    const result = await pool.request()
        .input('nombre', sql.NVarChar(50), rol.nombre)
        .query(`
            INSERT INTO roles (nombre)
            OUTPUT INSERTED.*
            VALUES (@nombre)
        `);

    return result.recordset[0];
};

const updateRol = async (id, rol) => {
    const pool = await db();

    const result = await pool.request()
        .input('id', sql.Int, id)
        .input('nombre', sql.NVarChar(50), rol.nombre)
        .query(`
            UPDATE roles
            SET nombre = @nombre
            OUTPUT INSERTED.*
            WHERE id = @id
        `);

    return result.recordset[0];
};

const deleteRol = async (id) => {
    const pool = await db();

    await pool.request()
        .input('id', sql.Int, id)
        .query(`
            DELETE FROM roles
            WHERE id = @id
        `);
};

module.exports = {
    getAllRoles,
    getRolById,
    createRol,
    updateRol,
    deleteRol
};