import React, { useEffect, useState, useCallback } from "react";
import { useServico } from "../../hooks/useServico";
import { ServicoCard } from "../ServiceCard/ServiceCard";
import { Layout } from "antd";

import "../../styles/MenuCategoria/MenuCategoria.css";

interface Servico {
  id_servico: number;
  servico_nome: string;
  imagem_url: string;
  descricao: string;
  categoria_nome: string;
  sub_categoria_nome: string;
}

export const MenuCategoria: React.FC = () => {
  const [servicos, setServicos] = useState<Servico[]>([]);
  const servicosData = useServico();

  useEffect(() => {
    setServicos(servicosData);
  }, [servicosData]);


  return (
    <Layout className="page-projects">
      <div className="servicos">
        {servicos.map((servico) => (
          <ServicoCard
            nome={servico.servico_nome}
            key={servico.id_servico}
            {...servico}
          />
        ))}
      </div>
    </Layout>
  );
};