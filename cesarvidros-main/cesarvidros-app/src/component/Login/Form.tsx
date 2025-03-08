import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import { useNavigate } from "react-router-dom";
import "../../styles/Form/Form.css";

type SignupProps = {
  name_user: string;
  email_user: string;
  password_user: string;
  password_confirmation_user: string;
};

type LoginProps = {
  email_user: string;
  password_user: string;
};

export const SignupForm = (props: SignupProps) => {
  const [name, setName] = useState(props.name_user);
  const [email, setEmail] = useState(props.email_user);
  const [password, setPassword] = useState(props.password_user);
  const [password_confirmation, setPasswordConfirmation] = useState(
    props.password_confirmation_user
  );
  const [error, setError] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (password === password_confirmation) {
      setError("");
      alert("Success");
    } else {
      setError("Password and password confirmation must be the same");
    }
  };

  return (
    <Form onSubmitCapture={handleSubmit}>
      <Form.Item className="auth-input">
        <label htmlFor="name">Name</label>
        <Input
          id="name"
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Form.Item>
      <Form.Item className="auth-input">
        <label htmlFor="email">Email</label>
        <Input
          id="email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Item>
      <Form.Item className="auth-input">
        <label htmlFor="password">Password</label>
        <Input
          id="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Item>
      <Form.Item className="auth-input">
        <label htmlFor="password_confirmation">Password Confirmation</label>
        <Input
          id="password_confirmation"
          type="password"
          placeholder="Password Confirmation"
          value={password_confirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
        />
      </Form.Item>
      <Form.Item>
        <Button className="auth-button" htmlType="submit">
          Sign Up
        </Button>
      </Form.Item>
      {error && <p className="auth-error">{error}</p>}
    </Form>
  );
};

export const LoginForm = (props: LoginProps) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState(props.email_user);
  const [password, setPassword] = useState(props.password_user);
  const [error, setError] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (email === "test@example.com" && password === "password") {
      setError("");
      alert("Success");
      navigate("user/home");
    } else {
      setError("Email or password is incorrect");
    }
  };

  return (
    <Form onSubmitCapture={handleSubmit}>
      <Form.Item className="auth-input">
        <label htmlFor="email">Email</label>
        <Input
          id="email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Item>
      <Form.Item
        className="auth-input"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <label htmlFor="password">Password</label>
        <Input
          id="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Item>
      <Form.Item>
        <Button className="auth-button" htmlType="submit">
          Login
        </Button>
      </Form.Item>
      {error && <p className="auth-error">{error}</p>}
    </Form>
  );
};
