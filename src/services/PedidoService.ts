import { pool } from "../database/database";
import { Pedido } from "../types/pedido";

export class PedidoService {
    async createPedido(orcamento_id: number): Promise<Pedido | null> {
        try {
            const query = `
                INSERT INTO pedido (criado_em, produzido_em, finalizado_em, orcamento_id)
                VALUES (NOW(), null, null, $1)
                RETURNING *
            `;

            const values = [orcamento_id];

            const result = await pool.query<Pedido>(query, values);
            if (result.rows.length > 0) {
                return result.rows[0]; // Return the inserted row
            } else {
                return null; // No rows were inserted
            }
        } catch (err) {
            console.error("Error in createPedido:", err);
            return null; // Return null in case of error
        }
    }

    async updatePedidoStatus(pedido_id: number, status: string): Promise<boolean> {
        try {
            let query = '';

            if (status === "produzido") { // Using strict equality
                query = `
                UPDATE pedido
                SET produzido_em = NOW(), finalizado_em = NULL, estado = $2
                WHERE id = $1
            `;
            } else if (status === "finalizado") { // Using strict equality
                query = `
                UPDATE pedido
                SET finalizado_em = NOW(), estado = $2
                WHERE id = $1
            `;
            } else {
                console.error("Invalid status provided for updatePedidoStatus:", status);
                return false; // Handle unknown status
            }

            // Corrected order of values: [pedido_id, status]
            const values = [pedido_id, status];
            const result = await pool.query(query, values);

            return (result.rowCount ?? 0) > 0; // Return true if the update was successful
        } catch (err) {
            console.error(`Error in updatePedidoStatus for pedido_id: ${pedido_id}, status: ${status}:`, err);
            return false; // Return false in case of error
        }
    }

    async getPedidoByOrcamentoId(orcamento_id: number): Promise<Pedido | null> {
        try {
            const query = `
                select pedido.id as pedido_id, orcamento.id as orcamento_id, pedido.criado_em as pedido_criado_em, usuario.nome, usuario.numero_telefone, usuario.email from pedido join orcamento on pedido.orcamento_id = orcamento.id join usuario on orcamento.usuario_id = usuario.id where pedido.orcamento_id = $1 order by pedido.criado_em desc;
            `;

            const values = [orcamento_id];
            const result = await pool.query(query, values);

            if (result.rows.length > 0) {
                return result.rows[0] as Pedido; // Return the first pedido found
            } else {
                return null; // No pedidos found
            }
        } catch (err) {
            console.error("Error in getPedidoByOrcamentoId:", err);
            return null; // Return null in case of error
        }
    }

    async getAllPedidos(): Promise<Pedido[]> {
        try {
            const query = `
                select pedido.id as pedido_id, pedido.criado_em as pedido_criado_em, usuario.nome, usuario.numero_telefone, usuario.email from pedido join orcamento on pedido.orcamento_id = orcamento.id join usuario on orcamento.usuario_id = usuario.id order by pedido.criado_em desc;
            `;

            const result = await pool.query(query);
            return result.rows;
        } catch (err) {
            console.error("Error in getAllPedidos:", err);
            return []; // Return an empty array in case of error
        }
    }
}