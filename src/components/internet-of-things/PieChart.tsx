import { PieChart as RePieChart, Pie, Cell } from 'recharts'

interface PieChartProps {
  size: number
  data: any[]
  colors: string[]
  thickness?: number
  centerLabel?: React.ReactNode
}

export default function PieChart(props: Readonly<PieChartProps>) {
  const { data, colors, size, thickness = 15, centerLabel } = props

  return (
    <div className="relative">
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
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
      </RePieChart>
      {centerLabel && (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          {centerLabel}
        </div>
      )}
    </div>
  )
}
