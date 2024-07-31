import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/20/solid'
import { useState } from 'react'
import classNames from '~/utils/classNames'
import Card from '~common/Card'
import { iotTopUsage } from '~/assets/data'

interface StatusProps {
  active: boolean
}

const headingsMap = Object.freeze({
  MSISDN: 'mobileNumber',
  Status: 'mobileNumberStatus',
  Usage: 'dataUsage',
} as const)

const headings = Object.freeze(
  Object.keys(headingsMap)
) as (keyof typeof headingsMap)[]

export default function TopUsage() {
  const [data] = useState(iotTopUsage.usageDataList[0].usages)

  return (
    <section className="h-full">
      <Card className="flex flex-col h-full">
        <h2 className="py-2 text-lg font-bold">Top usage</h2>

        <div className="flex-grow mt-4 px-2 max-h-96 overflow-auto">
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

            <tbody className="divide-y divide-gray-200 bg-white text-xs">
              {data.map((item: any, i) => (
                <tr key={i}>
                  {headings.map((heading, i) => (
                    <td
                      key={i}
                      className="max-w-12 px-4 first:pl-0 last:pr-0 py-3 truncate font-medium text-gray-800"
                    >
                      {i === 1 ? (
                        <Status
                          active={item[headingsMap[heading]] === 'Active'}
                        />
                      ) : (
                        item[headingsMap[heading]]
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </section>
  )
}

function Status(props: Readonly<StatusProps>) {
  const { active } = props

  return (
    <p
      className={classNames(
        'inline-flex items-center gap-1',
        active ? 'text-green-600' : 'text-red-600'
      )}
    >
      {active ? (
        <CheckCircleIcon className="flex-shrink-0 size-4" />
      ) : (
        <XCircleIcon className="flex-shrink-0 size-4" />
      )}

      <span className="text-xs font-medium">
        {active ? 'Active' : 'Deactivated'}
      </span>
    </p>
  )
}
