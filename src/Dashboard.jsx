import { Bubble } from "react-chartjs-2";

const data = {
  datasets: [
    {
      label: "Dataset 1",
      data: [
        { x: 10, y: 20, r: 15 },
        { x: 30, y: 40, r: 25 },
        { x: 50, y: 60, r: 20 },
      ],
      backgroundColor: "rgba(255, 99, 132, 0.6)", // Customize bubble color
    },
    {
      label: "Dataset 2",
      data: [
        { x: 15, y: 25, r: 10 },
        { x: 35, y: 45, r: 18 },
        { x: 55, y: 65, r: 22 },
      ],
      backgroundColor: "rgba(54, 162, 235, 0.6)", // Customize bubble color
    },
    // Add more datasets as needed
  ],
};

const options = {
  scales: {
    x: {
      type: "linear",
      position: "bottom",
    },
    y: {
      type: "linear",
      position: "left",
    },
  },
  tooltips: {
    callbacks: {
      label: (tooltipItem, data) => {
        const datasetLabel =
          data.datasets[tooltipItem.datasetIndex].label || "";
        const value =
          data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
        return `${datasetLabel}: (${value.x}, ${value.y}), Radius: ${value.r}`;
      },
    },
  },
};

const BubbleChart = () => {
  return (
    <div>
      <Bubble id="bubble" data={data} options={options} />
    </div>
  );
};

export default BubbleChart;