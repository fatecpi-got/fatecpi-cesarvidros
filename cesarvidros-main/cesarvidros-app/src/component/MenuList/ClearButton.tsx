import React from "react";
import { Button } from "antd";

interface ClearButtonProps {
  onClear: () => void;
}

export const ClearButton: React.FC<ClearButtonProps> = ({ onClear }) => {
  return (
    <Button className="clear-button" onClick={onClear} style={{ margin: "10px 0" }}>
      Mostrar todos
    </Button>
  );
};