import { UpdatePriceCost } from "@/app/api/admin/UpdatePriceAndCost";

import "./modal.css";

import { API_URL } from "@/utils/env";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const updatePriceCostSchema = z.object({
  preco: z.number(),
  custo: z.number(),
});

type UpdatePriceCostData = z.infer<typeof updatePriceCostSchema>;

interface ModalProps {
  id: number;
  cor_vidro: string;
  largura: number;
  altura: number;
  fechadura: string;
  cor_aluminio: string;
  puxador: string;
  cep: string;
  produto: string;
  onClose: () => void;
  onActionComplete: () => void; // Optional callback for action completion
}

export default function Modal({
  id,
  cor_vidro,
  largura,
  altura,
  fechadura,
  cor_aluminio,
  puxador,
  cep,
  produto,
  onClose,
  onActionComplete, // Optional callback for action completion
}: ModalProps) {
  const form = useForm<UpdatePriceCostData>({
    resolver: zodResolver(updatePriceCostSchema),
  });

  const handleUpdate = async (data: UpdatePriceCostData) => {
    try {
      const res = await UpdatePriceCost(
        id,
        data.preco,
        data.custo,
        `${API_URL}/api/servico/update-cost-price`
      );

      await res.json();
      onActionComplete?.(); // Call the optional callback if provided
      onClose();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="modal">
      <div className="modal-body">
        <div className="article-modal">
          <div className="article-header-modal">
            <div>Service ID: {id}</div>
            <div className="close" onClick={() => onClose()}>
              &times;
            </div>
          </div>
          <div className="article-body-modal">
            <div className="left">
              <div className="article-body-item">
                <span className="span-title">Produto: </span>
                <span className="span-atributo">{produto}</span>
              </div>

              <div className="article-body-item">
                <span className="span-title">CEP do cliente</span>
                <span className="span-atributo">{cep}</span>
              </div>
              <div className="article-body-item">
                <span className="span-title">Cor do vidro</span>
                <span className="span-atributo">{cor_vidro}</span>
              </div>
              <div className="article-body-item">
                <span className="span-title">Altura</span>
                <span className="span-atributo">{altura} cm</span>
              </div>
            </div>
            <div className="right">
              <div className="article-body-item">
                <span className="span-title">Largura</span>
                <span className="span-atributo">{largura} cm</span>
              </div>
              <div className="article-body-item">
                <span className="span-title">Fechadura</span>
                <span className="span-atributo">{fechadura}</span>
              </div>
              <div className="article-body-item">
                <span className="span-title">Cor do alumínio</span>
                <span className="span-atributo">{cor_aluminio}</span>
              </div>
              <div className="article-body-item">
                <span className="span-title">Puxador</span>
                <span className="span-atributo">{puxador}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="form-section">
          <form onSubmit={form.handleSubmit(handleUpdate)} className="form">
            <div className="form-title">Orçamento</div>
            <div className="form-controls">
              <div className="form-control-item">
                <Label className="label">Preco</Label>
                <Input
                  className="input"
                  type="number" // Add this!
                  {...form.register("preco", { valueAsNumber: true })}
                />
              </div>
              <div className="form-control-item">
                <Label className="label">Custo</Label>
                <Input
                  className="input"
                  type="number" // Add this!
                  {...form.register("custo", { valueAsNumber: true })}
                />
              </div>
            </div>
            <div className="button">
              <button type="submit">Enviar orcamento</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

