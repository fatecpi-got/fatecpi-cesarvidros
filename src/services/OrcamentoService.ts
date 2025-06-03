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

    async updateOrcamentoStatus(orcamento: Orcamento): Promise<boolean> {
        try {
            const query = `
                UPDATE orcamento
                SET status = $1
                WHERE id = $2
            `;

            const values = [orcamento.status, orcamento.id];
            const result = await pool.query(query, values);

            return result.rows.length > 0; // Return true if the update was successful
        } catch (err) {
            console.error("Error in updateOrcamentoStatus:", err);
            return false; // Return false in case of error
        }
    }
}