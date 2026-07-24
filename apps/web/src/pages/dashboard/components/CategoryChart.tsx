import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#1976d2",
  "#4caf50",
  "#ff9800",
  "#f44336",
];

const data = [
  {
    name: "Electronics",
    value: 45,
  },
  {
    name: "Foods",
    value: 20,
  },
  {
    name: "Furniture",
    value: 18,
  },
  {
    name: "Other",
    value: 17,
  },
];

export default function CategoryChart() {
  return (
    <div
      style={{
        height: 350,
      }}
    >
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            label
          >
            {data.map((_, i) => (
              <Cell
                key={i}
                fill={COLORS[i]}
              />
            ))}
          </Pie>

          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}