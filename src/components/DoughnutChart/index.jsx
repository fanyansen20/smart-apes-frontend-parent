import React from "react";

// Chart
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Doughnut } from "react-chartjs-2";
ChartJS.register(ArcElement, ChartDataLabels, Tooltip, Legend);

// Styles
import classes from "./_DoughnutChart.module.scss";

/**
 * @typedef {{
 * datalabels: {fontSize: number};
 * legend: {fontSize: number};
 * }} Option
 */

/**
 *
 * @param {{
 * dataScoreResult: [string, [header: string; score: string]][]
 * options: Option
 * className: string
 * }} param0
 * @returns
 */

const DoughnutChart = ({ dataScoreResult, options, className }) => {
  if (!dataScoreResult) return;

  const scoreResult = dataScoreResult?.map((value) => value[1]?.score);
  const labelsChart = dataScoreResult?.map((value) => value[1]?.header);

  // new JSON
  const newScoreResult = dataScoreResult?.map((value) => value.score);
  const newLabelsChart = dataScoreResult?.map((value) => value?.header);

  const defaultOptions = {
    options: {
      cutoutPercentage: 100,
      borderWidth: 0,
      plugins: {
        datalabels: {
          color: ["#FFF"],
          font: {
            size: options?.datalabels?.fontSize ?? 15,
            weight: 700,
          },
          formatter: (value) => {
            return value + "%";
          },
        },
        legend: {
          position: "bottom",
          labels: {
            boxWidth: 20,
            padding: 20,
            usePointStyle: true,
            font: {
              size: options?.legend?.fontSize ?? 16,
              weight: 400,
            },
          },
        },
      },
    },
    data: {
      labels: labelsChart[0] ? labelsChart : newLabelsChart,
      datasets: [
        {
          data: scoreResult[0] ? scoreResult : newScoreResult,
          backgroundColor: [" #4EB7B5", " #AEB735", " #F28F3E"],
        },
      ],
    },
  };

  return (
    <div className={className ? className : classes.containerDoughnutChart}>
      <Doughnut {...defaultOptions} className={classes.doughnutChart} />
    </div>
  );
};

export default DoughnutChart;
