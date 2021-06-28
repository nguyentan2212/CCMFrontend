import React from "react";
import { CChartLine } from "@coreui/react-chartjs";
import { getStyle, hexToRgba } from "@coreui/utils";

const brandInfo = getStyle("info") || "#20a8d8";

function CapitalLineChart(props) {
  const { customStyle, capitalsData, chartLabels } = props;

  const defaultDatasets = (() => {
    let elements = 12;
    const data1 = [];
    for (let i = 0; i < elements; i++) {
      data1.push(capitalsData[i] / 1000000);
    }
    return [
      {
        label: "Biểu đồ khoản vốn",
        backgroundColor: hexToRgba(brandInfo, 10),
        borderColor: brandInfo,
        pointHoverBackgroundColor: brandInfo,
        borderWidth: 2,
        data: data1,
      },
    ];
  })();

  const defaultOptions = (() => {
    let maxValue = Math.max(...capitalsData) / 1000000;
    let temp = Math.pow(10, Math.floor(Math.log10(maxValue)));
    let result = (Math.floor(maxValue / temp) + 1) * temp;
    return {
      maintainAspectRatio: false,
      legend: {
        display: false,
      },
      scales: {
        xAxes: [
          {
            gridLines: {
              drawOnChartArea: false,
            },
          },
        ],
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
              maxTicksLimit: 10,
              stepSize: Math.ceil(result / 10),
              max: result,
            },
            gridLines: {
              display: true,
            },
          },
        ],
      },
      elements: {
        point: {
          radius: 0,
          hitRadius: 10,
          hoverRadius: 4,
          hoverBorderWidth: 3,
        },
      },
    };
  })();

  // render
  return (
    <CChartLine
      style={customStyle}
      datasets={defaultDatasets}
      options={defaultOptions}
      labels={chartLabels}
    />
  );
}

export default CapitalLineChart;
