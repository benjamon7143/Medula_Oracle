const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { connectDB } = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const usuarioRoutes = require("./routes/usuarioRoutes");
const pacienteRoutes = require("./routes/pacienteRoutes.js");
const medicoRoutes = require("./routes/medicoRoutes.js");
const especialidadRoutes = require("./routes/especialidadRoutes.js");
const citaRoutes = require("./routes/citaRoutes.js");
const estadoCitasRoutes = require("./routes/estadoCitaRoutes.js");
const centroSaludRoutes = require("./routes/centroSaludRoutes.js");
const horarioRoutes = require("./routes/horarioRoutes.js");
const recetaRoutes = require("./routes/recetaRoutes.js");
const examenRoutes = require("./routes/examenRoutes");
const rolRoutes = require("./routes/rolRoutes");
const consultaRoutes = require("./routes/consultaRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/usuarios", usuarioRoutes);
app.use("/pacientes",pacienteRoutes);
app.use("/medicos",medicoRoutes);
app.use("/especialidades",especialidadRoutes);
app.use("/citas",citaRoutes);
app.use("/estados-cita",estadoCitasRoutes);
app.use("/centros-salud",centroSaludRoutes);
app.use("/horarios",horarioRoutes);
app.use("/recetas",recetaRoutes);
app.use("/examenes",examenRoutes);
app.use("/roles",rolRoutes);
app.use("/consultas",consultaRoutes);

connectDB();

app.get("/", (req, res) => {
    res.send("Servidor funcionando correctamente");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(` Servidor corriendo en puerto ${PORT}`);
});