import express from "express";
import cors from "cors";
import routes from "./routes";
import errorHandler from "./middlewares/errorHandler";
import authRoutes from "./routes/authRoutes";

const app = express();

app.use(cors({
  origin: [
    "http://192.168.10.8:3000",
    "http://192.168.10.9:3000", 
    "https://fatecpi-cesarvidros-git-pedro-frontend-fatecpis-projects.vercel.app",
    "https://fatecpi-cesarvidros.vercel.app",
    "http://localhost:3000"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));
app.use(express.json());
app.use("/api", routes);
app.use(errorHandler); // Middleware de erro
app.use("/auth", authRoutes); // Adiciona as rotas de autenticação

export default app;
