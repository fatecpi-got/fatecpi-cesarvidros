import React from "react";
import { Row, Col, Typography, Card } from "antd";
import "../../styles/About/About.css";

const { Title, Paragraph, Text } = Typography;

interface Props {
  loja: {
    nome: string;
    proprietario: string;
    contato: string;
    descricao: string;
    imagem_url?: string;
  };
  proprietario: {
    nome: string;
    imagem_url?: string;
    descricao: string;
  };
}

export const AboutComponent: React.FC<Props> = ({ loja, proprietario }) => {
  return (
    <div className="about-container">
      {/* Section: Sobre a Loja */}
      <Row gutter={[32, 32]} justify="center" align="middle" className="section">
        <Col xs={24} md={12}>
          <img
            src={loja.imagem_url}
            alt={`Imagem da ${loja.nome}`}
            className="about-image"
          />
        </Col>
        <Col xs={24} md={12}>
          <Card className="about-card" bordered={false}>
            <Title level={3} className="section-title">
              Sobre a {loja.nome}
            </Title>
            <Paragraph className="section-description">
              {loja.descricao}
            </Paragraph>
            <div className="contact-info">
              <Text strong>Contato:</Text>
              <Text>{loja.contato}</Text>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Section: Sobre o Proprietário */}
      <Row gutter={[32, 32]} justify="center" align="middle" className="section">
        <Col xs={24} md={12} order={2}>
          <img
            src={proprietario.imagem_url}
            alt={`Foto de ${proprietario.nome}`}
            className="about-image"
          />
        </Col>
        <Col xs={24} md={12} order={1}>
          <Card className="about-card" bordered={false}>
            <Title level={3} className="section-title">
              Sobre {proprietario.nome}
            </Title>
            <Paragraph className="section-description">
              {proprietario.descricao}
            </Paragraph>
          </Card>
        </Col>
      </Row>
    </div>
  );
};