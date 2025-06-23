import { pool } from "../database/database";
import { PoolClient } from "pg";
import { Feedback, Pontos } from "../types/feedback";

export class FeedbackService {
    async createFeedback(pedido_id: number, entrega: number, atendimento: number, preco: number, pontos_positivos_id: number[], pontos_negativos_id: number[]): Promise<boolean> {
        let client: PoolClient | undefined;

        try {
            client = await pool.connect();
            await client.query('BEGIN');

            const feedbackQuery = `
                INSERT INTO feedback (pedido_id, entrega, atendimento, preco, fim_servico)
                VALUES ($1, $2, $3, $4, DATE_TRUNC('second', NOW()))
                RETURNING id;
            `;

            const values = [pedido_id, entrega, atendimento, preco]
            const resultFeedback = await pool.query(feedbackQuery, values)

            const idFeedback = resultFeedback.rows[0].id;

            if (Array.isArray(pontos_positivos_id) && pontos_positivos_id.length > 0) {
                const insertPositivo = pontos_positivos_id.map(ponto => pool.query(
                    'insert into feedback_positivo (feedback_id, pontos_positivos_id) values ($1, $2)',
                    [idFeedback, ponto]
                ))
                await Promise.all(insertPositivo);
            }

            if (Array.isArray(pontos_negativos_id) && pontos_negativos_id.length > 0) {
                const insertNegativo = pontos_negativos_id.map(ponto => pool.query(
                    'insert into feedback_negativo (feedback_id, pontos_negativos_id) values ($1, $2)',
                    [idFeedback, ponto]
                ))

                await Promise.all(insertNegativo)
            }

            await client.query("COMMIT")
            return true;

        } catch (err) {
            if (client) {
                await client.query('ROLLBACK')
            }

            console.error("Error in createFeedback:", err);
            return false; // Return null in case of error
        } finally {
            if (client) {
                client.release();
            }
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

    async getPontosPositivos(): Promise<Pontos[]> {
        try {
            const query = `
                select id, descricao from pontos_positivos
            `

            const result = await pool.query(query)
            return result.rows as Pontos[];
        } catch (err) {
            console.log("Error in getPontosPositivos", err)
            return [];
        }
    }

    async getPontosNegativos(): Promise<Pontos[]> {
        try {
            const query = `
                select id, descricao from pontos_negativos
            `

            const result = await pool.query(query)
            return result.rows as Pontos[];
        } catch (err) {
            console.log("Error in getPontosNegativos", err)
            return [];
        }
    }
}