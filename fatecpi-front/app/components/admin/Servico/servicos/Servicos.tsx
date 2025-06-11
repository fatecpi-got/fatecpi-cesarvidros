import React, { useState, useEffect } from "react";

import { getAllServicos } from "@/app/api/admin/orcamentos";
import ServiceCard from "../servicoCard/ServicoCard";

import './servicos.css'

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllServicos(
          "https://fatecpi-cesarvidros-1.onrender.com/api/servico/get-all"
        );
        const data: Servico[] = await response.json();

        const filteredServicosAndamento = data.filter(
          (servico) => servico.estado === "em andamento"
        );

        const filteredServicosDevolvidos = data.filter(
          (servico) => servico.estado === "devolvido"
        );
        const filteredServicosRejeitado = data.filter(
          (servico) => servico.estado === "rejeitado"
        );
        const filteredServicosAceito = data.filter(
          (servico) => servico.estado === "aceito"
        );

        setServicosAndamento(filteredServicosAndamento);
        setServicosDevolvidos(filteredServicosDevolvidos);
        setServicosAceitos(filteredServicosAceito);
        setServicosRejeitados(filteredServicosRejeitado);
      } catch (error) {
        return error;
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container-servicos">
      <section className="andamento">
        <h1 className="title-servicos">Serviços para orçar</h1>
        <div className="servicos">
          {servicosAndamento.map((servico) => (
            <ServiceCard key={servico.id} service={servico} />
          ))}
        </div>
      </section>
      <section className="aceito">
        <h1 className="title-servicos">Serviços aceitos</h1>
        <div className="servicos">
          {servicosAceitos.map((servico) => (
            <ServiceCard key={servico.id} service={servico} />
          ))}
        </div>
      </section>
      <section className="rejeitado">
        <h1 className="title-servicos">Serviços rejeitados</h1>
        <div className="servicos">
          {servicosRejeitados.map((servico) => (
            <ServiceCard key={servico.id} service={servico} />
          ))}
        </div>
      </section>
      <section className="devolvido">
        <h1 className="title-servicos">Serviços em haver</h1>
        <div className="servicos">
          {servicosDevolvidos.map((servico) => (
            <ServiceCard key={servico.id} service={servico} />
          ))}
        </div>
      </section>
    </div>
  );
}
