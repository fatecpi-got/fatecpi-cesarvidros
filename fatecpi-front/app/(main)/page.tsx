"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { createUser, loginUser } from "../api/authFetch";

import "./auth.css";

const signUpSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  email: z.string().email("Email inválido"),
  senha: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
  data_nascimento: z.string().min(1, "Data de nascimento é obrigatória"),
  rua: z.string().min(1, "Rua é obrigatória"),
  estado: z.string().min(1, "Estado é obrigatório"),
  cidade: z.string().min(1, "Cidade é obrigatória"),
  numeroCasa: z.string().min(1, "Número da casa é obrigatório"),
  numeroTelefone: z.string().min(1, "Número de telefone é obrigatório"),
  cep: z.string().min(1, "CEP é obrigatório"),
});

const signInSchema = z.object({
  email: z.string().email("Email é obrigatório"),
  senha: z
    .string()
    .min(6, "Senha deve ter pelo menos 6 caracteres")
});

type SignUpFormData = z.infer<typeof signUpSchema>;
type SignInFormData = z.infer<typeof signInSchema>;

export default function AuthPage() {
  // REMOVA OU COMENTE ESTA LINHA:
  // window.localStorage.clear();

  const [isSignUp, setIsSignUp] = useState(false);

  const signUpForm = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  const signInForm = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
  });

  const handleSignUp = async (data: SignUpFormData) => {
    try {
      const res = await createUser(
        data.nome,
        data.email,
        data.senha,
        "user",
        data.data_nascimento,
        data.numeroTelefone,
        data.rua,
        data.cidade,
        data.estado,
        data.numeroCasa,
        data.cep,
        "http://localhost:3001/auth/register"
      );
      const json = await res.json();

      alert(json.message);
      setIsSignUp(false); // Switch to sign in after successful registration
    } catch (err) {
      console.error("Erro ao cadastrar usuário:", err);
      alert("Erro ao cadastrar usuário. Verifique os dados e tente novamente.");
      window.location.reload();
    }
  };

  const handleSignIn = async (data: SignInFormData) => {
    try {
      const res = await loginUser(
        data.email,
        data.senha,
        "http://localhost:3001/auth/login"
      );

      const json = await res.json();

      alert(json.message);

      if (res.status === 200) {
        if (json.userRole === "admin") {
          window.location.href = "/admin"
          return;
        }

        if (json.token && json.userId) {
          await window.localStorage.setItem("token", json.token);
          await window.localStorage.setItem("user_id", String(json.userId));
          window.location.href = "/user";
        } else {
          console.error("Token ou userId não encontrados na resposta da API.");
          alert("Erro no login: dados de autenticação incompletos.");
        }
      }
    } catch (err) {
      console.error("Erro ao fazer login:", err);
      alert("Erro ao fazer login. Verifique suas credenciais.");
    }
  };

  return (
    <div className="auth-page">
      <h1 className="auth-title">
        César Vidros
        <Image
          src="/logo_cesar.png"
          alt="Logo"
          className="logo"
          width={80}
          height={80}
        />
      </h1>
      {isSignUp ? (
        <form
          onSubmit={signUpForm.handleSubmit(handleSignUp)}
          className="form signup"
        >
          <h2 className="form-title">Cadastro</h2>
          <div className="form-fields">
            <div className="form-control">
              <Label>Nome</Label>
              <Input
                className="input"
                placeholder="Nome"
                {...signUpForm.register("nome")}
              />
              {signUpForm.formState.errors.nome && (
                <p className="error-message">
                  {signUpForm.formState.errors.nome.message}
                </p>
              )}
            </div>
            <div className="form-control">
              <Label>Email</Label>
              <Input
                className="input"
                type="email"
                placeholder="Email"
                {...signUpForm.register("email")}
              />
              {signUpForm.formState.errors.email && (
                <p className="error-message">
                  {signUpForm.formState.errors.email.message}
                </p>
              )}
            </div>
            <div className="form-control">
              <Label>Senha</Label>
              <Input
                className="input"
                type="password"
                placeholder="Senha"
                {...signUpForm.register("senha")}
              />
              {signUpForm.formState.errors.senha && (
                <p className="error-message">
                  {signUpForm.formState.errors.senha.message}
                </p>
              )}
            </div>
            <div className="form-control">
              <Label>Data de Nascimento</Label>
              <Input
                className="input"
                type="date"
                placeholder="Data de Nascimento"
                {...signUpForm.register("data_nascimento")}
              />
              {signUpForm.formState.errors.data_nascimento && (
                <p className="error-message">
                  {signUpForm.formState.errors.data_nascimento.message}
                </p>
              )}
            </div>
            <div className="form-control">
              <Label>Nome da Rua</Label>
              <Input
                className="input"
                placeholder="Rua"
                {...signUpForm.register("rua")}
              />
              {signUpForm.formState.errors.rua && (
                <p className="error-message">
                  {signUpForm.formState.errors.rua.message}
                </p>
              )}
            </div>

            <div className="form-control">
              <Label>Estado</Label>
              <Select
                onValueChange={(value) => signUpForm.setValue("estado", value)}
              >
                <SelectTrigger className="select-trigger">
                  <SelectValue placeholder="Selecione o estado" />
                </SelectTrigger>
                <SelectContent className="select-content" position="popper">
                  {[
                    "SP",
                    "RJ",
                    "MG",
                    "ES",
                    "PR",
                    "RS",
                    "SC",
                    "BA",
                    "PE",
                    "CE",
                    "DF",
                    "MT",
                    "MS",
                    "PA",
                    "AM",
                    "AC",
                    "RO",
                    "RR",
                    "AP",
                    "TO",
                    "AL",
                    "SE",
                    "PB",
                    "RN",
                    "PI",
                    "MA",
                  ].map((uf) => (
                    <SelectItem key={uf} value={uf} className="select-item">
                      {uf}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {signUpForm.formState.errors.estado && (
                <p className="error-message">
                  {signUpForm.formState.errors.estado.message}
                </p>
              )}
            </div>

            <div className="form-control">
              <Label>Cidade</Label>
              <Input
                className="input"
                placeholder="Cidade"
                {...signUpForm.register("cidade")}
              />
              {signUpForm.formState.errors.cidade && (
                <p className="error-message">
                  {signUpForm.formState.errors.cidade.message}
                </p>
              )}
            </div>
            <div className="form-control">
              <Label>Número da Casa</Label>
              <Input
                className="input"
                placeholder="Número da Casa"
                {...signUpForm.register("numeroCasa")}
              />
              {signUpForm.formState.errors.numeroCasa && (
                <p className="error-message">
                  {signUpForm.formState.errors.numeroCasa.message}
                </p>
              )}
            </div>
            <div className="form-control">
              <Label>Telefone</Label>
              <Input
                className="input"
                placeholder="Número de Telefone"
                {...signUpForm.register("numeroTelefone")}
              />
              {signUpForm.formState.errors.numeroTelefone && (
                <p className="error-message">
                  {signUpForm.formState.errors.numeroTelefone.message}
                </p>
              )}
            </div>
            <div className="form-control">
              <Label>CEP</Label>
              <Input
                className="input"
                placeholder="CEP"
                {...signUpForm.register("cep")}
              />
              {signUpForm.formState.errors.cep && (
                <p className="error-message">
                  {signUpForm.formState.errors.cep.message}
                </p>
              )}
            </div>
          </div>
          <Button type="submit" className="button-submit">
            Registrar
          </Button>
          <Button
            type="button"
            className="button-redirect"
            onClick={() => setIsSignUp(false)}
          >
            Já tem uma conta?{" "}
            <span style={{ color: "#174cdf" }}>Faça login</span>
          </Button>
        </form>
      ) : (
        <form
          onSubmit={signInForm.handleSubmit(handleSignIn)}
          className="form signin"
        >
          <h2 className="form-title">Entrar</h2>
          <div className="form-fields">
            <div className="form-control">
              <Label>Email</Label>
              <Input
                className="input"
                placeholder="Email"
                {...signInForm.register("email")}
              />
              {signInForm.formState.errors.email && (
                <p className="error-message">
                  {signInForm.formState.errors.email.message}
                </p>
              )}
            </div>
            <div className="form-control">
              <Label>Senha</Label>
              <Input
                className="input"
                type="password"
                placeholder="Senha"
                {...signInForm.register("senha")}
              />
              {signInForm.formState.errors.senha && (
                <p className="error-message">
                  {signInForm.formState.errors.senha.message}
                </p>
              )}
            </div>
          </div>
          <Button type="submit" className="button-submit">
            Entrar
          </Button>
          <Button
            type="button"
            className="button-redirect"
            onClick={() => setIsSignUp(true)}
          >
            Não tem uma conta?{" "}
            <span style={{ color: "#174cdf" }}>Crie uma</span>
          </Button>
        </form>
      )}
      <div className="copy-right">
        <p>
          © 2024 César Vidros. Todos os direitos reservados. Desenvolvido por{" "}
          <span style={{ fontStyle: "italic" }}>Lovelace Solutions</span>
        </p>
      </div>
    </div>
  );
}