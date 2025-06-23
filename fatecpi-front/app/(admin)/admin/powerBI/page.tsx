'use client';

import React from 'react';
// Não importe PowerBIEmbed diretamente aqui
import dynamic from 'next/dynamic'; // Importe o dynamic do Next.js

import './page.css';

// 1. Carregue PowerBIEmbed dinamicamente com ssr: false
const DynamicPowerBIEmbed = dynamic(
  () => import('powerbi-client-react').then((mod) => mod.PowerBIEmbed),
  { ssr: false } // ISSO É CRUCIAL: Impede a renderização no lado do servidor
);

export default function PowerBiPage() {
  const embedConfig = {
    type: 'report',
    embedUrl: 'https://app.powerbi.com/view?r=eyJrIjoiZjA3OTgyMjItYWE5NS00ZDgzLWIyNzUtNmM4ZTU5ZjIyNDg4IiwidCI6ImNmNzJlMmJkLTdhMmItNDc4My1iZGViLTM5ZDU3YjA3Zjc2ZiIsImMiOjR9',
    settings: {
      panes: {
        filters: {
          visible: true
        },
        pageNavigation: {
          visible: true
        }
      }
    }
  };

  interface PowerBIEvent {
    detail?: unknown;
  }

  type PowerBIEventHandler = (event?: PowerBIEvent) => void;

  const eventHandlers: Map<string, PowerBIEventHandler> = new Map([
    ['loaded', () => console.log('Dashboard do banco carregado!')],
    ['error', (event?: PowerBIEvent) => console.error('Erro ao carregar dashboard:', event?.detail)],
  ]);

  return (
    <div>
      <div className="title-kpis">
        Dashboard - KPIS
      </div>

      {/* 2. Use o componente carregado dinamicamente */}
      <DynamicPowerBIEmbed
        embedConfig={embedConfig}
        eventHandlers={eventHandlers}
        cssClassName="dashboard-powerbi"
      />
    </div>
  );
}