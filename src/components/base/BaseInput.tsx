import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { forwardRef } from 'react'
import classNames from '~/utils/classNames'

interface BaseInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string
  label: string
  srOnlyLabel?: boolean
  disabled?: boolean
  required?: boolean
  validationError?: string | null
}

const BaseInput = forwardRef<HTMLInputElement, BaseInputProps>((props, ref) => {
  const {
    id,
    label,
    validationError = null,
    disabled = false,
    srOnlyLabel = false,
    required = true,
    ...inputAttrs
  } = props

  const isSearch = props.type === 'search'

  return (
    <div className="relative">
      <label
        htmlFor={id}
        className={classNames(
          'block text-sm font-medium',
          srOnlyLabel && 'sr-only'
        )}
      >
        {label}
      </label>
      <div className="mt-1 relative">
        {isSearch && (
          <MagnifyingGlassIcon className="absolute left-2.5 top-1/2 -translate-y-1/2 flex-shrink-0 size-4 text-gray-600" />
        )}

        <input
          ref={ref}
          id={id}
          disabled={disabled}
          required={required}
          {...inputAttrs}
          className={classNames(
            'block w-full appearance-none rounded-md py-2 placeholder-gray-500 focus:border-brand-primary focus:outline-none focus:ring-brand-primary text-sm shadow-sm ring-sm ring-opacity-20 border border-gray-500 transition-colors',
            isSearch ? 'pl-9 pr-3' : 'px-3'
            // disabled ? '' : ''
          )}
        />
      </div>
      {validationError !== null && (
        <p className="text-xs text-red-400 font-medium absolute -bottom-5">
          {validationError}
        </p>
      )}
    </div>
  )
})

export default BaseInput
