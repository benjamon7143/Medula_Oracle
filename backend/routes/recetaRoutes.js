const express = require("express");
const router = express.Router();

const recetaController = require("../controllers/recetaController");

const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");

// Obtener todas
router.get("/",authMiddleware,recetaController.obtenerTodas);

// Obtener por ID
router.get("/:id",authMiddleware,recetaController.obtenerPorId);

// Obtener por consulta
router.get("/consulta/:consulta_id",authMiddleware,recetaController.obtenerPorConsulta);

// Crear
router.post("/",authMiddleware,roleMiddleware(1,2),recetaController.crear);

// Actualizar
router.put("/:id",authMiddleware,roleMiddleware(1,2),recetaController.actualizar);

// Eliminar
router.delete("/:id",authMiddleware,roleMiddleware(1),recetaController.eliminar);

module.exports = router;