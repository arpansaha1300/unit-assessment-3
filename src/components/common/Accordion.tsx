import { createContext, useContext, useState, useMemo, useEffect } from 'react'

interface AccordionButtonRenderProps {
  open: boolean | null
}

interface AccordionButtonProps {
  className?: string
  children:
    | React.ReactNode
    | (({ open }: AccordionButtonRenderProps) => React.ReactNode)
}

interface AccordionPanelProps {
  className?: string
  children: React.ReactNode
}

interface AccordionProps {
  className?: string
  shouldOpen?: boolean
  children: React.ReactNode
}

interface AccordionContextType {
  open: boolean | null
  setOpen: React.Dispatch<React.SetStateAction<boolean | null>>
}

const AccordionContext = createContext<AccordionContextType | undefined>(
  undefined
)

const useAccordionContext = (): AccordionContextType => {
  const context = useContext(AccordionContext)
  if (!context) {
    throw new Error(
      'useAccordionContext must be used within an AccordionProvider'
    )
  }
  return context
}

export function Accordion(props: Readonly<AccordionProps>) {
  const { className, shouldOpen = false, children } = props

  const [open, setOpen] = useState<boolean | null>(shouldOpen)
  const value = useMemo(() => ({ open, setOpen }), [open])

  useEffect(() => {
    if (shouldOpen) setOpen(shouldOpen)
  }, [shouldOpen])

  return (
    <AccordionContext.Provider value={value}>
      <div className={className}>{children}</div>
    </AccordionContext.Provider>
  )
}

export function AccordionButton(props: Readonly<AccordionButtonProps>) {
  const { className, children } = props
  const { open, setOpen } = useAccordionContext()

  const handleClick = () => {
    setOpen(x => !x)
  }

  return (
    <button className={className} onClick={handleClick}>
      {children instanceof Function ? children({ open }) : children}
    </button>
  )
}

export function AccordionPanel(props: Readonly<AccordionPanelProps>) {
  const { className, children } = props
  const { open } = useAccordionContext()

  if (!open) return null

  return <div className={className}>{children}</div>
}
