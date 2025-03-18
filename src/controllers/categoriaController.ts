import { Response, Request } from "express";

import getCategories from "../services/categoria_query";

export const getAllCategorias = async (req: Request, res: Response) => {
    try {
        const categorias = await getCategories();
        res.status(200).json({ message: 'sucesso', data: categorias })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao buscar categorias" });
    }
}