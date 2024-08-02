import { useMemo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  ChevronDownIcon,
  ChevronUpIcon,
  Cog6ToothIcon,
  DocumentChartBarIcon,
  HomeIcon,
  KeyIcon,
  StarIcon,
} from '@heroicons/react/24/outline'
import Divider from '~common/Divider'
import { Accordion, AccordionButton, AccordionPanel } from '~common/Accordion'
import classNames from '~/utils/classNames'

interface ITab {
  type: 'tab'
  name: string
  path: string
  icon: React.ReactNode
}

type ITabOptionalIcon = Omit<ITab, 'icon'> & Partial<Pick<ITab, 'icon'>>

interface ISeparator {
  type: 'separator'
}

interface IAccordion {
  type: 'accordion'
  name: string
  icon: React.ReactNode
  tabs: ITabOptionalIcon[]
}

interface SidebarTabProps {
  tab: ITabOptionalIcon
}

interface SidebarAccordionProps {
  tabs: ITabOptionalIcon[]
  name: string
  icon: React.ReactNode
}

const sidebarItems: (ITab | ISeparator | IAccordion)[] = [
  {
    type: 'tab',
    name: 'Home',
    path: '/',
    icon: <HomeIcon />,
  },
  {
    type: 'accordion',
    name: 'Internet of things',
    tabs: [
      {
        type: 'tab',
        name: 'Overview',
        path: '/iot',
      },
    ],
    icon: <DocumentChartBarIcon />,
  },
  {
    type: 'accordion',
    name: 'Advanced Network',
    tabs: [
      {
        type: 'tab',
        name: 'Overview',
        path: '/network',
      },
    ],
    icon: <Cog6ToothIcon />,
  },
  {
    type: 'accordion',
    name: 'Settings',
    tabs: [
      {
        type: 'tab',
        name: 'Overview',
        path: '/settings',
      },
    ],
    icon: <KeyIcon />,
  },
  {
    type: 'separator',
  },
  {
    type: 'tab',
    name: 'Favorites',
    path: '/favorites',
    icon: <StarIcon />,
  },
]

export default function Sidebar() {
  return (
    <nav className="">
      <ul className="py-2 space-y-1.5">
        {sidebarItems.map((item, i) => (
          <li key={i}>
            {(() => {
              if (item.type === 'tab')
                return <SidebarTab key={item.name} tab={item} />

              if (item.type === 'separator') return <Divider />

              return (
                <SidebarAccordion
                  tabs={item.tabs}
                  name={item.name}
                  icon={item.icon}
                />
              )
            })()}
          </li>
        ))}
      </ul>
    </nav>
  )
}

function SidebarTab(props: Readonly<SidebarTabProps>) {
  const { tab } = props

  const location = useLocation()
  const isActive = useMemo(
    () => location.pathname === tab.path,
    [location.pathname, tab.path]
  )

  return (
    <Link
      to={tab.path}
      className={classNames(
        isActive ? 'bg-gray-200' : 'hover:bg-gray-100',
        'block w-full relative'
      )}
    >
      {isActive && (
        <span className="w-1.5 absolute left-0 inset-y-0 bg-brand-primary" />
      )}
      <div className="ml-1.5 p-2 flex items-center gap-4">
        <div className="flex-shrink-0 size-5">{tab.icon}</div>
        <p className="text-xs font-medium text-gray-700">{tab.name}</p>
      </div>
    </Link>
  )
}

function SidebarAccordion(props: Readonly<SidebarAccordionProps>) {
  const { tabs, name, icon } = props

  const location = useLocation()

  const hasOpenRoute = useMemo(() => {
    for (const tab of tabs) {
      if (tab.path === location.pathname) {
        return true
      }
    }
  }, [location.pathname, tabs])

  return (
    <Accordion shouldOpen={hasOpenRoute}>
      <AccordionButton className="flex items-center justify-between w-full hover:bg-gray-100">
        {({ open }) => (
          <>
            <div className="ml-1.5 p-2 flex items-center gap-4">
              <div className="flex-shrink-0 size-5">{icon}</div>
              <p className="text-xs font-medium text-gray-700">{name}</p>
            </div>
            <div className="p-2">
              {open ? (
                <ChevronUpIcon className="flex-shrink-0 size-3" />
              ) : (
                <ChevronDownIcon className="flex-shrink-0 size-3" />
              )}
            </div>
          </>
        )}
      </AccordionButton>

      <AccordionPanel>
        <ul>
          {tabs.map(tab => (
            <SidebarTab key={tab.name} tab={tab} />
          ))}
        </ul>
      </AccordionPanel>
    </Accordion>
  )
}
