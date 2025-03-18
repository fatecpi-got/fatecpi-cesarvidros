import { Request, Response } from "express";
import getSubCategoria from "../services/subcategoria_query";

export const getAllSubcategorias = async (req: Request, res: Response) => {
    try {
        const subcategorias = await getSubCategoria();
        res.status(200).json({ message: 'sucesso', data: subcategorias })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao buscar subcategorias" });
    }
}