import { useState } from 'react'
import { Outlet } from 'react-router'
import Sidebar from './Sidebar'

function DashboardLayout() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-gray-50">

      <Sidebar
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />

      <div className="min-w-0 flex-1">

        {/* Mobile Menu Button */}
        <div className="border-b border-gray-200 bg-white p-4 md:hidden">
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="rounded-lg border border-gray-200 px-3 py-2 text-gray-700"
          >
            ☰ Menu
          </button>
        </div>

        <Outlet />

      </div>

    </div>
  )
}

export default DashboardLayout