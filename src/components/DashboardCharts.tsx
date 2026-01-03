"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#2563eb", "#16a34a", "#dc2626", "#9333ea", "#f59e0b"];

export default function DashboardCharts({
  data,
}: {
  data: { name: string; value: number }[];
}) {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">
        Products by Category
      </h3>

      {data.length === 0 && (
        <p className="text-gray-500">No data available</p>
      )}

      {data.length > 0 && (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {data.map((_, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
