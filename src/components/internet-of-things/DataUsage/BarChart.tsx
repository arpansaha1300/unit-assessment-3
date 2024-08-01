import {
  BarChart as ReBarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  LabelList,
  CartesianGrid,
} from 'recharts'
import formatDate from '~/utils/formatDate'
import { SubDateUnit } from './types'

interface BarChartProps {
  data: any[]
  xKey: string
  yKey?: string
  labelKey: string
  xUnit: SubDateUnit
}

type WeekDays = keyof typeof dayAbbreviations

const dayAbbreviations = {
  Sunday: 'Su',
  Monday: 'Mo',
  Tuesday: 'Tu',
  Wednesday: 'We',
  Thursday: 'Th',
  Friday: 'Fr',
  Saturday: 'Sa',
}

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

export default function BarChart(props: Readonly<BarChartProps>) {
  const { data, xKey, yKey, labelKey, xUnit } = props

  return (
    <ResponsiveContainer width="100%" height="100%">
      <ReBarChart width={150} height={40} data={data} barSize={16}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey={xKey} tick={<XTick unit={xUnit} />} />
        <YAxis dataKey={yKey} className="text-xs text-gray-500" />
        <Bar dataKey={labelKey} fill="#F6288F" radius={[4, 4, 0, 0]}>
          <LabelList
            dataKey={labelKey}
            content={renderCustomizedLabel}
            fontSize={12}
          />
        </Bar>
      </ReBarChart>
    </ResponsiveContainer>
  )
}

function XTick(props: any) {
  const { x, y, payload, unit } = props

  return (
    <>
      <g transform={`translate(${x},${y})`}>
        <text
          x={0}
          y={0}
          dx={8}
          dy={12}
          textAnchor="end"
          fill="#6b7280"
          className="text-xs"
        >
          {unit === SubDateUnit.DAY
            ? dayAbbreviations[formatDate(payload.value, 'eeee') as WeekDays]
            : formatDate(payload.value, 'MMM')}
        </text>
      </g>

      {unit === SubDateUnit.DAY && (
        <g transform={`translate(${x},${y})`}>
          <text
            x={0}
            y={0}
            dx={10}
            dy={26}
            textAnchor="end"
            fill="#6b7280"
            className="text-xs"
          >
            {formatDate(payload.value, 'd/M')}
          </text>
        </g>
      )}
    </>
  )
}