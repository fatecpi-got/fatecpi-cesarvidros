import React, { useEffect, useState, useCallback } from "react";
import { useSubCategoria } from "../../hooks/useSubCategoria";
import { useServico } from "../../hooks/useServico";
import { ServicoCard } from "../ServiceCard/ServiceCard";
import { useServicosByProps } from "../../hooks/useServicosByProps";
import { MenuList } from "../MenuList/MenuList";
import { ClearButton } from "../MenuList/ClearButton";
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
  const subcategorias = useSubCategoria();
  const [selectedKey, setSelectedKey] = useState<string | null>(null);

  useEffect(() => {
    setServicos(servicosData);
  }, [servicosData]);

  const handleClick = useCallback(
    async (e: { key: string }) => {
      const key = e.key;
      setSelectedKey(key);
      const numericId = Number(key.replace(/\D/g, ""));

      if (!isNaN(numericId)) {
        const url = key.startsWith("cat_")
          ? `https://cesarvidros.onrender.com/api/servicos/get-all-by-categoria?id=${numericId}`
          : `https://cesarvidros.onrender.com/api/servicos/get-all-by-sub-categoria?id=${numericId}`;

        // eslint-disable-next-line react-hooks/rules-of-hooks
        await useServicosByProps(url, setServicos);
      } else {
        setServicos(servicosData);
      }
    },
    [servicosData]
  );

  const handleClearSelection = () => {
    setSelectedKey(null);
    setServicos(servicosData);
  };

  const menuItems = [
    {
      key: "cat_1",
      label: "Vidro Temperado",
      children: subcategorias.map((sub) => ({
        key: sub.id_sub,
        label: sub.nome,
      })),
    },
    { key: "cat_2", label: "Vidro Comum" },
    { key: "cat_3", label: "Telas" },
    { key: "cat_4", label: "Forro PVC" },
  ];

  return (
    <Layout className="page-projects">
      <div className="menu-list">
        <MenuList
          items={menuItems}
          onClick={handleClick}
          selectedKey={selectedKey}
        />
      </div>
      <ClearButton onClear={handleClearSelection} />
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
