import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MenuOutlined, HomeOutlined } from "@ant-design/icons";
import { Layout, Menu, Drawer, Button } from "antd";
import "../../styles/ResponsiveNav/ResponsiveNav.css"; // Import SCSS file

const { Header } = Layout;

interface ResponsiveNavProps {
  paths: { name: string; path: string }[];
}

export const ResponsiveNav: React.FC<ResponsiveNavProps> = ({ paths }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [drawerVisible, setDrawerVisible] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const isNowMobile = window.innerWidth < 768;
      if (isNowMobile !== isMobile) {
        setIsMobile(isNowMobile);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMobile]);

  const menuItems = (
    <div className="menu-items">
      {paths.map((path) => (
        <div key={path.name}>
          <Link to={path.path}>{path.name}</Link>
        </div>
      ))}
    </div>
  );

  return isMobile ? (
    <>
      {/* Mobile Header */}
      <Header className="mobile-header">
        <div className="logo-container">
          <span className="logo">César Vidros</span>
        </div>
        <Button
          type="text"
          icon={<MenuOutlined style={{ fontSize: "1.5rem", color: "#fff" }} />}
          onClick={() => setDrawerVisible(true)}
          className="menu-button"
        />
      </Header>
      {/* Mobile Menu Drawer */}
      <Drawer
        title="Menu"
        placement="right"
        closable={false}
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
        className="mobile-drawer"
      >
        <div className="mobile-items">{menuItems}</div>
      </Drawer>
    </>
  ) : (
    // Desktop Header
    <header className="desktop-header">
      <div className="logo-container">
        <img src="logo.png" alt="Logo" className="logo-img" />
        <span className="logo-text">César Vidros</span>
      </div>
      <div
        className="header-items"
      >
        {menuItems}
      </div>
    </header>
  );
};