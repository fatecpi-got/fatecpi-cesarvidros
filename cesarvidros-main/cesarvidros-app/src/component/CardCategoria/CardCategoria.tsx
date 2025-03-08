import React from "react";
import { Card } from "antd";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import "../../styles/CardCategoria/CardCategoria.css";

interface Props {
  id_categoria: number;
  nome: string;
  imagem_url: string;
  descricao: string;
}

export const CardCategoria: React.FC<Props> = (categorias) => {
  return (
    <motion.div
      className="categoria-card-container"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <Card
        key={categorias.id_categoria}
        title={categorias.nome}
        cover={<img src={categorias.imagem_url} alt="Imagem da categoria" />}
        extra={<Link to={"user/projetos"}>Ver mais</Link>}
        className="categoria-card"
      >
        <Card.Meta description={categorias.descricao} />
      </Card>
    </motion.div>
  );
};
