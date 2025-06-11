"use client";

import { getServicosByOrcamentoId } from "@/app/api/user/servicosPorOrcamento";

import React, { useState, useEffect } from "react";
import { updateServicosEstados } from "@/app/api/user/updateServicoStatus";

import { useParams } from "next/navigation";

interface ServicoOrcamento {
  id: number;
  cor_vidro: string;
  largura: number;
  altura: number;
  fechadura: string;
  cor_aluminio: string;
  puxador: string;
  estado: string;
  produto: string;
  preco: number;
}

export default function ServicoPorOrcamentoPage() {
  const params = useParams();
  const orcamento_id = params.orcamento_id;

  const [servicosAndamento, setServicosAndamento] = useState<
    ServicoOrcamento[]
  >([]);
  const [servicosDevolvidos, setServicosDevolvidos] = useState<
    ServicoOrcamento[]
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getServicosByOrcamentoId(
          Number(orcamento_id),
          "https://fatecpi-cesarvidros-1.onrender.com/api/servico/get-by-orcamento/"
        );

        const response_json: ServicoOrcamento[] = await response.json();

        if (response.status == 404) {
          console.log("erro");
        } else {
          const servicosAndamento = response_json.filter(
            (servico) => servico.estado === "em andamento"
          );
          const servicosDevolvidos = response_json.filter(
            (servico) => servico.estado === "devolvido"
          );

          setServicosAndamento(servicosAndamento);
          setServicosDevolvidos(servicosDevolvidos);
        }
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();
  }, [orcamento_id]);

  const recusar = async (
    servicos: { servico_id: number; novo_status: string }[]
  ) => {
    try {
      const response = await updateServicosEstados(
        servicos,
        "https://fatecpi-cesarvidros-1.onrender.com/api/servico/update-status"
      );

      if (response) {
        console.log(response);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const formalizar = async (
    servicos: {
      servico_id: number;
      novo_status: string;
    }[]
  ) => {
    try {
      const response = await updateServicosEstados(
        servicos,
        "https://fatecpi-cesarvidros-1.onrender.com/api/servico/update-status"
      );

      if (response) {
        console.log(response);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="div">
      <div className="orcamentos-a-formalizar">
        <div className="title-orcamento-param">Orcamentos orçados</div>
        {servicosDevolvidos.length > 0 ? (
          servicosDevolvidos.map((servico) => (
            <div className="servico" key={servico.id}>
              <div className="body-servico-orcamento">
                <p>Cor do Vidro: {servico.cor_vidro}</p>
                <p>Largura: {servico.largura}</p>
                <p>Altura: {servico.altura}</p>
                <p>Fechadura: {servico.fechadura}</p>
                <p>Cor do Alumínio: {servico.cor_aluminio}</p>
                <p>Puxador: {servico.puxador}</p>
                <p>Estado: {servico.estado}</p>
                <p>Produto: {servico.produto}</p>
                <p>Preço: {servico.preco}</p>
              </div>
              <div className="footer-servico-orcamento">
                <button
                  onClick={() =>
                    recusar([
                      { servico_id: servico.id, novo_status: "rejeitado" },
                    ])
                  }
                >
                  Recusar
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>Por favor aguarde o orçamento</p>
        )}

        {servicosDevolvidos.length > 0 && (
          <div className="enviar">
            <button
              onClick={() =>
                formalizar(
                  servicosDevolvidos.map((servico) => ({
                    servico_id: servico.id,
                    novo_status: "aceito",
                  }))
                )
              }
            >
              Formalizar pedido
            </button>
          </div>
        )}
      </div>

      <div className="orcamento-em-andamento">
        <div className="title-orcamento-param">Orcamentos não orçados</div>
        {servicosAndamento.length > 0 ? (
          servicosAndamento.map((servico) => (
            <div className="servico" key={servico.id}>
              <div className="body-servico-orcamento">
                <p>Cor do Vidro: {servico.cor_vidro}</p>
                <p>Largura: {servico.largura}</p>
                <p>Altura: {servico.altura}</p>
                <p>Fechadura: {servico.fechadura}</p>
                <p>Cor do Alumínio: {servico.cor_aluminio}</p>
                <p>Puxador: {servico.puxador}</p>
                <p>Estado: {servico.estado}</p>
                <p>Produto: {servico.produto}</p>
                <p>Preço: {servico.preco}</p>
              </div>
            </div>
          ))
        ) : (
          <div>Por favor, solicite orcamento</div>
        )}
      </div>
    </div>
  );
}
