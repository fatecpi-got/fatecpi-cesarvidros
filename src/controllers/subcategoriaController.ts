import { Request, Response } from "express";
import { SubProdutoService } from "../services/subProdutoService";

export class SubProdutoController {
    private subProdutoService: SubProdutoService;

    constructor() {
        this.subProdutoService = new SubProdutoService();
    }

    async getSubProdutos(req: Request, res: Response): Promise<void> {
        try {
            const subProdutos = await this.subProdutoService.getSubProdutos();
            res.status(200).json(subProdutos);
        } catch (error) {
            console.error("Error in getSubProdutos:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
}