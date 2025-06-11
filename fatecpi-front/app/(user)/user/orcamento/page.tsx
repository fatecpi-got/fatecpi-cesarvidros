"use client";

import { GetOrcamentosByUser } from "@/app/api/user/orcamentos";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface ServicoDetalhado {
  id: number;
  status: string;
  criado_em: Date;
}

export default function DevolutivaPage() {
  const [devolutiva, setDevolutiva] = useState<ServicoDetalhado[]>();
  const router = useRouter();

  useEffect(() => {
    const user = window.localStorage.getItem("user_id");
    const fetchData = async () => {
      try {
        const res = await GetOrcamentosByUser(
          Number(user),
          "https://fatecpi-cesarvidros-1.onrender.com/api/orcamento/get-by-user/"
        );

        const data: ServicoDetalhado[] = await res.json();

        setDevolutiva(data);
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();
  }, []);

  const handleClick = (orcamento_id: number) => {
    router.push(`/user/orcamento/${orcamento_id}`);
  };

  return (
    <div>
      {devolutiva && devolutiva.length > 0 ? (
        devolutiva.map((orcamento) => (
          <div
            key={orcamento.id}
            style={{
              border: "1px solid #ccc",
              marginBottom: "1rem",
              padding: "1rem",
            }}
          >
            <div className="header-devolutiva">
              <div className="id">Orçamento id: {orcamento.id}</div>
            </div>
            <div className="body-devolutiva">
              <div className="status">
                Estado do Orcamento: {orcamento.status}
              </div>
              <div className="data">
                Data de solicitação: {orcamento.criado_em.toLocaleString()}
              </div>
            </div>
            <div className="footer-devolutiva">
              <button onClick={() => handleClick(orcamento.id)}>
                Visualizar orçamento
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>Nenhum orçamento encontrado.</p>
      )}
    </div>
  );
}
