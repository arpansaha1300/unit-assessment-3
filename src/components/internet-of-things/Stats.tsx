import classNames from '~/utils/classNames'

interface StatsProps {
  stats: any[]
  columns: 2 | 3
  className?: string
}

const gridCols = ['sm:grid-cols-2', 'sm:grid-cols-3', 'sm:grid-cols-4']

export default function Stats(props: Readonly<StatsProps>) {
  const { stats, columns, className = '' } = props

  return (
    <div
      className={classNames(
        'mt-4 grid gap-4 grid-cols-1',
        className,
        gridCols[columns - 2]
      )}
    >
      {stats.map(stat => (
        <div key={stat.name} className="p-4 border border-gray-300 rounded-lg">
          <p className="text-sm">{stat.name}</p>
          <p className="text-2xl font-bold">{stat.value}</p>
        </div>
      ))}
    </div>
  )
}
