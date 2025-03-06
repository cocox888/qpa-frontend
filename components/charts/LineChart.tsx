import { TypeChartData } from '@/lib/types';
import type React from 'react';
import { useEffect } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

// Sample data with more realistic values
const data = [
  { name: 'Week 1', re: 31000, users: 2400 },
  // { name: 'Week 2', revenue: 28000, users: 1398 },
  // { name: 'Week 3', revenue: 35000, users: 9800 },
  // { name: 'Week 4', revenue: 42000, users: 3908 },
  // { name: 'Week 5', revenue: 38000, users: 4800 },
  // { name: 'Week 6', revenue: 45000, users: 3800 },
  // { name: 'Week 7', revenue: 50000, users: 4300 }
];

// Define the type for each payload item
// interface PayloadItem {
//   value: number;
//   name: string;
//   payload: Record<string, any>;
// }

// Define props for the CustomTooltip
// interface CustomTooltipProps {
//   active?: boolean; // Make active optional
//   payload?: PayloadItem[] | undefined;
//   label: string;
// }

// Custom tooltip component
// const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
//   // Handle the case where `active` might be undefined
//   if (active && payload && payload.length) {
//     return React.createElement(
//       "div",
//       {
//         className: "bg-white p-3 shadow-lg rounded-lg border border-gray-100",
//       },
//       [
//         React.createElement(
//           "p",
//           {
//             className: "text-sm font-medium text-gray-900",
//             key: "label",
//           },
//           label
//         ),
//         React.createElement(
//           "p",
//           {
//             className: "text-sm text-brand-500",
//             key: "revenue",
//           },
//           `Revenue: $${payload[0].value.toLocaleString()}`
//         ),
//         React.createElement(
//           "p",
//           {
//             className: "text-sm text-blue-500",
//             key: "users",
//           },
//           `Users: ${payload[1].value.toLocaleString()}`
//         ),
//       ]
//     );
//   }
//   return null;
// };
interface ActivityChartProps {
  chartData: TypeChartData[]
}
const ActivityChart: React.FC<ActivityChartProps> = ({ chartData }) => {


  useEffect(() => {
    console.log(chartData)
  }, [chartData]);




  const getMinValue = () => {
    const minValue = Math.floor(Math.min(...chartData.map((data) => data.count || 0)));
    return minValue;
  }
  const getMaxValue = () => {
    const maxValue = Math.ceil(Math.max(...chartData.map((data) => data.count || 0)));
    return maxValue;
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart
        data={chartData}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <CartesianGrid
          strokeDasharray="3 3"
          vertical={false}
          stroke="#f0f0f0"
        />
        <XAxis
          dataKey="date"
          axisLine={false}
          tickLine={false}
          tick={{ fill: '#9CA3AF', fontSize: 12 }}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tick={{ fill: '#9CA3AF', fontSize: 12 }}
          tickFormatter={(value) => `${value.toLocaleString()}`}
          domain={[getMinValue(), getMaxValue()]} // Dynamic domain based on data
          tickCount={getMaxValue() - getMinValue() + 1} // This ensures the interval will be 1
        />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="count"
          stroke="#84b894"
          fill="#84b894"
          fillOpacity={0.1}
          strokeWidth={2}
          activeDot={{ r: 6, strokeWidth: 0 }}
        />
        {/* <Area
          type="monotone"
          dataKey="users"
          stroke="#60a5fa"
          fill="#60a5fa"
          fillOpacity={0.1}
          strokeWidth={2}
          activeDot={{ r: 6, strokeWidth: 0 }}
        /> */}
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default ActivityChart;
