const express = require("express");

const router = express.Router();

const estadoCitaController = require("../controllers/estadoCitaController");

const {verificarToken} = require("../middleware/authMiddleware");

const {verificarRol} = require("../middleware/roleMiddleware");


// Obtener todos
router.get("/",verificarToken,estadoCitaController.obtenerEstadosCita);


// Obtener por ID
router.get("/:id",verificarToken,estadoCitaController.obtenerEstadoCitaPorId);


// Crear
router.post("/",verificarToken,verificarRol(1),estadoCitaController.crearEstadoCita);


// Actualizar
router.put("/:id",verificarToken,verificarRol(1),estadoCitaController.actualizarEstadoCita);


// Eliminar
router.delete("/:id",verificarToken,verificarRol(1),estadoCitaController.eliminarEstadoCita);


module.exports = router;