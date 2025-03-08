import React from "react";
import { Layout } from "antd";

import { AboutComponent } from "../component/About/About";
import { ResponsiveNav } from "../component/Aside/Aside";
import { BannerComponent } from "../component/Banner/Banner";
import { WhatsAppButton } from "../component/Whatsapp/WhatsappButton";

const loja = {
  nome: "César Vidros",
  proprietario: "César Renó de Oliveira",
  contato: "cesarr.vidros@gmail.com",
  descricao:
    "A César Vidros é uma empresa especializada em serviços de vidraçaria, oferecendo soluções modernas e personalizadas para residências, comércios e indústrias. Com um compromisso com a qualidade e excelência, trabalhamos com materiais de alta resistência e acabamentos impecáveis, garantindo sofisticação e segurança para cada projeto. Nossa missão é transformar espaços com inovação e transparência, proporcionando conforto e design para nossos clientes",
  imagem_url:
    "https://plus.unsplash.com/premium_photo-1677829176552-41719fa3b7f8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cml0dWFsfGVufDB8fDB8fHww",
};
const proprietario = {
  nome: "César Renó de Oliveira",
  imagem_url: "../../assets/cesar-vidros.jpg",
  descricao:
    "César é um profissional experiente no ramo de vidraçaria, com anos de dedicação e aprimoramento técnico. Apaixonado pelo setor, ele se destaca pelo compromisso em entregar serviços de alto padrão, sempre buscando novas tendências e tecnologias para oferecer as melhores soluções aos clientes. Seu objetivo é aliar tradição e inovação, tornando a César Vidros uma referência em qualidade e confiança.",
};

const paths = [
  { name: "Início", path: "/user/home" },
  { name: "Sobre", path: "/user/sobre" },
  { name: "Serviços", path: "/user/servicos" },
  { name: "Projetos", path: "/user/projetos" },
  { name: "Orçamentos", path: "/user/orcamentos" },
]

const AboutPage: React.FC = () => {
  return (
    <Layout style={{ maxHeight: "100vh" }}>
      <ResponsiveNav paths={paths}/>
      <Layout.Content
        style={{
          padding: "20px",
          overflow: "auto",
          minHeight: "100vh",
          backgroundColor: "#1e1e1e",
        }}
      >
        <BannerComponent title="Sobre Nós" />
        <AboutComponent loja={loja} proprietario={proprietario} />
        <WhatsAppButton />
      </Layout.Content>
    </Layout>
  );
};

export default AboutPage;
