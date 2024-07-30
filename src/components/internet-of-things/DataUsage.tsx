import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline'
import Card from '~common/Card'
import Stats from './Stats'
import BarChart from './BarChart'

const stats = [
  {
    name: 'Total usage',
    value: '617.93 GB',
  },
  {
    name: 'Daily average',
    value: '88 GB',
  },
]

export default function DataUsage() {
  return (
    <section className="h-full">
      <Card className="flex flex-col h-full">
        <div className="py-2 flex items-center justify-between">
          <h2 className="text-lg font-bold">Data usage</h2>
          <div className="flex items-center gap-4">
            <p className="text-xs">Last updated: May 6, 10:00 AM</p>
            <ArrowTopRightOnSquareIcon className="flex-shrink-0 size-4" />
          </div>
        </div>

        <Stats stats={stats} columns={2} className="mt-4" />

        <div className="flex-grow mt-10 w-full min-h-64">
          <BarChart />
        </div>
      </Card>
    </section>
  )
}
