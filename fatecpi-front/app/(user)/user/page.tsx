"use client";

import React from "react";

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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { ServiceRequest } from "@/app/types/service_request";

import "./page.css";

export default function BudgetPage() {
  const form = useForm<ServiceRequest>({
    defaultValues: {
      cor_vidro: "",
      cor_aluminio: "",
      puxador: "",
      fechadura: "",
      estado: "em andamento",
      sub_produto: "",
      largura: 0,
      altura: 0,
    },
  });

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
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="form">
          <div className="form-title">
            <h2 className="form-title-text">Formulário de Orçamento</h2>
          </div>
          <div className="form-fields">
            <FormField
              control={form.control}
              name="sub_produto"
              render={({ field }) => (
                <FormItem className="form-item">
                  <FormLabel className="label">Produto</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="select-trigger">
                        <SelectValue placeholder="Selecione uma opção" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="select-content">
                      <SelectItem className="select-item" value="1">Sub Produto 1</SelectItem>
                      <SelectItem className="select-item" value="2">Sub Produto 2</SelectItem>
                      <SelectItem className="select-item" value="3">Sub Produto 3</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="largura"
              render={({ field }) => (
                <FormItem className="form-item">
                  <FormLabel className="label">Largura</FormLabel>
                  <FormControl>
                    <Input className="input" type="number" placeholder="Largura" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="altura"
              render={({ field }) => (
                <FormItem className="form-item">
                  <FormLabel className="label">Altura</FormLabel>
                  <FormControl>
                    <Input className="input" type="number" placeholder="Altura" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cor_vidro"
              render={({ field }) => (
                <FormItem className="form-item">
                  <FormLabel className="label">Cor do Vidro</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="select-trigger">
                        <SelectValue placeholder="Selecione a cor do vidro" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="select-content">
                      <SelectItem className="select-item" value="incolor">Incolor</SelectItem>
                      <SelectItem className="select-item" value="verde">Verde</SelectItem>
                      <SelectItem className="select-item" value="fume">Fumê</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cor_aluminio"
              render={({ field }) => (
                <FormItem className="form-item">
                  <FormLabel className="label">Cor do Alumínio</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="select-trigger">
                        <SelectValue placeholder="Selecione a cor do alumínio" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="select-content">
                      <SelectItem className="select-item" value="branco">Branco</SelectItem>
                      <SelectItem className="select-item" value="preto">Preto</SelectItem>
                      <SelectItem className="select-item" value="prata">Prata</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="puxador"
              render={({ field }) => (
                <FormItem className="form-item">
                  <FormLabel className="label">Puxador</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="select-trigger">
                        <SelectValue placeholder="Selecione o puxador" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="select-content">
                      <SelectItem className="select-item" value="puxador1">Puxador 1</SelectItem>
                      <SelectItem className="select-item" value="puxador2">Puxador 2</SelectItem>
                      <SelectItem className="select-item" value="puxador3">Puxador 3</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="fechadura"
              render={({ field }) => (
                <FormItem className="form-item">
                  <FormLabel className="label">Fechadura</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="select-trigger">
                        <SelectValue placeholder="Selecione o tipo de fechadura" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="select-content">
                      <SelectItem className="select-item" value="fechadura1">Fechadura 1</SelectItem>
                      <SelectItem className="select-item" value="fechadura2">Fechadura 2</SelectItem>
                      <SelectItem className="select-item" value="fechadura3">Fechadura 3</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="estado"
              render={({ field }) => (
                <FormItem className="form-item">
                  <FormLabel className="label">Estado</FormLabel>
                  <FormControl>
                    <Input className="input" placeholder="Estado" {...field} disabled />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="button-submit">
            <Button type="submit">Enviar</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
