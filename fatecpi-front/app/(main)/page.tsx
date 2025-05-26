"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

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

const signUpSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  email: z.string().email("Email inválido"),
  senha: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
  data_nascimento: z.string().min(1, "Data de nascimento é obrigatória"),
  rua: z.string().min(1, "Rua é obrigatória"),
  estado: z.string().min(1, "Estado é obrigatório"),
  cidade: z.string().min(1, "Cidade é obrigatória"),
  numero: z.string().min(1, "Número da casa é obrigatório"),
  numeroTelefone: z.string().min(1, "Número de telefone é obrigatório"),
});

const signInSchema = z.object({
  email: z.string().email("Email inválido"),
  senha: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
});

type SignUpFormData = z.infer<typeof signUpSchema>;
type SignInFormData = z.infer<typeof signInSchema>;

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false);

  const signUpForm = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  const signInForm = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
  });

  const handleSignUp = async (data: SignUpFormData) => {
    console.log("Sign Up Data:", data);

    const res = await createUser(
      data.nome,
      data.email,
      data.senha,
      "user",
      data.data_nascimento,
      "https://fatecpi-cesarvidros-1.onrender.com/auth/register"
    );

    if (res && res.ok) {
      const json = await res.json();
      const usuario_id = json.userId;

      await createAdress(
        usuario_id,
        data.rua,
        data.estado,
        data.cidade,
        data.numero,
        "https://fatecpi-cesarvidros-1.onrender.com/auth/endereco"
      );

      await createPhone(
        usuario_id,
        data.numeroTelefone,
        "https://fatecpi-cesarvidros-1.onrender.com/auth/telefone"
      );

      alert("Usuário cadastrado com sucesso!");
      window.location.reload();
    }
  };

  const handleSignIn = async (data: SignInFormData) => {
    try {
      const res = await loginUser(
        data.email,
        data.senha,
        "https://fatecpi-cesarvidros-1.onrender.com/auth/login"
      );

      const json = await res.json();

      if (res.status === 200) {
        alert(json.message);
      }
    } catch (err) {
      console.error("Erro ao fazer login:", err);
    }
  };

  return (
    <div className="auth-page">
      {isSignUp ? (
        <form
          onSubmit={signUpForm.handleSubmit(handleSignUp)}
          className="form signup"
        >
          <h2 className="form-title">Cadastro</h2>
          <div className="form-fields">
            <Input
              className="input"
              placeholder="Nome"
              {...signUpForm.register("nome")}
            />
            <Input
              className="input"
              type="email"
              placeholder="Email"
              {...signUpForm.register("email")}
            />
            <Input
              className="input"
              type="password"
              placeholder="Senha"
              {...signUpForm.register("senha")}
            />
            <Input
              className="input"
              type="date"
              placeholder="Data de Nascimento"
              {...signUpForm.register("data_nascimento")}
            />
            <Input
              className="input"
              placeholder="Rua"
              {...signUpForm.register("rua")}
            />

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

            <Input
              className="input"
              placeholder="Cidade"
              {...signUpForm.register("cidade")}
            />
            <Input
              className="input"
              placeholder="Número da Casa"
              {...signUpForm.register("numero")}
            />
            <Input
              className="input"
              placeholder="Número de Telefone"
              {...signUpForm.register("numeroTelefone")}
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
            <Input
              className="input"
              placeholder="Email"
              {...signInForm.register("email")}
            />
            <Input
              className="input"
              type="password"
              placeholder="Senha"
              {...signInForm.register("senha")}
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
            Não tem uma conta?{" "}
            <span style={{ color: "#174cdf" }}>Crie uma</span>
          </Button>
        </form>
      )}
    </div>
  );
}
