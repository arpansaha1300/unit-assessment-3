import classNames from '~/utils/classNames'

interface DividerProps {
  vertical?: boolean
}
export default function Divider(props: Readonly<DividerProps>) {
  const { vertical = false } = props
  console.log(vertical)
  return (
    <div
      className={classNames(
        'bg-gray-200',
        vertical ? 'h-full w-px' : 'h-px w-full'
      )}
    />
  )
}
