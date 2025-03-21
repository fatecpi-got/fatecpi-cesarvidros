import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  MenuOutlined,
  LoginOutlined,
  LogoutOutlined,
  DeploymentUnitOutlined,
} from "@ant-design/icons";
import { Layout, Drawer, Button } from "antd";
import "../../styles/ResponsiveNav/ResponsiveNav.css"; // Import SCSS file

const { Header } = Layout;

interface ResponsiveNavProps {
  paths: { name: string; path: string }[];
}

export const ResponsiveNav: React.FC<ResponsiveNavProps> = ({ paths }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [drawerVisible, setDrawerVisible] = useState(false);

  const navigate = useNavigate();

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

  const isAuthenticated = !!sessionStorage.getItem("auth_user");

  const handleSignOut = () => {
    sessionStorage.removeItem("auth_user"); // Remove the auth_user key
    navigate("/"); // Redirect to the home page
  };

  const loginButton = (
    <Button
      icon={<LoginOutlined />}
      className="login-button"
      onClick={() => navigate("/login")}
    >
      Login
    </Button>
  );

  const signOutButton = (
    <Button
      type="default"
      icon={<LogoutOutlined />}
      style={{ marginLeft: "1rem" }}
      onClick={handleSignOut}
    >
      Sign Out
    </Button>
  );

  return isMobile ? (
    <>
      {/* Mobile Header */}
      <Header className="mobile-header">
        <div className="logo-container">
          <DeploymentUnitOutlined style={{ fontSize: "30px", color: "#fff" }} />
          <span className="logo">César Vidros</span>
        </div>
        <Button
          type="text"
          icon={<MenuOutlined style={{ fontSize: "30px", color: "#fff" }} />}
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
        {/* Conditionally render login or sign-out button */}
        <div style={{ marginTop: "1rem" }} className="mobile-button">
          {isAuthenticated ? signOutButton : loginButton}
        </div>
      </Drawer>
    </>
  ) : (
    // Desktop Header
    <header className="desktop-header">
      <div className="logo-container">
        <DeploymentUnitOutlined style={{ fontSize: "36px", color: "#fff" }} />

        <span className="logo-text">César Vidros</span>
      </div>
      <div className="header-items">
        {menuItems}
        {/* Conditionally render login or sign-out button */}
        {isAuthenticated ? signOutButton : loginButton}
      </div>
    </header>
  );
};
