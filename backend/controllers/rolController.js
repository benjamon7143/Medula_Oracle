const rolRepository = require('../repositories/rolRepository');

const getRoles = async (req, res) => {
    try {
        const roles = await rolRepository.getAllRoles();

        res.json(roles);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: 'Error obteniendo roles'
        });
    }
};

const getRolById = async (req, res) => {
    try {
        const rol = await rolRepository.getRolById(req.params.id);

        if (!rol) {
            return res.status(404).json({
                message: 'Rol no encontrado'
            });
        }

        res.json(rol);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: 'Error obteniendo rol'
        });
    }
};

const createRol = async (req, res) => {
    try {
        const nuevoRol = await rolRepository.createRol(req.body);

        res.status(201).json(nuevoRol);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: 'Error creando rol'
        });
    }
};

const updateRol = async (req, res) => {
    try {
        const rolActualizado = await rolRepository.updateRol(
            req.params.id,
            req.body
        );

        if (!rolActualizado) {
            return res.status(404).json({
                message: 'Rol no encontrado'
            });
        }

        res.json(rolActualizado);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: 'Error actualizando rol'
        });
    }
};

const deleteRol = async (req, res) => {
    try {
        await rolRepository.deleteRol(req.params.id);

        res.json({
            message: 'Rol eliminado correctamente'
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: 'Error eliminando rol'
        });
    }
};

module.exports = {
    getRoles,
    getRolById,
    createRol,
    updateRol,
    deleteRol
};