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
  handleClick: () => void
}

interface ReportsTableProps {
  data: (typeof iotReport)['reportList'][number]['reportData']
  searchValue: string
}

interface HighlightProps {
  pattern: string
  str: string
  className?: string
}

const rowsPerPage = 10

export default function Reports() {
  const [data] = useState(iotReport.reportList[0].reportData)
  const [filteredData, setFilteredData] = useState(data)
  const [page, setPage] = useState(1)
  const [pageCount, setPageCount] = useState(0)
  const [slicedData, setSlicedData] = useState<TReportRow[]>([])
  const [searchValue, setSearchValue] = useState('')

  const pageInputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    const regex = new RegExp(`(${searchValue})`, 'gi')
    let newData = data

    if (searchValue) {
      newData = data.filter(
        item =>
          regex.test(item.reportCategory) ||
          regex.test(item.reportDesc) ||
          regex.test(item.source) ||
          regex.test(item.reportName)
      )
    }
    setFilteredData(newData)
  }, [searchValue, data])

  useEffect(() => {
    const startIdx = (page - 1) * rowsPerPage
    setSlicedData(filteredData.slice(startIdx, startIdx + rowsPerPage))
  }, [filteredData, page, searchValue])

  useEffect(() => {
    setPageCount(Math.ceil(filteredData.length / rowsPerPage))
  }, [filteredData.length])

  useEffect(() => {}, [searchValue])

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

  function incPage() {
    setPage(x => {
      const next = x + 1
      if (pageInputRef.current) pageInputRef.current.value = next.toString()
      return next
    })
  }

  function decPage() {
    setPage(x => {
      const next = x - 1
      if (pageInputRef.current) pageInputRef.current.value = next.toString()
      return next
    })
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
            value={searchValue}
            onChange={e => setSearchValue(e.target.value)}
          />
        </div>

        <div className="mt-6 px-2">
          {slicedData.length > 0 ? (
            <ReportsTable data={slicedData} searchValue={searchValue} />
          ) : (
            <div className="p-4">
              <p className="text-center text-sm">No data available</p>
            </div>
          )}

          <div className="mt-5 mx-auto w-72 flex items-center justify-between">
            <PaginationIcon
              disabled={page === 1}
              icon={ChevronDoubleLeftIcon}
              handleClick={decPage}
            />

            <div className="text-xs inline-flex items-center gap-2">
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
            </div>

            <PaginationIcon
              disabled={page === pageCount}
              icon={ChevronDoubleRightIcon}
              handleClick={incPage}
            />
          </div>
        </div>
      </Card>
    </section>
  )
}

function PaginationIcon(props: Readonly<PaginationIconProps>) {
  const { icon, disabled, handleClick } = props

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
      disabled={disabled}
      onClick={handleClick}
    >
      {iconJsx}
    </button>
  )
}

function ReportsTable(props: Readonly<ReportsTableProps>) {
  const { data, searchValue } = props

  return (
    <table className="min-w-full divide-y divide-gray-300">
      <thead className="font-semibold text-xs">
        <tr>
          <th
            scope="col"
            className="hidden lg:table-cell pr-4 py-3 text-left font-semibold text-gray-900"
          >
            Category
          </th>
          <th
            scope="col"
            className="lg:pl-4 pr-4 py-3 text-left font-semibold text-gray-900"
          >
            Reports
          </th>
          <th
            scope="col"
            className="hidden lg:table-cell px-4 py-3 text-left font-semibold text-gray-900"
          >
            Source
          </th>
          <th
            scope="col"
            className="hidden lg:table-cell px-4 py-3 text-left font-semibold text-gray-900"
          >
            Description
          </th>
          <th
            scope="col"
            className="pl-4 py-3 text-left font-semibold text-gray-900"
          >
            Last updated
          </th>
        </tr>
      </thead>

      <tbody className="divide-y divide-gray-200 bg-white text-xs text-gray-800 font-medium">
        {data.map((item, i) => (
          <tr key={i}>
            <td className="hidden lg:table-cell max-w-xs pr-4 py-3">
              <Highlight pattern={searchValue} str={item.reportCategory} />
            </td>
            <td className="max-w-xs pl-0 lg:pl-4 pr-4 py-3">
              <Highlight
                pattern={searchValue}
                str={item.reportName}
                className="block font-bold lg:font-medium"
              />
              <div className="mt-1 lg:hidden">
                <span className="font-medium">Category: </span>
                <Highlight
                  pattern={searchValue}
                  str={item.reportCategory}
                  className="inline"
                />
              </div>
              <div className="mt-1 lg:hidden">
                <span className="font-medium">Source: </span>
                <Highlight
                  pattern={searchValue}
                  str={item.source}
                  className="inline"
                />
              </div>
              <Highlight
                pattern={searchValue}
                str={item.reportDesc}
                className="block lg:hidden mt-1 line-clamp-1"
              />
            </td>
            <td className="hidden lg:table-cell max-w-xs px-4 py-3">
              <Highlight pattern={searchValue} str={item.source} />
            </td>
            <td className="hidden lg:table-cell max-w-xs px-4 py-3">
              <div className="line-clamp-2">
                <Highlight pattern={searchValue} str={item.reportDesc} />
              </div>
            </td>
            <td className="max-w-xs px-4 py-3">
              <div className="line-clamp-2">
                <p className="hidden lg:block">
                  {formatDate(item.lastReportDate, 'dd/MM/yyyy hh:mm a')}
                </p>
                <p className="lg:hidden">
                  {formatDate(item.lastReportDate, 'dd/MM/yyyy')}
                </p>
                <p className="lg:hidden">
                  {formatDate(item.lastReportDate, 'hh:mm a')}
                </p>
              </div>
            </td>

            <td key={i} className="max-w-xs px-4 py-3">
              <button type="button">
                <ArrowDownTrayIcon className="flex-shrink-0 size-4" />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

function Highlight({ pattern, str, className }: Readonly<HighlightProps>) {
  if (pattern.trim() === '') return <p className={className}>{str}</p>

  const regex = new RegExp(`(${pattern})`, 'gi')
  const parts = str.split(regex)

  if (parts.length === 0) {
    return <p className={className}>{str}</p>
  }

  return (
    <p className={className}>
      {parts.filter(Boolean).map((part, i) =>
        regex.test(part) ? (
          <span key={i} className="font-semibold bg-yellow-200">
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </p>
  )
}
