const express = require("express");

const router = express.Router();

const especialidadController = require("../controllers/especialidadController");

const { verificarToken
} = require("../middleware/authMiddleware");

const { verificarRol } = require("../middleware/roleMiddleware");


// Obtener todas
router.get("/", verificarToken, especialidadController.obtenerEspecialidades);


// Obtener por ID
router.get("/:id",verificarToken,especialidadController.obtenerEspecialidadPorId);


// Crear
router.post("/",verificarToken,verificarRol(1),especialidadController.crearEspecialidad);


// Actualizar
router.put("/:id",verificarToken,verificarRol(1),especialidadController.actualizarEspecialidad);


// Eliminar
router.delete("/:id",verificarToken,verificarRol(1),especialidadController.eliminarEspecialidad);


module.exports = router;