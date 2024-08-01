import { Outlet } from 'react-router-dom'
import Navbar from '~/components/Navbar'
import Sidebar from '~/components/Sidebar'

export default function DefaultLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-grow h-full grid grid-cols-7 lg:grid-cols-6">
        <div className="col-span-2 lg:col-span-1 h-full">
          <Sidebar />
        </div>

        <div className="col-span-5">
          <div className="px-8 lg:px-10 py-6">
            <Outlet />
          </div>

          <div className="h-10 bg-gray-950" />
        </div>
      </div>
    </div>
  )
}
