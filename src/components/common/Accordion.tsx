import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useMemo,
} from 'react'

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
  children: React.ReactNode
}

interface AccordionContextType {
  open: boolean | null
  setOpen: React.Dispatch<React.SetStateAction<boolean | null>>
}

interface AccordionProviderProps {
  children: ReactNode
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

const AccordionProvider: React.FC<AccordionProviderProps> = ({ children }) => {
  const [open, setOpen] = useState<boolean | null>(null)

  const value = useMemo(() => ({ open, setOpen }), [open])

  return (
    <AccordionContext.Provider value={value}>
      {children}
    </AccordionContext.Provider>
  )
}

export function Accordion(props: Readonly<AccordionProps>) {
  const { className, children } = props

  return (
    <AccordionProvider>
      <div className={className}>{children}</div>
    </AccordionProvider>
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
