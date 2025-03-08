import React from "react";
import { Layout } from "antd";
import '../../styles/Footer/Footer.css'

export const Footer: React.FC = () => {
  return (
    <Layout.Footer className="custom-footer" style={{marginTop: '15px'}}>
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} Your Company. All Rights Reserved.</p>
      </div>
    </Layout.Footer>
  );
};
