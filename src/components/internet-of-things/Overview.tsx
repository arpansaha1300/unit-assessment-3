import { useMemo } from 'react'
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline'
import Card from '~common/Card'
import Divider from '~common/Divider'
import PieChart from '~/components/internet-of-things/PieChart'
import Stats from './Stats'
import kFormatter from '~/utils/kFormatter'
import formatDate from '~/utils/formatDate'
import calcPercent from '~/utils/calcPercent'
import type { iotOverview } from '~/assets/data'

interface OverviewProps {
  deviceDetails: (typeof iotOverview)['deviceDetailsExperience'][number]
}

interface PieDataProps {
  pieData: any[]
  totalSimCount: number
  centerLabel: React.ReactNode
}

export default function Overview(props: Readonly<OverviewProps>) {
  const { deviceDetails } = props

  const stats = useMemo(
    () => [
      {
        name: 'Total SIMs',
        value: kFormatter(deviceDetails.sims.totalSimCount),
      },
      {
        name: 'Active SIMs',
        value: kFormatter(deviceDetails.sims.active),
      },
      {
        name: 'Inactive SIMs',
        value: kFormatter(deviceDetails.sims.inactive),
      },
    ],
    [deviceDetails.sims]
  )

  const simStatusPie = [
    {
      name: 'Active',
      value: deviceDetails.simStatus.active,
    },
    {
      name: 'Suspended',
      value: deviceDetails.simStatus.suspended,
    },
    {
      name: 'Cancelled',
      value: deviceDetails.simStatus.cancelled,
    },
  ]

  const simConnectivityPie = [
    { name: 'Connected', value: deviceDetails.simConnectivity.connected },
    {
      name: 'Disconnected',
      value: deviceDetails.simConnectivity.disconnected,
    },
  ]

  return (
    <section>
      <Card>
        <div className="py-2 flex items-center justify-between">
          <h2 className="text-lg font-bold">Overview</h2>
          <div className="flex items-center gap-4">
            <p className="text-xs">
              Last updated:{' '}
              {formatDate(deviceDetails.networkData[0].lastUpdatedDate)}
            </p>
            <ArrowTopRightOnSquareIcon className="flex-shrink-0 size-4" />
          </div>
        </div>

        <Stats stats={stats} columns={3} className="mt-4" />

        <div className="mt-6 flex flex-col lg:flex-row gap-4 lg:gap-8">
          <div className="flex-grow">
            <h3 className="font-bold">SIMs status</h3>
            <p className="text-xs">
              Last updated:{' '}
              {formatDate(deviceDetails.simStatus.lastUpdatedDate)}
            </p>

            <PieData
              pieData={simStatusPie}
              totalSimCount={deviceDetails.sims.totalSimCount}
              centerLabel={
                <>
                  <p className="text-xl text-center font-bold">
                    {kFormatter(deviceDetails.sims.totalSimCount)}
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
              Last updated:{' '}
              {formatDate(deviceDetails.simConnectivity.lastUpdatedDate)}
            </p>

            <PieData
              pieData={simConnectivityPie}
              totalSimCount={deviceDetails.sims.totalSimCount}
              centerLabel={
                <>
                  <p className="text-xl text-center font-bold">
                    {kFormatter(deviceDetails.sims.active)}
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
    <div className="pt-6 pb-4 flex gap-10">
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
