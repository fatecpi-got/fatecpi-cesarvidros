import { pool } from "../database/database";
import { Servico } from "../types/Servico";

const getServices = async (): Promise<Servico[]> => {
    try {
        const query = `
            SELECT 
                servico.id_servico, 
                servico.nome AS servico_nome, 
                servico.imagem_url, 
                servico.descricao, 
                categoria.nome AS categoria_nome, 
                sub_categoria.nome AS sub_categoria_nome
            FROM servico
            JOIN categoria ON servico.categoria_id = categoria.id_categoria
            LEFT JOIN sub_categoria ON servico.sub_categoria_id = sub_categoria.id_sub_categoria
            ORDER BY servico.id_servico;
        `;

        const servicos = await pool.query(query);
        return servicos.rows as Servico[];
    } catch (err) {
        console.error("Error in getServices:", err);
        return [];
    }
};

const getServicesBySubCategoriaId = async (sub_categoria_id: number): Promise<Servico[]> => {
    try {
        const query = `
            SELECT 
                servico.id_servico, 
                servico.nome AS nome, 
                servico.imagem_url, 
                servico.descricao, 
                categoria.nome AS categoria_nome, 
                sub_categoria.nome AS sub_categoria_nome
            FROM servico
            JOIN categoria ON servico.categoria_id = categoria.id_categoria
            LEFT JOIN sub_categoria ON servico.sub_categoria_id = sub_categoria.id_sub_categoria
            WHERE servico.sub_categoria_id = $1;
        `;

        const servicos = await pool.query(query, [sub_categoria_id]);
        return servicos.rows as Servico[];
    } catch (err) {
        console.error("Error in getServicesBySubCategoriaId:", err);
        return [];
    }
};

const getServicesByCategoriaId = async (categoria_id: number): Promise<Servico[]> => {
    console.log('category id')
    console.log(categoria_id)

    try {
        const query = `
            SELECT 
                servico.id_servico, 
                servico.nome AS servico_nome, 
                servico.imagem_url, 
                servico.descricao, 
                categoria.nome AS categoria_nome
            FROM servico
            JOIN categoria ON servico.categoria_id = categoria.id_categoria
            WHERE servico.categoria_id = $1;
        `;

        const servicos = await pool.query(query, [categoria_id]);
        return servicos.rows as Servico[];
    } catch (err) {
        console.error("Error in getServicesByCategoriaId:", err);
        return [];
    }
};

export { getServices, getServicesBySubCategoriaId, getServicesByCategoriaId };
