import express from "express";
import cors from "cors";
import routes from "./routes";
import errorHandler from "./middlewares/errorHandler";
import authRoutes from "./routes/authRoutes";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", routes);
app.use(errorHandler); // Middleware de erro
app.use("/auth", authRoutes); // Adiciona as rotas de autenticação

export default app;
