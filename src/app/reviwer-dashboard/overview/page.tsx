
"use client";

import React from "react";
import DoughnutChart from "../../../../components/DoughnutChart";
import BarChartComponent from "../../../../components/BarChart";
import LineChartComponent from "../../../../components/LineChart";
import Highlights from "../../../../components/HighlightCardPlatform";
import StackedChartComponent from "../../../../components/StackedChart";
import ChartCard from "../../../../components/ChartCard";

const OverviewPage: React.FC = () => {
  const years = [2021, 2022, 2023, 2024];

  const userStatisticsData = {
    2021: [100, 200, 300],
    2022: [150, 250, 350],
    2023: [200, 300, 400],
    2024: [250, 350, 450],
  };

  const userStatisticsLabels = (year: number) => ["Active Users", "Inactive Users", "New Users"];

  const contentData = {
    2021: [
      { name: "Jan", content: 300 },
      { name: "Feb", content: 400 },
      { name: "Mar", content: 500 },
    ],
    2022: [
      { name: "Jan", content: 350 },
      { name: "Feb", content: 450 },
      { name: "Mar", content: 550 },
    ],
    2023: [
      { name: "Jan", content: 400 },
      { name: "Feb", content: 500 },
      { name: "Mar", content: 600 },
    ],
    2024: [
      { name: "Jan", content: 450 },
      { name: "Feb", content: 550 },
      { name: "Mar", content: 650 },
    ],
  };

  const subscriptionTrendsData = {
    2021: [
      { name: "Jan", revenue: 1000 },
      { name: "Feb", revenue: 1200 },
      { name: "Mar", revenue: 1400 },
    ],
    2022: [
      { name: "Jan", revenue: 1300 },
      { name: "Feb", revenue: 1500 },
      { name: "Mar", revenue: 1700 },
    ],
    2023: [
      { name: "Jan", revenue: 1600 },
      { name: "Feb", revenue: 1800 },
      { name: "Mar", revenue: 2000 },
    ],
    2024: [
      { name: "Jan", revenue: 1900 },
      { name: "Feb", revenue: 2100 },
      { name: "Mar", revenue: 2300 },
    ],
  };

  const feedbackData = {
    2021: { Positive: [50, 60, 70], Negative: [30, 20, 10], Neutral: [10, 20, 30] },
    2022: { Positive: [60, 70, 80], Negative: [20, 15, 5], Neutral: [15, 25, 35] },
    2023: { Positive: [70, 80, 90], Negative: [10, 5, 0], Neutral: [20, 30, 40] },
    2024: { Positive: [80, 90, 100], Negative: [5, 3, 2], Neutral: [25, 35, 45] },
  };

 

  const highlights = [
    { value: 500, label: "Total Users" },
    { value: 1000, label: "Total Contents" },
    { value: 300, label: "Total Revenue" },
    { value: 20, label: "Total Feedbacks" },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-center mb-6">Overview Dashboard</h1>
      <Highlights highlights={highlights} />

      <div className="grid grid-cols-1 gap-6 mt-6">
        <ChartCard
          title="User Statistics"
          stats={[
            { label: "Active Users", value: 250 },
            { label: "Inactive Users", value: 350 },
            { label: "New Users", value: 450 },
          ]}
        >
          <DoughnutChart
            dataForYears={userStatisticsData}
            getLabelsForYear={userStatisticsLabels}
            title="User Statistics"
          />
        </ChartCard>

        <ChartCard
          title="Content Statistics"
          stats={[
            { label: "January Content", value: 450 },
            { label: "February Content", value: 550 },
            { label: "March Content", value: 650 },
          ]}
        >
          <BarChartComponent dataForYears={contentData} years={years} />
        </ChartCard>

        <ChartCard
          title="Subscription Trends"
          stats={[
            { label: "January Revenue", value: "$1900" },
            { label: "February Revenue", value: "$2100" },
            { label: "March Revenue", value: "$2300" },
          ]}
        >
          <LineChartComponent dataForYears={subscriptionTrendsData} years={years} />
        </ChartCard>
<ChartCard
          title="Feedback Statistics"
          stats={[
            { label: "Positive Feedback", value: 80 },
            { label: "Negative Feedback", value: 5 },
            { label: "Neutral Feedback", value: 25 },
          ]}
        >
          <StackedChartComponent
            title="Feedback Statistics"
            labels={["Jan", "Feb", "Mar"]}
            datasets={feedbackData}
            dropdownOptions={years}
            initialYear={2024}
          />
        </ChartCard>
      </div>
    </div>
  );
};

export default OverviewPage;
