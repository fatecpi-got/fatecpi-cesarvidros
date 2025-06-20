"use client";

import React, { useState, useEffect, useCallback } from "react";
import { getPedidoById } from "@/app/api/admin/pedido";
import { useParams } from "next/navigation";
import { PedidoResponse } from "@/app/types/pedido";
import { API_URL } from "@/utils/env";
import "./page.css";

export default function PedidoDetailPage() {
  const params = useParams();
  const pedido_id = Number(params.pedido_id);
  const [pedido, setPedido] = useState<PedidoResponse | null>(null);

  const fetchPedido = useCallback(async () => {
    try {
      const response = await getPedidoById(
        `${API_URL}/api/pedido/get-by-id`,
        pedido_id
      );

      if (response.status === 200) {
        const pedidoData: PedidoResponse = await response.json();
        setPedido(pedidoData);
      } else {
        console.error("Erro ao buscar o pedido:", response.statusText);
      }
    } catch (error) {
      console.error("Erro ao buscar o pedido:", error);
    }
  }, [pedido_id]);

  useEffect(() => {
    fetchPedido();
  }, [fetchPedido, pedido_id]);

  if (!pedido) {
    return <div className="loading">Carregando...</div>;
  }

  return (
    <section className="pedido-detail">
      <h2>Pedido #{pedido_id}</h2>
      <article className="pedido-info">
        <section className="dados-pedido">
          <h2 className="title-dado">Dados do Pedido</h2>
          <div className="itens">
            <p>
              <span>Orçamento ID:</span> {pedido.orcamento_id}
            </p>
            <p>
              <span>Cliente:</span> {pedido.nome_usuario}
            </p>
            <p>
              <span>Telefone:</span> {pedido.numero_telefone ?? "Não informado"}
            </p>
            <p>
              <span>Data de Início:</span>{" "}
              {pedido.pedido_data_inicio instanceof Date
                ? pedido.pedido_data_inicio.toLocaleDateString()
                : pedido.pedido_data_inicio}
            </p>
            <p>
              <span>Data de Produção:</span>{" "}
              {pedido.pedido_data_producao instanceof Date
                ? pedido.pedido_data_producao.toLocaleDateString()
                : pedido.pedido_data_producao ?? "Não informado"}
            </p>
            <p>
              <span>Data de Finalização:</span>{" "}
              {pedido.pedido_data_finalizacao instanceof Date
                ? pedido.pedido_data_finalizacao.toLocaleDateString()
                : pedido.pedido_data_finalizacao ?? "Não informado"}
            </p>
          </div>
        </section>

        <section className="dados-servicos">
          <h2 className="title-dado">
            Serviços - {pedido.servicos.length} itens
          </h2>
          {pedido.servicos && pedido.servicos.length > 0 ? (
            <div className="servicos">
              {pedido.servicos.map((servico) => (
                <div key={servico.servico_id} className="servico-item">
                  <h3>Serviço #{servico.servico_id}</h3>
                  <p>
                    <span>Produto:</span> {servico.produto}
                  </p>
                  <p>
                    <span>Cor do Vidro:</span> {servico.cor_vidro}
                  </p>
                  <p>
                    <span>Cor do Alumínio:</span> {servico.cor_aluminio}
                  </p>
                  <p>
                    <span>Largura:</span> {servico.largura} cm
                  </p>
                  <p>
                    <span>Altura:</span> {servico.altura} cm
                  </p>
                  <p>
                    <span>Fechadura:</span> {servico.fechadura}
                  </p>
                  <p>
                    <span>Puxador:</span> {servico.puxador}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p>Nenhum serviço associado a este pedido.</p>
          )}
        </section>
      </article>
    </section>
  );
}
