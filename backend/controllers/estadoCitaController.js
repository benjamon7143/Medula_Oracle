const estadoCitaRepository = require("../repositories/estadoCitaRepository");


// Crear
const crearEstadoCita = async (req, res) => {

    try {

        const nuevoEstado = await estadoCitaRepository.crearEstadoCita(req.body);

        return res.status(201).json(nuevoEstado);

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            mensaje: "Error al crear estado de cita"
        });
    }
};


// Obtener todos
const obtenerEstadosCita = async (req, res) => {

    try {

        const estados = await estadoCitaRepository.obtenerEstadosCita();

        return res.json(estados);

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            mensaje: "Error al obtener estados de cita"
        });
    }
};


// Obtener por ID
const obtenerEstadoCitaPorId = async (req, res) => {

    try {

        const estado = await estadoCitaRepository.obtenerEstadoCitaPorId(req.params.id);

        if (!estado) {

            return res.status(404).json({
                mensaje: "Estado de cita no encontrado"
            });
        }

        return res.json(estado);

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            mensaje: "Error al obtener estado de cita"
        });
    }
};


// Actualizar
const actualizarEstadoCita = async (req, res) => {

    try {

        const estadoActualizado = await estadoCitaRepository.actualizarEstadoCita(
            req.params.id,
            req.body
        );

        return res.json(estadoActualizado);

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            mensaje: "Error al actualizar estado de cita"
        });
    }
};


// Eliminar
const eliminarEstadoCita = async (req, res) => {

    try {

        await estadoCitaRepository.eliminarEstadoCita(req.params.id);

        return res.json({
            mensaje: "Estado de cita eliminado correctamente"
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            mensaje: "Error al eliminar estado de cita"
        });
    }
};


module.exports = {
    crearEstadoCita,
    obtenerEstadosCita,
    obtenerEstadoCitaPorId,
    actualizarEstadoCita,
    eliminarEstadoCita
};