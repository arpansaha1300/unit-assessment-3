import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline'
import Card from '~common/Card'
import Divider from '~common/Divider'
import PieChart from '~/components/internet-of-things/PieChart'
import Stats from './Stats'

interface IPieData {
  data: any[]
  labels: any[]
  colors: string[]
}

interface PieDataProps {
  pieData: IPieData
}

const stats = [
  {
    name: 'Total SIMs',
    value: '200K',
  },
  {
    name: 'Active SIMs',
    value: '200K',
  },
  {
    name: 'Inactive SIMs',
    value: '0',
  },
]

export default function Overview() {
  const pieData1 = {
    data: [{ name: 'Group A', value: 400 }],
    labels: [
      {
        name: 'Active',
        value: '200K',
        percent: '100%',
      },
    ],
    colors: ['#F6288F', '#0A3B52', '#45A0B5'],
  }
  const pieData2 = {
    data: [
      { name: 'Group A', value: 400 },
      { name: 'Group B', value: 100 },
    ],
    labels: [
      {
        name: 'Connected',
        value: '190K',
      },
      {
        name: 'Disconnected',
        value: '10K',
      },
    ],
    colors: ['#F6288F', '#0A3B52', '#45A0B5'],
  }

  return (
    <section>
      <Card>
        <div className="py-2 flex items-center justify-between">
          <h2 className="text-lg font-bold">Overview</h2>
          <div className="flex items-center gap-4">
            <p className="text-xs">Last updated: May 6, 10:00 AM</p>
            <ArrowTopRightOnSquareIcon className="flex-shrink-0 size-4" />
          </div>
        </div>

        <Stats stats={stats} columns={3} className="mt-4" />

        <div className="mt-6 flex gap-8">
          <div className="flex-grow">
            <h3 className="font-bold">SIMs status</h3>
            <p className="text-xs">Last updated: May 6, 10:00 AM</p>

            <PieData pieData={pieData1} />
          </div>

          <div>
            <Divider vertical />
          </div>

          <div className="flex-grow">
            <h3 className="font-bold">SIMs connectivity</h3>
            <p className="text-xs">Last updated: May 6, 10:00 AM</p>

            <PieData pieData={pieData2} />
          </div>
        </div>
      </Card>
    </section>
  )
}

function PieData(props: Readonly<PieDataProps>) {
  const { pieData } = props

  return (
    <div className="pt-6 pb-4 flex gap-10">
      <PieChart data={pieData.data} colors={pieData.colors} size={150} />

      <div className="flex items-center">
        <ul className="space-y-2">
          {pieData.labels.map((label, i) => (
            <li key={label.name} className="flex items-center gap-2">
              <div
                className="size-3.5"
                style={{ backgroundColor: pieData.colors[i] }}
              />
              <p className="text-xs space-x-1.5">
                <span className="inline-block">{label.name}</span>
                {label.value && (
                  <span className="inline-block font-semibold">
                    {label.value}
                  </span>
                )}
                {label.percent && (
                  <span className="inline-block">{label.percent}</span>
                )}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
