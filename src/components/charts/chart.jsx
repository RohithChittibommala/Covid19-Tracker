import React, { useEffect, useState } from "react";
import { FetchDailyData } from "./../../api/api";
import { Line, Bar } from "react-chartjs-2";
import styles from "./chart.module.css";

const Chart = ({ data: { confirmed, recovered, deaths }, country }) => {
  const [dailyData, setDailydata] = useState([]);
  useEffect(() => {
    const FetchData = async () => {
      setDailydata(await FetchDailyData());
    };
    FetchData();
  }, []);
  confirmed && console.log(confirmed.value);
  const lineChart = dailyData[0] ? (
    <Line
      data={{
        labels: dailyData.map((data) => data.date),
        datasets: [
          {
            data: dailyData.map(({ confirmed }) => confirmed),
            label: "infected",
            borderColor: "#333f5f",
            fill: true,
          },
          {
            data: dailyData.map(({ deaths }) => deaths),
            label: "deaths",
            borderColor: "red",
            backgroundColor: "rgba(255,0,0,0.5)",
            fill: true,
          },
        ],
      }}
    />
  ) : null;
  const barChart = confirmed ? (
    <Bar
      className={styles.ctlabel}
      data={{
        labels: ["Infected", "Recovered", "Deaths"],
        datasets: [
          {
            label: "people",
            backgroundColor: ["blue", "green", "red"],
            data: [confirmed.value, recovered.value, deaths.value],
          },
        ],
      }}
      options={{
        legend: { display: false },
        title: {
          display: true,
          text: `The current status in ${country}`,
        },
      }}
    />
  ) : null;
  return (
    <div className={styles.container}>
      {country && country !== "Global" ? barChart : lineChart}
    </div>
  );
  // <Line/>
};

export default Chart;
