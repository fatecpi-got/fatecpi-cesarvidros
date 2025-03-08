import React, { useMemo } from "react";
import { Carousel, Row, Col } from "antd";
import { CategoriaCard } from "../CategoriaCard/CategoriaCard";
import { useCategoria } from "../../hooks/useCategoria";

export const CarouselCardCategoria: React.FC = () => {
  const categorias = useCategoria();

  // Memoiza os cards para evitar re-renderizações desnecessárias
  const categoriaCards = useMemo(() => categorias.map(categoria => (
    <Col xs={24} sm={24} md={12} key={categoria.id_categoria}>
      <CategoriaCard {...categoria} />
    </Col>
  )), [categorias]);

  
  return (
    <Carousel autoplay autoplaySpeed={2000}>
      {categoriaCards.map((card, index) => (
        <div key={index}>
          <Row gutter={[16, 16]} justify="center">
            {card}
          </Row>
        </div>
      ))}
    </Carousel>
  );
};
