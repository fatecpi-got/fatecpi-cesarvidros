import { Router } from "express";
import { getAllSubcategorias } from "../controllers/subcategoriaController";

const router = Router();

router.get('/get-all', getAllSubcategorias);

export default router;