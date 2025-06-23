export interface Feedback {
    id: number;
    pedido_id: number;
    entrega: number;
    atendimento: number;
    preco: number;
    pontos_positivos_id: number[];
    pontos_negativos_id: number[];
}

export interface Pontos {
    id: number;
    descricao: string;
}