import React, { useState, useEffect } from "react";

import { fetchBudget } from "../../../MockApi/BudgetApi";
import CardBudget from "../CardBudget/CardBudget";

interface CardBudgetProps {
  name: string;
  email: string;
  phone: string;
  productType: string;
  dimensions: string;
  additionalDetails: string;
  status: string;
}
const RequestBudget = () => {
  const [budgets, setBudgets] = useState<CardBudgetProps[]>([]);

  useEffect(() => {
    fetchBudget().then(async (data) => {
      const budgets = await data;

      setBudgets(budgets as CardBudgetProps[]);
    });
  }, []);

  return (
    <ul
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(400px, 1fr))",
        gap: "1rem",
        padding: '20px'
      }}
    >
      {budgets.map((budget) => {
        return (
          <CardBudget
            key={budget.email}
            name={"Pedido de: " + budget.name}
            email={budget.email}
            phone={budget.phone}
            productType={budget.productType}
            dimensions={budget.dimensions}
            additionalDetails={budget.additionalDetails}
            statusBudget={budget.status}
          />
        );
      })}
    </ul>
  );
};

export default RequestBudget;
