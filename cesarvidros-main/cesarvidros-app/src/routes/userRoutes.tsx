import React, { lazy } from "react";
import { Route } from "react-router-dom";
const AboutPage = lazy(() => import("../Page/AboutPage"));
const BudgetPage = lazy(() => import("../Page/BudgetPage"));
const HomePage = lazy(() => import("../Page/HomePage"));
const ProjectsPage = lazy(() => import("../Page/ProjectsPage"));
const ServicesPage = lazy(() => import("../Page/ServicesPage"));

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
