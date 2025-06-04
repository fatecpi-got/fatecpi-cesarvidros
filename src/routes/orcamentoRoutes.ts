import Router from 'express';
import { OrcamentoController } from '../controllers/orcamentoController';

const router = Router();
const orcamentoController = new OrcamentoController();

router.get('/get-all', async (req, res) => {
    try {
        await orcamentoController.getAllOrcamentos(req, res);
    } catch (err) {
        console.error("Error in GET /get-all:", err);
    }
});

router.get('/get-by-user', async (req, res) => {
    try {
        await orcamentoController.getOrcamentoByUserId(req, res);
    } catch (err) {
        console.error("Error in GET /get-by-user:", err);
    }
});

export default router;