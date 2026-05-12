const express = require("express");

const router = express.Router();
const { verificarToken } = require("../middleware/authMiddleware");
const { verificarRol } = require("../middleware/roleMiddleware");

const medicoController = require("../controllers/medicoController");

router.get("/", verificarToken,verificarRol(1,2) ,medicoController.obtenerMedicos);
router.get("/id", verificarToken, verificarRol(1,2), medicoController.obtenerMedicoPorId);
router.post("/", verificarToken, verificarRol(1) ,medicoController.crearMedico);
router.put("/id", verificarToken, verificarRol(1,2), medicoController.actualizarMedico);
router.delete("/id", verificarToken, verificarRol(1), medicoController.eliminarMedico);