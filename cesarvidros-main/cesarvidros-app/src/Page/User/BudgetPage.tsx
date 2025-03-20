import React from "react";
import { Layout } from "antd";

import { ResponsiveNav } from "../../component/Aside/Aside";
import { BudgetForm } from "../../component/BudgetForm/BudgetForm";
import { Footer } from "../../component/Footer/FooterComponent";
import { WhatsAppButton } from "../../component/Whatsapp/WhatsappButton";
import { BannerComponent } from "../../component/Banner/Banner";

const auth = sessionStorage.getItem("auth_user");

const paths = [
  { name: "Início", path: "/" },
  { name: "Sobre", path: "/sobre" },
  { name: "Projetos", path: "/projetos" },
  ...(auth ? [{ name: "Orçamentos", path: "/orcamentos" }] : []),
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