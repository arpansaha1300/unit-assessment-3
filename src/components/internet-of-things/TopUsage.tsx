import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/20/solid'
import classNames from '~/utils/classNames'
import Card from '~common/Card'
import Table from '~common/Table'

interface StatusProps {
  active: boolean
}

const data = [
  {
    MSISDN: '123456789',
    Status: <Status active={true} />,
    Usage: '10GB',
  },
  {
    MSISDN: '123456789',
    Status: <Status active={true} />,
    Usage: '10GB',
  },
  {
    MSISDN: '123456789',
    Status: <Status active={true} />,
    Usage: '10GB',
  },
  {
    MSISDN: '123456789',
    Status: <Status active={false} />,
    Usage: '10GB',
  },
  {
    MSISDN: '123456789',
    Status: <Status active={false} />,
    Usage: '10GB',
  },
  {
    MSISDN: '123456789',
    Status: <Status active={true} />,
    Usage: '10GB',
  },
  {
    MSISDN: '123456789',
    Status: <Status active={false} />,
    Usage: '10GB',
  },
]

export default function TopUsage() {
  return (
    <section className="h-full">
      <Card className="flex flex-col h-full">
        <h2 className="py-2 text-lg font-bold">Top usage</h2>

        <div className="flex-grow mt-4 px-2 max-h-96 overflow-auto">
          <Table keyCol="email" headings={Object.keys(data[0])} data={data} />
        </div>
      </Card>
    </section>
  )
}

function Status(props: Readonly<StatusProps>) {
  const { active } = props

  return (
    <p
      className={classNames(
        'inline-flex items-center gap-1',
        active ? 'text-green-600' : 'text-red-600'
      )}
    >
      {active ? (
        <CheckCircleIcon className="flex-shrink-0 size-4" />
      ) : (
        <XCircleIcon className="flex-shrink-0 size-4" />
      )}

      <span className="text-xs font-medium">
        {active ? 'Active' : 'Deactivated'}
      </span>
    </p>
  )
}
