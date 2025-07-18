'use client';

import React from 'react';
import styles from './conta-estatisticas.module.css';
import { VictoryPie, VictoryChart, VictoryBar, VictoryTooltip, VictoryAxis } from 'victory'; // Importa VictoryTooltip e VictoryAxis
import { StatsData } from '@/actions/stats-get';

type GraphData = {
  x: string;
  y: number;
  label: string; // Adicionamos um campo 'label' para o tooltip
};

export default function ContaEstatisticas({ data }: { data: StatsData[] }) {
  const [graph, setGraph] = React.useState<GraphData[]>([]);
  const [total, setTotal] = React.useState(0);

  React.useEffect(() => {
    const graphData = data.map((item) => {
      // Preparamos os dados para o gráfico
      return {
        // 'x' será o nome truncado para exibição padrão
        x: item.title.length > 10 ? item.title.substring(0, 10) + '...' : item.title,
        y: Number(item.acessos),
        // 'label' conterá o texto completo para o tooltip
        label: `${item.title}: ${item.acessos} acessos`,
      };
    });

    setTotal(
      data.map(({ acessos }) => Number(acessos)).reduce((a, b) => a + b, 0),
    );
    setGraph(graphData);
  }, [data]);

  return (
    <section className={`${styles.graph} animeLeft`}>
      <div className={`${styles.total} ${styles.graphItem}`}>
        <p>Acessos: {total}</p>
      </div>
      <div className={styles.graphItem}>
        <VictoryPie
          data={graph}
          // O 'labelComponent' agora é um Tooltip. Ele usará a propriedade 'label' dos dados.
          labelComponent={<VictoryTooltip pointerLength={0} cornerRadius={4} flyoutStyle={{ fill: "white", stroke: "#ccc" }} />}
          innerRadius={50}
          padding={{ top: 20, bottom: 20, left: 80, right: 80 }}
          colorScale={['#11a8ff', '#fb1', '#ffd', '#efd', '#dff']}
          style={{
            data: {
              fillOpacity: 0.9,
              stroke: '#fff',
              strokeWidth: 2,
            },
            // Os labels padrão agora são menores para não sobrepor
            labels: {
              fontSize: 12,
              fill: '#333',
            },
          }}
        />
      </div>
      <div className={styles.graphItem}>
        <VictoryChart>
          <VictoryBar
            alignment="start"
            data={graph}
            // O 'labelComponent' aqui também é um Tooltip para as barras
            labelComponent={<VictoryTooltip pointerLength={0} cornerRadius={4} flyoutStyle={{ fill: "white", stroke: "#ccc" }} />}
            style={{ data: { fill: '#11a8ff' } }}
          />
          {/* Para o gráfico de barras, ainda rotacionamos o eixo para melhor visualização */}
          <VictoryAxis
            style={{
              tickLabels: {
                fontSize: 10,
                angle: -45,
                textAnchor: 'end',
                padding: 5,
              },
            }}
          />
        </VictoryChart>
      </div>
    </section>
  );
}