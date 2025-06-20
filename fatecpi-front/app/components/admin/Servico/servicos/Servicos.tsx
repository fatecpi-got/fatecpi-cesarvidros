import React, { useState, useEffect } from "react";

import { getAllServicos } from "@/app/api/admin/orcamentos";
import ServiceCard from "../servicoCard/ServicoCard";

import { API_URL } from "@/utils/env";

import "./servicos.css";

interface Servico {
  id: number;
  cor_vidro: string;
  cor_aluminio: string;
  preco: number;
  custo: number;
  altura: number;
  largura: number;
  fechadura: string;
  puxador: string;
  estado: string;
  produto: string;
  nome_usuario: string;
  numero_telefone: string;
  cep: string;
  orcamento_id: number;
}

export default function Servicos() {
  const [servicosAndamento, setServicosAndamento] = useState<Servico[]>([]);
  const [servicosDevolvidos, setServicosDevolvidos] = useState<Servico[]>([]);
  const [servicosAceitos, setServicosAceitos] = useState<Servico[]>([]);
  const [servicosRejeitados, setServicosRejeitados] = useState<Servico[]>([]);

  const fetchData = async () => {
    try {
      const response = await getAllServicos(
        `${API_URL}/api/servico/get-all`
      );
      const data: Servico[] = await response.json();

      setServicosAndamento(data.filter((s) => s.estado === "em andamento"));
      setServicosDevolvidos(data.filter((s) => s.estado === "devolvido"));
      setServicosRejeitados(data.filter((s) => s.estado === "rejeitado"));
      setServicosAceitos(data.filter((s) => s.estado === "aceito"));
    } catch (error) {
      console.error("Erro ao buscar serviços:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container-servicos">
      {/* Agrupar serviços por orcamento_id usando Set */}
      {/* Set é  um ferramenta que permite armazenar valores únicos de qualquer tipo, seja primitivo ou referência. */}
      {/* Ou seja, não permite valores duplicados */}
      <section className="andamento">
        <h1 className="title-servicos">Serviços para orçar</h1>
        <div className="servicos">
          {[
            ...new Set(
              servicosAndamento.map((servico) => servico.orcamento_id)
            ),
          ].map((orcamentoId) => (
            <div key={orcamentoId} className="grupo-orcamento">
              <h2 className="orcamento-title">Orçamento ID: {orcamentoId}</h2>
              <div className="lista-servicos">
                {servicosAndamento
                  .filter((servico) => servico.orcamento_id === orcamentoId)
                  .map((servico) => (
                    <ServiceCard
                      key={servico.id}
                      service={servico}
                      onActionComplete={fetchData}
                    />
                  ))}
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="aceito">
        <h1 className="title-servicos">Serviços aceitos</h1>
        <div className="servicos">
          {[
            ...new Set(servicosAceitos.map((servico) => servico.orcamento_id)),
          ].map((orcamentoId) => (
            <div key={orcamentoId} className="grupo-orcamento">
              <h2 className="orcamento-title">Orçamento ID: {orcamentoId}</h2>
              <div className="lista-servicos">
                {servicosAceitos
                  .filter((servico) => servico.orcamento_id === orcamentoId)
                  .map((servico) => (
                    <ServiceCard key={servico.id} service={servico} />
                  ))}
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="rejeitado">
        <h1 className="title-servicos">Serviços rejeitados</h1>
        <div className="servicos">
          {[
            ...new Set(
              servicosRejeitados.map((servico) => servico.orcamento_id)
            ),
          ].map((orcamentoId) => (
            <div key={orcamentoId} className="grupo-orcamento">
              <h2 className="orcamento-title">Orçamento ID: {orcamentoId}</h2>
              <div className="lista-servicos">
                {servicosRejeitados
                  .filter((servico) => servico.orcamento_id === orcamentoId)
                  .map((servico) => (
                    <ServiceCard key={servico.id} service={servico} />
                  ))}
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="devolvido">
        <h1 className="title-servicos">Serviços em haver</h1>
        <div className="servicos">
          {[
            ...new Set(
              servicosDevolvidos.map((servico) => servico.orcamento_id)
            ),
          ].map((orcamentoId) => (
            <div key={orcamentoId} className="grupo-orcamento">
              <h2 className="orcamento-title">Orçamento ID: {orcamentoId}</h2>
              <div className="lista-servicos">
                {servicosDevolvidos
                  .filter((servico) => servico.orcamento_id === orcamentoId)
                  .map((servico) => (
                    <ServiceCard key={servico.id} service={servico} />
                  ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
