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
import kFormatter from '~/utils/kFormatter'

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
      fill="#6b7280"
      className="hidden sm:block text-[10px]"
    >
      {value} GB
    </text>
  )
}

export default function BarChart(props: Readonly<BarChartProps>) {
  const { data, xKey, yKey, labelKey, xUnit } = props

  return (
    <ResponsiveContainer width="100%" height="100%">
      <ReBarChart
        width={150}
        height={40}
        data={data}
        barSize={16}
        margin={{
          top: 18,
          right: 0,
          left: -18,
          bottom: 10,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey={xKey} tick={<XTick unit={xUnit} />} interval={0} />
        <YAxis dataKey={yKey} axisLine={false} tick={<YTick />} />
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
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={12}
        textAnchor="middle"
        fill="#6b7280"
        className="text-[10px]"
      >
        {unit === SubDateUnit.DAY
          ? dayAbbreviations[formatDate(payload.value, 'eeee') as WeekDays]
          : formatDate(payload.value, 'MMM')}
      </text>

      {unit === SubDateUnit.DAY && (
        <text
          x={0}
          y={0}
          dy={26}
          textAnchor="middle"
          fill="#6b7280"
          className="text-[10px]"
        >
          {formatDate(payload.value, 'd/M')}
        </text>
      )}
    </g>
  )
}

const DUMMY_COST_PER_GB = 500

function YTick(props: any) {
  const { x, y, payload } = props

  return (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={3} textAnchor="end" fill="#6b7280" className="text-[10px]">
        ${kFormatter(payload.value * DUMMY_COST_PER_GB)}
      </text>
    </g>
  )
}
