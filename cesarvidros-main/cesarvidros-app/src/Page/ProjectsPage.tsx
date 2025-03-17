import React from "react";
import { ResponsiveNav } from "../component/Aside/Aside";
import { MenuCategoria } from "../component/MenuProjects/MenuProjects";
import { WhatsAppButton } from "../component/Whatsapp/WhatsappButton";
import { BannerComponent } from "../component/Banner/Banner";
import { Footer } from "../component/Footer/FooterComponent";
import { Layout } from "antd";

const auth = sessionStorage.getItem("auth_user");

const paths = [
  { name: "Início", path: "/" },
  { name: "Sobre", path: "/sobre" },
  { name: "Serviços", path: "/servicos" },
  { name: "Projetos", path: "/projetos" },
  ...(auth ? [{ name: "Orçamentos", path: "/orcamentos" }] : []),
]

const ProjectsPage: React.FC = () => {
  const style = {
    backgroundColor: "#f5f5f5 ",
  };

  return (
    <Layout>

      <ResponsiveNav paths={paths}/>
      <Layout.Content style={style} className="content-">
        <BannerComponent title="Projetos"/>
        <MenuCategoria />
        <WhatsAppButton />
        <Footer />
      </Layout.Content>
    </Layout>
  );
};

export default ProjectsPage;