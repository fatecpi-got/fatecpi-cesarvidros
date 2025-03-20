import React from "react";
import { ResponsiveNav } from "../../component/Aside/Aside";
import { Layout, Row, Col, Card, Button } from "antd";
import { Footer } from "../../component/Footer/FooterComponent";
import { WhatsAppButton } from "../../component/Whatsapp/WhatsappButton";
import { Link } from "react-router-dom";

import '../../styles/HomePage/HomePage.css'

const { Content } = Layout;

const auth = sessionStorage.getItem("auth_user");

const paths = [
  { name: "Início", path: "/" },
  { name: "Sobre", path: "/sobre" },
  { name: "Projetos", path: "/projetos" },
  ...(auth ? [{ name: "Orçamentos", path: "/orcamentos" }] : []),
]

const HomePage = () => {
  return (
    <Layout className="home-layout">
      {/* Navegação Responsiva */}
      <ResponsiveNav paths={paths} />
      {/* Seção Hero */}
      <div className="hero-section">
        <h1>Bem-vindo à César Vidros</h1>
        <p>Seu parceiro confiável para soluções de vidro de alta qualidade.</p>
        <Button type="primary" size="large">
          <Link to={'/user/projetos'}>Explore Nossos Projetos</Link>
        </Button>
      </div>

      {/* Seção Sobre Nós */}
      <Content className="about-section">
        <Row gutter={[16, 16]} justify="center">
          <Col xs={24} md={12}>
            <h2>Sobre Nós</h2>
            <p>
              Na César Vidros, nos especializamos em fornecer soluções de vidro
              premium para projetos residenciais e comerciais. Com anos de
              experiência, entregamos artesanato de qualidade e designs
              inovadores.
            </p>
            <Button type="default"><Link to={'/user/sobre'}>Saiba Mais</Link></Button>
          </Col>
        </Row>
      </Content>

      {/* Seção Serviços Destacados */}
      <Content className="services-section">
        <h2>Nossos Serviços Destacados</h2>
        <Row gutter={[16, 16]} justify="center">
          <Col xs={24} sm={12} md={8}>
            <Card title="Vidro Residencial" bordered={false}>
              <p>
                Soluções de vidro personalizadas para residências, incluindo
                janelas, portas e espelhos.
              </p>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Card title="Vidro Comercial" bordered={false}>
              <p>
                Instalações de vidro premium para escritórios, lojas e espaços
                públicos.
              </p>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Card title="Designs Personalizados" bordered={false}>
              <p>
                Projetos de vidro sob medida adaptados às suas necessidades
                exclusivas.
              </p>
            </Card>
          </Col>
        </Row>
      </Content>

      {/* Seção Chamada para Ação */}
      <Content className="cta-section">
        <h2>Pronto para começar?</h2>
        <p>
          Entre em contato conosco hoje mesmo para uma consulta gratuita e
          deixe-nos realizar sua visão.
        </p>
        <Button type="primary" size="large">
          Entre em Contato
        </Button>
      </Content>


      {/* Botão do WhatsApp */}
      <WhatsAppButton />
      {/* Rodapé */}
      <Footer />
    </Layout>
  );
};

export default HomePage;