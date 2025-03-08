import { Button, Tooltip } from "antd";
import React from "react";
import { WhatsAppOutlined } from '@ant-design/icons';

export const WhatsAppButton: React.FC = () => {
  const handleClick = () => {
    const phoneNumber = "12997242504"; 
    const message = "Olá, eu gostaria de um orçamento!"; 
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(url, "_blank");
  };

  return (
    <Tooltip title="Fale conosco pelo WhatsApp!" placement="left" style={{fontSize: '25px'}}>
      <Button
        type="primary"
        shape="circle"
        size="large"
        style={{
          width: '80px',
          height: '80px',
          position: "fixed",
          bottom: "35px",
          right: "35px",
          zIndex: 1000,
        }}
        onClick={handleClick}
      >
        <WhatsAppOutlined style={{ fontSize: '35px' }} />
      </Button>
    </Tooltip>
  );
};