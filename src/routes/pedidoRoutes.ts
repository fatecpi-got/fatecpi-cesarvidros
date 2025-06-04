import Router from 'express';
import { PedidoController } from '../controllers/PedidoController';

const router = Router();
const pedidoController = new PedidoController();

router.get('/get-all', async (req, res) => {
    try {
        await pedidoController.getAllPedidos(req, res);
    } catch (err) {
        console.error("Error in GET /get-all:", err);
    }
});

router.get('/get-by-orcamento', async (req, res) => {
    try {
        await pedidoController.getPedidoByOrcamentoId(req, res);
    } catch (err) {
        console.error("Error in GET /get-by-orcamento:", err);
    }
});

router.put('/update-status', async (req, res) => {
    try {
        await pedidoController.updatePedidoStatus(req, res);
    } catch (err) {
        console.error("Error in PUT /update-status:", err);
    }
});

export default router;
