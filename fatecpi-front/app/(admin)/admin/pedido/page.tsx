"use client";

import React, { useState, useEffect } from "react";
import { API_URL } from "@/utils/env"

import { Pedido } from "@/app/types/pedido";
import { getAllPedidos } from "@/app/api/admin/pedido";
import { useRouter } from "next/navigation";

import "./page.css";

export default function PedidoPage() {
  const [pedidosEmProducao, setPedidosEmProducao] = useState<Pedido[]>([]);
  const [pedidosProntos, setPedidosProntos] = useState<Pedido[]>([]);
  const [pedidosFinalizados, setPedidosFinalizados] = useState<Pedido[]>([]);

  const router = useRouter();

  const fetchPedidos = async () => {
    try {
      const response = await getAllPedidos(
        `${API_URL}/api/pedido/get-all`
      );

      if (response.status === 200) {
        const pedidos: Pedido[] = await response.json();
        setPedidosEmProducao(
          pedidos.filter((pedido) => pedido.pedido_estado === "em produção")
        );
        setPedidosProntos(
          pedidos.filter((pedido) => pedido.pedido_estado === "produzido")
        );
        setPedidosFinalizados(
          pedidos.filter((pedido) => pedido.pedido_estado === "finalizado")
        );
      } else {
        console.error("Erro ao buscar pedidos:", response.statusText);
      }
    } catch (error) {
      console.error("Erro ao buscar pedidos:", error);
    }
  };

  useEffect(() => {
    fetchPedidos();
  }, []);

  const handlePedidoClick = (pedido_id: number) => {
    router.push(`/admin/pedido/${pedido_id}`);
  };

  return (
    <section className="page-pedidos">
      <h1>Pedidos</h1>
      <div className="pedidos-container">
        <div className="pedido-status">
          <h2>Em Produção</h2>
          <div className="lista-pedidos">
            {pedidosEmProducao.length > 0 ? (
              pedidosEmProducao.map((pedido) => (
                <div
                  key={pedido.pedido_id}
                  className="pedido-item"
                  onClick={() => handlePedidoClick(pedido.pedido_id)}
                >
                  <p className="id-pedido">ID: {pedido.pedido_id}</p>
                  <p>Estado: {pedido.pedido_estado}</p>
                  <p>
                    Data de Criação:{" "}
                    {new Date(pedido.pedido_data_criacao).toLocaleDateString()}
                  </p>
                </div>
              ))
            ) : (
              <p className="none">Nenhum pedido em produção.</p>
            )}
          </div>
        </div>

        <div className="pedido-status">
          <h2>Prontos</h2>
          <div className="lista-pedidos">
            {pedidosProntos.length > 0 ? (
              pedidosProntos.map((pedido) => (
                <div
                  key={pedido.pedido_id}
                  className="pedido-item"
                  onClick={() => handlePedidoClick(pedido.pedido_id)}
                >
                  <p className="id-pedido">ID: {pedido.pedido_id}</p>
                  <p>Estado: {pedido.pedido_estado}</p>
                  <p>
                    Produzido em:{" "}
                    {pedido.produzido_em
                      ? new Date(pedido.produzido_em).toLocaleDateString()
                      : "N/A"}
                  </p>
                </div>
              ))
            ) : (
              <p className="none">Nenhum pedido pronto.</p>
            )}
          </div>
        </div>

        <div className="pedido-status">
          <h2>Finalizados</h2>
          <div className="lista-pedidos">
            {pedidosFinalizados.length > 0 ? (
              pedidosFinalizados.map((pedido) => (
                <div
                  key={pedido.pedido_id}
                  className="pedido-item"
                  onClick={() => handlePedidoClick(pedido.pedido_id)}
                >
                  <p className="id-pedido">ID: {pedido.pedido_id}</p>
                  <p>Estado: {pedido.pedido_estado}</p>
                  <p>
                    Finalizado em:{" "}
                    {pedido.finalizado_em
                      ? new Date(pedido.finalizado_em).toLocaleDateString()
                      : "N/A"}
                  </p>
                </div>
              ))
            ) : (
              <p className="none">Nenhum pedido finalizado.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
