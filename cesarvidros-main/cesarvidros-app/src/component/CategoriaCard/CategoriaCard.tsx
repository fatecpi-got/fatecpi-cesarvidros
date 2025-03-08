import React from "react";
import { Card } from "antd";
import { motion } from "framer-motion";
import "../../styles/CategoriaCard/CategoriaCard.css";

interface Props {
  id_categoria: number;
  nome: string;
  imagem_url: string;
  descricao: string;
}

export const CategoriaCard: React.FC<Props> = (categorias) => {
  return (
    <motion.div
      className="categoria-card-container"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <Card
        key={categorias.id_categoria}
        title={categorias.nome}
        cover={<img alt={categorias.nome} src={categorias.imagem_url} />}
        className="categoria-card-solo"
      >
        <Card.Meta description={categorias.descricao} />
      </Card>
    </motion.div>
  );
};
