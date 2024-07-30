import classNames from '~/utils/classNames'

interface StatsProps {
  stats: any[]
  columns: 2 | 3
  className?: string
}

export default function Stats(props: Readonly<StatsProps>) {
  const { stats, columns, className = '' } = props

  return (
    <div
      className={classNames('mt-4 grid grid-cols gap-4', className)}
      style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
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
