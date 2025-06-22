"use client";

import { GetOrcamentosByUser } from "@/app/api/user/orcamentos";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { API_URL } from "@/utils/env";

interface ServicoDetalhado {
  id: number;
  status: string;
  criado_em: Date;
}

import "./page.css";

export default function DevolutivaPage() {
  const [devolutiva, setDevolutiva] = useState<ServicoDetalhado[] | undefined>(
    undefined
  ); 
  const router = useRouter();

  useEffect(() => {
    const user = window.localStorage.getItem("user_id");
    const fetchData = async () => {
      try {
        const res = await GetOrcamentosByUser(
          Number(user),
          `${API_URL}/api/orcamento/get-by-user/`
        );

        const data: ServicoDetalhado[] = await res.json();

        setDevolutiva(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error("Erro ao buscar orçamentos:", e); 
        setDevolutiva([]);
      }
    };

    fetchData();
  }, []);

  const handleClick = (orcamento_id: number) => {
    router.push(`/user/orcamento/${orcamento_id}`);
  };

  if (devolutiva === undefined) {
    return <div className="loading-message">Carregando orçamentos...</div>;
  }

  return (
    <div>
      {devolutiva.length > 0 ? (
        <div className="orcamento-devolutiva-user-content">
          {devolutiva.map((orcamento) => (
            <div key={orcamento.id} className="orcamento-devolutiva-user">
              <div className="header-devolutiva">
                <div className="id">Orçamento ID: {orcamento.id}</div>{" "}
                {/* Mudei para ID maiúsculo */}
              </div>
              <div className="body-devolutiva">
                <div className="status">
                  Status do Orçamento: {orcamento.status}{" "}
                  {/* Mudei para "Status do Orçamento" */}
                </div>
                <div className="data">
                  Data de Solicitação:{" "}
                  {new Date(orcamento.criado_em).toLocaleString("pt-BR", {
                    dateStyle: "short",
                    timeStyle: "short",
                  })}{" "}
                  {/* Formatação para BR */}
                </div>
              </div>
              <div className="footer-devolutiva">
                <button onClick={() => handleClick(orcamento.id)}>
                  Visualizar Orçamento
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-orcamento-message-container">
          <p className="no-orcamento-message">
            Você ainda não possui orçamentos.
            <br />
            Que tal solicitar um agora?
          </p>
          <button
            className="request-orcamento-button"
            onClick={() => router.push("/user")}
          >
            Solicitar Orçamento
          </button>
        </div>
      )}
    </div>
  );
}
