import { Router } from "express";
import { SubProdutoController } from "../controllers/subProdutoController";

const subProdutoController = new SubProdutoController();

const router = Router();

router.get('/get-all', async (req, res) => {
    try {
        await subProdutoController.getSubProdutos(req, res);
    } catch (err) {
        console.error("Error in GET /get-all:", err);
        res.status(500).send("Internal Server Error");
    }
});

export default router;