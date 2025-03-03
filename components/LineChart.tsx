import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import CustomDropdown from './CustomDropdown'; // Ensure correct import path

// Define the type for the data props
interface LineChartComponentProps {
  dataForYears: Record<number, { name: string; revenue: number }[]>; // Data for multiple years
  years: number[]; // Available years
}

const LineChartComponent: React.FC<LineChartComponentProps> = ({ dataForYears, years }) => {
  const [selectedYear, setSelectedYear] = useState<number>(years[0]); // Default to the first available year
  const [data, setData] = useState<any[]>([]); // Store the chart data

  // Set the data for the selected year
  useEffect(() => {
    setData(dataForYears[selectedYear]);
  }, [selectedYear, dataForYears]);

  // Handle year change
  const handleYearChange = (value: string | number) => {
    setSelectedYear(Number(value));
  };

  return (
    <div className="w-full">
      <h3 className="text-xl font-bold text-center mb-4">Overview of Data for {selectedYear}</h3>

      <div className="mb-4 w-32 mx-auto">
        <label htmlFor="year" className="mr-2">Select Year:</label>
        <CustomDropdown 
          options={years} 
          selectedOption={selectedYear} 
          onOptionSelect={handleYearChange} 
          label={''} 
        />
      </div>

      {/* Line chart with dynamic data */}
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="revenue" stroke="#a64729" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChartComponent;