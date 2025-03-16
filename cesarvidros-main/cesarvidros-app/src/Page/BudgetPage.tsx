import React from "react";
import { Layout } from "antd";

import { ResponsiveNav } from "../component/Aside/Aside";
import { BudgetForm } from "../component/BudgetForm/BudgetForm";
import { Footer } from "../component/Footer/FooterComponent";
import { WhatsAppButton } from "../component/Whatsapp/WhatsappButton";
import { BannerComponent } from "../component/Banner/Banner";

const paths = [
  { name: "Início", path: "/user/home" },
  { name: "Sobre", path: "/user/sobre" },
  { name: "Serviços", path: "/user/servicos" },
  { name: "Projetos", path: "/user/projetos" },
  { name: "Orçamentos", path: "/user/orcamentos" },
]

const BudgetPage: React.FC = () => {
  return (
    <Layout>
      <ResponsiveNav paths={paths} />
      <Layout.Content style={{backgroundColor: "#d6d5d5 "}}>
        <BannerComponent title="Orçamentos"/>
        <BudgetForm />
        <WhatsAppButton />
        <Footer />
      </Layout.Content>
    </Layout>
  );
};

export default BudgetPage;