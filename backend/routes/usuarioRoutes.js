const express = require("express");

const router = express.Router();
const { verificarToken } = require("../middleware/authMiddleware");


const user = require("../controllers/usuarioController");

router.get("/", verificarToken, user.obtenerUsuarios);
router.get("/id", verificarToken, user.obtenerUsuarioPorId);
router.post("/", verificarToken, user.crearUsuario);
router.put("/id", verificarToken, user.actualizarUsuario);
router.delete("/id", verificarToken, user.eliminarUsuario);

module.exports = router;