"use client";

import React from "react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";

// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

import { ServiceRequest } from "@/app/types/service_request";

import "./page.css";

const serviceRequestSchema = z.object({
  cor_vidro: z.string().min(1, "Cor do vidro é obrigatória"),
  cor_aluminio: z.string().min(1, "Cor do alumínio é obrigatória"),
  puxador: z.string().min(1, "Puxador é obrigatório"),
  fechadura: z.string().min(1, "Fechadura é obrigatória"),
  estado: z.string().default("em andamento"),
  sub_produto: z.string().min(1, "Sub produto é obrigatório"),
  largura: z.number().min(0, "Largura deve ser um número positivo").max(1000, "Largura não pode ser maior que 1000"),
  altura: z.number().min(0, "Altura deve ser um número positivo").max(1000, "Altura não pode ser maior que 1000"),
})

export default function BudgetPage() {
  const form = useForm<ServiceRequest>({
    resolver: zodResolver(serviceRequestSchema),
  })

  const onSubmit = (data: ServiceRequest) => {
    console.log("Form Data: ", data);
    // Aqui você pode fazer a chamada para a API de registro
    form.reset();
  };

  const WelcomeBudget = () => {
    return (
      <div className="welcome-budget">
        <h1 className="welcome-title">Bem-vindo ao nosso orçamento!</h1>
        <p className="welcome-text">
          Preencha o formulário para receber um orçamento personalizado.
        </p>
      </div>
    );
  }

  return (
    <div className="budget-page">
      <WelcomeBudget />
        <form onSubmit={form.handleSubmit(onSubmit)} className="form">
          <div className="form-title">
            <h2 className="form-title-text">Formulário de Orçamento</h2>
          </div>
          <div className="form-fields">
            
          </div>
          <div className="button-submit">
            <Button type="submit">Enviar</Button>
          </div>
        </form>
    </div>
  );
}
