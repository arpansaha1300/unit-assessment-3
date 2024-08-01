import classNames from '~/utils/classNames'

interface BaseButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'className'> {
  type?: 'button' | 'submit'
  stretch?: boolean
  secondary?: boolean
  children: React.ReactNode
}

export default function BaseButton(props: Readonly<BaseButtonProps>) {
  const {
    children,
    type = 'button',
    stretch = false,
    secondary = false,
    ...attrs
  } = props

  return (
    <button
      type={type}
      className={classNames(
        'px-3.5 py-2 rounded text-sm font-semibold',
        stretch && 'w-full',
        secondary
          ? 'hover:bg-gray-100 ring-2 ring-inset ring-gray-800'
          : 'bg-brand-primary text-gray-50'
      )}
      {...attrs}
    >
      {children}
    </button>
  )
}
