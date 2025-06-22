interface Servico {
  id: number;
  cor_vidro: string;
  cor_aluminio: string;
  preco: number;
  custo: number;
  altura: number;
  largura: number;
  fechadura: string;
  puxador: string;
  estado: string;
  produto: string;
  nome_usuario: string;
  numero_telefone: string;
  cep: string;
  orcamento_id: number;
}

interface ServiceCardProps {
  service: Servico;
  onActionComplete?: () => void; 
}

import { useState } from "react";
import Modal from "../modal/Modal";

import "./servicoCard.css";

export default function ServiceCard({ service, onActionComplete }: ServiceCardProps) {
  const [open, setOpen] = useState<boolean>(false);

  const closeModal = () => {
    setOpen(false);
  };

  return (
    <article className="servico-card">
      <div className="article-header">
        <div>Service ID: {service.id}</div>
      </div>
      <div className="article-body">
        <div className="left">
          <div className="article-body-item">
            <span className="span-title">Produto: </span>
            <span className="span-atributo">{service.produto}</span>
          </div>
          <div className="article-body-item">
            <span className="span-title">Nome do cliente</span>
            <span className="span-atributo">{service.nome_usuario}</span>
          </div>
          <div className="article-body-item">
            <span className="span-title">Número de telefone</span>
            <span className="span-atributo">{service.numero_telefone}</span>
          </div>
          <div className="article-body-item">
            <span className="span-title">CEP do cliente</span>
            <span className="span-atributo">{service.cep}</span>
          </div>
          <div className="article-body-item">
            <span className="span-title">Cor do vidro</span>
            <span className="span-atributo">{service.cor_vidro}</span>
          </div>
          <div className="article-body-item">
            <span className="span-title">Preco</span>
            <span className="span-atributo">{service.preco}</span>
          </div>
        </div>
        <div className="right">
          <div className="article-body-item">
            <span className="span-title">Custo</span>
            <span className="span-atributo">{service.custo}</span>
          </div>
          <div className="article-body-item">
            <span className="span-title">Altura</span>
            <span className="span-atributo">{service.altura} cm</span>
          </div>
          <div className="article-body-item">
            <span className="span-title">Largura</span>
            <span className="span-atributo">{service.largura} cm</span>
          </div>
          <div className="article-body-item">
            <span className="span-title">Fechadura</span>
            <span className="span-atributo">{service.fechadura}</span>
          </div>
          <div className="article-body-item">
            <span className="span-title">Cor do alumínio</span>
            <span className="span-atributo">{service.cor_aluminio}</span>
          </div>
          <div className="article-body-item">
            <span className="span-title">Puxador</span>
            <span className="span-atributo">{service.puxador}</span>
          </div>
        </div>
      </div>
      {service.estado === "em andamento" && (
        <div className="article-footer">
          <button onClick={() => setOpen(true)}>orçar</button>
        </div>
      )}
      <div>
        {open && (
          <Modal
            id={service.id}
            cor_vidro={service.cor_vidro}
            largura={service.largura}
            altura={service.altura}
            fechadura={service.fechadura}
            cor_aluminio={service.cor_aluminio}
            puxador={service.puxador}
            cep={service.cep}
            produto={service.produto}
            orcamento_id={service.orcamento_id}
            onClose={closeModal}
            onActionComplete={onActionComplete ?? (() => {})}
          />
        )}
      </div>
    </article>
  );
}
