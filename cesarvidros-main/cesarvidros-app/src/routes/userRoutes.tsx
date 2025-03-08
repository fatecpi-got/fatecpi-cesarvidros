import React, {Suspense, lazy} from "react";
import { Route } from "react-router-dom";
const LoginSignPage = lazy(() => import("../Page/LoginSignPage")) ;
const AboutPage = lazy(() => import("../Page/AboutPage")) ;
const BudgetPage = lazy(() => import("../Page/BudgetPage")) ;
const HomePage = lazy(() => import("../Page/HomePage")) ;
const ProjectsPage = lazy(() => import("../Page/ProjectsPage")) ;
const ServicesPage = lazy(() => import("../Page/ServicesPage")) ;

export const UserRoutes = () => {
    return (
          <>
            <Route path="/" element={<LoginSignPage />} />
            <Route path="/user/home" element={<HomePage />} />
            <Route path="/user/sobre" element={<AboutPage />} />
            <Route path="/user/servicos" element={<ServicesPage />} />
            <Route path="/user/projetos" element={<ProjectsPage />} />
            <Route path="/user/orcamentos" element={<BudgetPage />} />
          </>
    )
}