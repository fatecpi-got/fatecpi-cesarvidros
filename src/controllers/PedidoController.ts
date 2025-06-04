import { Response, Request } from "express";
import { PedidoService } from "../services/PedidoService";

export class PedidoController {
  private pedidoService: PedidoService;

  constructor() {
    this.pedidoService = new PedidoService();
  }

  async updatePedidoStatus(req: Request, res: Response): Promise<void> {
    try {
      const { estado, id } = req.body;
      const updated = await this.pedidoService.updatePedidoStatus(parseInt(id), estado);
      if (updated) {
        res.status(200).json({ message: "Pedido status updated successfully" });
      } else {
        res.status(400).json({ message: "Failed to update pedido status" });
      }
    } catch (error) {
      console.error("Error updating pedido status:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async getPedidoByOrcamentoId(req: Request, res: Response): Promise<void> {
    try {
      const { orcamento_id } = req.body;
      const pedido = await this.pedidoService.getPedidoByOrcamentoId(orcamento_id);
      if (pedido) {
        res.status(200).json(pedido);
      } else {
        res.status(404).json({ message: "Pedido not found" });
      }
    } catch (error) {
      console.error("Error fetching pedido by orcamento_id:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async getAllPedidos(req: Request, res: Response): Promise<void> {
    try {
      const pedidos = await this.pedidoService.getAllPedidos();
      res.status(200).json(pedidos);
    } catch (error) {
      console.error("Error fetching all pedidos:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}