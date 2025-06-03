import { pool } from "../database/database";
import { Pedido } from "../types/pedido";

export class PedidoService {
    async createPedido(pedido: Pedido): Promise<Pedido | null> {
        try {
            const query = `
                INSERT INTO pedido (criado_em, produzido_em, finalizado_em, orcamento_id)
            `;

            const values = [pedido.criado_em, pedido.produzido_em, pedido.finalizado_em, pedido.orcamento_id];

            const result = await pool.query(query, values);
            if (result.rows.length > 0) {
                return pedido; // Return the created pedido object
            } else {
                return null; // No rows were inserted
            }
        } catch (err) {
            console.error("Error in createPedido:", err);
            return null; // Return null in case of error
        }
    }
}