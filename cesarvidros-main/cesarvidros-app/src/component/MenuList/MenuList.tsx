import React from "react";
import { Menu } from "antd";

interface MenuListProps {
  items: any[];
  onClick: (e: { key: string }) => void;
  selectedKey: string | null;
}

export const MenuList: React.FC<MenuListProps> = ({ items, onClick, selectedKey }) => {
  return (
    <Menu
      mode="horizontal"
      items={items}
      onClick={onClick}
      selectedKeys={selectedKey ? [selectedKey] : []}
      theme="dark"
      style={{ color: "white" }}
    />
  );
};