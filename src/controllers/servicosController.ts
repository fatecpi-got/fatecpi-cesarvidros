import { Response, Request } from "express";
import { ServicoService } from "../services/servicoService";
import { PedidoService } from "../services/PedidoService";
import { OrcamentoService } from "../services/OrcamentoService";

export class ServicosController {
    private servicoService: ServicoService;
    private pedidoService: PedidoService;
    private orcamentoService: OrcamentoService;

    constructor() {
        this.servicoService = new ServicoService();
        this.pedidoService = new PedidoService();
        this.orcamentoService = new OrcamentoService();
    }

    async createServico(req: Request, res: Response): Promise<Response> {
        const { servicos, usuario_id } = req.body;

        try {
            const createdServico = await this.servicoService.createServicos(servicos, usuario_id);
            if (createdServico) {
                return res.status(201).json({ createdServico, message: "Orcamento enviado com sucesso!" });
            } else {
                return res.status(400).json({ message: "Failed to create servico" });
            }
        } catch (error) {
            console.error("Error creating servico:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    async updateServicoStatus(req: Request, res: Response): Promise<Response> {
        const servicos: { servico_id: number; orcamento_id: number; novo_status: string }[] = req.body;

        if (!Array.isArray(servicos) || servicos.length === 0) {
            return res.status(400).json({ message: "Body must be an array of { servico_id, orcamento_id, novo_status }" });
        }

        // Verifica cada elemento do array
        for (const s of servicos) {
            if (!s.servico_id || !s.novo_status) {
                return res.status(400).json({ message: "Each item must have servico_id and novo_status" });
            }
        }

        try {
            const updated = await this.servicoService.updateServicoStatus(servicos);
            if (updated) {
                const results = [];
                for (const s of servicos) {
                    if (s.novo_status === "aceito") {
                        const servico = await this.servicoService.getServicoById(s.servico_id);
                        if (servico) {
                            const pedido = await this.pedidoService.createPedido(servico.orcamento_id);
                            console.log("Pedido created:", pedido);
                            const orcamento = await this.orcamentoService.updateOrcamentoStatus(servico.orcamento_id, "finalizado");
                            results.push({
                                servico_id: s.servico_id,
                                message: pedido ? "Servico status updated and Pedido created successfully" : "Servico status updated but failed to create Pedido",
                                pedido,
                                orcamento
                            });
                            continue;
                        }
                    }
                    results.push({ servico_id: s.servico_id, message: "Servico status updated successfully" });
                }
                return res.status(200).json(results);
            }

            return res.status(400).json({ message: "Failed to update servico status", data: updated });

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
        try {
            const usuario_id = req.params.usuario_id;
            const servicos = await this.servicoService.getServicoByUserId(Number(usuario_id));
            return res.status(200).json(servicos);
        } catch (error) {
            console.error("Error fetching servicos by user ID:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    async getServicoByOrcamentoId(req: Request, res: Response): Promise<Response> {
        const orcamento_id = req.params.orcamento_id;

        if (!orcamento_id) {
            return res.status(400).json({ message: "Orcamento ID is required" });
        }

        try {
            const servico = await this.servicoService.getServicoByOrcamentoId(Number(orcamento_id));
            if (servico) {
                return res.status(200).json(servico);
            } else {
                return res.status(404).json({ message: "Servico not found for the given Orcamento ID" });
            }
        } catch (error) {
            console.error("Error fetching servico by Orcamento ID:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
}