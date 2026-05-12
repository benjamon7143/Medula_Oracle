const horarioRepository = require("../repositories/horarioRepository");

class HorarioController {

    async obtenerTodos(req, res) {
        try {
            const horarios = await horarioRepository.obtenerTodos();

            res.json(horarios);

        } catch (error) {
            console.error(error);

            res.status(500).json({
                mensaje: "Error al obtener horarios"
            });
        }
    }

    async obtenerPorId(req, res) {
        try {
            const { id } = req.params;

            const horario = await horarioRepository.obtenerPorId(id);

            if (!horario) {
                return res.status(404).json({
                    mensaje: "Horario no encontrado"
                });
            }

            res.json(horario);

        } catch (error) {
            console.error(error);

            res.status(500).json({
                mensaje: "Error al obtener horario"
            });
        }
    }

    async obtenerPorMedico(req, res) {
        try {
            const { medico_id } = req.params;

            const horarios = await horarioRepository.obtenerPorMedico(medico_id);

            res.json(horarios);

        } catch (error) {
            console.error(error);

            res.status(500).json({
                mensaje: "Error al obtener horarios del médico"
            });
        }
    }

    async crear(req, res) {
        try {
            const nuevoHorario = await horarioRepository.crear(req.body);

            res.status(201).json({
                mensaje: "Horario creado correctamente",
                horario: nuevoHorario
            });

        } catch (error) {
            console.error(error);

            res.status(500).json({
                mensaje: "Error al crear horario"
            });
        }
    }

    async actualizar(req, res) {
        try {
            const { id } = req.params;

            const horarioActualizado = await horarioRepository.actualizar(id, req.body);

            if (!horarioActualizado) {
                return res.status(404).json({
                    mensaje: "Horario no encontrado"
                });
            }

            res.json({
                mensaje: "Horario actualizado correctamente",
                horario: horarioActualizado
            });

        } catch (error) {
            console.error(error);

            res.status(500).json({
                mensaje: "Error al actualizar horario"
            });
        }
    }

    async eliminar(req, res) {
        try {
            const { id } = req.params;

            await horarioRepository.eliminar(id);

            res.json({
                mensaje: "Horario eliminado correctamente"
            });

        } catch (error) {
            console.error(error);

            res.status(500).json({
                mensaje: "Error al eliminar horario"
            });
        }
    }
}

module.exports = new HorarioController();