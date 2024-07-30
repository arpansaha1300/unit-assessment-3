import {
  BarChart as ReBarChart,
  Bar,
  ResponsiveContainer,
  // Tooltip,
  XAxis,
  YAxis,
  LabelList,
  CartesianGrid,
} from 'recharts'

const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
]

const renderCustomizedLabel = (props: any) => {
  const { x, y, width, value } = props
  const radius = 10

  return (
    <text
      x={x + width / 2}
      y={y - radius}
      textAnchor="middle"
      dominantBaseline="middle"
      className="text-xs text-gray-500"
    >
      {value}
    </text>
  )
}

export default function BarChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <ReBarChart width={150} height={40} data={data} barSize={17}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="name" className="text-xs text-gray-500" />
        <YAxis className="text-xs text-gray-500" />
        {/* <Tooltip /> */}
        <Bar dataKey="uv" fill="#F6288F" radius={[4, 4, 0, 0]}>
          <LabelList
            dataKey="uv"
            content={renderCustomizedLabel}
            fontSize={12}
          />
        </Bar>
      </ReBarChart>
    </ResponsiveContainer>
  )
}
