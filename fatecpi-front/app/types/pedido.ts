export interface Pedido {
    pedido_id: number;
    pedido_estado: string;
    pedido_data_criacao: Date;
    orcamento_id: number;
    produzido_em: Date | null;
    finalizado_em: Date | null;
}

interface Servicos {
    servico_id: number;
    custo: number;
    preco: number;
    cor_vidro: string;
    largura: number;
    altura: number;
    cor_aluminio: string;
    fechadura: string;
    puxador: string;
    produto: string;
}

export interface PedidoResponse {
	pedido_id: number,
    status_pedido: string,
	pedido_data_inicio: Date,
	pedido_data_producao: Date | null,
	pedido_data_finalizacao: Date | null,
	orcamento_id: number,
    servicos: Servicos[],
	nome_usuario: string,
	numero_telefone: string | null,
    feedback_fim_servico: Date | null
}