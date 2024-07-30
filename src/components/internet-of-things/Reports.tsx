import { createElement, useState } from 'react'
import {
  ArrowDownTrayIcon,
  ArrowTopRightOnSquareIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from '@heroicons/react/24/outline'
import BaseInput from '~base/BaseInput'
import Card from '~common/Card'
import classNames from '~/utils/classNames'

interface PaginationIconProps {
  icon: any
  disabled?: boolean
}

export default function Reports() {
  const [slicedData] = useState(data.slice(0, 8))
  const [headings] = useState(Object.keys(slicedData[0]))
  const [page] = useState(1)

  return (
    <section>
      <Card>
        <div className="py-2 flex items-center justify-between">
          <h2 className="text-lg font-bold">Reports ({data.length})</h2>
          <ArrowTopRightOnSquareIcon className="flex-shrink-0 size-4" />
        </div>

        <div className="mt-4 max-w-xs">
          <BaseInput
            id="search"
            name="search"
            type="search"
            label="Search"
            srOnlyLabel
            placeholder="Search"
          />
        </div>

        <div className="mt-6 px-2">
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="font-semibold text-xs">
              <tr>
                {headings.map(heading => (
                  <th
                    key={heading}
                    scope="col"
                    className="px-4 first:pl-0 last:pr-0 py-3 text-left font-semibold text-gray-900"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200 bg-white text-xs text-gray-600">
              {slicedData.map((item: any, i) => (
                <tr key={i}>
                  {headings.map((heading, i) => (
                    <td
                      key={i}
                      className="max-w-xs px-4 first:pl-0 last:pr-0 py-3"
                    >
                      <div className="font-medium text-gray-800 line-clamp-2">
                        {item[heading]}
                      </div>
                    </td>
                  ))}

                  <td key={i} className="max-w-xs px-4 py-3">
                    <button type="button">
                      <ArrowDownTrayIcon className="flex-shrink-0 size-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-5 mx-auto w-72 flex items-center justify-between">
            <PaginationIcon
              disabled={page === 1}
              icon={ChevronDoubleLeftIcon}
            />

            <p className="text-xs inline-flex items-center gap-2">
              <span className="inline-block">Page</span>

              <input
                id="page"
                name="page"
                value={page}
                className="inline appearance-none rounded-md p-2 placeholder-gray-600 focus:border-brand-primary focus:outline-none focus:ring-brand-primary text-xs font-semibold text-center shadow-sm ring-sm ring-opacity-20 border border-gray-600 transition-colors size-8"
              />

              <span className="inline-block">of</span>
              <span className="inline-block font-semibold">13</span>
            </p>

            <PaginationIcon icon={ChevronDoubleRightIcon} />
          </div>
        </div>
      </Card>
    </section>
  )
}

function PaginationIcon(props: Readonly<PaginationIconProps>) {
  const { icon, disabled } = props

  const iconJsx = createElement(icon, {
    className: classNames(
      disabled ? 'text-gray-400' : 'text-gray-600 group-hover:text-gray-800',
      'inline-block flex-shrink-0 size-4 transition-colors'
    ),
  })

  return (
    <button
      className={classNames(
        'group rounded-full border size-8 flex items-center justify-center transition-colors',
        disabled
          ? 'cursor-default border-gray-400'
          : 'border-gray-600 hover:text-gray-800 hover:bg-gray-100'
      )}
    >
      {iconJsx}
    </button>
  )
}

const data = [
  {
    'Category': 'Financial',
    'Reports': 'Q2 Earnings Report',
    'Source': 'Company Financial Department',
    'Description':
      'A detailed report of the company’s financial performance for the second quarter. Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi, architecto!',
    'Last updated': '07/15/2024 03:45 PM (PST)',
  },
  {
    'Category': 'Marketing',
    'Reports': '2024 Marketing Strategy Overview',
    'Source': 'Marketing Team',
    'Description':
      'Overview of the marketing strategies and campaigns planned for 2024.',
    'Last updated': '07/20/2024 11:30 AM (PST)',
  },
  {
    'Category': 'Product',
    'Reports': 'New Product Launch Timeline',
    'Source': 'Product Development Team',
    'Description':
      'Timeline and key milestones for the upcoming product launch. Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi, architecto!',
    'Last updated': '07/25/2024 09:15 AM (PST)',
  },
  {
    'Category': 'Customer Service',
    'Reports': 'Customer Satisfaction Survey Results',
    'Source': 'Customer Service Department',
    'Description':
      'Results and analysis of the recent customer satisfaction survey. ',
    'Last updated': '07/28/2024 04:00 PM (PST)',
  },
  {
    'Category': 'HR',
    'Reports': 'Employee Engagement Report',
    'Source': 'Human Resources Department',
    'Description':
      'A report on employee engagement levels and related initiatives. Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi, architecto!',
    'Last updated': '07/10/2024 08:00 AM (PST)',
  },
  {
    'Category': 'IT',
    'Reports': 'Cybersecurity Risk Assessment',
    'Source': 'IT Security Team',
    'Description':
      'Assessment of cybersecurity risks and mitigation strategies.',
    'Last updated': '07/30/2024 02:30 PM (PST)',
  },
  {
    'Category': 'Sales',
    'Reports': 'Monthly Sales Performance',
    'Source': 'Sales Department',
    'Description':
      'Performance metrics and analysis of monthly sales activities.',
    'Last updated': '07/29/2024 10:00 AM (PST)',
  },
  {
    'Category': 'R&D',
    'Reports': 'Innovation Pipeline Report',
    'Source': 'Research and Development Team',
    'Description':
      'Current status and progress of ongoing innovation projects.',
    'Last updated': '07/27/2024 01:15 PM (PST)',
  },
  {
    'Category': 'Legal',
    'Reports': 'Compliance Audit Results',
    'Source': 'Legal Department',
    'Description':
      'Results of the recent compliance audit and necessary action items.',
    'Last updated': '07/26/2024 03:00 PM (PST)',
  },
  {
    'Category': 'Operations',
    'Reports': 'Quarterly Operations Review',
    'Source': 'Operations Team',
    'Description':
      'Review of operational efficiency and performance for the last quarter.',
    'Last updated': '07/24/2024 12:45 PM (PST)',
  },
  {
    'Category': 'Training',
    'Reports': 'Employee Training Completion Report',
    'Source': 'Training Department',
    'Description':
      'Completion rates and feedback from recent employee training sessions.',
    'Last updated': '07/23/2024 09:00 AM (PST)',
  },
]
