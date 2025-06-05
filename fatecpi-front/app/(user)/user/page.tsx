"use client";

import React, { useEffect, useState } from "react";

import { fetchSubProdutos } from "@/app/api/subProdutoFetch";
import { cadastrarOrcamento } from "@/app/api/CadastrarOrcamentoFetch";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { ServiceRequest } from "@/app/types/service_request";
import { SubProduto } from "@/app/types/subProduto";

import "./page.css";

// --- INÍCIO DA MUDANÇA IMPORTANTE NO SCHEMA ---
const serviceRequestSchema = z.object({
  cor_vidro: z.string().min(1, "Cor do vidro é obrigatória"),
  cor_aluminio: z.string().min(1, "Cor do alumínio é obrigatória"),
  // Puxador e fechadura são strings que devem ter pelo menos 1 caractere.
  // A lógica de "nao possui" será aplicada antes da validação final do Zod.
  puxador: z.string(), // Remove .min(1) daqui, será validado por superRefine ou no transform
  fechadura: z.string(), // Remove .min(1) daqui, será validado por superRefine ou no transform
  sub_produto_id: z.number().min(1, "Sub produto é obrigatório"),
  largura: z
    .number()
    .min(0, "Largura deve ser um número positivo")
    .max(1000, "Largura não pode ser maior que 1000"),
  altura: z
    .number()
    .min(0, "Altura deve ser um número positivo")
    .max(1000, "Altura não pode ser maior que 1000"),
  usuario_id: z.number(),
});

export default function BudgetPage() {
  const [subProdutos, setSubProdutos] = useState<SubProduto[]>([]);
  const [subProdutoEscolhido, setSubProdutoEscolhido] =
    useState<boolean>(false);
  const [currentSubProdutoId, setCurrentSubProdutoId] = useState<number | null>(
    null
  );

  // Estes estados controlam a VISIBILIDADE e são usados para a lógica de atribuição
  const [showPuxador, setShowPuxador] = useState<boolean>(true);
  const [showFechadura, setShowFechadura] = useState<boolean>(true);

  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    // Este código só roda no cliente
    const storedUserId = localStorage.getItem("user_id");
    if (storedUserId) {
      setUserId(storedUserId);
    }
    const fetchData = async () => {
      try {
        const response = await fetchSubProdutos(
          "https://fatecpi-cesarvidros.onrender.com/api/subcategoria/get-all"
        );
        const data = await response.json();
        setSubProdutos(data);
      } catch (error) {
        console.error("Erro ao buscar subprodutos:", error);
      }
    };

    fetchData();
  }, []);

  console.log(userId);

  const form = useForm<ServiceRequest>({
    resolver: zodResolver(serviceRequestSchema),
    defaultValues: {
      cor_vidro: "",
      cor_aluminio: "",
      puxador: "", // Valores padrão vazios
      fechadura: "", // Valores padrão vazios
      sub_produto_id: 0,
      largura: 0,
      altura: 0,
      usuario_id: Number(userId) || 0,
    },
  });

  const onSubmit = async (data: ServiceRequest) => {
    try {
      const dataToSubmit: ServiceRequest = { ...data };

      if (
        showPuxador &&
        (!dataToSubmit.puxador || dataToSubmit.puxador.trim() === "")
      ) {
        alert("Puxador é obrigatório para este subproduto.");
        return;
      }

      if (
        showFechadura &&
        (!dataToSubmit.fechadura || dataToSubmit.fechadura.trim() === "")
      ) {
        alert("Fechadura é obrigatória para este subproduto.");
        return;
      }

      const res = await cadastrarOrcamento(
        dataToSubmit.cor_vidro,
        dataToSubmit.largura,
        dataToSubmit.altura,
        dataToSubmit.fechadura,
        dataToSubmit.cor_aluminio,
        dataToSubmit.puxador,
        dataToSubmit.sub_produto_id,
        Number(userId),
        "https://fatecpi-cesarvidros.onrender.com/api/servico/create"
      );

      const json = await res.json();
      alert(json.message);
    } catch (err) {
      console.error("Erro ao cadastrar serviço: ", err);
      alert("Erro ao enviar orçamento");
    }
    setSubProdutoEscolhido(false);
    setCurrentSubProdutoId(null);
    setShowPuxador(true); // Reseta para o estado inicial padrão
    setShowFechadura(true); // Reseta para o estado inicial padrão
    form.reset();
  };
  const handleSubProdutoChange = (value: string) => {
    const selectedId = Number(value);
    form.setValue("sub_produto_id", selectedId);
    setCurrentSubProdutoId(selectedId);
    setSubProdutoEscolhido(true);

    const produtoSelecionado = subProdutos.find((sp) => sp.id === selectedId);

    setShowPuxador(true);
    form.setValue("puxador", ""); // Limpa o valor para o caso padrão
    form.clearErrors("puxador");

    setShowFechadura(true);
    form.setValue("fechadura", "");
    form.clearErrors("fechadura");

    // Lógica para esconder puxador E/OU definir puxador de botão
    if (
      produtoSelecionado?.nome === "janela de quatro folhas" ||
      produtoSelecionado?.nome === "janela de três folhas" ||
      produtoSelecionado?.nome === "janela de duas folhas" ||
      produtoSelecionado?.nome === "janela basculante"
    ) {
      setShowPuxador(false);
      form.setValue("puxador", "nao possui puxador");
    } else if (selectedId === 5 || selectedId === 10 || selectedId === 11) {
      setShowPuxador(false); // Esconde o seletor de puxador se for "puxador de botão" fixo
      form.setValue("puxador", "puxador de botão"); // Define o valor fixo
    } else {
      setShowPuxador(true);
      form.setValue("puxador", "");
    }

    // Lógica para esconder fechadura
    if (
      produtoSelecionado?.nome === "porta de pia" ||
      produtoSelecionado?.nome === "janela basculante" ||
      produtoSelecionado?.nome === "box em l" ||
      produtoSelecionado?.nome === "box frontal"
    ) {
      setShowFechadura(false);
      form.setValue("fechadura", "nao possui fechadura");
    } else {
      setShowFechadura(true);
      form.setValue("fechadura", "");
    }
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
  };

  return (
    <div className="budget-page">
      <WelcomeBudget />
      <form onSubmit={form.handleSubmit(onSubmit)} className="form">
        <div className="form-title">
          <h2 className="form-title-text">Formulário de Orçamento</h2>
        </div>
        <div className="form-fields">
          <div className="form-control">
            <Label className="label">Sub Produto</Label>
            <Select
              onValueChange={handleSubProdutoChange}
              value={currentSubProdutoId?.toString() || ""}
            >
              <SelectTrigger className="select-trigger">
                <SelectValue placeholder="Selecione o serviço desejado" />
              </SelectTrigger>
              <SelectContent className="select-content">
                {subProdutos.map((subProduto) => (
                  <SelectItem
                    className="select-item"
                    key={subProduto.id}
                    value={subProduto.id.toString()}
                  >
                    {subProduto.nome}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {form.formState.errors.sub_produto_id && (
              <p className="error-message">
                {form.formState.errors.sub_produto_id.message}
              </p>
            )}
          </div>

          {subProdutoEscolhido && (
            <>
              <div className="form-control">
                <Label className="label">Cor do vidro</Label>
                <Select
                  onValueChange={(value) => form.setValue("cor_vidro", value)}
                  value={form.watch("cor_vidro")}
                >
                  <SelectTrigger className="select-trigger">
                    <SelectValue placeholder="Selecione a cor do vidro" />
                  </SelectTrigger>
                  <SelectContent className="select-content">
                    {["incolor", "fume", "verde"].map((cor) => (
                      <SelectItem className="select-item" key={cor} value={cor}>
                        {cor}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {form.formState.errors.cor_vidro && (
                  <p className="error-message">
                    {form.formState.errors.cor_vidro.message}
                  </p>
                )}
              </div>

              <div className="form-control">
                <Label className="label">Cor do alumínio</Label>
                <Select
                  onValueChange={(value) =>
                    form.setValue("cor_aluminio", value)
                  }
                  value={form.watch("cor_aluminio")}
                >
                  <SelectTrigger className="select-trigger">
                    <SelectValue placeholder="Selecione a cor do alumínio" />
                  </SelectTrigger>
                  <SelectContent className="select-content">
                    {["fosco", "preto", "branco"].map((cor) => (
                      <SelectItem className="select-item" key={cor} value={cor}>
                        {cor}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {form.formState.errors.cor_aluminio && (
                  <p className="error-message">
                    {form.formState.errors.cor_aluminio.message}
                  </p>
                )}
              </div>

              {/* Renderização condicional para Puxador */}
              {showPuxador && (
                <div className="form-control">
                  <Label className="label">Puxador</Label>
                  <Select
                    onValueChange={(value) => form.setValue("puxador", value)}
                    value={form.watch("puxador")}
                  >
                    <SelectTrigger className="select-trigger">
                      <SelectValue placeholder="Selecione puxador" />
                    </SelectTrigger>
                    <SelectContent className="select-content">
                      {["puxador H"].map((pux) => (
                        <SelectItem
                          className="select-item"
                          key={pux}
                          value={pux}
                        >
                          {pux}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {form.formState.errors.puxador && (
                    <p className="error-message">
                      {form.formState.errors.puxador.message}
                    </p>
                  )}
                </div>
              )}

              {/* Renderização condicional para Fechadura */}
              {showFechadura && (
                <div className="form-control">
                  <Label className="label">Fechadura</Label>
                  <Select
                    onValueChange={(value) => form.setValue("fechadura", value)}
                    value={form.watch("fechadura")}
                  >
                    <SelectTrigger className="select-trigger">
                      <SelectValue placeholder="Selecione a fechadura" />
                    </SelectTrigger>
                    <SelectContent className="select-content">
                      {["bate fecha", "com chave"].map((fech) => (
                        <SelectItem
                          className="select-item"
                          key={fech}
                          value={fech}
                        >
                          {fech}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {form.formState.errors.fechadura && (
                    <p className="error-message">
                      {form.formState.errors.fechadura.message}
                    </p>
                  )}
                </div>
              )}

              <div className="form-control">
                <Label className="label">Largura (cm)</Label>
                <Input
                  className="input"
                  type="number"
                  {...form.register("largura", { valueAsNumber: true })}
                  placeholder="Digite a largura em cm"
                />
                {form.formState.errors.largura && (
                  <p className="error-message">
                    {form.formState.errors.largura.message}
                  </p>
                )}
              </div>

              <div className="form-control">
                <Label className="label">Altura (cm)</Label>
                <Input
                  className="input"
                  type="number"
                  {...form.register("altura", { valueAsNumber: true })}
                  placeholder="Digite a altura em cm"
                />
                {form.formState.errors.altura && (
                  <p className="error-message">
                    {form.formState.errors.altura.message}
                  </p>
                )}
              </div>
            </>
          )}
        </div>
        {subProdutoEscolhido && (
          <div className="button-submit">
            <Button type="submit" className="button">
              Enviar
            </Button>
          </div>
        )}
      </form>
    </div>
  );
}
