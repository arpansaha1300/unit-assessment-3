import { useEffect, useMemo, useState } from 'react'
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline'
import { isWithinInterval, subDays, subMonths } from 'date-fns'
import Card from '~common/Card'
import Stats from '../Stats'
import BarChart from './BarChart'
import kFormatter from '~/utils/kFormatter'
import formatDate from '~/utils/formatDate'
import SelectMenu from './SelectMenu'
import { SubDateUnit } from './types'
import { dataUsageDefaultData } from '~/assets/data'

type TDataUsage =
  (typeof dataUsageDefaultData.dataUsageGraphResponse)[number]['dataUsage']

export default function DataUsage() {
  const [data] = useState(dataUsageDefaultData.dataUsageGraphResponse[0])
  const [filteredDataUsage, setFilteredDataUsage] = useState(
    [] as unknown as TDataUsage
  )

  const [selected, setSelected] = useState(selectMenulist[0])

  useEffect(() => {
    const today = new Date()
    const startDate = getStartDate(selected.value, selected.unit)
    let newList = data.dataUsage.filter(item => {
      const currDate = new Date(item.date)
      return isWithinInterval(currDate, { start: startDate, end: today })
    })
    if (selected.unit === SubDateUnit.MONTH) {
      newList = aggregateDataUsage(newList)
    }
    sortByDate(newList)
    setFilteredDataUsage(newList)
  }, [data.dataUsage, selected])

  const stats = useMemo(
    () => [
      {
        name: 'Total usage',
        value: `${kFormatter(data.totalDataUsage)} GB`,
      },
      {
        name: 'Daily average',
        value: `${kFormatter(data.dataAverage)} GB`,
      },
    ],
    [data]
  )

  return (
    <section className="h-full">
      <Card className="flex flex-col h-full">
        <div className="py-2 flex items-center justify-between">
          <h2 className="text-lg font-bold">Data usage</h2>
          <div className="flex items-center gap-4">
            <SelectMenu
              label="View"
              list={selectMenulist}
              selected={selected}
              setSelected={setSelected}
            />

            <ArrowTopRightOnSquareIcon className="flex-shrink-0 size-4" />
          </div>
        </div>

        <Stats stats={stats} columns={2} className="mt-4" />

        <div className="flex-grow mt-10 w-full min-h-64">
          <BarChart
            data={filteredDataUsage}
            xKey="date"
            labelKey="dataUsage"
            xUnit={selected.unit}
          />
        </div>
      </Card>
    </section>
  )
}

function getStartDate(value: number, unit: SubDateUnit) {
  const today = new Date()

  if (unit === SubDateUnit.DAY) {
    return subDays(today, value)
  }

  return subMonths(today, value)
}

function aggregateDataUsage(list: TDataUsage) {
  const monthMap: Record<string, TDataUsage[number]> = {}

  for (const item of list) {
    const month = formatDate(item.date, 'MMM')
    if (typeof monthMap[month] === 'undefined') {
      monthMap[month] = { date: item.date, month: null, dataUsage: 0 }
    }
    monthMap[month].dataUsage += item.dataUsage
  }

  return Object.values(monthMap)
}

function sortByDate(array: TDataUsage) {
  return array.sort((a, b) => {
    const dateA = new Date(a.date)
    const dateB = new Date(b.date)
    if (dateA < dateB) return -1
    if (dateA > dateB) return 1
    return 0
  })
}

const selectMenulist = [
  {
    id: 1,
    name: 'Last 7 days',
    value: 7,
    unit: SubDateUnit.DAY,
  },
  {
    id: 2,
    name: 'Last 3 months',
    value: 7,
    unit: SubDateUnit.MONTH,
  },
  {
    id: 3,
    name: 'Last 6 months',
    value: 7,
    unit: SubDateUnit.MONTH,
  },
]
