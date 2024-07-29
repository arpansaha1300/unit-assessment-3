import classNames from '~/utils/classNames'

interface CardProps {
  className?: string
  children: React.ReactNode
}

export default function Card(props: Readonly<CardProps>) {
  const { children, className = '' } = props

  return (
    <div
      className={classNames(
        'px-4 py-4 bg-white shadow ring-sm ring-black/10 rounded',
        className
      )}
    >
      {children}
    </div>
  )
}
