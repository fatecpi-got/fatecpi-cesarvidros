import { Request, Response } from "express";
import { SubProdutoService } from "../services/subProdutoService";

export class SubProdutoController {
    private subProdutoService: SubProdutoService;

    constructor() {
        this.subProdutoService = new SubProdutoService();
    }

    async getSubProdutos(req: Request, res: Response): Promise<Response> {
        try {
            const subProdutos = await this.subProdutoService.getSubProdutos();
            return res.status(200).json(subProdutos);
        } catch (error) {
            console.error("Error in getSubProdutos:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    }
}