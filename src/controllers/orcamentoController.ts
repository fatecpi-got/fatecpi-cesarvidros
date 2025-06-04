import { Response, Request } from "express";
import { OrcamentoService } from "../services/OrcamentoService";

export class OrcamentoController {
    private orcamentoService: OrcamentoService;

    constructor() {
        this.orcamentoService = new OrcamentoService();
    }

    async createOrcamento(req: Request, res: Response): Promise<void> {
        try {
            const { usuario_id } = req.body;
            const orcamentoId = await this.orcamentoService.createOrcamento(usuario_id);
            if (orcamentoId !== -1) {
                res.status(201).json({ message: "Orcamento created successfully", id: orcamentoId });
            } else {
                res.status(400).json({ message: "Failed to create orcamento" });
            }
        } catch (error) {
            console.error("Error creating orcamento:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    async updateOrcamentoStatus(req: Request, res: Response): Promise<void> {
        try {
            const { orcamento_id, status } = req.body;
            const updated = await this.orcamentoService.updateOrcamentoStatus(orcamento_id, status);
            if (updated) {
                res.status(200).json({ message: "Orcamento status updated successfully" });
            } else {
                res.status(400).json({ message: "Failed to update orcamento status" });
            }
        } catch (error) {
            console.error("Error updating orcamento status:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    async getOrcamentoByUserId(req: Request, res: Response): Promise<void> {
        try {
            const { usuario_id } = req.body;
            const orcamento = await this.orcamentoService.getOrcamentoByUserId(usuario_id);
            if (orcamento) {
                res.status(200).json(orcamento);
            } else {
                res.status(404).json({ message: "Orcamento not found" });
            }
        } catch (error) {
            console.error("Error fetching orcamento by user_id:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    async getAllOrcamentos(req: Request, res: Response): Promise<void> {
        try {
            const orcamentos = await this.orcamentoService.getAllOrcamentos();
            res.status(200).json(orcamentos);
        } catch (error) {
            console.error("Error fetching all orcamentos:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }
}