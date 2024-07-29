import {
  Cog6ToothIcon,
  DocumentChartBarIcon,
  HomeIcon,
  KeyIcon,
  StarIcon,
} from '@heroicons/react/24/outline'
import { useState } from 'react'
import classNames from '~/utils/classNames'

interface ITab {
  type: 'tab'
  name: string
  icon: React.ReactNode
}
interface ISeparator {
  type: 'separator'
}

interface SidebarTabProps {
  tab: ITab
  isActive: boolean
  handleClick: () => void
}

const tabs: (ITab | ISeparator)[] = [
  {
    type: 'tab',
    name: 'Home',
    icon: <HomeIcon />,
  },
  {
    type: 'tab',
    name: 'Internet of Things',
    icon: <DocumentChartBarIcon />,
  },
  {
    type: 'tab',
    name: 'Advanced Network',
    icon: <Cog6ToothIcon />,
  },
  {
    type: 'tab',
    name: 'Settings',
    icon: <KeyIcon />,
  },
  {
    type: 'separator',
  },
  {
    type: 'tab',
    name: 'Favorites',
    icon: <StarIcon />,
  },
]

export default function Sidebar() {
  const [activeTabIdx, setActiveTabIdx] = useState(1)

  function handleClick(idx: number) {
    setActiveTabIdx(idx)
  }

  return (
    <nav className="bg-white h-full">
      <ul className="py-2 space-y-1.5">
        {tabs.map((tab, i) => (
          <li key={i}>
            {tab.type === 'tab' ? (
              <SidebarTab
                key={tab.name}
                tab={tab}
                isActive={activeTabIdx === i}
                handleClick={() => handleClick(i)}
              />
            ) : (
              <div className="h-px bg-gray-200" />
            )}
          </li>
        ))}
      </ul>
    </nav>
  )
}

function SidebarTab(props: Readonly<SidebarTabProps>) {
  const { tab, isActive, handleClick } = props

  return (
    <button className="w-full hover:bg-gray-100 relative" onClick={handleClick}>
      {isActive && (
        <span
          className={classNames('w-1.5 absolute left-0 inset-y-0 bg-red-400')}
        />
      )}
      <div className="ml-1.5 p-2 flex items-center gap-4">
        <div className="flex-shrink-0 size-5">{tab.icon}</div>
        <p className="text-xs font-medium text-gray-700">{tab.name}</p>
      </div>
    </button>
  )
}
