'use client'

import React from 'react';
import { PowerBIEmbed } from 'powerbi-client-react';

import './powerbi.css'

function MeuDashboardBanco() {
  const embedConfig = {
    type: 'report', // Indica que é um relatório
    // Extraia a URL da sua tag iframe
    embedUrl: 'https://app.powerbi.com/view?r=eyJrIjoiZjA3OTgyMjItYWE5NS00ZDgzLWIyNzUtNmM4ZTU5ZjIyNDg4IiwidCI6ImNmNzJlMmJkLTdhMmItNDc4My1iZGViLTM5ZDU3YjA3Zjc2ZiIsImMiOjR9',
    // Não precisa de accessToken ou tokenType para links "Publicar na Web"
    settings: {
      panes: {
        filters: {
          visible: true // Geralmente é bom deixar visível para interatividade
        },
        pageNavigation: {
          visible: true // Permite navegar entre as páginas do dashboard
        }
      }
    }
  };

  // Opcional: Adicionar handlers para eventos do Power BI
interface PowerBIEvent {
    detail?: unknown;
}

type PowerBIEventHandler = (event?: PowerBIEvent) => void;

const eventHandlers: Map<string, PowerBIEventHandler> = new Map([
    ['loaded', () => console.log('Dashboard do banco carregado!')],
    ['error', (event?: PowerBIEvent) => console.error('Erro ao carregar dashboard:', event?.detail)],
    // Outros eventos como 'dataSelected', 'rendered', etc., podem ser adicionados aqui
]);

  return (
    <div>

        <div className="title-kpis">
            Dashboard - KPIS
        </div>

      <PowerBIEmbed
        embedConfig={embedConfig}
        eventHandlers={eventHandlers}
        cssClassName="dashboard-powerbi"
      />
    </div>
  );
}

export default MeuDashboardBanco;