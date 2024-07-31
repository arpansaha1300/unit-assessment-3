import { useState } from 'react'
import { BellIcon } from '@heroicons/react/24/solid'
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import Drawer from '~common/Drawer'
import Breadcrumb from '~common/Breadcrumb'
import DataUsage from '~/components/internet-of-things/DataUsage'
import Overview from '~/components/internet-of-things/Overview'
import Reports from '~/components/internet-of-things/Reports'
import TopUsage from '~/components/internet-of-things/TopUsage'
import { iotOverview } from '~/assets/data'

export function Component() {
  const [drawerOpen, setDrawerOpen] = useState(false)

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

      <div className="mt-10 grid grid-cols-2 gap-5">
        {iotOverview.deviceDetailsExperience.map((details, i) => (
          <div key={i} className="col-span-2">
            <Overview deviceDetails={details} />
          </div>
        ))}

        <DataUsage />

        <TopUsage />

        <div className="col-span-2">
          <Reports />
        </div>
      </div>
    </div>
  )
}

Component.displayName = 'Home'

function AlertsDrawer(props) {
  const { open, setOpen } = props
  // const [selectedIdx, setSelectedIdx] = useState(0)

  return (
    <Drawer open={open} setOpen={setOpen} title="Alerts">
      <TabGroup defaultIndex={0}>
        <TabList className="grid grid-cols-2 text-sm font-semibold">
          {alertTabs.map(tab => (
            <Tab key={tab.name} className="group py-2.5 relative">
              <p>{tab.name}</p>
              <span className="hidden group-data-[selected]:block h-1 bg-brand-primary absolute bottom-0 inset-x-0" />
            </Tab>
          ))}
        </TabList>

        <TabPanels className="py-2.5">
          <TabPanel>
            <ul className="divide-y divide-gray-300">
              {newAlerts.map(alert => (
                <li key={alert.id} className="pl-8 py-3 text-xs relative">
                  <p className="font-semibold">{alert.title}</p>
                  <p className="text-gray-600">{alert.date}</p>
                  <p className="mt-1 text-gray-600">{alert.description}</p>
                  <p className="mt-1 font-light text-gray-500">ID {alert.id}</p>
                  <span className="size-2 bg-blue-500 rounded-full absolute top-5 left-4 -translate-x-1/2" />
                </li>
              ))}
            </ul>
          </TabPanel>

          <TabPanel>Blank</TabPanel>
        </TabPanels>
      </TabGroup>
    </Drawer>
  )
}

const alertTabs = [
  {
    name: 'New alerts',
  },
  {
    name: 'Alert logs',
  },
]
const newAlerts = [
  {
    id: '001',
    title: 'System Update',
    description:
      'A scheduled system update will occur tonight between 2 AM and 4 AM. During this time, the service may be temporarily unavailable.',
    date: '2024-07-30',
  },
  {
    id: '002',
    title: 'Security Alert',
    description:
      'Unusual login activity has been detected on your account. Please review recent login attempts and change your password if necessary.',
    date: '2024-07-29',
  },
  {
    id: '003',
    title: 'Maintenance Window',
    description:
      'Planned maintenance on the payment gateway will be carried out from 1 AM to 3 AM. Please complete any transactions before this time.',
    date: '2024-07-31',
  },
  {
    id: '004',
    title: 'New Feature Release',
    description:
      'We are excited to announce a new feature in our app: real-time notifications! Update your app to experience the new functionality.',
    date: '2024-07-28',
  },
]
