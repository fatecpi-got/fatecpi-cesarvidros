import { Router } from "express";
import { getAllCategorias } from "../controllers/categoriaController";

const router = Router();

router.get('/get-all', getAllCategorias);

export default router