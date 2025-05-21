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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { ServiceRequest } from "@/app/types/service_request";

export default function BudgetPage() {
  const form = useForm<ServiceRequest>({
    defaultValues: {
      cor_vidro: "",
      cor_aluminio: "",
      puxador: "",
      fechadura: "",
      estado: "em andamento",
      sub_produto_id: 0,
      largura: 0,
      altura: 0,
    },
  });

  const onSubmit = (data: ServiceRequest) => {
    console.log("Form Data: ", data);
    // Aqui você pode fazer a chamada para a API de registro
  };

  return (
    <div className="budget-page">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="sub_produto_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sub Produto ID</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value?.toString()}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma opção" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="1">Sub Produto 1</SelectItem>
                    <SelectItem value="2">Sub Produto 2</SelectItem>
                    <SelectItem value="3">Sub Produto 3</SelectItem>
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
              <FormItem>
                <FormLabel>Largura</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Largura" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="altura"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Altura</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Altura" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="cor_vidro"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cor do Vidro</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a cor do vidro" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="incolor">Incolor</SelectItem>
                    <SelectItem value="verde">Verde</SelectItem>
                    <SelectItem value="fume">Fumê</SelectItem>
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
              <FormItem>
                <FormLabel>Cor do Alumínio</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a cor do alumínio" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="branco">Branco</SelectItem>
                    <SelectItem value="preto">Preto</SelectItem>
                    <SelectItem value="prata">Prata</SelectItem>
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
              <FormItem>
                <FormLabel>Puxador</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o puxador" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="puxador1">Puxador 1</SelectItem>
                    <SelectItem value="puxador2">Puxador 2</SelectItem>
                    <SelectItem value="puxador3">Puxador 3</SelectItem>
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
              <FormItem>
                <FormLabel>Fechadura</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo de fechadura" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="fechadura1">Fechadura 1</SelectItem>
                    <SelectItem value="fechadura2">Fechadura 2</SelectItem>
                    <SelectItem value="fechadura3">Fechadura 3</SelectItem>
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
              <FormItem>
                <FormLabel>Estado</FormLabel>
                <FormControl>
                  <Input placeholder="Estado" {...field} disabled />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="button-submit">
            <Button type="submit">Enviar</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
