const sql = require("mssql");
const dbConfig = require("../config/db");

class HorarioRepository {

    // Obtener todos
    async obtenerTodos() {
        try {
            const pool = await sql.connect(dbConfig);

            const result = await pool.request().query(`
                SELECT 
                    hm.id,
                    hm.medico_id,
                    u.nombre AS medico,
                    hm.dia_semana,
                    hm.hora_inicio,
                    hm.hora_fin
                FROM horarios_medico hm
                INNER JOIN medicos m ON hm.medico_id = m.id
                INNER JOIN usuarios u ON m.usuario_id = u.id
                ORDER BY hm.dia_semana, hm.hora_inicio
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
                    FROM horarios_medico
                    WHERE id = @id
                `);

            return result.recordset[0];

        } catch (error) {
            throw error;
        }
    }

    // Obtener horarios por médico
    async obtenerPorMedico(medico_id) {
        try {
            const pool = await sql.connect(dbConfig);

            const result = await pool.request()
                .input("medico_id", sql.Int, medico_id)
                .query(`
                    SELECT *
                    FROM horarios_medico
                    WHERE medico_id = @medico_id
                    ORDER BY dia_semana, hora_inicio
                `);

            return result.recordset;

        } catch (error) {
            throw error;
        }
    }

    // Crear horario
    async crear(datos) {
        try {
            const { medico_id, dia_semana, hora_inicio, hora_fin } = datos;

            const pool = await sql.connect(dbConfig);

            const result = await pool.request()
                .input("medico_id", sql.Int, medico_id)
                .input("dia_semana", sql.Int, dia_semana)
                .input("hora_inicio", sql.Time, hora_inicio)
                .input("hora_fin", sql.Time, hora_fin)
                .query(`
                    INSERT INTO horarios_medico (
                        medico_id,
                        dia_semana,
                        hora_inicio,
                        hora_fin
                    )
                    OUTPUT INSERTED.*
                    VALUES (
                        @medico_id,
                        @dia_semana,
                        @hora_inicio,
                        @hora_fin
                    )
                `);

            return result.recordset[0];

        } catch (error) {
            throw error;
        }
    }

    // Actualizar horario
    async actualizar(id, datos) {
        try {
            const { dia_semana, hora_inicio, hora_fin } = datos;

            const pool = await sql.connect(dbConfig);

            const result = await pool.request()
                .input("id", sql.Int, id)
                .input("dia_semana", sql.Int, dia_semana)
                .input("hora_inicio", sql.Time, hora_inicio)
                .input("hora_fin", sql.Time, hora_fin)
                .query(`
                    UPDATE horarios_medico
                    SET
                        dia_semana = @dia_semana,
                        hora_inicio = @hora_inicio,
                        hora_fin = @hora_fin
                    OUTPUT INSERTED.*
                    WHERE id = @id
                `);

            return result.recordset[0];

        } catch (error) {
            throw error;
        }
    }

    // Eliminar horario
    async eliminar(id) {
        try {
            const pool = await sql.connect(dbConfig);

            await pool.request()
                .input("id", sql.Int, id)
                .query(`
                    DELETE FROM horarios_medico
                    WHERE id = @id
                `);

            return true;

        } catch (error) {
            throw error;
        }
    }
}

module.exports = new HorarioRepository();