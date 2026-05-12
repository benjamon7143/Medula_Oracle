const consultaRepository = require("../repositories/consultaRepository");

class ConsultaController {

    async obtenerTodas(req, res) {
        try {
            const consultas = await consultaRepository.obtenerTodas();

            res.json(consultas);

        } catch (error) {
            console.error(error);

            res.status(500).json({
                mensaje: "Error al obtener consultas"
            });
        }
    }

    async obtenerPorId(req, res) {
        try {
            const { id } = req.params;

            const consulta = await consultaRepository.obtenerPorId(id);

            if (!consulta) {
                return res.status(404).json({
                    mensaje: "Consulta no encontrada"
                });
            }

            res.json(consulta);

        } catch (error) {
            console.error(error);

            res.status(500).json({
                mensaje: "Error al obtener consulta"
            });
        }
    }

    async obtenerPorCita(req, res) {
        try {
            const { cita_id } = req.params;

            const consulta = await consultaRepository.obtenerPorCita(cita_id);

            if (!consulta) {
                return res.status(404).json({
                    mensaje: "Consulta no encontrada"
                });
            }

            res.json(consulta);

        } catch (error) {
            console.error(error);

            res.status(500).json({
                mensaje: "Error al obtener consulta"
            });
        }
    }

    async crear(req, res) {
        try {
            const nuevaConsulta = await consultaRepository.crear(req.body);

            res.status(201).json({
                mensaje: "Consulta creada correctamente",
                consulta: nuevaConsulta
            });

        } catch (error) {
            console.error(error);

            res.status(500).json({
                mensaje: "Error al crear consulta"
            });
        }
    }

    async actualizar(req, res) {
        try {
            const { id } = req.params;

            const consultaActualizada = await consultaRepository.actualizar(id, req.body);

            if (!consultaActualizada) {
                return res.status(404).json({
                    mensaje: "Consulta no encontrada"
                });
            }

            res.json({
                mensaje: "Consulta actualizada correctamente",
                consulta: consultaActualizada
            });

        } catch (error) {
            console.error(error);

            res.status(500).json({
                mensaje: "Error al actualizar consulta"
            });
        }
    }

    async eliminar(req, res) {
        try {
            const { id } = req.params;

            await consultaRepository.eliminar(id);

            res.json({
                mensaje: "Consulta eliminada correctamente"
            });

        } catch (error) {
            console.error(error);

            res.status(500).json({
                mensaje: "Error al eliminar consulta"
            });
        }
    }
}

module.exports = new ConsultaController();