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

            if (status === "produzido") {
                query = `
                UPDATE pedido
                SET produzido_em = DATE_TRUNC('second', NOW()), finalizado_em = NULL, estado = $2
                WHERE id = $1
            `;
            } else if (status === "finalizado") {
                query = `
                UPDATE pedido
                SET finalizado_em = DATE_TRUNC('second', NOW()), estado = $2
                WHERE id = $1
            `;
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
                select pedido.id as pedido_id, pedido.estado as pedido_estado, pedido.criado_em as pedido_data_criacao, pedido.orcamento_id as orcamento_id, pedido.produzido_em, pedido.finalizado_em from pedido;
            `;

            const result = await pool.query(query);
            return result.rows;
        } catch (err) {
            console.error("Error in getAllPedidos:", err);
            return []; // Return an empty array in case of error
        }
    }

    async getPedidoByUserId(usuario_id: number): Promise<Pedido[] | null> {
        try {
            const query = `
                select 
                pedido.id as pedido_id,
                pedido.estado as status_pedido,
                pedido.criado_em as pedido_data_inicio,
                pedido.produzido_em as pedido_data_producao,
                pedido.finalizado_em as pedido_data_finalizacao,
                orcamento.id as orcamento_id,
                usuario.nome as nome_usuario,
                usuario.numero_telefone,
                json_agg(
                json_build_object(
                    'servico_id', servico.id,
                    'custo', servico.custo,
                    'preco', servico.preco,
                    'cor_vidro', servico.cor_vidro,
                    'largura', servico.largura,
                    'altura', servico.altura,
                    'cor_aluminio', servico.cor_aluminio,
                    'fechadura', servico.fechadura,
                    'puxador', servico.puxador,
                    'produto', sub_produto.nome
                )
                ) as servicos
                from pedido
                join orcamento on pedido.orcamento_id = orcamento.id
                join servico on servico.orcamento_id = orcamento.id
                join sub_produto on servico.sub_produto_id = sub_produto.id
                join usuario on orcamento.usuario_id = usuario.id
                where usuario.id = $1
                group by pedido.id, pedido.estado, pedido.criado_em, pedido.produzido_em, pedido.finalizado_em, orcamento.id, usuario.nome, usuario.numero_telefone;
            `;

            const values = [usuario_id];
            const result = await pool.query(query, values);
            if ((result.rowCount ?? 0) > 0) {
                return result.rows;
            } else {
                return null;
            }
        } catch (err) {
            console.error("Error in getPedidoByUserId:", err);
            return []; // Return an empty array in case of error
        }
    }

    async getPedidoById(pedido_id: number): Promise<Pedido | null> {
        try {
            const query = `
                select 
                pedido.id as pedido_id,
                pedido.estado as status_pedido,
                pedido.criado_em as pedido_data_inicio,
                pedido.produzido_em as pedido_data_producao,
                pedido.finalizado_em as pedido_data_finalizacao,
                orcamento.id as orcamento_id,
                usuario.nome as nome_usuario,
                usuario.numero_telefone,
                json_agg(
                    json_build_object(
                    'servico_id', servico.id,
                    'custo', servico.custo,
                    'preco', servico.preco,
                    'cor_vidro', servico.cor_vidro,
                    'largura', servico.largura,
                    'altura', servico.altura,
                    'cor_aluminio', servico.cor_aluminio,
                    'fechadura', servico.fechadura,
                    'puxador', servico.puxador,
                    'produto', sub_produto.nome
                    )
                ) as servicos
                from pedido
                join orcamento on pedido.orcamento_id = orcamento.id
                join servico on servico.orcamento_id = orcamento.id
                join sub_produto on servico.sub_produto_id = sub_produto.id
                join usuario on orcamento.usuario_id = usuario.id
                where pedido.id = $1
                group by pedido.id, pedido.estado, pedido.criado_em, pedido.produzido_em, pedido.finalizado_em, orcamento.id, usuario.nome, usuario.numero_telefone;

            `;

            const values = [pedido_id];
            const result = await pool.query(query, values);
            if (result.rows.length > 0) {
                return result.rows[0];
            } else {
                return null;
            }
        } catch (err) {
            console.error("Error in getPedidoById:", err);
            return null;
        }
    }
}