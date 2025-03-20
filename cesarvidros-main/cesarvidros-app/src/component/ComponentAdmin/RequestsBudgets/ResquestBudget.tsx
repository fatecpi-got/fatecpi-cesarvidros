import React, {useState, useEffect} from "react";

import { fetchBudget } from "../../../MockApi/BudgetApi";
import CardBudget from "../CardBudget/CardBudget";

interface CardBudgetProps {
    name: string
    email: string
    phone: string
    productType: string
    dimensions: string
    additionalDetails: string
    status: string
}
const RequestBudget = () => {
    const [budgets, setBudgets] = useState<CardBudgetProps[]>([])

    useEffect(() => {
        fetchBudget().then(async (data) => {
            const budgets = await data;

            setBudgets(budgets as CardBudgetProps[])
        })
    }, [])

    return (
        <>
            {budgets.map((budget) => {
                return <CardBudget 
                    key={budget.email} 
                    name={budget.name} 
                    email={budget.email} 
                    phone={budget.phone} 
                    productType={budget.productType} 
                    dimensions={budget.dimensions} 
                    additionalDetails={budget.additionalDetails} 
                    statusBudget={budget.status}
                />
            })}
        </>
    )
}

export default RequestBudget;