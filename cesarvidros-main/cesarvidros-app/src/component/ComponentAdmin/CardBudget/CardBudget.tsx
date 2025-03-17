import React from "react";
import Card from "antd/es/card/Card";

interface CardBudgetProps {
    name: string
    email: string
    phone: string
    productType: string
    dimensions: string
    additionalDetails: string
}

const CardBudget = ({name, email, phone, productType, dimensions, additionalDetails}: CardBudgetProps) => {
    return (
        <Card title={name} style={{margin: 10}}>
            <p>Email: {email}</p>
            <p>Telefone: {phone}</p>
            <p>Tipo de produto: {productType}</p>
            <p>Dimensões: {dimensions}</p>
            <p>Detalhes adicionais: {additionalDetails}</p>
        </Card>
    )
}

export default CardBudget;