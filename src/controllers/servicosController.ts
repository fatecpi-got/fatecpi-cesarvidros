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
        const { servicos , usuario_id } = req.body;

        try {
            const createdServico = await this.servicoService.createServicos(servicos, usuario_id);
            if (createdServico) {
                return res.status(201).json({createdServico, message: "Orcamento enviado com sucesso!"});
            } else {
                return res.status(400).json({ message: "Failed to create servico" });
            }
        } catch (error) {
            console.error("Error creating servico:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    async updateServicoStatus(req: Request, res: Response): Promise<Response> {
        const { servico_id, novo_status } = req.body;

        if (!servico_id || !novo_status) {
            return res.status(400).json({ message: "ID and estado are required" });
        }

        try {
            const updated = await this.servicoService.updateServicoStatus(servico_id, novo_status);
            if (updated) {
                if (novo_status === "aceito") {
                    const servico = await this.servicoService.getServicoById(servico_id);
                    if (servico) {
                        const pedido = await this.pedidoService.createPedido(servico.orcamento_id);
                        const orcamento = await this.orcamentoService.updateOrcamentoStatus(servico.orcamento_id, "finalizado");
                        if (pedido) {
                            return res.status(200).json({ message: "Servico status updated and Pedido created successfully", pedido, orcamento });
                        } else {
                            return res.status(400).json({ message: "Servico status updated but failed to create Pedido" });
                        }
                    }
                } else {
                    // Status updated but not "aceito"
                    return res.status(200).json({ message: "Servico status updated successfully" });
                }
            }
            return res.status(400).json({ message: "Failed to update servico status" });
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
        const { orcamento_id } = req.body;

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