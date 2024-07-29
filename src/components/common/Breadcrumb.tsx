import { Link } from 'react-router-dom'
import React from 'react'

interface BreadcrumbItem {
  name: string
  path: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

export default function Breadcrumb({ items }: Readonly<BreadcrumbProps>) {
  return (
    <nav className="flex items-center space-x-2 text-xs text-gray-700">
      {items.map((item, i) => (
        <React.Fragment key={item.name}>
          <Link to={item.path} className="hover:text-blue-500 last:font-medium">
            {item.name}
          </Link>
          {i < items.length - 1 && <span className="text-gray-400">/</span>}
        </React.Fragment>
      ))}
    </nav>
  )
}
