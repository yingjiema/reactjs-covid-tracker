import React, { useState, useEffect } from "react";
import { fetchDailyData } from "../../api";
import { Line, Bar } from "react-chartjs-2";
import styles from "./Chart.module.css";




const Chart = ({ data: {confirmed, recovered, deaths}, country }) => {

  const [dailyData, setDailyData] = useState([]);
  // dailyData is set to be an array, or an empty array []
  /*
  Above code has the same function as:
  state = {
    dailyData: {}
  }

  setDailyData used to populate dailyData
  */

  useEffect(() => {
    // async function
    const fetchAPI = async () => {
      setDailyData(await fetchDailyData());
      console.log("useEffect");
    }

    // console.log(dailyData);

    // call the function
    fetchAPI();
  }, []);
  
  const lineChart = (
    // if the dailyData[0] == null, return null
    dailyData.length !== 0 
      ? (
        <Line 
        options={{
          hover: {
            mode: "nearest",
            intersect: true
          },
          scales: {
            xAxes: [{
              type: "time",
              time: {
                unit: "month"
              }
            }]
          }
        }}
        data={{
          // dates from dailyData as labels
          labels: dailyData.map(({ date }) => date),
          // the api only gives daily data for confirmed & death, 
          // so we only use two dataset (stored as object)
          // {} means an empty object
          datasets: [{
            data: dailyData.map((item) => {
              return {x: item.date, y: item.confirmed}
            }),
            label: "Infected",
            borderColor: "#3333ff",
            fill: true,
          }, {
            data: dailyData.map((item) => {
              return {x: item.date, y: item.deaths}
            }),
            label: "Deaths",
            borderColor: "red",
            backgroundColor: "rgba(255, 0, 0, 0.5)",
            fill: true,
          }],
        }}
        />
      ) : null

  );

  // console.log(confirmed);
  const barChart = (
    confirmed 
      ? (
        <Bar 
          data={{
            labels: ["Infected", "Recovered", "Deaths"],
            datasets: [{
              label: "People",
              backgroundColor: [
                "rgba(0, 0, 255, 0.5)",
                "rgba(0, 255, 0, 0.5)",
                "rgba(255, 0, 0, 0.5)"
              ],
              data: [confirmed.value, recovered.value, deaths.value]
            }]
          }}
          options={{
            legend: { display: false },
            title: { display: true, text: `Current state in ${country}`}
          }}
        />

      ) : null

  );

  return (
    <div className={styles.container}>
      {country ? barChart : lineChart}
    </div>
  )
}

export default Chart;