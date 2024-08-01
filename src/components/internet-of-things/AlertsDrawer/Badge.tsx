import classNames from '~/utils/classNames'

interface BadgeProps {
  children: string
  type: string
}

export default function Badge({ children, type }: Readonly<BadgeProps>) {
  return (
    <div
      className={classNames(
        'text-[8px] font-semibold rounded px-1 py-px',
        getColor(type)
      )}
    >
      {children}
    </div>
  )
}

function getColor(type: string) {
  if (type === 'RED') return 'bg-red-500 text-white'
  if (type === 'ORANGE') return 'bg-orange-400 text-white'
  if (type === 'YELLOW') return 'bg-yellow-300 text-gray-950'
}
