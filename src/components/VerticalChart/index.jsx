import React from "react";

// Chart
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);

// assets
import classes from "./_VerticalChart.module.scss";

/**
 * @param {{
 * dataScoreResult : import('../../types/summaryType').ScoreTestResults[]
 * isDesktop : boolean
 * }} props
 * @returns
 */

const VerticalChart = ({ dataScoreResult, isBarOnly, options }) => {
  const labelChart = dataScoreResult?.map((value) => {
    return value.header;
  });
  const scoreChart =
    dataScoreResult?.map((value) => {
      return Number(value.score);
    }) || [];

  const defaultOptions = {
    options: {
      plugins: {
        legend: {
          display: false,
        },
        datalabels: {
          display: false,
        },
      },
      scales: {
        x: {
          ticks: {
            maxRotation: isBarOnly ? options?.tick?.maxRotation : 90,
            minRotation: isBarOnly ? options?.tick?.minRotation : 90,
            font: {
              size: options?.tick?.fontSize ?? 16,
            },
          },
          grid: {
            display: false,
          },
        },
        y: {
          max: 100,
          grid: {
            color: "#D5D5D5",
            lineWidth: 2,
          },
          ticks: {
            callback: function (value, index) {
              if (index === 0) return 0;
              return value % 20 ? undefined : value;
            },
          },
        },
      },
      barThickness: isBarOnly ? options?.barThickness ?? 60 : undefined,
      responsive: true,
      maintainAspectRatio: options?.maintainAspectRatio ?? false,
    },
    data: {
      labels: labelChart,
      datasets: [
        {
          data: scoreChart,
          backgroundColor: [
            "#4977E0",
            "#BD424F",
            "#D39931",
            "#248867",
            "#9849B4",
            "#1F95B8",
            "#DA6659",
            "#8E8842",
          ],
          borderWidth: 1,
        },
      ],
    },
  };

  if (isBarOnly) {
    return <Bar {...defaultOptions} className={classes.containerChartBar} />;
  }

  return (
    <div className={classes.containerChart}>
      <Bar {...defaultOptions} className={classes.containerChartBar} />

      <div className={classes.sideTitle}>
        <p>Multiple Intelligence</p>
      </div>
    </div>
  );
};

export default VerticalChart;
