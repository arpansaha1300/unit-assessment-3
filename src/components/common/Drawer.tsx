'use client'

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import classNames from '~/utils/classNames'

interface DrawerProps {
  open: boolean
  title?: string
  children: React.ReactNode
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  headerIcon?: React.ReactNode
  direction?: 'left' | 'right'
}

export default function Drawer(props: Readonly<DrawerProps>) {
  const {
    open,
    title,
    children,
    setOpen,
    headerIcon,
    direction = 'right',
  } = props

  return (
    <Dialog open={open} onClose={setOpen} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-700/50 transition-opacity duration-500 ease-in-out data-[closed]:opacity-0"
      />

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div
            className={classNames(
              'pointer-events-none fixed inset-y-0 flex max-w-full',
              direction === 'right' ? 'right-0 pl-10' : 'left-0 pr-10'
            )}
          >
            <DialogPanel
              transition
              className={classNames(
                'pointer-events-auto relative w-screen max-w-md transform transition duration-500 ease-in-out sm:duration-700',
                direction === 'right'
                  ? 'data-[closed]:translate-x-full'
                  : 'data-[closed]:-translate-x-full'
              )}
            >
              <div className="flex h-full flex-col overflow-y-auto bg-white py-6 shadow-xl">
                {title && (
                  <div className="px-4 sm:px-6 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <DialogTitle className="text-lg font-semibold leading-6 text-gray-900">
                        {title}
                      </DialogTitle>
                      {headerIcon}
                    </div>
                    <button
                      type="button"
                      onClick={() => setOpen(false)}
                      className="rounded size-6 flex items-center justify-center text-gray-800 focus:outline-none focus:ring-2 focus:ring-brand-primary"
                    >
                      <span className="sr-only">Close panel</span>
                      <ArrowRightIcon aria-hidden="true" className="size-5" />
                    </button>
                  </div>
                )}
                <div className="relative mt-6 flex-1 px-4 sm:px-6">
                  {children}
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  )
}
