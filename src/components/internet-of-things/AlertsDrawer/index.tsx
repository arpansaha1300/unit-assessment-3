import { useEffect, useMemo, useState } from 'react'
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import {
  ArrowLeftIcon,
  ArrowPathRoundedSquareIcon,
  ArrowTopRightOnSquareIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  FunnelIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import Drawer from '~common/Drawer'
import Loader from '~common/Loader'
import { Accordion, AccordionButton, AccordionPanel } from '~common/Accordion'
import Badge from './Badge'
import formatDate from '~/utils/formatDate'
import SortFilterPanel from './SortFilterPanel'
import { sorters, SortOptions } from './sortOptions'
import { FilterOptions } from './filterOptions'
import { SortFilterContext, useSortFilterContext } from './context'
import { getBadgeType, getStartDate } from './utils'
import {
  type IAlert,
  useGetAlertsQuery,
  useGetNewAlertsQuery,
} from '~/store/features/alerts/alertsApiSlice'

interface AlertsDrawerProps {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

interface DrawerMainContentProps {
  setOpenSortFilterPanel: React.Dispatch<React.SetStateAction<boolean>>
}

interface AlertLogsPanelProps {
  setOpenSortFilterPanel: React.Dispatch<React.SetStateAction<boolean>>
}

interface SortFilterHeaderIconProps {
  handleClick: () => void
}

export default function AlertsDrawer(props: Readonly<AlertsDrawerProps>) {
  const { open, setOpen } = props
  const [openSortFilterPanel, setOpenSortFilterPanel] = useState(false)
  const [sortOption, setSortOption] = useState(SortOptions.SEVERITY_HIGH_TO_LOW)
  const [filterOption, setFilterOption] = useState(
    FilterOptions.PREVIOUS_24_HOURS
  )

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null
    if (!open) {
      timeoutId = setTimeout(() => {
        setOpenSortFilterPanel(false)
      }, 800)
    }
    return () => {
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [open])

  const contextValue = useMemo(
    () => ({ sortOption, setSortOption, filterOption, setFilterOption }),
    [sortOption, filterOption]
  )

  return (
    <Drawer
      open={open}
      setOpen={setOpen}
      title={openSortFilterPanel ? 'Sort & Filter' : 'Alerts'}
      headerIcon={
        openSortFilterPanel ? (
          <SortFilterHeaderIcon
            handleClick={() => setOpenSortFilterPanel(false)}
          />
        ) : (
          <AlertsHeaderIcon />
        )
      }
    >
      <SortFilterContext.Provider value={contextValue}>
        {openSortFilterPanel ? (
          <SortFilterPanel close={() => setOpenSortFilterPanel(false)} />
        ) : (
          <DrawerMainContent setOpenSortFilterPanel={setOpenSortFilterPanel} />
        )}
      </SortFilterContext.Provider>
    </Drawer>
  )
}

function AlertsHeaderIcon() {
  return (
    <ArrowTopRightOnSquareIcon className="flex-shrink-0 size-5 text-gray-600" />
  )
}

function SortFilterHeaderIcon({
  handleClick,
}: Readonly<SortFilterHeaderIconProps>) {
  return (
    <button type="button" onClick={handleClick}>
      <ArrowLeftIcon className="flex-shrink-0 size-5 text-gray-600" />
    </button>
  )
}

function DrawerMainContent({
  setOpenSortFilterPanel,
}: Readonly<DrawerMainContentProps>) {
  return (
    <TabGroup defaultIndex={0}>
      <TabList className="grid grid-cols-2 text-sm font-semibold">
        {alertTabs.map(tab => (
          <Tab
            key={tab.name}
            className="group py-2.5 relative hover:bg-fuchsia-50 transition-colors rounded-t"
          >
            <p>{tab.name}</p>
            <span className="hidden group-data-[selected]:block h-1 bg-brand-primary absolute bottom-0 inset-x-0" />
          </Tab>
        ))}
      </TabList>

      <TabPanels className="py-2.5">
        <TabPanel>
          <NewAlertsPanel />
        </TabPanel>

        <TabPanel>
          <AlertLogsPanel setOpenSortFilterPanel={setOpenSortFilterPanel} />
        </TabPanel>
      </TabPanels>
    </TabGroup>
  )
}

function NewAlertsPanel() {
  const { sortOption, filterOption } = useSortFilterContext()
  const [filteredNewAlerts, setFilteredNewAlerts] = useState([] as IAlert[])
  const { data, isLoading, isError, isSuccess } = useGetNewAlertsQuery()
  const [newAlerts, setNewAlerts] = useState([] as IAlert[])

  useEffect(() => {
    if (!isSuccess) return
    setNewAlerts([...data])
  }, [data, isSuccess])

  useEffect(() => {
    if (!isSuccess) return

    const startDate = getStartDate(filterOption)
    const _filtered = newAlerts.filter(
      alert => startDate < new Date(alert.date)
    )
    _filtered.sort(sorters[sortOption])
    setFilteredNewAlerts(_filtered)
  }, [sortOption, filterOption, isSuccess, newAlerts])

  function remove(i: number, alert: IAlert) {
    setFilteredNewAlerts(state => {
      const newState = [...state]
      newState.splice(i, 1)
      return newState
    })
    setNewAlerts(state => {
      const newState = [...state]
      newState.splice(
        newState.findIndex(a => a.id === alert.id),
        1
      )
      return newState
    })
  }

  if (isLoading) {
    return (
      <div className="p-4 flex justify-center">
        <Loader dark className="size-5" />
      </div>
    )
  }

  if (isError || !isSuccess) {
    return (
      <div className="p-4 flex justify-center">
        <p className="text-sm font-semibold">Something went wrong!</p>
      </div>
    )
  }

  return (
    <ul className="divide-y divide-gray-300">
      {filteredNewAlerts.map((alert, i) => (
        <li key={alert.id} className="pl-8 py-3 text-xs relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <p className="font-semibold">{alert.title}</p>
              <Badge type={getBadgeType(alert.severity)}>
                {alert.severity}
              </Badge>
            </div>
            <button
              type="button"
              className="focus:outline-none focus:ring focus:ring-rose-400 rounded-sm"
              onClick={() => remove(i, alert)}
            >
              <XMarkIcon className="flex-shrink-0 size-4" />
            </button>
          </div>
          <p className="text-gray-600">
            {formatDate(alert.date, 'MM/dd/yyyy hh:mm a')}
          </p>
          <p className="mt-1 text-gray-600">{alert.description}</p>
          <p className="mt-1 font-light text-gray-500">ID {alert.id}</p>
          <span className="size-2 bg-blue-500 rounded-full absolute top-5 left-4 -translate-x-1/2" />
        </li>
      ))}
    </ul>
  )
}

function AlertLogsPanel({
  setOpenSortFilterPanel,
}: Readonly<AlertLogsPanelProps>) {
  const { sortOption, filterOption, setFilterOption, setSortOption } =
    useSortFilterContext()
  const [filteredAlertLogs, setFilteredAlertLogs] = useState([] as IAlert[])
  const { data: alertLogs, isLoading, isError, isSuccess } = useGetAlertsQuery()

  useEffect(() => {
    if (!isSuccess) return

    const startDate = getStartDate(filterOption)
    const _filtered = alertLogs.filter(
      alert => startDate < new Date(alert.date)
    )
    _filtered.sort(sorters[sortOption])
    setFilteredAlertLogs(_filtered)
  }, [sortOption, filterOption, isSuccess, alertLogs])

  function clearFilters() {
    setSortOption(SortOptions.SEVERITY_HIGH_TO_LOW)
    setFilterOption(FilterOptions.PREVIOUS_24_HOURS)
  }

  if (isLoading) {
    return (
      <div className="p-4 flex justify-center">
        <Loader dark className="size-5" />
      </div>
    )
  }

  if (isError || !isSuccess) {
    return (
      <div className="p-4 flex justify-center">
        <p className="text-sm font-semibold">Something went wrong!</p>
      </div>
    )
  }

  return (
    <>
      <div className="my-1 flex justify-between">
        <button
          className="px-2 py-1.5 text-brand-primary flex items-center gap-2 hover:bg-fuchsia-50 rounded transition-colors"
          onClick={() => setOpenSortFilterPanel(true)}
        >
          <FunnelIcon className="flex-shrink-0 size-5" />
          <p className="text-xs font-semibold">Sort & filter</p>
        </button>

        <button
          className="px-2 py-1.5 flex items-center gap-2 text-gray-600 hover:bg-gray-100 rounded transition-colors"
          onClick={clearFilters}
        >
          <ArrowPathRoundedSquareIcon className="flex-shrink-0 size-5" />
          <p className="text-xs font-semibold">Clear filters</p>
        </button>
      </div>

      <ul className="divide-y divide-gray-300">
        {filteredAlertLogs.map(alert => (
          <li key={alert.id}>
            <Accordion className="py-1 text-xs">
              <AccordionButton className="p-2 rounded relative w-full text-left flex items-center justify-between hover:bg-gray-100 transition-colors">
                {({ open }) => (
                  <>
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <p className="font-semibold">{alert.title}</p>
                        <Badge type={getBadgeType(alert.severity)}>
                          {alert.severity}
                        </Badge>
                      </div>
                      <p className="text-gray-600">
                        {formatDate(alert.date, 'MM/dd/yyyy hh:mm a')}
                      </p>
                      <p className="font-light text-gray-500">ID {alert.id}</p>
                    </div>
                    <div>
                      {open ? (
                        <ChevronUpIcon className="flex-shrink-0 size-4" />
                      ) : (
                        <ChevronDownIcon className="flex-shrink-0 size-4" />
                      )}
                    </div>
                  </>
                )}
              </AccordionButton>
              <AccordionPanel className="mt-2">
                <p className="text-gray-600">{alert.description}</p>
              </AccordionPanel>
            </Accordion>
          </li>
        ))}
      </ul>
    </>
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
