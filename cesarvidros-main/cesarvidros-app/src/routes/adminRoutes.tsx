import React, { lazy } from "react";
import { Route } from "react-router-dom";

const BudgetPage = lazy(() => import("../Page/Admin/BudgetPage"));
const DashboardPage = lazy(() => import("../Page/Admin/DashboardPage"));

export const AdminRoutes = () => {
  return (
    <>
      <Route path="/admin" element={<BudgetPage />} />
      <Route path="/admin/dashboard" element={<DashboardPage />} />
    </>
  );
};
