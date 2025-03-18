export interface Servico {
    id_servico: number;
    nome: string;
    imagem_url: string;
    descricao: string;
    categoria_nome: string;
    sub_categoria_nome: string | null;
}