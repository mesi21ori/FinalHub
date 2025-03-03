import React, { useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import CustomDropdown from "./CustomDropdown";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

interface DoughnutChartProps {
  dataForYears: { [year: number]: number[] };
  getLabelsForYear: (year: number) => string[];
  colors?: string[];
  defaultYear?: number;
  title?: string;
}

const DoughnutChart: React.FC<DoughnutChartProps> = ({
  dataForYears,
  getLabelsForYear,
  colors = ["#453f2f", "#87817e", "#6b573e", "#97654c", "#a58860"],
  defaultYear = new Date().getFullYear(),
  title = "Doughnut Chart",
}) => {
  const [selectedYear, setSelectedYear] = useState<number>(defaultYear);

  const handleYearChange = (value: string | number) => {
    setSelectedYear(Number(value)); // Ensure value is treated as a number
  };

  const labels = getLabelsForYear(selectedYear);
  const data = {
    labels,
    datasets: [
      {
        label: `${title} (${selectedYear})`,
        data: dataForYears[selectedYear],
        backgroundColor: colors,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "bottom" as const,
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem: any) => `${tooltipItem.label}: ${tooltipItem.raw}`,
        },
      },
    },
  };

  console.log("Selected Year:", selectedYear);
  console.log("Labels:", labels);
  console.log("Data for Year:", dataForYears[selectedYear]);

  return (
    <div className="w-full">
      {title && (
        <h3 className="text-xl font-bold text-center mb-4">
          {title} - {selectedYear}
        </h3>
      )}
      <div className="mb-4 w-32 mx-auto">
        <CustomDropdown
          options={Object.keys(dataForYears).map(Number)} // Convert keys to numbers
          selectedOption={selectedYear}
          onOptionSelect={handleYearChange}
          label="Select Year"
        />
      </div>
      <div className="w-full" style={{ height: "400px" }}>
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
};

export default DoughnutChart;
