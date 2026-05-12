const express = require("express");

const router = express.Router();

const citaController = require("../controllers/citaController");

const { verificarToken } = require("../middleware/authMiddleware");

const { verificarRol } = require("../middleware/roleMiddleware");


// Obtener todas
router.get("/",verificarToken,verificarRol(1, 2, 3),citaController.obtenerCitas);


// Obtener por ID
router.get("/:id",verificarToken,verificarRol(1, 2, 3),citaController.obtenerCitaPorId);


// Crear cita
router.post("/",verificarToken,verificarRol(1, 2),citaController.crearCita);


// Actualizar cita
router.put("/:id",verificarToken,verificarRol(1, 3),citaController.actualizarCita);


// Eliminar cita
router.delete("/:id",verificarToken,verificarRol(1),citaController.eliminarCita);


module.exports = router;