import { Outlet } from 'react-router-dom'

export default function DefaultLayout() {
  return (
    <div className="min-h-screen">
      <Outlet />
    </div>
  )
}
