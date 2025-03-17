import React from "react";
import { ListCategorias } from "../../component/CategoriasList/ListCategorias";
import { Layout } from "antd";
import { ResponsiveNav } from "../../component/Aside/Aside";
import { BannerComponent } from "../../component/Banner/Banner";
import { Footer } from "../../component/Footer/FooterComponent";
import { WhatsAppButton } from "../../component/Whatsapp/WhatsappButton";

const auth = sessionStorage.getItem("auth_user");

const paths = [
  { name: "Início", path: "/" },
  { name: "Sobre", path: "/sobre" },
  { name: "Serviços", path: "/servicos" },
  { name: "Projetos", path: "/projetos" },
  ...(auth ? [{ name: "Orçamentos", path: "/orcamentos" }] : []),
]

const ServicesPage: React.FC = () => {
  return (
    <Layout>
      <ResponsiveNav paths={paths} />
      <Layout.Content
        style={{
          backgroundColor: "#f5f5f5",
        }}
      >
        <BannerComponent title="Serviços" />
        <ListCategorias />
        <WhatsAppButton />
        <Footer />
      </Layout.Content>
    </Layout>
  );
};

export default ServicesPage;