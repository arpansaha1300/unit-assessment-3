import classNames from '~/utils/classNames'

interface RadioList {
  id: string
  title: string
}

interface RadioGroupProps {
  className?: string
  radioList: RadioList[]
  name: string
  defaultChecked: string
}

export default function RadioGroup(props: Readonly<RadioGroupProps>) {
  const { className, radioList, name, defaultChecked } = props

  return (
    <div className={classNames('space-y-4', className)}>
      {radioList.map(radioItem => (
        <div key={radioItem.id} className="flex items-center">
          <input
            id={radioItem.id}
            name={name}
            type="radio"
            value={radioItem.id}
            defaultChecked={radioItem.id === defaultChecked}
            // checked={radioItem.id === selectedMethod}
            // onChange={() => setSelectedMethod(radioItem.id)}
            className="h-4 w-4 border-gray-300 text-brand-primary focus:ring-brand-primary"
          />
          <label
            htmlFor={radioItem.id}
            className="ml-3 block text-sm font-medium text-gray-700"
          >
            {radioItem.title}
          </label>
        </div>
      ))}
    </div>
  )
}
