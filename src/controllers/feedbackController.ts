import { Request, Response } from "express";
import { FeedbackService } from "../services/FeedbackService";
import { Feedback } from "../types/feedback";

export class FeedbackController {
    private feedbackService: FeedbackService;

    constructor() {
        this.feedbackService = new FeedbackService();
    }

    async createFeedback(req: Request, res: Response): Promise<void> {
        try {
            const { pedido_id, entrega, atendimento, preco, pontos_positivos_id, pontos_negativos_id } : Feedback = req.body;
            const feedback = await this.feedbackService.createFeedback(pedido_id, entrega, atendimento, preco, pontos_positivos_id, pontos_negativos_id);
            
            if (feedback) {
                res.status(201).json({ message: "Feedback created successfully", feedback });
            } else {
                res.status(400).json({ message: "Failed to create feedback" });
            }
        } catch (error) {
            console.error("Error creating feedback:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    async getAllFeedbacks(req: Request, res: Response): Promise<void> {
        try {
            const feedbacks = await this.feedbackService.getAllFeedbacks();
            res.status(200).json(feedbacks);
        } catch (error) {
            console.error("Error fetching all feedbacks:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }
}