const especialidadRepository = require("../repositories/especialidadRepository");


// Crear
const crearEspecialidad = async (req, res) => {

    try {

        const nuevaEspecialidad = await especialidadRepository.crearEspecialidad(req.body);

        return res.status(201).json(nuevaEspecialidad);

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            mensaje: "Error al crear especialidad"
        });
    }
};


// Obtener todas
const obtenerEspecialidades = async (req, res) => {

    try {

        const especialidades = await especialidadRepository.obtenerEspecialidades();

        return res.json(especialidades);

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            mensaje: "Error al obtener especialidades"
        });
    }
};


// Obtener por ID
const obtenerEspecialidadPorId = async (req, res) => {

    try {

        const especialidad = await especialidadRepository.obtenerEspecialidadPorId(req.params.id);

        if (!especialidad) {

            return res.status(404).json({
                mensaje: "Especialidad no encontrada"
            });
        }

        return res.json(especialidad);

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            mensaje: "Error al obtener especialidad"
        });
    }
};


// Actualizar
const actualizarEspecialidad = async (req, res) => {

    try {

        const especialidadActualizada = await especialidadRepository.actualizarEspecialidad(
            req.params.id,
            req.body
        );

        return res.json(especialidadActualizada);

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            mensaje: "Error al actualizar especialidad"
        });
    }
};


// Eliminar
const eliminarEspecialidad = async (req, res) => {

    try {

        await especialidadRepository.eliminarEspecialidad(req.params.id);

        return res.json({
            mensaje: "Especialidad eliminada correctamente"
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            mensaje: "Error al eliminar especialidad"
        });
    }
};


module.exports = {
    crearEspecialidad,
    obtenerEspecialidades,
    obtenerEspecialidadPorId,
    actualizarEspecialidad,
    eliminarEspecialidad
};