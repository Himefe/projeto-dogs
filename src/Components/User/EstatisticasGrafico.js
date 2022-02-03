import React from "react";
import styles from "./css/EstatisticasGrafico.module.css";
import { VictoryPie, VictoryChart, VictoryBar } from "victory";

const EstatisticasGrafico = ({ data }) => {
  const [graph, setGraph] = React.useState([]);
  const [total, setTotal] = React.useState(0);

  React.useEffect(() => {
    const graphData = data.map((item) => {
      return {
        x: item.title,
        y: Number(item.acessos),
      };
    });

    setTotal(
      data.map(({ acessos }) => Number(acessos)).reduce((a, b) => a + b, 0)
    );
    setGraph(graphData);
  }, [data]);

  return (
    <div className={`${styles.grafico} animeLeft`}>
      <div className={`${styles.total} ${styles.graficoItem}`}>
        <p>Acessos: {total}</p>
      </div>
      {total > 0 ? (
        <>
          <div className={styles.graficoItem}>
            <VictoryPie
              data={graph}
              innerRadius={50}
              padding={{ top: 20, bottom: 20, left: 80, right: 80 }}
              colorScale="red"
              style={{
                data: {
                  fillOpacity: 0.9,
                  stroke: "#fff",
                  strokeWidth: 2,
                },
                labels: {
                  fontSize: 14,
                  fill: "#333",
                },
              }}
            />
          </div>
          <div className={styles.graficoItem}>
            <VictoryChart>
              <VictoryBar
                alignment="start"
                data={graph}
                style={{ data: { fill: "#fb1", stroke: "#fea" } }}
              ></VictoryBar>
            </VictoryChart>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default EstatisticasGrafico;
