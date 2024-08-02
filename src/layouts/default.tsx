import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Drawer from '~/components/common/Drawer'
import Navbar from '~/components/Navbar'
import Sidebar from '~/components/Sidebar'

export default function DefaultLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar setSidebarOpen={setSidebarOpen} />

      <div className="flex-grow h-full sm:grid sm:grid-cols-7 lg:grid-cols-6">
        <div className="hidden sm:block col-span-2 lg:col-span-1 h-full bg-white relative">
          <Sidebar />
        </div>

        <Drawer open={sidebarOpen} setOpen={setSidebarOpen} direction="left">
          <div className="-mx-4">
            <Sidebar />
          </div>
        </Drawer>

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
