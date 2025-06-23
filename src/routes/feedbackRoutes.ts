import Router from 'express';
import { FeedbackController } from '../controllers/feedbackController';

const router = Router();
const feedbackController = new FeedbackController();

router.get('/get-all', async (req, res) => {
    try {
        await feedbackController.getAllFeedbacks(req, res);
    } catch (err) {
        console.error("Error in GET /get-all:", err);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.get('/get-ponto-positivo', async (req, res) => {
    try {
        await feedbackController.getPontosPositivos(req, res);
    } catch (err) {
        console.error("Error in GET /get-ponto-positivo:", err);
        res.status(500).json({ message: "Internal server error" });
    }
})

router.get('/get-ponto-negativo', async (req, res) => {
    try {
        await feedbackController.getPontosNegativos(req, res);
    } catch (err) {
        console.error("Error in GET /get-ponto-negativo:", err);
        res.status(500).json({ message: "Internal server error" });
    }
})

router.post('/create', async (req, res) => {
    try {
        await feedbackController.createFeedback(req, res);
    } catch (err) {
        console.error("Error in POST /create:", err);
        res.status(500).json({ message: "Internal server error" });
    }
});

export default router;
