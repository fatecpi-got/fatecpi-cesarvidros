import { Router } from "express";
import { SubProdutoController } from "../controllers/subProdutoController";

const subProdutoController = new SubProdutoController();

const router = Router();

router.get('/get-all', subProdutoController.getSubProdutos);

export default router;