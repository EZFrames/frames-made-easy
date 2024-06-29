import React from "react";
import Chart from "react-apexcharts";

const LineChart = ({ data }) => {
  // Prepare data for ApexCharts
  const series = [
    {
      name: "Total Interactions",
      data: data.map(entry => entry.count),
    },
  ];

  const options = {
    chart: {
      height: 350,
      type: "line",
      zoom: {
        enabled: false,
      },
    },
    xaxis: {
      categories: data.map(entry => entry.date),
      title: {
        text: "Date",
      },
    },
    yaxis: {
      title: {
        text: "Interactions",
      },
    },
  };

  return (
    <div className="line-chart">
      <Chart options={options} series={series} type="line" height={350} />
    </div>
  );
};

export default LineChart;
