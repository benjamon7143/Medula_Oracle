const recetaRepository = require('../repositories/recetaRepository');

const getRecetas = async (req, res) => {
    try {
        const recetas = await recetaRepository.getAllRecetas();

        res.json(recetas);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: 'Error obteniendo recetas'
        });
    }
};

const getRecetaById = async (req, res) => {
    try {
        const receta = await recetaRepository.getRecetaById(req.params.id);

        if (!receta) {
            return res.status(404).json({
                message: 'Receta no encontrada'
            });
        }

        res.json(receta);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: 'Error obteniendo receta'
        });
    }
};

const createReceta = async (req, res) => {
    try {
        const nuevaReceta = await recetaRepository.createReceta(req.body);

        res.status(201).json(nuevaReceta);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: 'Error creando receta'
        });
    }
};

const updateReceta = async (req, res) => {
    try {
        const recetaActualizada = await recetaRepository.updateReceta(
            req.params.id,
            req.body
        );

        if (!recetaActualizada) {
            return res.status(404).json({
                message: 'Receta no encontrada'
            });
        }

        res.json(recetaActualizada);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: 'Error actualizando receta'
        });
    }
};

const deleteReceta = async (req, res) => {
    try {
        await recetaRepository.deleteReceta(req.params.id);

        res.json({
            message: 'Receta eliminada correctamente'
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: 'Error eliminando receta'
        });
    }
};

module.exports = {
    getRecetas,
    getRecetaById,
    createReceta,
    updateReceta,
    deleteReceta
};