import { pool } from "../database/database";
import { SubCategoria } from "../types/SubCategoria";

interface SubCategoriaRequest {
    sub_categorias: SubCategoria[];
}

const getSubCategoria = async (): Promise<SubCategoria[]> => {
    try {
        const query = `
select categoria.id_categoria, categoria.nome as categoria_nome, json_agg(json_build_object('id_sub', sub_categoria.id_sub_categoria, 'nome', sub_categoria.nome)) as sub_categorias from categoria left join sub_categoria on categoria.id_categoria = sub_categoria.categoria_id group by categoria.id_categoria;
        `
        const subcategoria = await pool.query(query);
        const sub = subcategoria.rows.map((item: SubCategoriaRequest) => item.sub_categorias);
         
        const flattenedSub = sub.flat();
        
        const objectItem = flattenedSub.map((i: Pick<SubCategoria, 'id_sub_categoria' | 'nome'>) => i);
        
        const filteredNullObjects = objectItem.filter((i: Pick<SubCategoria, 'id_sub_categoria' | 'nome'>) => i.id_sub_categoria !== null); 
        return filteredNullObjects;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export default getSubCategoria;