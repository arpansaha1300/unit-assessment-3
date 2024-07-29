import { PieChart as RePieChart, Pie, Cell } from 'recharts'

interface PieChartProps {
  size: number
  data: any[]
  colors: string[]
  thickness?: number
}

export default function PieChart(props: Readonly<PieChartProps>) {
  const { data, colors, size, thickness = 15 } = props

  return (
    <RePieChart width={size} height={size}>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        innerRadius={size / 2 - thickness}
        outerRadius={size / 2}
        fill="#8884d8"
        paddingAngle={data.length === 1 ? 0 : 5}
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
        ))}
      </Pie>
    </RePieChart>
  )
}
