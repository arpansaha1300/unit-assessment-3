'use client'

import { useState } from 'react'
import {
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import classNames from '~/utils/classNames'

interface ListItem {
  id: number
  name: string
}

interface SelectMenuProps {
  list: ListItem[]
  label: string
  srOnlyLabel?: boolean
}

export default function SelectMenu(props: Readonly<SelectMenuProps>) {
  const { list, label, srOnlyLabel = false } = props

  const [selected, setSelected] = useState(list[0])

  return (
    <Listbox
      as="div"
      value={selected}
      onChange={setSelected}
      className="relative"
    >
      <Label
        className={classNames(
          'block px-1 text-[0.6rem] font-medium bg-white text-gray-900 absolute top-0 left-2 z-10 -translate-y-1/2',
          srOnlyLabel && 'sr-only'
        )}
      >
        {label}
      </Label>

      <div className="relative">
        <ListboxButton className="relative w-full cursor-default rounded bg-white py-2.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-primary sm:text-sm sm:leading-6">
          <p className="truncate text-sm font-semibold">{selected.name}</p>

          <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
            <ChevronUpDownIcon
              aria-hidden="true"
              className="data-[open]:hidden h-5 w-5 text-gray-400"
            />
          </span>
        </ListboxButton>

        <ListboxOptions
          transition
          className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm"
        >
          {list.map(item => (
            <ListboxOption
              key={item.id}
              value={item}
              className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-brand-primary data-[focus]:text-white"
            >
              <p className="truncate font-normal group-data-[selected]:font-semibold">
                {item.name}
              </p>

              <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-brand-primary group-data-[focus]:text-white [.group:not([data-selected])_&]:hidden">
                <CheckIcon aria-hidden="true" className="h-5 w-5" />
              </span>
            </ListboxOption>
          ))}
        </ListboxOptions>
      </div>
    </Listbox>
  )
}
