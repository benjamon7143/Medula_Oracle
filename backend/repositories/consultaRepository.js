const sql = require("mssql");
const dbConfig = require("../config/db");

class ConsultaRepository {

    // Obtener todas
    async obtenerTodas() {
        try {
            const pool = await sql.connect(dbConfig);

            const result = await pool.request().query(`
                SELECT 
                    c.id,
                    c.cita_id,
                    c.diagnostico,
                    c.observaciones,
                    c.fecha,

                    p.id AS paciente_id,
                    up.nombre AS paciente,

                    m.id AS medico_id,
                    um.nombre AS medico

                FROM consultas c

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

                ORDER BY c.fecha DESC
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
                    FROM consultas
                    WHERE id = @id
                `);

            return result.recordset[0];

        } catch (error) {
            throw error;
        }
    }

    // Obtener por cita
    async obtenerPorCita(cita_id) {
        try {
            const pool = await sql.connect(dbConfig);

            const result = await pool.request()
                .input("cita_id", sql.Int, cita_id)
                .query(`
                    SELECT *
                    FROM consultas
                    WHERE cita_id = @cita_id
                `);

            return result.recordset[0];

        } catch (error) {
            throw error;
        }
    }

    // Crear consulta
    async crear(datos) {
        try {
            const {
                cita_id,
                diagnostico,
                observaciones
            } = datos;

            const pool = await sql.connect(dbConfig);

            const result = await pool.request()
                .input("cita_id", sql.Int, cita_id)
                .input("diagnostico", sql.NVarChar(sql.MAX), diagnostico)
                .input("observaciones", sql.NVarChar(sql.MAX), observaciones)
                .query(`
                    INSERT INTO consultas (
                        cita_id,
                        diagnostico,
                        observaciones
                    )
                    OUTPUT INSERTED.*
                    VALUES (
                        @cita_id,
                        @diagnostico,
                        @observaciones
                    )
                `);

            return result.recordset[0];

        } catch (error) {
            throw error;
        }
    }

    // Actualizar consulta
    async actualizar(id, datos) {
        try {
            const {
                diagnostico,
                observaciones
            } = datos;

            const pool = await sql.connect(dbConfig);

            const result = await pool.request()
                .input("id", sql.Int, id)
                .input("diagnostico", sql.NVarChar(sql.MAX), diagnostico)
                .input("observaciones", sql.NVarChar(sql.MAX), observaciones)
                .query(`
                    UPDATE consultas
                    SET
                        diagnostico = @diagnostico,
                        observaciones = @observaciones
                    OUTPUT INSERTED.*
                    WHERE id = @id
                `);

            return result.recordset[0];

        } catch (error) {
            throw error;
        }
    }

    // Eliminar consulta
    async eliminar(id) {
        try {
            const pool = await sql.connect(dbConfig);

            await pool.request()
                .input("id", sql.Int, id)
                .query(`
                    DELETE FROM consultas
                    WHERE id = @id
                `);

            return true;

        } catch (error) {
            throw error;
        }
    }
}

module.exports = new ConsultaRepository();