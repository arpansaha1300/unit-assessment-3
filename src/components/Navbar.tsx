import {
  MagnifyingGlassIcon,
  UserCircleIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/outline'

export default function Navbar() {
  return (
    <nav className="px-6 py-2 bg-gray-950 flex items-center justify-between">
      <div className="flex items-center gap-1">
        <div className="h-10">
          <img src="logo.png" alt="Logo" className="size-full" />
        </div>
        <div className="text-white font-bold text-sm uppercase">
          <p>T-mobile</p>
          <p>for business</p>
        </div>
      </div>
      <div className="flex gap-8 text-gray-50 text-sm">
        <button className="p-2 flex items-center gap-2 hover:bg-gray-800 rounded">
          <MagnifyingGlassIcon className="flex-shrink-0 size-5" />
          <p>Search</p>
        </button>
        <button className="p-2 flex items-center gap-2 hover:bg-gray-800 rounded">
          <UserCircleIcon className="flex-shrink-0 size-6" />
          <p>My Profile</p>
          <ChevronDownIcon className="flex-shrink-0 size-4" />
        </button>
      </div>
    </nav>
  )
}
