import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { fetchBudget } from "../../../../MockApi/BudgetApi";

// Define the type for the processed data
interface ProcessedData {
  status: string;
  count: number;
}

const BudgetStatusChart = () => {
  const [data, setData] = useState<ProcessedData[]>([]);

  useEffect(() => {
    // Fetch data and process it
    fetchBudget().then((response) => {
      const statusCounts = (response as Array<{ status: string }>).reduce(
        (acc, item) => {
          acc[item.status] = (acc[item.status] || 0) + 1;
          return acc;
        },
        {} as Record<string, number>
      );

      // Convert counts into an array for Recharts
      const processedData = Object.keys(statusCounts).map((status) => ({
        status,
        count: statusCounts[status],
      }));

      setData(processedData);
    });
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Status Distribution</h2>

      {/* Bar Chart */}
      <BarChart
        width={600}
        height={300}
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="status" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#8884d8" />
      </BarChart>
    </div>
  );
};

export default BudgetStatusChart;
