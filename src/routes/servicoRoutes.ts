import { Router } from "express";
import { ServicosController } from "../controllers/servicosController";

const servicosController = new ServicosController();

const router = Router();

router.get('/get-all', async (req, res) => {
    try {
        await servicosController.getAllServicos(req, res);
    } catch (err) {
        console.error("Error in GET /get-all:", err);
    }
});

router.get('/get-by-user/:usuario_id', async (req, res) => {
    try {
        await servicosController.getServicoByUserId(req, res);
    } catch (err) {
        console.error("Error in GET /get-by-user", err);
    }
});

router.get('/get-by-orcamento/:orcamento_id', async (req, res) => {
    try {
        await servicosController.getServicoByOrcamentoId(req, res);
    } catch (err) {
        console.error("Error in GET /get-by-orcamento:", err);
    }
});

router.post('/create', async (req, res) => {
    try {
        await servicosController.createServico(req, res);
    } catch (err) {
        console.error("Error in POST /create:", err);
    }
});

router.put('/update-status', async (req, res) => {
    try {
        await servicosController.updateServicoStatus(req, res);
    } catch (err) {
        console.error("Error in PUT /update-status:", err);
    }
});

router.put('/update-cost-price', async (req, res) => {
    try {
        await servicosController.updateCostAndPrice(req, res);
    } catch (err) {
        console.error("Error in PUT /update-cost-price:", err);
    }
});

export default router;