import { pool } from "../database/database";
import { Feedback } from "../types/feedback";

export class FeedbackService {
    async createFeedback(feedback: Feedback): Promise<Feedback | null> {
        try {
            const query = `
                INSERT INTO feedback (pedido_id, fim_servico, entrega, atendimento, preco)
            `;

            const values = [feedback.pedido_id, feedback.fim_servico, feedback.entrega, feedback.atendimento, feedback.preco];
            const result = await pool.query(query, values);
            if (result.rows.length > 0) {
                return feedback; // Return the created feedback object
            } else {
                return null; // No rows were inserted
            }
        } catch (err) {
            console.error("Error in createFeedback:", err);
            return null; // Return null in case of error
        }
    }
}