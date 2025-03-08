import React, { useState, useEffect } from "react";
import { Card } from "antd";
import { motion } from "framer-motion";
import "../../styles/ServicoCard/ServicoCard.css";

interface Props {
  id_servico: number;
  nome: string;
  imagem_url: string;
  descricao: string;
  categoria_nome: string;
  sub_categoria_nome: string | null;
}

export const ServicoCard: React.FC<Props> = (servicos) => {
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsExpanded(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const optimizedImageUrl = `${servicos.imagem_url}?w=800&c_fill&q_auto&f_auto`;

  return (
    <>
      {isExpanded && (
        <div className="overlay" onClick={() => setIsExpanded(false)}></div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <Card
          title={servicos.nome}
          cover={
            <img alt={servicos.nome} src={optimizedImageUrl} loading="lazy" />
          }
          extra={servicos.categoria_nome}
          className={`servico-card ${isExpanded ? "expanded" : ""}`}
          onClick={() => setIsExpanded(true)}
        >
          <Card.Meta description={servicos.descricao} />
        </Card>
      </motion.div>
    </>
  );
};
