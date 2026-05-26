const sql = require("mssql");
const dbConfig = require("../config/db");

class RecetaRepository {

    // Obtener todas
    async obtenerTodas() {
        try {
            const pool = await sql.connect(dbConfig);

            const result = await pool.request().query(`
                SELECT 
                    r.id,
                    r.consulta_id,
                    r.descripcion,
                    r.fecha,

                    c.cita_id,

                    up.nombre AS paciente,
                    um.nombre AS medico

                FROM recetas r

                INNER JOIN consultas c
                    ON r.consulta_id = c.id

                INNER JOIN citas ci
                    ON c.cita_id = ci.id

                INNER JOIN pacientes p
                    ON ci.paciente_id = p.id

                INNER JOIN usuarios up
                    ON p.usuario_id = up.id

                INNER JOIN medicos m
                    ON ci.medico_id = m.id

                INNER JOIN usuarios um
                    ON m.usuario_id = um.id

                ORDER BY r.fecha DESC
            `);

            return result.recordset;

        } catch (error) {
            throw error;
        }
    }

    // Obtener por ID
    async obtenerPorId(id) {
        try {
            const pool = await sql.connect(dbConfig);

            const result = await pool.request()
                .input("id", sql.Int, id)
                .query(`
                    SELECT *
                    FROM recetas
                    WHERE id = @id
                `);

            return result.recordset[0];

        } catch (error) {
            throw error;
        }
    }

    // Obtener por consulta
    async obtenerPorConsulta(consulta_id) {
        try {
            const pool = await sql.connect(dbConfig);

            const result = await pool.request()
                .input("consulta_id", sql.Int, consulta_id)
                .query(`
                    SELECT *
                    FROM recetas
                    WHERE consulta_id = @consulta_id
                    ORDER BY fecha DESC
                `);

            return result.recordset;

        } catch (error) {
            throw error;
        }
    }

    // Crear receta
    async crear(datos) {
        try {
            const {
                consulta_id,
                descripcion
            } = datos;

            const pool = await sql.connect(dbConfig);

            const result = await pool.request()
                .input("consulta_id", sql.Int, consulta_id)
                .input("descripcion", sql.NVarChar(sql.MAX), descripcion)
                .query(`
                    INSERT INTO recetas (
                        consulta_id,
                        descripcion
                    )
                    OUTPUT INSERTED.*
                    VALUES (
                        @consulta_id,
                        @descripcion
                    )
                `);

            return result.recordset[0];

        } catch (error) {
            throw error;
        }
    }

    // Actualizar receta
    async actualizar(id, datos) {
        try {
            const { descripcion } = datos;

            const pool = await sql.connect(dbConfig);

            const result = await pool.request()
                .input("id", sql.Int, id)
                .input("descripcion", sql.NVarChar(sql.MAX), descripcion)
                .query(`
                    UPDATE recetas
                    SET descripcion = @descripcion
                    OUTPUT INSERTED.*
                    WHERE id = @id
                `);

            return result.recordset[0];

        } catch (error) {
            throw error;
        }
    }

    // Eliminar receta
    async eliminar(id) {
        try {
            const pool = await sql.connect(dbConfig);

            await pool.request()
                .input("id", sql.Int, id)
                .query(`
                    DELETE FROM recetas
                    WHERE id = @id
                `);

            return true;

        } catch (error) {
            throw error;
        }
    }
}

module.exports = new RecetaRepository();