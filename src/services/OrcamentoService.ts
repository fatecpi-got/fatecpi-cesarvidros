import { pool } from "../database/database";
import { Orcamento } from "../types/orcamento";

export class OrcamentoService {
    async createOrcamento(usuario_id: number): Promise<number> {
        try {
            const query = `
                INSERT INTO orcamento (criado_em, usuario_id)
                VALUES (NOW(), $1)
                RETURNING id
            `;

            const values = [usuario_id];
            const result = await pool.query(query, values);

            if (result.rows.length > 0) {
                const orcamentoId = result.rows[0].id;
                return orcamentoId; // Return the ID of the created orcamento
            } else {
                return -1; // Return -1 if no rows were inserted
            }

        } catch (err) {
            console.error("Error in createOrcamento:", err);
            return -1; // Return -1 in case of error
        }
    }

    async updateOrcamentoStatus(orcamento_id: number, status: string): Promise<boolean> {
        try {
            const query = `
                UPDATE orcamento
                SET status = $1
                WHERE id = $2
            `;

            const values = [status, orcamento_id];
            const result = await pool.query(query, values);

            if (result.rowCount !== null && result.rowCount > 0) {
                return true; // Return true if the update was successful
            } else {
                return false; // Return false if no rows were updated
            }
        } catch (err) {
            console.error("Error in updateOrcamentoStatus:", err);
            return false; // Return false in case of error
        }
    }

    async getOrcamentoByUserId(usuario_id: number): Promise<Orcamento[] | null> {
        try {
            const query = `
                SELECT orcamento.id as orcamento_id, criado_em, status, usuario.nome, usuario.cep, usuario.numero_telefone FROM orcamento join usuario on  usuario.id = orcamento.usuario_id
                WHERE usuario_id = $1 AND status = 'em andamento'
                ORDER BY criado_em DESC;
            `;

            const values = [usuario_id];
            const result = await pool.query(query, values);

            if (result.rows.length > 0) {
                return result.rows;
            } else {
                return null; // Return null if no orcamento was found
            }
        } catch (err) {
            console.error("Error in getOrcamentoByUserId:", err);
            return null; // Return null in case of error
        }
    }

    async getAllOrcamentos(): Promise<Orcamento[] | null> {
        try {
            const query = `
                SELECT * FROM orcamento
                ORDER BY criado_em DESC
            `;

            const result = await pool.query(query);

            if (result.rows.length > 0) {
                return result.rows as Orcamento[]; // Return all orcamentos found
            } else {
                return null; // Return null if no orcamentos were found
            }
        } catch (err) {
            console.error("Error in getAllOrcamentos:", err);
            return null; // Return null in case of error
        }
    }
    
}