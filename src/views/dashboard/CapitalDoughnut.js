import React from "react";
import { CChartDoughnut } from "@coreui/react-chartjs";

function CapitalDoughnut(props) {
  const { labels, data } = props;
  const doughnut = {
    labels: labels,
    datasets: [
      {
        data: data,
        backgroundColor: ["#FF6384", "#36A2EB"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB"],
      },
    ],
  };
  return (
    <div className="chart-wrapper">
        <CChartDoughnut
          width={300}
          datasets={doughnut.datasets}
          labels={doughnut.labels}
        />
      </div>
  );
}

export default CapitalDoughnut;
