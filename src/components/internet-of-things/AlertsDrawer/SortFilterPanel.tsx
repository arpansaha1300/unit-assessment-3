import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/outline'
import BaseButton from '~base/BaseButon'
import Divider from '~common/Divider'
import RadioGroup from '~common/RadioGroup'
import {
  Accordion,
  AccordionButton,
  AccordionPanel,
} from '~/components/common/Accordion'
import { useSortFilterContext } from './context'
import { sortOptions, SortOptions } from './sortOptions'
import { FilterOptions, filterOptions } from './filterOptions'

interface SortFilterPanelProps {
  close: () => void
}

export default function SortFilterPanel({
  close,
}: Readonly<SortFilterPanelProps>) {
  const { sortOption, filterOption, setSortOption, setFilterOption } =
    useSortFilterContext()

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    setSortOption(formData.get('sort') as SortOptions)
    setFilterOption(formData.get('filter') as FilterOptions)

    close()
  }

  return (
    <form className="flex flex-col h-full" onSubmit={handleSubmit}>
      <div>
        <Accordion shouldOpen={true}>
          <AccordionButton className="w-full flex justify-between items-center">
            {({ open }) => (
              <>
                <p className="font-semibold text-sm">Sort by</p>

                <div className="p-2">
                  {open ? (
                    <ChevronUpIcon className="flex-shrink-0 size-3" />
                  ) : (
                    <ChevronDownIcon className="flex-shrink-0 size-3" />
                  )}
                </div>
              </>
            )}
          </AccordionButton>
          <AccordionPanel className="mt-4">
            <RadioGroup
              radioList={sortOptions}
              name="sort"
              defaultChecked={sortOption}
            />
          </AccordionPanel>
        </Accordion>

        <div className="mt-6 mb-4">
          <Divider />
        </div>

        <Accordion shouldOpen={true}>
          <AccordionButton className="w-full flex justify-between items-center">
            {({ open }) => (
              <>
                <p className="font-semibold text-sm">Filter by date range</p>

                <div className="p-2">
                  {open ? (
                    <ChevronUpIcon className="flex-shrink-0 size-3" />
                  ) : (
                    <ChevronDownIcon className="flex-shrink-0 size-3" />
                  )}
                </div>
              </>
            )}
          </AccordionButton>
          <AccordionPanel className="mt-4">
            <RadioGroup
              radioList={filterOptions}
              name="filter"
              defaultChecked={filterOption}
            />
          </AccordionPanel>
        </Accordion>
      </div>

      <div className="mt-auto space-y-2">
        <BaseButton type="submit" stretch>
          Apply filters
        </BaseButton>

        <BaseButton secondary stretch onClick={close}>
          Cancel selection
        </BaseButton>
      </div>
    </form>
  )
}
