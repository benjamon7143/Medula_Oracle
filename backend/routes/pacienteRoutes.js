const express = require("express");

const router = express.Router();
const { verificarToken } = require("../middleware/authMiddleware");
const { verificarRol } = require("../middleware/roleMiddleware");

const pacienteController = require("../controllers/pacienteController");

router.get("/", verificarToken,verificarRol(1,3) ,pacienteController.obtenerPacientes);
router.get("/id", verificarToken, verificarRol(1,3), pacienteController.obtenerPacientePorId);
router.post("/", verificarToken, verificarRol(1) ,pacienteController.crearPaciente);
router.put("/id", verificarToken, verificarRol(1,3), pacienteController.actualizarPaciente);
router.delete("/id", verificarToken, verificarRol(1), pacienteController.eliminarPaciente);

module.exports = router;