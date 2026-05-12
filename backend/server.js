const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { connectDB } = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const usuarioRoutes = require("./routes/usuarioRoutes");
const pacienteRoutes = requiere("./routes/pacienteRoutes.js");
const medicoRoutes = requiere("./routes/medicoRoutes.js");
const especialidadRoutes = requiere("./routes/especialidadRoutes.js");
const citaRoutes = requiere("./routes/citaRoutes.js");
const estadoCitasRoutes = requiere("./routes/estadoCitaRoutes.js");
const centroSaludRoutes = requiere("./routes/centroSaludRoutes.js");
const horarioRoutes = requiere("./routes/horarioRoutes.js");

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




connectDB();

app.get("/", (req, res) => {
    res.send("Servidor funcionando correctamente");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(` Servidor corriendo en puerto ${PORT}`);
});