import React from "react";

// Chart
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Styles
import classes from "./_HorizontalBarChart.module.scss";

/**
 * @typedef {{
 * barThickness : number
 * datalabels: {fontSize: number};
 * barThickness?: number;
 * ticks: {
 * xFontSize: number;
 * yFontSize: number;
 * xPadding?: number;
 * yPadding?: number;
 * }
 * }} Options
 */

/**
 *
 * @param {{
 * dataScoreResult: import("../../../types/summaryType").ScoreTestResults[]
 * options: Options
 * }} param0
 * @returns
 */

const HorizontalBarChart = ({ dataScoreResult, options }) => {
  const scoreResult = dataScoreResult?.map((value) => value[1]?.score);
  const labelsChart = dataScoreResult?.map((value) => value[1]?.header);

  // new JSON
  const newScoreResult = dataScoreResult?.map((value) => value?.score);
  const newLabelsChart = dataScoreResult?.map((value) => value?.header);

  const score = scoreResult[0] ? scoreResult : newScoreResult;
  const labels = labelsChart[0] ? labelsChart : newLabelsChart;

  const defaultOptions = {
    options: {
      indexAxis: "y",
      barThickness: options?.barThickness ?? 70,
      responsive: true,
      scales: {
        x: {
          max: 100,
          ticks: {
            padding: options?.ticks?.xPadding ?? 25,
            color: "#D7D7D7",
            font: {
              size: options?.ticks?.xFontSize ?? 10,
            },
            callback: function (value, index) {
              if (index === 0) return 0;
              return value % 20 ? undefined : value;
            },
          },
        },
        y: {
          grid: {
            display: false,
          },
          ticks: {
            padding: options?.ticks?.yPadding ?? 20,
            color: "#7966FA",
            font: {
              size: options?.ticks?.yFontSize ?? 10,
              weight: 700,
            },
            callback: function (_, index) {
              return `${labels[index]} (${labels[index][0]})`;
            },
          },
        },
      },
      plugins: {
        datalabels: {
          color: ["#333333"],
          font: {
            size: options?.datalabels?.fontSize ?? 15,
            weight: 500,
          },
          anchor: "end",
          align: "end",
        },
        legend: {
          display: false,
        },
      },
    },
    data: {
      labels: labels,
      datasets: [
        {
          data: score,
          backgroundColor: [
            "#7FCDD8",
            "#EDBE7D",
            "#CB67D3",
            "#6C62D3",
            "#6A8ED4",
            "#82D89D",
          ],
        },
      ],
    },
  };

  return (
    <div className={classes.container}>
      <Bar {...defaultOptions} />
    </div>
  );
};

export default HorizontalBarChart;
