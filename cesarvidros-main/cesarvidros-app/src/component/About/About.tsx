import React from "react";
import { Layout, Card, Typography, Row, Col } from "antd";
import "../../styles/About/About.css";

const { Text } = Typography;

interface Props {
  loja: {
    nome: string;
    proprietario: string;
    contato: string;
    descricao: string;
    imagem_url: string;
  };
  proprietario: {
    nome: string;
    imagem_url: string;
    descricao: string;
  };
}

export const AboutComponent: React.FC<Props> = ({ loja, proprietario }) => {
  // Card for Loja (Store)
  const LojaCard = () => (
    <Card
      title={loja.nome}
      className="loja-card"
      bordered={false} // Optional: Remove border for a cleaner look
    >
      <Row gutter={[8, 8]}>
        <Col xs={24}>
          <Text strong>
            Contato:{" "}
          </Text>
          <Text >
            {loja.contato}
          </Text>
          <br />
          <Text strong>
            Descrição:{" "}
          </Text>
          <Text >
            {loja.descricao}
          </Text>
        </Col>
      </Row>
    </Card>
  );

  // Card for Proprietario (Owner)
  const ProprietarioCard = () => (
    <Card
      title={proprietario.nome}
      className="proprietario-card"
      bordered={false} // Optional: Remove border for a cleaner look
    >
      <Row gutter={[16, 16]} align="middle">
        <Col xs={24} md={8}>
          <img
            src={proprietario.imagem_url}
            alt={proprietario.nome}// Added objectFit for better image handling
          />
        </Col>
        <Col xs={24} md={16}>
          <Text >
            {proprietario.descricao}
          </Text>
        </Col>
      </Row>
    </Card>
  );

  return (
    <div className="about-container">
      <LojaCard />
      <ProprietarioCard />
    </div>
  );
};