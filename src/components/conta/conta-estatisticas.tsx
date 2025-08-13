'use client';

import React from 'react';
import styles from './conta-estatisticas.module.css';
import { VictoryPie, VictoryChart, VictoryBar, VictoryTooltip, VictoryAxis } from 'victory';
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { StatsData } from '@/actions/stats-get';

type GraphData = {
  x: string;
  y: number;
  label: string;
};

// Componente de contador animado
function AnimatedCounter({ value, duration = 2 }: { value: number; duration?: number }) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { duration: duration * 1000 });
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  React.useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [motionValue, isInView, value]);

  React.useEffect(() => {
    springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Math.floor(latest).toLocaleString();
      }
    });
  }, [springValue]);

  return <span ref={ref}>0</span>;
}

export default function ContaEstatisticas({ data }: { data: StatsData[] }) {
  const [graph, setGraph] = React.useState<GraphData[]>([]);
  const [total, setTotal] = React.useState(0);

  React.useEffect(() => {
    const graphData = data.map((item) => {
      return {
        x: item.title.length > 10 ? item.title.substring(0, 10) + '...' : item.title,
        y: Number(item.acessos),
        label: `${item.title}: ${item.acessos} acessos`,
      };
    });

    setTotal(
      data.map(({ acessos }) => Number(acessos)).reduce((a, b) => a + b, 0),
    );
    setGraph(graphData);
  }, [data]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  const hoverVariants = {
    hover: {
      scale: 1.05,
      y: -5,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  return (
    <motion.section 
      className={styles.container}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Card de Total de Acessos */}
      <motion.div 
        className={`${styles.totalCard} ${styles.card}`}
        variants={cardVariants}
        whileHover="hover"
        {...hoverVariants}
      >
        <div className={styles.cardHeader}>
          <div className={styles.iconWrapper}>
            <svg className={styles.icon} viewBox="0 0 24 24" fill="none">
              <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" fill="currentColor"/>
            </svg>
          </div>
          <h3 className={styles.cardTitle}>Total de Acessos</h3>
        </div>
        <div className={styles.cardContent}>
          <div className={styles.counterWrapper}>
             <AnimatedCounter value={total} duration={4} />
           </div>
          <p className={styles.cardSubtitle}>visualizações totais</p>
        </div>
      </motion.div>

      {/* Card do Gráfico de Pizza */}
      <motion.div 
        className={`${styles.chartCard} ${styles.card}`}
        variants={cardVariants}
        whileHover="hover"
        {...hoverVariants}
      >
        <div className={styles.cardHeader}>
          <div className={styles.iconWrapper}>
            <svg className={styles.icon} viewBox="0 0 24 24" fill="none">
              <path d="M11 2v20c-5.07-.5-9-4.79-9-10s3.93-9.5 9-10zm2.03 0v8.99H22c-.47-4.74-4.24-8.52-8.97-8.99zm0 11.01V22c4.74-.47 8.5-4.25 8.97-8.99h-8.97z" fill="currentColor"/>
            </svg>
          </div>
          <h3 className={styles.cardTitle}>Distribuição por Acessos</h3>
        </div>
        <div className={styles.chartWrapper}>
            <VictoryPie
              data={graph}
              labelComponent={<VictoryTooltip 
                pointerLength={0} 
                cornerRadius={8}
                constrainToVisibleArea
                flyoutStyle={{ 
                  fill: "var(--bg-color)", 
                  stroke: "var(--border-color)",
                  strokeWidth: 1,
                  filter: "drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))"
                }} 
                style={{ 
                  fill: "var(--text-color)",
                  fontSize: 12,
                  fontWeight: 500
                }} 
              />}
              innerRadius={60}
              padAngle={2}
              padding={{ top: 30, bottom: 30, left: 80, right: 80 }}
              colorScale={[
                '#6366f1', // Indigo
                '#8b5cf6', // Violet  
                '#ec4899', // Pink
                '#f59e0b', // Amber
                '#10b981', // Emerald
                '#3b82f6', // Blue
                '#ef4444', // Red
                '#84cc16'  // Lime
              ]}
              animate={{
                duration: 1500,
                onLoad: { duration: 1000 }
              }}
              style={{
                data: {
                  fillOpacity: 0.9,
                  stroke: '#fff',
                  strokeWidth: 2
                },
                labels: {
                  fontSize: 11,
                  fill: 'var(--text-color)',
                  fontWeight: 500
                },
              }}
            />
          </div>
      </motion.div>

      {/* Card do Gráfico de Barras */}
      <motion.div 
        className={`${styles.chartCard} ${styles.card}`}
        variants={cardVariants}
        whileHover="hover"
        {...hoverVariants}
      >
        <div className={styles.cardHeader}>
          <div className={styles.iconWrapper}>
            <svg className={styles.icon} viewBox="0 0 24 24" fill="none">
              <path d="M3 13h2v8H3v-8zm4-6h2v14H7V7zm4-4h2v18h-2V3zm4 9h2v9h-2v-9zm4-3h2v12h-2V9z" fill="currentColor"/>
            </svg>
          </div>
          <h3 className={styles.cardTitle}>Comparativo de Acessos</h3>
        </div>
        <div className={styles.chartWrapper}>
            <VictoryChart
              padding={{ left: 80, top: 20, right: 40, bottom: 100 }}
              animate={{
                duration: 1500,
                onLoad: { duration: 1000 }
              }}
            >
              <VictoryBar
                data={graph}
                labelComponent={<VictoryTooltip 
                  pointerLength={0} 
                  cornerRadius={8} 
                  flyoutStyle={{ 
                    fill: "var(--bg-color)", 
                    stroke: "var(--border-color)",
                    strokeWidth: 1,
                    filter: "drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))"
                  }} 
                  style={{ 
                    fill: "var(--text-color)",
                    fontSize: 12,
                    fontWeight: 500
                  }} 
                />}
                style={{ 
                  data: { 
                    fill: ({ datum }) => {
                      const colors = ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#3b82f6', '#ef4444', '#84cc16'];
                      return colors[datum._x % colors.length];
                    },
                    fillOpacity: 0.8,
                    stroke: '#fff',
                    strokeWidth: 1
                  } 
                }}
                animate={{
                  duration: 1500,
                  onLoad: { duration: 1000 }
                }}
              />
              <VictoryAxis
                dependentAxis
                style={{
                  tickLabels: {
                    fontSize: 11,
                    fill: 'var(--text-color)',
                    fontWeight: 500,
                    padding: 10
                  },
                  grid: {
                    stroke: 'var(--border-color)',
                    strokeOpacity: 0.3
                  }
                }}
              />
              <VictoryAxis
                style={{
                  tickLabels: {
                    fontSize: 10,
                    angle: -45,
                    textAnchor: 'end',
                    padding: 5,
                    fill: 'var(--text-color)',
                    fontWeight: 500
                  },
                  axis: {
                    stroke: 'var(--border-color)'
                  }
                }}
              />
            </VictoryChart>
          </div>
      </motion.div>
    </motion.section>
  );
}