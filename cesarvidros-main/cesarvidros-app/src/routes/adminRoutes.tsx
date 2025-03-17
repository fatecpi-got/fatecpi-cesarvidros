import React, { lazy } from "react";
import { Route } from "react-router-dom";

const BudgetPage = lazy(() => import("../Page/Admin/BudgetPage"));

export const AdminRoutes = () => {
  return (
    <>
      <Route path="/admin" element={<BudgetPage />} />
    </>
  );
};
