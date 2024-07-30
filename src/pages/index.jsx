import { BellIcon } from '@heroicons/react/24/solid'
import Breadcrumb from '~/components/common/Breadcrumb'
import DataUsage from '~/components/internet-of-things/DataUsage'
import Overview from '~/components/internet-of-things/Overview'
import Reports from '~/components/internet-of-things/Reports'
import TopUsage from '~/components/internet-of-things/TopUsage'

export function Component() {
  const breadcrumbItems = [
    {
      name: 'Home',
      path: '/',
    },
    {
      name: 'Internet of things',
      path: '/internet-of-things',
    },
  ]
  return (
    <div>
      <Breadcrumb items={breadcrumbItems} />

      <div className="mt-4 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Internet of Things Dashboard</h1>

        <div className="flex items-center gap-6">
          <p className="text-sm font-semibold">Account number: 1234567899</p>
          <button className="px-2 py-1.5 text-sm font-semibold border-2 border-gray-950 inline-flex items-center gap-1 rounded">
            <div className="relative">
              <BellIcon className="flex-shrink-0 size-5" />
              <span className="size-2.5 bg-brand-primary rounded-full absolute top-0 right-0 -translate-y-1/2" />
            </div>
            <p>Alerts</p>
          </button>
        </div>
      </div>

      <div className="mt-10 space-y-6">
        <Overview />
      </div>

      <div className="mt-10 grid grid-cols-2 gap-4">
        <DataUsage />

        <TopUsage />
      </div>

      <div className="mt-10">
        <Reports />
      </div>
    </div>
  )
}

Component.displayName = 'Home'
