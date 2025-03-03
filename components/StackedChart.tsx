import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import CustomDropdown from "./CustomDropdown"; // Ensure correct import path

// Register necessary Chart.js components
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

interface StackedChartProps {
  title: string; // Title for the chart
  labels: string[]; // Labels for the X-axis
  datasets: Record<number, { [key: string]: number[] }>; // Year-wise dataset
  dropdownOptions: number[]; // Available years
  initialYear: number; // Default year to display
}

const StackedChartComponent: React.FC<StackedChartProps> = ({
  title,
  labels,
  datasets,
  dropdownOptions,
  initialYear,
}) => {
  const [selectedYear, setSelectedYear] = useState<number>(initialYear);

  // Default color palette
  const defaultColors = [
    "#a28275",
    "#856e66",
    "#b0a083",
    "#a0885f", 
  ];

  // Handle dropdown selection
  const handleYearChange = (value: string | number) => {
    setSelectedYear(Number(value));
  };

  // Prepare the data for Chart.js
  const data = {
    labels,
    datasets: Object.keys(datasets[selectedYear]).map((key, index) => ({
      label: key,
      data: datasets[selectedYear][key],
      backgroundColor: defaultColors[index % defaultColors.length], // Use default colors
    })),
  };

  // Chart options
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: title,
      },
      legend: {
        position: "top" as const,
      },
    },
    scales: {
      x: {
        stacked: true,
        title: {
          display: true,
          text: "Months",
        },
      },
      y: {
        stacked: true,
        title: {
          display: true,
          text: "Number of Feedbacks",
        },
      },
    },
  };

  return (
    <div className="w-full">
      <h3 className="text-xl font-bold text-center mb-4">
        {title} - {selectedYear}
      </h3>

      {/* Dropdown for year selection */}
      <div className="mb-4 w-32 mx-auto">
        <label htmlFor="year" className="mr-2">Select Year:</label>
        <CustomDropdown
          options={dropdownOptions}
          selectedOption={selectedYear}
          onOptionSelect={handleYearChange}
          label={""}
        />
      </div>

      {/* Bar chart */}
      <div className="w-full" style={{ height: "450px" }}>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default StackedChartComponent;