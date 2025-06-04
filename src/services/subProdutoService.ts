import { pool } from "../database/database";
import { SubProduto } from "../types/subProduto";

export class SubProdutoService {
    async getSubProdutos(): Promise<SubProduto[]> {
        try {
            const query = `
            SELECT 
                sub_produto.id, 
                sub_produto.nome, 
                sub_produto.produto_id
            FROM sub_produto
            ORDER BY sub_produto.nome;
        `;

            const result = await pool.query<SubProduto>(query);
            return result.rows as SubProduto[];
        } catch (err) {
            console.error("Error in getSubProdutos:", err);
            return [];
        }
    };
}