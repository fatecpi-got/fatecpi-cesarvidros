import React from "react";
import { Layout } from "antd";
import { Button } from "antd";
import { Content } from "antd/lib/layout/layout";
import { ResponsiveNav } from "../../component/Aside/Aside";
import { WhatsAppButton } from "../../component/Whatsapp/WhatsappButton";
import { Footer } from "../../component/Footer/FooterComponent";

import "../../styles/About/About.css";

const loja = {
  nome: "César Vidros",
  proprietario: "César Renó de Oliveira",
  contato: "cesarr.vidros@gmail.com",
  descricao:
    "A César Vidros é uma empresa especializada em serviços de vidraçaria, oferecendo soluções modernas e personalizadas para residências, comércios e indústrias. Com um compromisso com a qualidade e excelência, trabalhamos com materiais de alta resistência e acabamentos impecáveis, garantindo sofisticação e segurança para cada projeto. Nossa missão é transformar espaços com inovação e transparência, proporcionando conforto e design para nossos clientes.",
};

const proprietario = {
  nome: "César Renó de Oliveira",
  descricao:
    "César é um profissional experiente no ramo de vidraçaria, com anos de dedicação e aprimoramento técnico. Apaixonado pelo setor, ele se destaca pelo compromisso em entregar serviços de alto padrão, sempre buscando novas tendências e tecnologias para oferecer as melhores soluções aos clientes. Seu objetivo é aliar tradição e inovação, tornando a César Vidros uma referência em qualidade e confiança.",
  imagem_url: "../../assets/cesar-vidros.jpg",
};

const auth = sessionStorage.getItem("auth_user");

const paths = [
  { name: "Início", path: "/" },
  { name: "Sobre", path: "/sobre" },
  { name: "Projetos", path: "/projetos" },
  ...(auth ? [{ name: "Orçamentos", path: "/orcamentos" }] : []),
];

const AboutPage: React.FC = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Navigation */}
      <ResponsiveNav paths={paths} />

      {/* Content */}
      <Layout.Content style={{ backgroundColor: "#f9f9f9" }}>
        {/* Banner */}
        <div
          className="about-banner"
          style={{
            backgroundImage:
              "url(https://plus.unsplash.com/premium_photo-1677829176552-41719fa3b7f8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cml0dWFsfGVufDB8fDB8fHww)",
          }}
        >
          <div className="banner-content">
            <h1>Sobre Nós</h1>
            <p>Conheça nossa história e nossos valores</p>
          </div>
        </div>

        {/* Quem Somos */}
        <section className="who-we-are">
          <h2>Quem Somos</h2>
          <p>{loja.descricao}</p>
        </section>

        {/* Missão e Visão */}
        <section className="mission-vision">
          <div className="mission">
            <h3>Nossa Missão</h3>
            <p>
              Transformar espaços com inovação e transparência, proporcionando
              conforto e design para nossos clientes.
            </p>
          </div>
          <div className="vision">
            <h3>Nossa Visão</h3>
            <p>
              Ser referência nacional em soluções de vidraçaria, combinando
              tradição e tecnologia.
            </p>
          </div>
        </section>

        {/* Proprietário */}
        <section className="owner-section">
          <img src={proprietario.imagem_url} alt={`Foto de ${proprietario.nome}`} />
          <div className="owner-info">
            <h3>{proprietario.nome}</h3>
            <p>{proprietario.descricao}</p>
          </div>
        </section>

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

        {/* WhatsApp Button */}
        <WhatsAppButton  />

        {/* Footer */}
        <Footer />
      </Layout.Content>
    </Layout>
  );
};

export default AboutPage;