"use client";

import React, { useState, useEffect } from "react";
import { API_URL } from "@/utils/env"

import { PedidoResponse } from "@/app/types/pedido";
import { getPedidosByUserId } from "@/app/api/user/pedido";
import { useRouter } from "next/navigation";

import "./page.css"; // Importando o CSS para estilização

export default function PedidoPage() {
  const [pedidosEmProducao, setPedidosEmProducao] = useState<PedidoResponse[]>(
    []
  );
  const [pedidosProntos, setPedidosProntos] = useState<PedidoResponse[]>([]);
  const [pedidosFinalizados, setPedidosFinalizados] = useState<
    PedidoResponse[]
  >([]);
  const [userId, setUserId] = useState<number>();
  const router = useRouter();

  const fetchPedidos = React.useCallback(async () => {
    try {
      const response = await getPedidosByUserId(
        userId ? userId : 0,
        `${API_URL}/api/pedido/get-by-user/`
      );

      if (response.status === 200) {
        const pedidos: PedidoResponse[] = await response.json();
        setPedidosEmProducao(
          pedidos.filter((pedido) => pedido.status_pedido === "em produção")
        );
        setPedidosProntos(
          pedidos.filter((pedido) => pedido.status_pedido === "produzido")
        );
        setPedidosFinalizados(
          pedidos.filter((pedido) => pedido.status_pedido === "finalizado")
        );
      } else {
        console.error("Erro ao buscar pedidos:", response.statusText);
      }
    } catch (error) {
      console.error("Erro ao buscar pedidos:", error);
    }
  }, [userId]);

  useEffect(() => {
    const user_id = localStorage.getItem("user_id");
    if (user_id !== null) {
      setUserId(parseInt(user_id));
    }
    fetchPedidos();
  }, [fetchPedidos]);

  const handleClick = (pedido_id: number) => {
    router.push(`/user/pedido/${pedido_id}`);
  };

  return (
    <section className="page-pedidos">
      <h1>Pedidos</h1>
      <div className="pedidos-container">
        <div className="pedido-status">
          <h2 className="title-pedido-status">Em Produção</h2>
          <div className="lista-pedidos">
            {pedidosEmProducao.length > 0 ? (
              pedidosEmProducao.map((pedido) => (
                <div
                  key={pedido.pedido_id}
                  className="pedido-item"
                  onClick={() => handleClick(pedido.pedido_id)}
                >
                  <div className="title-pedido-item">
                    <h2>Pedido ID: {pedido.pedido_id}</h2>
                  </div>

                  <div className="body-pedido-item">
                    <p>Estado: {pedido.status_pedido}</p>
                    <p>
                      Criado em:{" "}
                      {new Date(pedido.pedido_data_inicio).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p>Nenhum pedido em produção.</p>
            )}
          </div>
        </div>

        <div className="pedido-status">
          <h2 className="title-pedido-status">Prontos</h2>
          <div className="lista-pedidos">
            {pedidosProntos.length > 0 ? (
              pedidosProntos.map((pedido) => (
                <div
                  key={pedido.pedido_id}
                  className="pedido-item"
                  onClick={() => handleClick(pedido.pedido_id)}
                >
                  <div className="title-pedido-item">
                    <h2>Pedido ID: {pedido.pedido_id}</h2>
                  </div>

                  <div className="body-pedido-item">
                    <p>Estado: {pedido.status_pedido}</p>
                    <p>
                      Produzido em:{" "}
                      {pedido.pedido_data_producao
                        ? new Date(
                            pedido.pedido_data_producao
                          ).toLocaleDateString()
                        : "N/A"}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p>Nenhum pedido pronto.</p>
            )}
          </div>
        </div>

        <div className="pedido-status">
          <h2 className="title-pedido-status">Finalizados</h2>
          <div className="lista-pedidos">
            {pedidosFinalizados.length > 0 ? (
              pedidosFinalizados.map((pedido) => (
                <div
                  key={pedido.pedido_id}
                  className="pedido-item"
                  onClick={() => handleClick(pedido.pedido_id)}
                >
                  <div className="title-pedido-item">
                    <h2>Pedido ID: {pedido.pedido_id}</h2>
                  </div>

                  <div className="body-pedido-item">
                    <p>Estado: {pedido.status_pedido}</p>
                    <p>
                      Finalizado em:{" "}
                      {pedido.pedido_data_finalizacao
                        ? new Date(
                            pedido.pedido_data_finalizacao
                          ).toLocaleDateString()
                        : "N/A"}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p>Nenhum pedido finalizado.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
