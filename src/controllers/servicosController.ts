import { Response, Request } from "express";
import { getServices, getServicesByCategoriaId, getServicesBySubCategoriaId } from "../services/servico_query";

export const getAllServices = async (req: Request, res: Response) => {
    try {
        const servicos = await getServices();
        res.status(200).json({ message: 'sucesso', data: servicos })
    } catch (error) {
        console.error(error)
        res.status(400).json({ message: 'Erro ao buscar serviços', data: error })
    }
}

export const getAllServicesBySubCategoriaId = async (req: Request, res: Response) => {
    const id: string = req.query.id as string;

    if (!id) {
        res.status(400).json({ message: "Falta o parâmetro id " });
        return;
    }

    const id_number: number = parseInt(id);

    try {
        const servicos = await getServicesBySubCategoriaId(id_number);

        res.status(200).json({ status: 'success', data: servicos })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao buscar serviços" });
    }
}

export const getAllServicesByCategoriaId = async (req: Request, res: Response) => {
    const id: string = req.query.id as string;
    if (!id) {
        res.status(400).json({ message: "Falta o parâmetro id " });
        return;
    }

    const id_number: number = parseInt(id);

    try {
        const servicos = await getServicesByCategoriaId(id_number);
        res.status(200).json({ status: 'success', data: servicos })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao buscar serviços" });
    }
}