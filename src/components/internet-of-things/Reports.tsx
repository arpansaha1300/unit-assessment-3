import { createElement, useEffect, useRef, useState } from 'react'
import {
  ArrowDownTrayIcon,
  ArrowTopRightOnSquareIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from '@heroicons/react/24/outline'
import BaseInput from '~base/BaseInput'
import Card from '~common/Card'
import classNames from '~/utils/classNames'
import { iotReport } from '~/assets/data'
import formatDate from '~/utils/formatDate'

type TReportRow = (typeof iotReport.reportList)[number]['reportData'][number]

interface PaginationIconProps {
  icon: any
  disabled?: boolean
}

const headingsMap = Object.freeze({
  'Category': 'reportCategory',
  'Reports': 'reportName',
  'Source': 'source',
  'Description': 'reportDesc',
  'Last updated': 'lastReportDate',
} as const)

const headings = Object.freeze(
  Object.keys(headingsMap)
) as (keyof typeof headingsMap)[]

const rowsPerPage = 10

export default function Reports() {
  const [data] = useState(iotReport.reportList[0].reportData)
  const [page, setPage] = useState(1)
  const [pageCount, setPageCount] = useState(0)
  const [slicedData, setSlicedData] = useState<TReportRow[]>([])

  const pageInputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    const startIdx = (page - 1) * rowsPerPage
    setSlicedData(data.slice(startIdx, rowsPerPage))
  }, [data, page])

  useEffect(() => {
    setPageCount(Math.ceil(data.length / rowsPerPage))
  }, [data.length])

  function onPageChange(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (pageInputRef.current === null) return

    const formData = new FormData(e.currentTarget)
    let value = parseInt(formData.get('page') as string)

    if (value < 1) value = 1
    if (value > pageCount) value = pageCount

    pageInputRef.current.value = value.toString()
    setPage(value)
  }

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
                        {i === 4
                          ? formatDate(
                              item[headingsMap[heading]],
                              'dd/MM/yyyy hh:mm a'
                            )
                          : item[headingsMap[heading]]}
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

              <form onSubmit={onPageChange}>
                <input
                  ref={pageInputRef}
                  id="page"
                  name="page"
                  type="number"
                  inputMode="numeric"
                  defaultValue={page}
                  className="inline appearance-none rounded-md p-2 placeholder-gray-600 focus:border-brand-primary focus:outline-none focus:ring-brand-primary text-xs font-semibold text-center shadow-sm ring-sm ring-opacity-20 border border-gray-600 transition-colors size-8"
                />
                <button type="submit" className="sr-only" />
              </form>

              <span className="inline-block">of</span>
              <span className="inline-block font-semibold">{pageCount}</span>
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
