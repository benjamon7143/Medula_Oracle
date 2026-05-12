const express = require("express");
const router = express.Router();

const consultaController = require("../controllers/consultaController");

const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");

// Obtener todas
router.get("/",authMiddleware,consultaController.obtenerTodas);

// Obtener por ID
router.get("/:id",authMiddleware,consultaController.obtenerPorId);

// Obtener por cita
router.get("/cita/:cita_id",authMiddleware,consultaController.obtenerPorCita);

// Crear
router.post("/",authMiddleware,roleMiddleware(1,2),consultaController.crear);

// Actualizar
router.put("/:id",authMiddleware,roleMiddleware(1,2),consultaController.actualizar);

// Eliminar
router.delete("/:id",authMiddleware,roleMiddleware(1),consultaController.eliminar);

module.exports = router;