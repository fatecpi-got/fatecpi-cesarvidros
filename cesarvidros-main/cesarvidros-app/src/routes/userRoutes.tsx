import React, { lazy } from "react";
import { Route } from "react-router-dom";
const AboutPage = lazy(() => import("../Page/User/AboutPage"));
const BudgetPage = lazy(() => import("../Page/User/BudgetPage"));
const HomePage = lazy(() => import("../Page/User/HomePage"));
const ProjectsPage = lazy(() => import("../Page/User/ProjectsPage"));
const ServicesPage = lazy(() => import("../Page/User/ServicesPage"));

export const UserRoutes = () => {
  const auth = sessionStorage.getItem("auth_user");

  return (
    <>
      <Route path="/" element={<HomePage />} />
      <Route path="/sobre" element={<AboutPage />} />
      <Route path="/servicos" element={<ServicesPage />} />
      <Route path="/projetos" element={<ProjectsPage />} />
      {auth && <Route path="/orcamentos" element={<BudgetPage />} />}
    </>
  );
};
