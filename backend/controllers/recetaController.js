const recetaRepository = require("../repositories/recetaRepository");

class RecetaController {

    async obtenerTodas(req, res) {
        try {
            const recetas = await recetaRepository.obtenerTodas();

            res.json(recetas);

        } catch (error) {
            console.error(error);

            res.status(500).json({
                mensaje: "Error al obtener recetas"
            });
        }
    }

    async obtenerPorId(req, res) {
        try {
            const { id } = req.params;

            const receta = await recetaRepository.obtenerPorId(id);

            if (!receta) {
                return res.status(404).json({
                    mensaje: "Receta no encontrada"
                });
            }

            res.json(receta);

        } catch (error) {
            console.error(error);

            res.status(500).json({
                mensaje: "Error al obtener receta"
            });
        }
    }

    async obtenerPorConsulta(req, res) {
        try {
            const { consulta_id } = req.params;

            const recetas = await recetaRepository.obtenerPorConsulta(consulta_id);

            res.json(recetas);

        } catch (error) {
            console.error(error);

            res.status(500).json({
                mensaje: "Error al obtener recetas"
            });
        }
    }

    async crear(req, res) {
        try {
            const nuevaReceta = await recetaRepository.crear(req.body);

            res.status(201).json({
                mensaje: "Receta creada correctamente",
                receta: nuevaReceta
            });

        } catch (error) {
            console.error(error);

            res.status(500).json({
                mensaje: "Error al crear receta"
            });
        }
    }

    async actualizar(req, res) {
        try {
            const { id } = req.params;

            const recetaActualizada = await recetaRepository.actualizar(id, req.body);

            if (!recetaActualizada) {
                return res.status(404).json({
                    mensaje: "Receta no encontrada"
                });
            }

            res.json({
                mensaje: "Receta actualizada correctamente",
                receta: recetaActualizada
            });

        } catch (error) {
            console.error(error);

            res.status(500).json({
                mensaje: "Error al actualizar receta"
            });
        }
    }

    async eliminar(req, res) {
        try {
            const { id } = req.params;

            await recetaRepository.eliminar(id);

            res.json({
                mensaje: "Receta eliminada correctamente"
            });

        } catch (error) {
            console.error(error);

            res.status(500).json({
                mensaje: "Error al eliminar receta"
            });
        }
    }
}

module.exports = new RecetaController();