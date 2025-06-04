import { pool } from "../database/database";
import { Servico } from "../types/servico";

import { OrcamentoService } from "./OrcamentoService";

export class ServicoService {
    private orcamentoService: OrcamentoService;

    constructor() {
        this.orcamentoService = new OrcamentoService();
    }

    async createServico(cor_vidro: string, largura: number, altura: number, fechadura: number, cor_aluminio: string, puxador: string, sub_produto_id: number, usuario_id: number): Promise<Servico | null> {
        try {
            const query = `
                INSERT INTO servico (cor_vidro, largura, altura, fechadura, cor_aluminio, puxador, sub_produto_id, orcamento_id, status)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 'em andamento')
                RETURNING *
            `;

            const orcamento_id = await this.orcamentoService.createOrcamento(usuario_id);

            const values = [cor_vidro, largura, altura, fechadura, cor_aluminio, puxador, sub_produto_id, orcamento_id];

            const result = await pool.query<Servico>(query, values);
            if (result.rows.length > 0) {
                return result.rows[0]; // Return the created servico
            } else {
                return null; // No rows were inserted
            }
        } catch (err) {
            console.error("Error in createServico:", err);
            return null; // Return null in case of error
        }
    }

    async updateServicoStatus(servico_id: number, novo_status: string): Promise<boolean> {
        try {
            const query = `
                UPDATE servico
                SET status = $1,
                WHERE id = $2
            `;

            const values = [novo_status, servico_id];
            const result = await pool.query(query, values);

            return (result.rowCount ?? 0) > 0; // Return true if the update was successful
        } catch (err) {
            console.error("Error in updateServicoStatus:", err);
            return false; // Return false in case of error
        }
    }

    async updateCostAndPrice(servico_id: number, preco: number, custo: number): Promise<boolean> {
        try {
            const query = `
                UPDATE servico
                SET custo = $1, preco = $2
                WHERE id = $3
            `;

            const values = [custo, preco, servico_id];
            const result = await pool.query(query, values);

            return (result.rowCount ?? 0) > 0; // Return true if the update was successful
        } catch (err) {
            console.error("Error in updateCostAndPrice:", err);
            return false; // Return false in case of error
        }
    }
    
    async getAllServicos(): Promise<Servico[]> {
        try {
            const query = `
                SELECT * FROM servico
            `;

            const result = await pool.query<Servico>(query);
            return result.rows as Servico[]; // Return all servicos
        } catch (err) {
            console.error("Error in getAllServicos:", err);
            return []; // Return an empty array in case of error
        }
    }

    async getServicoByUserId(usuario_id: number): Promise<Servico[]> {
        try {
            const query = `
                SELECT * FROM servico
                WHERE usuario_id = $1
            `;

            const values = [usuario_id];
            const result = await pool.query<Servico>(query, values);
            return result.rows as Servico[]; // Return servicos for the user
        } catch (err) {
            console.error("Error in getServicoByUserId:", err);
            return []; // Return an empty array in case of error
        }
    }
}
