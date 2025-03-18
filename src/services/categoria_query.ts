import { pool } from "../database/database";
import { Categoria } from "../types/Categoria";

const getCategories = async (): Promise<Categoria[]> => {
    try {
        const categorias = await pool.query("SELECT * FROM categoria;");
        return categorias.rows;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export default getCategories;