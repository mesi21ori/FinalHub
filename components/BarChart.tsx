import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import CustomDropdown from './CustomDropdown';

interface BarChartComponentProps {
  dataForYears: Record<number, { name: string; content: number }[]>;
  years: number[];
}

const BarChartComponent: React.FC<BarChartComponentProps> = ({ dataForYears, years }) => {
  const [selectedYear, setSelectedYear] = useState<number>(years[0]);

  const handleYearChange = (value: string | number) => {
    setSelectedYear(Number(value)); // Convert to number
  };

  if (!dataForYears[selectedYear] || dataForYears[selectedYear].length === 0) {
    return <p className="text-center text-gray-500">No data available for the selected year.</p>;
  }

  return (
    <div className="w-full">
      <h3 className="text-xl font-bold text-center mb-4">
        Overview of Data for {selectedYear}
      </h3>

      <div className="mb-4 w-32 mx-auto">
        <label htmlFor="year" className="mr-2">Select Year:</label>
        <CustomDropdown
          options={years}
          selectedOption={selectedYear}
          onOptionSelect={handleYearChange}
          label={''}
        />
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={dataForYears[selectedYear]}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="name"
            angle={-45}
            textAnchor="end"
            interval={0}
            tick={{ fontSize: 10 }}
          />
          <YAxis tick={{ fontSize: 10 }} />
          <Tooltip
            formatter={(value: number) => `${value} units`}
            labelFormatter={(label: string) => `Data for ${label}`}
          />
          <Legend />
          <Bar dataKey="content" fill="#5a5b4b" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartComponent;
