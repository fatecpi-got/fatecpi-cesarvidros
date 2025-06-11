"use client";

import { GetOrcamentosByUser } from "@/app/api/user/orcamentos";
import { useState, useEffect } from "react";

interface ServicoDetalhado {
  id: number;
  cor_vidro: string; // Assuming 'cor_vidro' is a string (e.g., 'Transparente', 'Fumê')
  cor_aluminio: string; // Assuming 'cor_aluminio' is a string (e.g., 'Branco', 'Preto')
  altura: number;
  largura: number;
  fechadura: string; // Or boolean if it's a true/false indicator
  preco: number;
  puxador: string; // Assuming 'puxador' is a string (e.g., 'Barra Chata', 'Concha')
  estado: string; // Or an enum if you have predefined states (e.g., 'Pendente', 'Concluído')
  produto: string; // This comes from sub_produto.nome (aliased as 'produto')
  usuario_id: number; // This comes from orcamento.usuario_id
}

export default function DevolutivaPage() {
  const [devolutiva, setDevolutiva] = useState<ServicoDetalhado[]>();

  useEffect(() => {
    const user = window.localStorage.getItem("user_id");
    const fetchData = async () => {
      try {
        const res = await GetOrcamentosByUser(
          Number(user),
          "http://localhost:3001/api/servico/get-by-user/"
        );

        const data: ServicoDetalhado[] = await res.json();

        setDevolutiva(data);
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {devolutiva && devolutiva.length > 0 ? (
        devolutiva.map((servico) => (
          <div
            key={servico.id}
            style={{
              border: "1px solid #ccc",
              marginBottom: "1rem",
              padding: "1rem",
            }}
          >
            <p>
              <strong>ID:</strong> {servico.id}
            </p>
            <p>
              <strong>Produto:</strong> {servico.produto}
            </p>
            <p>
              <strong>Cor do Vidro:</strong> {servico.cor_vidro}
            </p>
            <p>
              <strong>Cor do Alumínio:</strong> {servico.cor_aluminio}
            </p>
            <p>
              <strong>Altura:</strong> {servico.altura}
            </p>
            <p>
              <strong>Largura:</strong> {servico.largura}
            </p>
            <p>
              <strong>Fechadura:</strong> {servico.fechadura}
            </p>
            <p>
              <strong>Puxador:</strong> {servico.puxador}
            </p>
            <p>
              <strong>Preço:</strong> {servico.preco}
            </p>
            <p>
              <strong>Estado:</strong> {servico.estado}
            </p>
          </div>
        ))
      ) : (
        <p>Nenhum orçamento encontrado.</p>
      )}
    </div>
  );
}
