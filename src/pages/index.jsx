import { useState } from 'react'
import { BellIcon } from '@heroicons/react/24/solid'
import Card from '~common/Card'
import Loader from '~common/Loader'
import Breadcrumb from '~common/Breadcrumb'
import DataUsage from '~/components/internet-of-things/DataUsage'
import Overview from '~/components/internet-of-things/Overview'
import Reports from '~/components/internet-of-things/Reports'
import TopUsage from '~/components/internet-of-things/TopUsage'
import AlertsDrawer from '~/components/internet-of-things/AlertsDrawer'
import { useGetIotOverviewQuery } from '~/store/features/iot-overview/iotOverviewApiSlice'

export function Component() {
  const [drawerOpen, setDrawerOpen] = useState(false)

  const breadcrumbItems = [
    {
      name: 'Home',
      path: '/',
    },
    {
      name: 'Internet of things',
      path: '/iot',
    },
  ]

  return (
    <div>
      <Breadcrumb items={breadcrumbItems} />

      <div className="mt-4 lg:flex lg:items-center lg:justify-between">
        <h1 className="text-3xl font-bold">Internet of Things Dashboard</h1>

        <div className="mt-4 lg:mt-0 flex items-center justify-between lg:justify-normal gap-6">
          <p className="text-sm font-semibold">Account number: 1234567899</p>
          <button
            className="px-2 py-1.5 text-sm font-semibold border-2 border-gray-950 hover:bg-gray-100 inline-flex items-center gap-1 rounded transition-colors"
            onClick={() => setDrawerOpen(true)}
          >
            <div className="relative">
              <BellIcon className="flex-shrink-0 size-5" />
              <span className="size-2.5 bg-brand-primary rounded-full absolute top-0 right-0 -translate-y-1/2" />
            </div>
            <p>Alerts</p>
          </button>

          <AlertsDrawer open={drawerOpen} setOpen={setDrawerOpen} />
        </div>
      </div>

      <div className="mt-6 lg:mt-10 grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="lg:col-span-2">
          <Overview />
        </div>

        <DataUsage />

        <TopUsage />

        <div className="lg:col-span-2">
          <Reports />
        </div>
      </div>
    </div>
  )
}

Component.displayName = 'Home'
