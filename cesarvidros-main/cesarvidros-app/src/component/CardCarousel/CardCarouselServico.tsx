import React from "react";
import { Carousel, Row, Col } from "antd";
import { Link } from "react-router-dom";
import { ServicoCard } from "../ServiceCard/ServiceCard";
import { useServico } from "../../hooks/useServico";

export const CarouselCardServico: React.FC = () => {
  const servicos = useServico();

  // Limit the services to only the first 5 items
  const limitedServicos = servicos.slice(0, 5);

  // Function to divide the services into groups for the carousel
  const chunkArray = (arr: any[], chunkSize: number) => {
    const result: any[] = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      result.push(arr.slice(i, i + chunkSize));
    }
    return result;
  };

  // Define how many cards per slide
  const cardsPerSlide = 1; // You can adjust this as needed
  const groupedServicos = chunkArray(limitedServicos, cardsPerSlide);

  return (
    <Carousel autoplay={true} autoplaySpeed={2000}>
      {groupedServicos.map((group, index) => (
        <div key={index}>
          <Row gutter={[16, 16]} justify="center">
            {group.map((servico: any) => (
              <Col xs={24} sm={24} md={12} key={servico.id_servico}>
                <Link to={"/user/projetos"}>
                  <ServicoCard nome={servico.servico_nome} {...servico} />
                </Link>
              </Col>
            ))}
          </Row>
        </div>
      ))}
    </Carousel>
  );
};