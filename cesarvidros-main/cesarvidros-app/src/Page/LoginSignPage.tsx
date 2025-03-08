import React, { useState } from "react";
import { Layout } from "antd";

import { LoginForm } from "../component/Login/Form";
import { SignupForm } from "../component/Login/Form";
import "../styles/FormPage/FormPage.css";

const LoginSignPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  const handleLogin = () => {
    setIsLogin(true);
  };

  const handleSignup = () => {
    setIsLogin(false);
  };

  return (
    <Layout className="login-sign-page" style={{overflow: "auto", minHeight: '100vh', backgroundColor: "#1e1e1e" }}>
        <Layout.Content>
          <div className="login-sign-page__container">
          <h1 className="auth-title" style={{color: 'white', textTransform: 'uppercase'}}>{isLogin ? "Login" : "Sign Up"}</h1>
          <div className="auth-form">
            {isLogin && <LoginForm email_user="" password_user="" />}
            {!isLogin && (
              <SignupForm
                name_user=""
                email_user=""
                password_user=""
                password_confirmation_user=""
              />
            )}
          </div>
            <div>
              {isLogin && (
                <div style={{color: "white", fontSize: "1rem"}}>
                  <p>Don't have an account? <span style={{color: '#0074d9', cursor: 'pointer'}} onClick={handleSignup}>Sign Up</span></p> 
                </div>
              )}
              {!isLogin && (
                <div style={{color: "white", fontSize: "1rem"}}>
                  <p>Already have an account? <span style={{color: '#0074d9', cursor: 'pointer'}} onClick={handleLogin}>Login</span></p>
                </div>
              )}
            </div>
          </div>
        </Layout.Content>
    </Layout>
  );
};

export default LoginSignPage;