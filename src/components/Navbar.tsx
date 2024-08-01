import {
  MagnifyingGlassIcon,
  UserCircleIcon,
  ChevronDownIcon,
  Bars3Icon,
} from '@heroicons/react/24/outline'

interface NavbarProps {
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Navbar(props: Readonly<NavbarProps>) {
  const { setSidebarOpen } = props

  return (
    <nav className="px-6 py-2 bg-gray-950 flex items-center justify-between">
      <button
        type="button"
        className="block sm:hidden"
        onClick={() => setSidebarOpen(true)}
      >
        <Bars3Icon className="flex-shrink-0 size-7 text-white" />
      </button>
      <div className="flex items-center gap-1">
        <div className="h-8 sm:h-10">
          <img src="logo.png" alt="Logo" className="size-full" />
        </div>
        <div className="text-white font-bold text-xs sm:text-sm uppercase">
          <p>T-mobile</p>
          <p>for business</p>
        </div>
      </div>
      <div className="flex gap-8 text-gray-50 text-xs">
        <button
          type="button"
          className="hidden sm:flex p-2 items-center gap-2 hover:bg-gray-800 rounded"
        >
          <MagnifyingGlassIcon className="flex-shrink-0 size-5" />
          <p>Search</p>
        </button>
        <button
          type="button"
          className="p-2 flex items-center gap-2 hover:bg-gray-800 rounded"
        >
          <UserCircleIcon className="flex-shrink-0 size-6" />
          <p className="hidden sm:block">My Profile</p>
          <ChevronDownIcon className="hidden sm:block flex-shrink-0 size-4" />
        </button>
      </div>
    </nav>
  )
}
