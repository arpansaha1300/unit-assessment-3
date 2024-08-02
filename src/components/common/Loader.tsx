import classNames from '~/utils/classNames'

interface LoaderProps {
  dark?: boolean
  small?: boolean
  className?: string
}

export default function Loader(props: Readonly<LoaderProps>) {
  const { className, dark = false, small = false } = props

  return (
    <div
      className={classNames(
        className,
        small ? 'border-y' : 'border-y-2',
        dark ? 'border-gray-950' : 'border-gray-50',
        'aspect-square rounded-full animate-spin'
      )}
    />
  )
}
