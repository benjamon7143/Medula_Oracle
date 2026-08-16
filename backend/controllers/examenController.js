const examenRepository = require('../repositories/examenRepository');

const getExamenes = async (req, res) => {
    try {
        const examenes = await examenRepository.getAllExamenes();

        res.json(examenes);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: 'Error obteniendo exámenes'
        });
    }
};

const getExamenById = async (req, res) => {
    try {
        const examen = await examenRepository.getExamenById(req.params.id);

        if (!examen) {
            return res.status(404).json({
                message: 'Examen no encontrado'
            });
        }

        res.json(examen);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: 'Error obteniendo examen'
        });
    }
};

const createExamen = async (req, res) => {
    try {
        const nuevoExamen = await examenRepository.createExamen(req.body);

        res.status(201).json(nuevoExamen);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: 'Error creando examen'
        });
    }
};

const updateExamen = async (req, res) => {
    try {
        const examenActualizado = await examenRepository.updateExamen(
            req.params.id,
            req.body
        );

        if (!examenActualizado) {
            return res.status(404).json({
                message: 'Examen no encontrado'
            });
        }

        res.json(examenActualizado);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: 'Error actualizando examen'
        });
    }
};

const deleteExamen = async (req, res) => {
    try {
        await examenRepository.deleteExamen(req.params.id);

        res.json({
            message: 'Examen eliminado correctamente'
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: 'Error eliminando examen'
        });
    }
};

module.exports = {
    getExamenes,
    getExamenById,
    createExamen,
    updateExamen,
    deleteExamen
};