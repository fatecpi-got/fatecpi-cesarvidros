import React from "react";
import { Layout, Card, Typography, Row, Col } from "antd";
import '../../styles/About/About.css';
import { Footer } from "../Footer/FooterComponent";

const {  Text } = Typography;

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
      style={{ marginBottom: '20px', color: '#1e1e1e' }} 
      className="loja-card"
      bordered={false} // Optional: Remove border for a cleaner look
    >
      <Row gutter={[16, 16]}>
        <Col xs={24}>
          <Text style={{color: 'white', fontSize: '1.1rem'}} strong>Contato: </Text>
          <Text style={{color: 'white', fontSize: '1rem' }}>{loja.contato}</Text>
          <br />
          <Text style={{color: 'white', fontSize: '1.1rem'}} strong>Descrição: </Text>
          <Text style={{color: 'white', fontSize: '1rem'}}>{loja.descricao}</Text>
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
            alt={proprietario.nome}
            style={{ width: "100%", borderRadius: 8, objectFit: 'cover' }} // Added objectFit for better image handling
          />
        </Col>
        <Col xs={24} md={16}>
          <Text style={{color: 'white', fontSize: '1rem'}}>{proprietario.descricao}</Text>
        </Col>
      </Row>
    </Card>
  );

  return (
    <Layout style={{ overflow: 'auto', padding: '0', minHeight: '100vh' }} className="about-page">
      <Layout.Content>
        <div style={{ padding: '20px' }}> {/* Added padding for better spacing */}
          <LojaCard />
          <ProprietarioCard />
        </div>
        <Footer />
      </Layout.Content>
    </Layout>
  );
};