const centroSaludRepository = require("../repositories/centroSaludRepository");


// Crear
const crearCentroSalud = async (req, res) => {

    try {

        const nuevoCentro = await centroSaludRepository.crearCentroSalud(req.body);

        return res.status(201).json(nuevoCentro);

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            mensaje: "Error al crear centro de salud"
        });
    }
};


// Obtener todos
const obtenerCentrosSalud = async (req, res) => {

    try {

        const centros = await centroSaludRepository.obtenerCentrosSalud();

        return res.json(centros);

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            mensaje: "Error al obtener centros de salud"
        });
    }
};


// Obtener por ID
const obtenerCentroSaludPorId = async (req, res) => {

    try {

        const centro = await centroSaludRepository.obtenerCentroSaludPorId(req.params.id);

        if (!centro) {

            return res.status(404).json({
                mensaje: "Centro de salud no encontrado"
            });
        }

        return res.json(centro);

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            mensaje: "Error al obtener centro de salud"
        });
    }
};


// Actualizar
const actualizarCentroSalud = async (req, res) => {

    try {

        const centroActualizado = await centroSaludRepository.actualizarCentroSalud(
            req.params.id,
            req.body
        );

        return res.json(centroActualizado);

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            mensaje: "Error al actualizar centro de salud"
        });
    }
};


// Eliminar
const eliminarCentroSalud = async (req, res) => {

    try {

        await centroSaludRepository.eliminarCentroSalud(req.params.id);

        return res.json({
            mensaje: "Centro de salud eliminado correctamente"
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            mensaje: "Error al eliminar centro de salud"
        });
    }
};


module.exports = {
    crearCentroSalud,
    obtenerCentrosSalud,
    obtenerCentroSaludPorId,
    actualizarCentroSalud,
    eliminarCentroSalud
};