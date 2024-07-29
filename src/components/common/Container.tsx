import { createElement, forwardRef } from 'react'
import classNames from '~/utils/classNames'

export type HTMLElementTagNames = keyof HTMLElementTagNameMap

interface ContainerProps extends React.HTMLAttributes<HTMLElement> {
  /** @default 'div' */
  as?: HTMLElementTagNames
  className?: string
  children: React.ReactNode
}

const Container = forwardRef(
  ({ children, as = 'div', className = '', ...rest }: ContainerProps, ref) => {
    return createElement(
      as,
      {
        ref,
        className: classNames(
          'mx-auto px-4 xs:max-w-md sm:max-w-xl sm:px-6 lg:px-4 xl:px-0 md:max-w-5xl xl:max-w-6xl',
          className
        ),
        ...rest,
      },
      children
    )
  }
)

export default Container
