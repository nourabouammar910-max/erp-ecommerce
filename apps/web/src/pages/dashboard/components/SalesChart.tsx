import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const data = [
  { month: "Jan", sales: 1200 },
  { month: "Feb", sales: 2400 },
  { month: "Mar", sales: 1800 },
  { month: "Apr", sales: 3000 },
  { month: "May", sales: 4500 },
  { month: "Jun", sales: 5200 },
];

export default function SalesChart() {
  return (
    <div
      style={{
        height: 350,
        marginTop: 30,
      }}
    >
      <ResponsiveContainer>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="4 4" />

          <XAxis dataKey="month" />

          <YAxis />

          <Tooltip />

          <Line
            dataKey="sales"
            stroke="#1976d2"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}