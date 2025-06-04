import { Response, Request } from "express";
import { ServicoService } from "../services/servicoService";

export class ServicosController {
    private servicoService: ServicoService;

    constructor() {
        this.servicoService = new ServicoService();
    }

    async createServico(req: Request, res: Response): Promise<Response> {
        const { cor_vidro, largura, altura, fechadura, cor_aluminio, puxador, sub_produto_id, usuario_id } = req.body;

        try {
            const createdServico = await this.servicoService.createServico(cor_vidro, largura, altura, fechadura, cor_aluminio, puxador, sub_produto_id, usuario_id);
            if (createdServico) {
                return res.status(201).json(createdServico);
            } else {
                return res.status(400).json({ message: "Failed to create servico" });
            }
        } catch (error) {
            console.error("Error creating servico:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    async updateServicoStatus(req: Request, res: Response): Promise<Response> {
        const { id, estado } = req.body;

        if (!id || !estado) {
            return res.status(400).json({ message: "ID and estado are required" });
        }

        try {
            const updated = await this.servicoService.updateServicoStatus(id, estado);
            if (updated) {
                return res.status(200).json({ message: "Servico status updated successfully" });
            } else {
                return res.status(400).json({ message: "Failed to update servico status" });
            }
        } catch (error) {
            console.error("Error updating servico status:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    async updateCostAndPrice(req: Request, res: Response): Promise<Response> {
        const { id, custo, preco } = req.body;

        if (!id || custo === undefined || preco === undefined) {
            return res.status(400).json({ message: "ID, custo, and preco are required" });
        }

        try {
            const updated = await this.servicoService.updateCostAndPrice(id, preco, custo);
            if (updated) {
                return res.status(200).json({ message: "Servico cost and price updated successfully" });
            } else {
                return res.status(400).json({ message: "Failed to update servico cost and price" });
            }
        } catch (error) {
            console.error("Error updating servico cost and price:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    async getAllServicos(req: Request, res: Response): Promise<Response> {
        try {
            const servicos = await this.servicoService.getAllServicos();
            return res.status(200).json(servicos);
        } catch (error) {
            console.error("Error fetching servicos:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    async getServicoByUserId(req: Request, res: Response): Promise<Response> {
        const { usuario_id } = req.body;

        if (!usuario_id) {
            return res.status(400).json({ message: "User ID is required" });
        }

        try {
            const servicos = await this.servicoService.getServicoByUserId(Number(usuario_id));
            return res.status(200).json(servicos);
        } catch (error) {
            console.error("Error fetching servicos by user ID:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
}