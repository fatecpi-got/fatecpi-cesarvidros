import { pool } from "../database/database";
import { OrcamentoService } from "./OrcamentoService";

export interface Servico {
    id: number;
    custo: number;
    preco: number;
    cor_vidro: string;
    largura: number;
    altura: number;
    fechadura: string;
    cor_aluminio: string;
    puxador: string;
    estado: string;
    sub_produto_id: number;
    orcamento_id: number;
}

interface updateServicoDTO {
    servico_id: number,
    orcamento_id: number,
    novo_status: string
}

interface CreateServicoDTO {
    cor_vidro: string;
    largura: number;
    altura: number;
    fechadura: string;
    cor_aluminio: string;
    puxador: string;
    sub_produto_id: number;
};

export class ServicoService {
    private orcamentoService: OrcamentoService;

    constructor() {
        this.orcamentoService = new OrcamentoService();
    }

    async createServicos(
        servicos: CreateServicoDTO[],
        usuario_id: number
    ): Promise<Servico[] | null> {

        // Validação básica
        if (!usuario_id || !Array.isArray(servicos) || servicos.length === 0) {
            console.error("Parâmetros inválidos para createServicos");
            return null;
        }

        // Checa se todos os objetos do array têm os parâmetros obrigatórios
        for (const servico of servicos) {
            if (
                !servico.cor_vidro ||
                !servico.largura ||
                !servico.altura ||
                !servico.fechadura ||
                !servico.cor_aluminio ||
                !servico.puxador ||
                !servico.sub_produto_id
            ) {
                console.error("Objeto de serviço com parâmetros faltando:", servico);
                return null;
            }
        }

        try {
            // Cria o orçamento só uma vez para todos os serviços
            const orcamento_id = await this.orcamentoService.createOrcamento(usuario_id);

            const results: Servico[] = [];

            for (const servico of servicos) {
                const query = `
                    INSERT INTO servico (cor_vidro, largura, altura, fechadura, cor_aluminio, puxador, sub_produto_id, orcamento_id, estado)
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 'em andamento')
                    RETURNING *
                    `;
                const values = [
                    servico.cor_vidro,
                    servico.largura,
                    servico.altura,
                    servico.fechadura,
                    servico.cor_aluminio,
                    servico.puxador,
                    servico.sub_produto_id,
                    orcamento_id,
                ];

                const result = await pool.query<Servico>(query, values);
                if (result.rows.length > 0) {
                    results.push(result.rows[0]);
                }
            }

            return results.length > 0 ? results : null;
        } catch (err) {
            console.error("Erro em createServicos:", err);
            return null;
        }
    }

    async updateServicoStatus(servicos: updateServicoDTO[]): Promise<boolean> {
        try {
            let updates = 0;

            for (const servico of servicos) {
                const query = `
                UPDATE servico
                SET estado = $1
                WHERE id = $2
            `;

                const values = [servico.novo_status, servico.servico_id];
                const result = await pool.query(query, values);

                console.log('\n rows counts')
                console.log(result.rowCount);

                if ((result.rowCount ?? 0) > 0) {
                    await this.orcamentoService.updateOrcamentoStatus(servico.orcamento_id, 'finalizado');
                    updates++;
                }
            }

            return updates > 0;
        } catch (err) {
            console.error("Error in updateServicoStatus:", err);
            return false;
        }
    }


    async updateCostAndPrice(servico_id: number, preco: number, custo: number): Promise<boolean> {
        try {
            const query = `
                UPDATE servico
                SET custo = $1, preco = $2, estado = 'devolvido'
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
                select servico.id, servico.cor_vidro, servico.preco, servico.custo, servico.cor_aluminio, servico.altura, servico.largura, servico.fechadura, servico.puxador, servico.estado, servico.orcamento_id, sub_produto.nome as produto, usuario.nome as nome_usuario, usuario.numero_telefone, usuario.cep from servico 
                join sub_produto on sub_produto.id = servico.sub_produto_id
                join orcamento on servico.orcamento_id = orcamento.id
                join usuario on orcamento.usuario_id = usuario.id
                order by servico.orcamento_id, servico.id;
            `;

            const result = await pool.query(query);
            return result.rows as Servico[]; // Return all servicos
        } catch (err) {
            console.error("Error in getAllServicos:", err);
            return []; // Return an empty array in case of error
        }
    }

    async getServicoByUserId(usuario_id: number): Promise<Servico[]> {
        try {
            const query = `
                select servico.id, servico.cor_vidro, servico.cor_aluminio, servico.altura, servico.largura, servico.fechadura, servico.preco, servico.puxador, servico.estado, sub_produto.nome as produto, orcamento.usuario_id from servico 
                join sub_produto on servico.sub_produto_id = sub_produto.id
                join orcamento on servico.orcamento_id = orcamento.id
                where orcamento.usuario_id = $1;
            `;

            const values = [usuario_id];
            const result = await pool.query<Servico>(query, values);
            return result.rows as Servico[]; // Return servicos for the user
        } catch (err) {
            console.error("Error in getServicoByUserId:", err);
            return []; // Return an empty array in case of error
        }
    }

    async getServicoById(servico_id: number): Promise<Servico | null> {
        try {
            const query = `
                SELECT * FROM servico
                WHERE id = $1
            `;

            const values = [servico_id];
            const result = await pool.query<Servico>(query, values);

            if (result.rows.length > 0) {
                return result.rows[0]; // Return the servico found
            } else {
                return null; // No servico found
            }
        } catch (err) {
            console.error("Error in getServicoById:", err);
            return null; // Return null in case of error
        }
    }

    async getServicoByOrcamentoId(orcamento_id: number): Promise<Servico[] | null> {
        try {
            const query = `
                select servico.id, servico.cor_vidro, servico.cor_aluminio, servico.altura, servico.largura, servico.fechadura, servico.puxador, servico.estado, servico.preco, sub_produto.nome as produto from servico
                join sub_produto on servico.sub_produto_id = sub_produto.id 
                join orcamento on servico.orcamento_id = orcamento.id
                where servico.orcamento_id = $1;
            `;

            const values = [orcamento_id];
            const result = await pool.query<Servico>(query, values);

            if (result.rows.length > 0) {
                return result.rows; // Return the servico found
            } else {
                return null; // No servico found
            }
        } catch (err) {
            console.error("Error in getServicoByOrcamentoId:", err);
            return null; // Return null in case of error
        }
    }
}
