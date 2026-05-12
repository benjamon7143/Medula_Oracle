const medicoRepository = require("../repositories/medicoRepository");


// Crear médico
const crearMedico = async (req, res) => {

    try {

        const nuevoMedico = await medicoRepository.crearMedico(req.body);

        return res.status(201).json(nuevoMedico);

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            mensaje: "Error al crear médico"
        });
    }
};


// Obtener todos
const obtenerMedicos = async (req, res) => {

    try {

        const medicos = await medicoRepository.obtenerMedicos();

        return res.json(medicos);

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            mensaje: "Error al obtener médicos"
        });
    }
};


// Obtener por ID
const obtenerMedicoPorId = async (req, res) => {

    try {

        const medico = await medicoRepository.obtenerMedicoPorId(req.params.id);

        if (!medico) {

            return res.status(404).json({
                mensaje: "Médico no encontrado"
            });
        }

        return res.json(medico);

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            mensaje: "Error al obtener médico"
        });
    }
};


// Actualizar médico
const actualizarMedico = async (req, res) => {

    try {

        const medicoActualizado = await medicoRepository.actualizarMedico(
            req.params.id,
            req.body
        );

        return res.json(medicoActualizado);

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            mensaje: "Error al actualizar médico"
        });
    }
};


// Eliminar médico
const eliminarMedico = async (req, res) => {

    try {

        await medicoRepository.eliminarMedico(req.params.id);

        return res.json({
            mensaje: "Médico eliminado correctamente"
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            mensaje: "Error al eliminar médico"
        });
    }
};


module.exports = {
    crearMedico,
    obtenerMedicos,
    obtenerMedicoPorId,
    actualizarMedico,
    eliminarMedico
};