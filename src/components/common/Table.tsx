interface TableProps {
  keyCol: string
  headings: string[]
  data: Record<string, any>[]
}

export default function Table(props: Readonly<TableProps>) {
  const { headings, data, keyCol } = props

  return (
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
        {data.map(item => (
          <tr key={item[keyCol]}>
            {headings.map((heading, i) => (
              <td key={i} className="max-w-xs px-4 first:pl-0 last:pr-0 py-3">
                <p className="font-medium text-gray-800 line-clamp-2">
                  {item[heading]}
                </p>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
