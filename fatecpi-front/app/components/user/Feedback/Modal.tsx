"use client";

import React, { useState, useEffect } from "react";

import {
  GetPontosPositivos,
  GetPontosNegativos,
} from "@/app/api/user/feedback";

import './modal.css'

import { API_URL } from "@/utils/env";

interface Pontos {
  id: number;
  descricao: string;
}

export default function ModalFeedback({ pedido_id }: { pedido_id: number }) {
  const [pontosPositivos, setPontosPositivos] = useState<Pontos[]>([]);
  const [pontosNegativos, setPontosNegativos] = useState<Pontos[]>([]);

  // Estados para os pontos selecionados pelo usuário
  const [selectedPositivePoints, setSelectedPositivePoints] = useState<
    number[]
  >([]);
  const [selectedNegativePoints, setSelectedNegativePoints] = useState<
    number[]
  >([]);

  // Estados para a avaliação por estrelas
  const [entregaRating, setEntregaRating] = useState<number>(0);
  const [atendimentoRating, setAtendimentoRating] = useState<number>(0);
  const [precoRating, setPrecoRating] = useState<number>(0);

  // Estado para comentários adicionais
  const [comments, setComments] = useState<string>("");

  // Estado para mensagens de erro ou sucesso
  const [message, setMessage] = useState<string>("");

  const fetchData = async () => {
    try {
      const result_positivo = await GetPontosPositivos(
        `${API_URL}/api/feedback/get-ponto-positivo`
      );

      const result_positivo_json = await result_positivo.json();

      setPontosPositivos(result_positivo_json);

      const result_negativo = await GetPontosNegativos(
        `${API_URL}/api/feedback/get-ponto-negativo`
      );

      const result_negativo_json = await result_negativo.json();

      setPontosNegativos(result_negativo_json);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Handler para checkboxes de pontos positivos
  const handlePositivePointChange = (pointId: number) => {
    setSelectedPositivePoints((prevSelected) => {
      if (prevSelected.includes(pointId)) {
        return prevSelected.filter((id) => id !== pointId);
      } else {
        if (prevSelected.length < 3) {
          // Limita a 3 seleções
          return [...prevSelected, pointId];
        } else {
          setMessage("Você pode selecionar no máximo 3 pontos positivos.");
          return prevSelected;
        }
      }
    });
  };

  // Handler para checkboxes de pontos negativos (opcional, se desejar limitar)
  const handleNegativePointChange = (pointId: number) => {
    setSelectedNegativePoints((prevSelected) => {
      if (prevSelected.includes(pointId)) {
        return prevSelected.filter((id) => id !== pointId);
      } else {
        if (prevSelected.length < 3) {
          // Limita a 3 seleções
          return [...prevSelected, pointId];
        } else {
          setMessage("Você pode selecionar no máximo 3 pontos negativos.");
          return prevSelected;
        }
      }
    });
  };

  const RatingInput = ({
    rating,
    setRating,
    label,
  }: {
    rating: number;
    setRating: (r: number) => void;
    label: string;
  }) => (
    <div className="rating-input-container">
      <label className="rating-label">{label}:</label>
      <div className="rating-stars-wrapper">
        {[1, 2, 3, 4, 5].map((value) => (
          <div key={value} className="rating-star-item">
            <input
              type="radio"
              id={`${label.toLowerCase().replace(/\s/g, "-")}-${value}`}
              name={label.toLowerCase().replace(/\s/g, "-")}
              value={value}
              checked={rating === value}
              onChange={() => setRating(value)}
              className="rating-radio-button"
            />
            <label
              htmlFor={`${label.toLowerCase().replace(/\s/g, "-")}-${value}`}
              aria-label={`${value} de 5`}
              className="rating-star-label"
            >
              {/* Você pode colocar aqui um número, um ícone, um texto, etc. */}
              {value}
            </label>
          </div>
        ))}
      </div>
    </div>
  );

  // Handler para o envio do formulário
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(""); // Limpa mensagens anteriores

    // Validação simples
    if (
      selectedPositivePoints.length === 0 &&
      selectedNegativePoints.length === 0 &&
      entregaRating === 0 &&
      atendimentoRating === 0 &&
      precoRating === 0 &&
      comments.trim() === ""
    ) {
      setMessage("Por favor, preencha pelo menos uma opção de feedback.");
      return;
    }

    if (selectedPositivePoints.length > 3) {
      setMessage("Por favor, selecione no máximo 3 pontos positivos.");
      return;
    }

    const feedbackData = {
      pedido_id: pedido_id,
      entrega: entregaRating,
      atendimento: atendimentoRating,
      preco: precoRating,
      pontosPositivosSelecionados: selectedPositivePoints,
      pontosNegativosSelecionados: selectedNegativePoints,
      comentarios: comments,
    };

    console.log("Dados de feedback a serem enviados:", feedbackData);
    // Aqui você faria a chamada de API para enviar os dados para o seu backend
    // Ex: const response = await fetch('/api/feedback', { method: 'POST', body: JSON.stringify(feedbackData) });

    setMessage("Feedback enviado com sucesso! Obrigado!");
    // Opcional: Resetar o formulário
    setSelectedPositivePoints([]);
    setSelectedNegativePoints([]);
    setEntregaRating(0);
    setAtendimentoRating(0);
    setPrecoRating(0);
    setComments("");
  };

  return (
    <div className="modal-feedback-container">
      <div className="modal-content-wrapper">
        <h2 className="modal-title">Sua Opinião É Importante!</h2>
        <p className="modal-subtitle">
          Gostaríamos de saber mais sobre sua experiência com nossos serviços.
        </p>

        {message && (
          <div
            className={`message-box ${
              message.includes("sucesso") ? "message-success" : "message-error"
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="feedback-form">
          {/* Avaliação por estrelas */}
          <div className="rating-section">
            <h3 className="rating-section-title">Avalie sua experiência</h3>
            <RatingInput
              rating={entregaRating}
              setRating={setEntregaRating}
              label="Entrega"
            />
            <RatingInput
              rating={atendimentoRating}
              setRating={setAtendimentoRating}
              label="Atendimento"
            />
            <RatingInput
              rating={precoRating}
              setRating={setPrecoRating}
              label="Preço"
            />
          </div>

          {/* Pontos Positivos */}
          <div className="points-section positive-points-section">
            <h3 className="points-section-title">
              O que você mais gostou? (Escolha até 3)
            </h3>
            <div className="points-checkbox-group">
              {pontosPositivos.map((ponto) => (
                <label key={ponto.id} className="point-checkbox-label">
                  <input
                    type="checkbox"
                    checked={selectedPositivePoints.includes(ponto.id)}
                    onChange={() => handlePositivePointChange(ponto.id)}
                    className="point-checkbox"
                  />
                  <span className="point-description">{ponto.descricao}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Pontos Negativos */}
          <div className="points-section negative-points-section">
            <h3 className="points-section-title">
              O que poderia melhorar? (Escolha até 3)
            </h3>
            <div className="points-checkbox-group">
              {pontosNegativos.map((ponto) => (
                <label key={ponto.id} className="point-checkbox-label">
                  <input
                    type="checkbox"
                    checked={selectedNegativePoints.includes(ponto.id)}
                    onChange={() => handleNegativePointChange(ponto.id)}
                    className="point-checkbox"
                  />
                  <span className="point-description">{ponto.descricao}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Botão de Envio */}
          <div className="submit-button-wrapper">
            <button type="submit" className="submit-button">
              Enviar Feedback
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
