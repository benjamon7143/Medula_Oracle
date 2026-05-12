const citaRepository = require("../repositories/citaRepository");


// Crear cita
const crearCita = async (req, res) => {

    try {

        const nuevaCita = await citaRepository.crearCita(req.body);

        return res.status(201).json(nuevaCita);

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            mensaje: "Error al crear cita"
        });
    }
};


// Obtener todas
const obtenerCitas = async (req, res) => {

    try {

        const citas = await citaRepository.obtenerCitas();

        return res.json(citas);

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            mensaje: "Error al obtener citas"
        });
    }
};


// Obtener por ID
const obtenerCitaPorId = async (req, res) => {

    try {

        const cita = await citaRepository.obtenerCitaPorId(req.params.id);

        if (!cita) {

            return res.status(404).json({
                mensaje: "Cita no encontrada"
            });
        }

        return res.json(cita);

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            mensaje: "Error al obtener cita"
        });
    }
};


// Actualizar cita
const actualizarCita = async (req, res) => {

    try {

        const citaActualizada = await citaRepository.actualizarCita(
            req.params.id,
            req.body
        );

        return res.json(citaActualizada);

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            mensaje: "Error al actualizar cita"
        });
    }
};


// Eliminar cita
const eliminarCita = async (req, res) => {

    try {

        await citaRepository.eliminarCita(req.params.id);

        return res.json({
            mensaje: "Cita eliminada correctamente"
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            mensaje: "Error al eliminar cita"
        });
    }
};


module.exports = {
    crearCita,
    obtenerCitas,
    obtenerCitaPorId,
    actualizarCita,
    eliminarCita
};