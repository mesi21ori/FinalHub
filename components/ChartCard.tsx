import React from "react";

type StatItem = {
  label: string;
  value: string | number;
};

// Define the type for the chartData prop
type ChartCardProps = {
  title: string;
  children: React.ReactNode; // for rendering chart components
  stats: StatItem[]; // array of stats
  chartData?: Record<number, any>; // Optional chart data to pass to the chart component
};

const ChartCard: React.FC<ChartCardProps> = ({ title, children, stats, chartData }) => {
  return (
    <div className="w-full bg-[#f7f4f0] shadow-lg rounded-xl p-2 border-l-4 border-b-4 border-[#3a2f2c] glow-effect">
      <h2 className="text-xl font-semibold text-[#3a2f2c] mb-4">{title}</h2>
      <div className="mb-4">{children}</div>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 text-[#3a2f2c]">
        {stats.map((stat, index) => (
          <li key={index}>
            {stat.label}: <span className="font-bold text-[#3a2f2c]">{stat.value}</span>
          </li>
        ))}
      </ul>

      {/* Optional: Render chart data if passed */}
      {chartData && (
        <div className="mt-4">
          {/* Render chart here based on chartData */}
          {/* Example chart component usage */}
          {/* <YourChartComponent data={chartData} /> */}
        </div>
      )}
    </div>
  );
};

export default ChartCard;