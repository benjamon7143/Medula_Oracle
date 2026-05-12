const express = require('express');

const router = express.Router();
const { verificarToken } = require("../middleware/authMiddleware");
const { verificarRol } = require("../middleware/roleMiddleware");

const centroSaludController = require("../controllers/centroSaludController");

// Obtener todos
router.get("/",verificarToken,centroSaludController.obtenerCentrosSalud);

// Obtener por ID
router.get("/:id",verificarToken,centroSaludController.obtenerCentroSaludPorId);

// Crear
router.post("/",verificarToken,verificarRol(1),centroSaludController.crearCentroSalud);

// Actualizar
router.put("/:id",verificarToken,verificarRol(1),centroSaludController.actualizarCentroSalud);

// Eliminar
router.delete("/:id",verificarToken,verificarRol(1),centroSaludController.eliminarCentroSalud);

module.exports = router;