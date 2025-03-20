import React from "react";
import Card from "antd/es/card/Card";
import { Button } from "antd";
import {
  MailOutlined,
  PhoneOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import "../../../styles/Admin/CardBudget/CardBudget.css";

interface CardBudgetProps {
  name: string;
  email: string;
  phone: string;
  productType: string;
  dimensions: string;
  additionalDetails: string;
  statusBudget: string;
}

const CardBudget = ({
  name,
  email,
  phone,
  productType,
  dimensions,
  additionalDetails,
  statusBudget,
}: CardBudgetProps) => {
  return (
    <Card title={name} className="card-budget">
      <div className="card-content">
        <div className="contact-info">
          <p>
            <MailOutlined /> Email: {email}
          </p>
          <p>
            <PhoneOutlined /> Telefone: {phone}
          </p>
        </div>

        <div className="product-info">
          <p>
            <InfoCircleOutlined /> Tipo de Produto: {productType}
          </p>
          <p>Dimensões: {dimensions}</p>
        </div>

        <p className="additional-details">
          Detalhes Adicionais: {additionalDetails}
        </p>
      </div>
      
      <div className="card-footer">
        <Button>Aceitar Pedido</Button>
        <Button>Rejeitar Pedido</Button>
      </div>
    </Card>
  );
};

export default CardBudget;
