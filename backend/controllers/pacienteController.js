const pacienteRepository = require("../repositories/pacienteRepository");


// Crear
const crearPaciente = async (req, res) => {

    try {

        const nuevoPaciente = await pacienteRepository.crearPaciente(req.body);

        return res.status(201).json(nuevoPaciente);

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            mensaje: "Error al crear paciente"
        });
    }
};


// Obtener todos
const obtenerPacientes = async (req, res) => {

    try {

        const pacientes = await pacienteRepository.obtenerPacientes();

        return res.json(pacientes);

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            mensaje: "Error al obtener pacientes"
        });
    }
};


// Obtener por ID
const obtenerPacientePorId = async (req, res) => {

    try {

        const paciente = await pacienteRepository.obtenerPacientePorId(req.params.id);

        if (!paciente) {

            return res.status(404).json({
                mensaje: "Paciente no encontrado"
            });
        }

        return res.json(paciente);

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            mensaje: "Error al obtener paciente"
        });
    }
};


// Actualizar
const actualizarPaciente = async (req, res) => {

    try {

        const pacienteActualizado = await pacienteRepository.actualizarPaciente(
            req.params.id,
            req.body
        );

        return res.json(pacienteActualizado);

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            mensaje: "Error al actualizar paciente"
        });
    }
};


// Eliminar
const eliminarPaciente = async (req, res) => {

    try {

        await pacienteRepository.eliminarPaciente(req.params.id);

        return res.json({
            mensaje: "Paciente eliminado correctamente"
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            mensaje: "Error al eliminar paciente"
        });
    }
};


module.exports = {
    crearPaciente,
    obtenerPacientes,
    obtenerPacientePorId,
    actualizarPaciente,
    eliminarPaciente
};