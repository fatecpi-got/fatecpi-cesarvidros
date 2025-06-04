import { pool } from "../database/database";
import { Feedback } from "../types/feedback";

export class FeedbackService {
    async createFeedback(pedido_id: number, fim_servico: Date, entrega: number, atendimento: number, preco: number): Promise<Feedback | null> {
        try {
            const query = `
                INSERT INTO feedback (pedido_id, fim_servico, entrega, atendimento, preco)
            `;

            const values = [pedido_id, fim_servico, entrega, atendimento, preco];
            const result = await pool.query(query, values);
            if (result.rows.length > 0) {
                return result.rows[0]; // Return the inserted row
            } else {
                return null; // No rows were inserted
            }
        } catch (err) {
            console.error("Error in createFeedback:", err);
            return null; // Return null in case of error
        }
    }

    async getAllFeedbacks(): Promise<Feedback[]> {
        try {
            const query = `
                SELECT * FROM feedback
                ORDER BY pedido_id DESC
            `;

            const result = await pool.query(query);
            return result.rows as Feedback[]; // Return all feedbacks
        } catch (err) {
            console.error("Error in getAllFeedbacks:", err);
            return []; // Return an empty array in case of error
        }
    }
}