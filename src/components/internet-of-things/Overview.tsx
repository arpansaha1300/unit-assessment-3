import { useMemo } from 'react'
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline'
import Card from '~common/Card'
import Loader from '~common/Loader'
import Divider from '~common/Divider'
import PieChart from '~/components/internet-of-things/PieChart'
import Stats from './Stats'
import kFormatter from '~/utils/kFormatter'
import formatDate from '~/utils/formatDate'
import calcPercent from '~/utils/calcPercent'
import { useGetIotOverviewQuery } from '~/store/features/iot-overview/iotOverviewApiSlice'

interface PieDataProps {
  pieData: any[]
  totalSimCount: number
  centerLabel: React.ReactNode
}

export default function Overview() {
  const { data, isLoading, isError, isSuccess } = useGetIotOverviewQuery()

  const stats = useMemo(() => {
    if (!isSuccess) return []
    return [
      {
        name: 'Total SIMs',
        value: kFormatter(data.sims.totalSimCount),
      },
      {
        name: 'Active SIMs',
        value: kFormatter(data.sims.active),
      },
      {
        name: 'Inactive SIMs',
        value: kFormatter(data.sims.inactive),
      },
    ]
  }, [data, isSuccess])

  const simStatusPie = useMemo(() => {
    if (!isSuccess) return []
    return [
      {
        name: 'Active',
        value: data.simStatus.active,
      },
      {
        name: 'Suspended',
        value: data.simStatus.suspended,
      },
      {
        name: 'Cancelled',
        value: data.simStatus.cancelled,
      },
    ]
  }, [data, isSuccess])

  const simConnectivityPie = useMemo(() => {
    if (!isSuccess) return []
    return [
      { name: 'Connected', value: data.simConnectivity.connected },
      {
        name: 'Disconnected',
        value: data.simConnectivity.disconnected,
      },
    ]
  }, [data, isSuccess])

  if (isLoading) {
    return (
      <section className="h-full">
        <Card className="h-full flex items-center justify-center">
          <Loader dark className="size-5" />
        </Card>
      </section>
    )
  }

  if (isError || !isSuccess) {
    return (
      <section className="h-full">
        <Card className="h-full flex items-center justify-center">
          <p className="text-sm font-semibold">Something went wrong!</p>
        </Card>
      </section>
    )
  }

  return (
    <section>
      <Card>
        <div className="py-2 flex flex-col sm:flex-row sm:items-center gap-1 justify-between">
          <h2 className="text-lg font-bold">Overview</h2>
          <div className="flex items-center gap-4">
            <p className="text-xs">
              Last updated: {formatDate(data.networkData[0].lastUpdatedDate)}
            </p>
            <ArrowTopRightOnSquareIcon className="flex-shrink-0 size-4" />
          </div>
        </div>

        <Stats stats={stats} columns={3} className="mt-4" />

        <div className="mt-6 flex flex-col lg:flex-row gap-4 lg:gap-8">
          <div className="flex-grow">
            <h3 className="font-bold">SIMs status</h3>
            <p className="text-xs">
              Last updated: {formatDate(data.simStatus.lastUpdatedDate)}
            </p>

            <PieData
              pieData={simStatusPie}
              totalSimCount={data.sims.totalSimCount}
              centerLabel={
                <>
                  <p className="text-xl text-center font-bold">
                    {kFormatter(data.sims.totalSimCount)}
                  </p>
                  <p className="text-xs text-center">Total SIMs</p>
                </>
              }
            />
          </div>

          <div className="hidden lg:block">
            <Divider vertical />
          </div>

          <div className="lg:hidden">
            <Divider />
          </div>

          <div className="flex-grow">
            <h3 className="font-bold">SIMs connectivity</h3>
            <p className="text-xs">
              Last updated: {formatDate(data.simConnectivity.lastUpdatedDate)}
            </p>

            <PieData
              pieData={simConnectivityPie}
              totalSimCount={data.sims.totalSimCount}
              centerLabel={
                <>
                  <p className="text-xl text-center font-bold">
                    {kFormatter(data.sims.active)}
                  </p>
                  <p className="text-xs text-center">Active SIMs</p>
                </>
              }
            />
          </div>
        </div>
      </Card>
    </section>
  )
}

function PieData(props: Readonly<PieDataProps>) {
  const { pieData, totalSimCount, centerLabel } = props

  const colors = ['#F6288F', '#0A3B52', '#45A0B5']

  return (
    <div className="pt-6 pb-4 flex flex-col items-center sm:flex-row gap-4 sm:gap-10">
      <PieChart
        data={pieData}
        colors={colors}
        size={150}
        centerLabel={centerLabel}
      />

      <div className="flex items-center">
        <ul className="space-y-2">
          {pieData.map((label, i) => (
            <li key={label.name} className="flex items-center gap-2">
              <div
                className="size-3.5"
                style={{ backgroundColor: colors[i] }}
              />
              <p className="text-xs space-x-1.5">
                <span className="inline-block">{label.name}</span>
                {label.value && (
                  <span className="inline-block font-semibold">
                    {kFormatter(label.value)}
                  </span>
                )}
                <span className="inline-block">
                  {calcPercent(label.value, totalSimCount)}%
                </span>
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
