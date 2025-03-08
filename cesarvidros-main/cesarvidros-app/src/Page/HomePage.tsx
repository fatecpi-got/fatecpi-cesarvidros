import React from "react";
import { Layout } from "antd";
import { ResponsiveNav } from "../component/Aside/Aside";
import { BannerComponent } from "../component/Banner/Banner";
import { CarouselCardServico } from "../component/CardCarousel/CardCarouselServico";
import { CarouselCardCategoria } from "../component/CardCarousel/CardCarouselProjetos";
import { Footer } from "../component/Footer/FooterComponent";

import '../styles/HomePage/HomePage.css'

const paths = [
  { name: "Início", path: "/user/home" },
  { name: "Sobre", path: "/user/sobre" },
  { name: "Serviços", path: "/user/servicos" },
  { name: "Projetos", path: "/user/projetos" },
  { name: "Orçamentos", path: "/user/orcamentos" },
]

const HomePage: React.FC = () => {

  return (
    <Layout style={{ maxHeight: "100vh" }}>

      <ResponsiveNav paths={paths} />
      <Layout.Content style={{padding: '20px', overflow: 'auto', backgroundColor: '#1e1e1e'}}>
        <BannerComponent title="César Vidros" />
          <div className="carousel-title">Projetos</div>
          <CarouselCardServico />
          <div className="carousel-title">Serviços oferecidos</div>
          <CarouselCardCategoria />
         <Footer />
      </Layout.Content>
    </Layout>
  );
};

export default HomePage;