export interface Pedido {
    id: number;
    estado: string;
    criado_em: Date;
    produzido_em: Date | null;
    finalizado_em: Date | null;
    orcamento_id: number;
}