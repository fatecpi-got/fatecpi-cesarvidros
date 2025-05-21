"use client";

import React, { useState } from "react";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { AuthSignUp, AuthSignIn } from "../types/auth";

import "./auth.css";

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false);

  const formSignUp = useForm<AuthSignUp>({
    defaultValues: {
      nome: "",
      email: "",
      senha: "",
      tipo_acesso: "user",
      data_nascimento: "",
      rua: "",
      estado: "",
      cidade: "",
      numero_casa: "",
      numero_telefone: "",
    },
  });

  const formSignIn = useForm<AuthSignIn>({
    defaultValues: {
      email: "",
      senha: "",
    },
  });

  const onSubmitSignUp = (data: AuthSignUp) => {
    console.log("Sign Up Data: ", data);
    // Aqui você pode fazer a chamada para a API de registro
  };

  const onSubmitSignIn = (data: AuthSignIn) => {
    console.log("Sign In Data: ", data);
    // Aqui você pode fazer a chamada para a API de login
  };

  return (
    <div className="auth-page">
      {isSignUp ? (
        <Form {...formSignUp}>
          <form
            onSubmit={formSignUp.handleSubmit(onSubmitSignUp)}
            className="form signup"
          >
            <h2 className="form-title">Cadastro</h2>
            <div className="form-fields">
              <FormField
                control={formSignUp.control}
                name="nome"
                render={({ field }) => (
                  <FormItem className="form-item">
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input placeholder="Nome" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={formSignUp.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="form-item">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={formSignUp.control}
                name="senha"
                render={({ field }) => (
                  <FormItem className="form-item">
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <Input placeholder="Senha" type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={formSignUp.control}
                name="tipo_acesso"
                render={({ field }) => (
                  <FormItem className="form-item">
                    <FormLabel>Tipo de Acesso</FormLabel>
                    <FormControl>
                      <Input placeholder="Tipo de Acesso" {...field} disabled />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={formSignUp.control}
                name="data_nascimento"
                render={({ field }) => (
                  <FormItem className="form-item">
                    <FormLabel>Data de Nascimento</FormLabel>
                    <FormControl>
                      <Input placeholder="Data de Nascimento" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={formSignUp.control}
                name="rua"
                render={({ field }) => (
                  <FormItem className="form-item">
                    <FormLabel>Rua</FormLabel>
                    <FormControl>
                      <Input placeholder="Rua" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={formSignUp.control}
                name="estado"
                render={({ field }) => (
                  <FormItem className="form-item">
                    <FormLabel>Estado</FormLabel>
                    <FormControl>
                      <Input placeholder="Estado" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={formSignUp.control}
                name="cidade"
                render={({ field }) => (
                  <FormItem className="form-item">
                    <FormLabel>Cidade</FormLabel>
                    <FormControl>
                      <Input placeholder="Cidade" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={formSignUp.control}
                name="numero_casa"
                render={({ field }) => (
                  <FormItem className="form-item">
                    <FormLabel>Número da Casa</FormLabel>
                    <FormControl>
                      <Input placeholder="Número da Casa" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={formSignUp.control}
                name="numero_telefone"
                render={({ field }) => (
                  <FormItem className="form-item">
                    <FormLabel>Número de Telefone</FormLabel>
                    <FormControl>
                      <Input placeholder="Número de Telefone" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" className="button-submit">Registrar</Button>
            <Button className="button-redirect" onClick={() => setIsSignUp(!isSignUp)}>
              {isSignUp
                ? "Já tem uma conta? Faça login"
                : "Não tem uma conta? Crie uma"}
            </Button>
          </form>
        </Form>
      ) : (
        <Form {...formSignIn}>
          <form onSubmit={formSignIn.handleSubmit(onSubmitSignIn)} className="form signin">
            <h2 className="form-title">Entrar</h2>
            <div className="form-fields">
              <FormField
                control={formSignIn.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="form-item">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={formSignIn.control}
                name="senha"
                render={({ field }) => (
                  <FormItem className="form-item">
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <Input placeholder="Senha" type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" className="button-submit">Entrar</Button>
            <Button className="button-redirect" onClick={() => setIsSignUp(!isSignUp)}>
              {isSignUp
                ? "Já tem uma conta? Faça login"
                : "Não tem uma conta? Crie uma"}
            </Button>
          </form>
        </Form>
      )}
    </div>
  );
}
