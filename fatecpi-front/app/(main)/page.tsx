"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  createUser,
  createAdress,
  createPhone,
  loginUser,
} from "../api/authFetch";

import "./auth.css";

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false);

  // Sign Up States
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [data_nascimento, setDataNascimento] = useState("");
  const [rua, setRua] = useState("");
  const [estado, setEstado] = useState("");
  const [cidade, setCidade] = useState("");
  const [numero, setNumeroCasa] = useState("");
  const [numeroTelefone, setNumeroTelefone] = useState("");

  // Sign In States
  const [emailSignIn, setEmailSignIn] = useState("");
  const [senhaSignIn, setSenhaSignIn] = useState("");

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Sign Up Data:", {
      nome,
      email,
      senha,
      data_nascimento,
      rua,
      estado,
      cidade,
      numero,
      numeroTelefone,
    });

    const res = await createUser(
      nome,
      email,
      senha,
      "user",
      data_nascimento,
      "https://fatecpi-cesarvidros-1.onrender.com/auth/register"
    );

    if (res && res.ok) {
      const json = await res.json();
      const usuario_id = json.userId;

      console.log("User Created:", json);
      console.log("User ID:", usuario_id);

      await createAdress(
        usuario_id,
        rua,
        estado,
        cidade,
        numero,
        "https://fatecpi-cesarvidros-1.onrender.com/auth/endereco"
      );

      await createPhone(
        usuario_id,
        numeroTelefone,
        "https://fatecpi-cesarvidros-1.onrender.com/auth/telefone"
      );

      alert("Usuário cadastrado com sucesso!");
      window.location.reload();
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const email = emailSignIn;
      const senha = senhaSignIn;

      const res = await loginUser(
        email,
        senha,
        "https://fatecpi-cesarvidros-1.onrender.com/auth/login"
      );

      const json = await res.json();

      if (res.status === 200) {
        alert(json.message);
      }

      console.log("Login Response:", json);

    } catch (err) {
      console.error("Erro ao fazer login:", err);
    }
  };

  return (
    <div className="auth-page">
      {isSignUp ? (
        <form onSubmit={handleSignUp} className="form signup">
          <h2 className="form-title">Cadastro</h2>
          <div className="form-fields">
            <Input
              className="input"
              name="nome"
              placeholder="Nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
            <Input
              className="input"
              name="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              className="input"
              name="senha"
              type="password"
              placeholder="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
            <Input
              className="input"
              name="data_nascimento"
              type="date"
              value={data_nascimento}
              onChange={(e) => setDataNascimento(e.target.value)}
            />
            <Input
              className="input"
              name="rua"
              placeholder="Rua"
              value={rua}
              onChange={(e) => setRua(e.target.value)}
            />

            <Select value={estado} onValueChange={(value) => setEstado(value)}>
              <SelectTrigger className="select-trigger">
                <SelectValue placeholder="Selecione o estado" />
              </SelectTrigger>
              <SelectContent className="select-content" position="popper">
                <SelectItem className="select-item" value="SP">São Paulo</SelectItem>
                <SelectItem className="select-item" value="RJ">Rio de Janeiro</SelectItem>
                <SelectItem className="select-item" value="MG">Minas Gerais</SelectItem>
                <SelectItem className="select-item" value="ES">Espírito Santo</SelectItem>
                <SelectItem className="select-item" value="PR">Paraná</SelectItem>
                <SelectItem className="select-item" value="RS">Rio Grande do Sul</SelectItem>
                <SelectItem className="select-item" value="SC">Santa Catarina</SelectItem>
                <SelectItem className="select-item" value="BA">Bahia</SelectItem>
                <SelectItem className="select-item" value="PE">Pernambuco</SelectItem>
                <SelectItem className="select-item" value="CE">Ceará</SelectItem>
                <SelectItem className="select-item" value="DF">Distrito Federal</SelectItem>
                <SelectItem className="select-item" value="MT">Mato Grosso</SelectItem>
                <SelectItem className="select-item" value="MS">Mato Grosso do Sul</SelectItem>
                <SelectItem className="select-item" value="PA">Pará</SelectItem>
                <SelectItem className="select-item" value="AM">Amazonas</SelectItem>
                <SelectItem className="select-item" value="AC">Acre</SelectItem>
                <SelectItem className="select-item" value="RO">Rondônia</SelectItem>
                <SelectItem className="select-item" value="RR">Roraima</SelectItem>
                <SelectItem className="select-item" value="AP">Amapá</SelectItem>
                <SelectItem className="select-item" value="TO">Tocantins</SelectItem>
                <SelectItem className="select-item" value="AL">Alagoas</SelectItem>
                <SelectItem className="select-item" value="SE">Sergipe</SelectItem>
                <SelectItem className="select-item" value="PB">Paraíba</SelectItem>
                <SelectItem className="select-item" value="RN">Rio Grande do Norte</SelectItem>
                <SelectItem className="select-item" value="PI">Piauí</SelectItem>
                <SelectItem className="select-item" value="MA">Maranhão</SelectItem>
              </SelectContent>
            </Select>

            <Input
              className="input"
              name="cidade"
              placeholder="Cidade"
              value={cidade}
              onChange={(e) => setCidade(e.target.value)}
            />
            <Input
              className="input"
              name="numero_casa"
              placeholder="Número da Casa"
              value={numero}
              onChange={(e) => setNumeroCasa(e.target.value)}
            />
            <Input
              className="input"
              name="numero_telefone"
              placeholder="Número de Telefone"
              value={numeroTelefone}
              onChange={(e) => setNumeroTelefone(e.target.value)}
            />
          </div>
          <Button type="submit" className="button-submit">
            Registrar
          </Button>
          <Button
            type="button"
            className="button-redirect"
            onClick={() => setIsSignUp(false)}
          >
            Já tem uma conta? Faça login
          </Button>
        </form>
      ) : (
        <form onSubmit={handleSignIn} className="form signin">
          <h2 className="form-title">Entrar</h2>
          <div className="form-fields">
            <Input
              className="input"
              name="email"
              placeholder="Email"
              value={emailSignIn}
              onChange={(e) => setEmailSignIn(e.target.value)}
            />
            <Input
              className="input"
              name="senha"
              type="password"
              placeholder="Senha"
              value={senhaSignIn}
              onChange={(e) => setSenhaSignIn(e.target.value)}
            />
          </div>
          <Button type="submit" className="button-submit">
            Entrar
          </Button>
          <Button
            type="button"
            className="button-redirect"
            onClick={() => setIsSignUp(true)}
          >
            Não tem uma conta? Crie uma
          </Button>
        </form>
      )}
    </div>
  );
}
