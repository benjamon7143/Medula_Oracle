const express = require("express");
const router = express.Router();

const horarioController = require("../controllers/horarioController");

const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");

// Obtener todos
router.get("/",authMiddleware,horarioController.obtenerTodos);

// Obtener por ID
router.get("/:id",authMiddleware,horarioController.obtenerPorId);

// Obtener horarios de un médico
router.get("/medico/:medico_id",authMiddleware,horarioController.obtenerPorMedico);

// Crear
router.post("/",authMiddleware,roleMiddleware(1),horarioController.crear);

// Actualizar
router.put("/:id",authMiddleware,roleMiddleware(1),horarioController.actualizar);

// Eliminar
router.delete("/:id",authMiddleware,roleMiddleware(1),horarioController.eliminar);

module.exports = router;