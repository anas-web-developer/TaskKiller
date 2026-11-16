import { NavLink } from 'react-router'

function Sidebar({ isOpen, setIsOpen }) {

  function handleLogout() {
    localStorage.removeItem('user')
    window.location.href = '/login'
  }

  return (
    <>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-50 h-screen w-64 border-r border-gray-200 bg-white p-5 transition-transform md:static md:translate-x-0 ${
          isOpen
            ? 'translate-x-0'
            : '-translate-x-full'
        }`}
      >

        {/* Sidebar Header */}
        <div className="mb-8 flex items-center justify-between">

          <h2 className="text-xl font-bold text-gray-900">
            TaskKiller
          </h2>

          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="text-gray-500 md:hidden"
          >
            ✕
          </button>

        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-2">

          <NavLink
            to="/"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `rounded-lg px-4 py-3 font-medium transition ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/tasks"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `rounded-lg px-4 py-3 font-medium transition ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`
            }
          >
            Tasks
          </NavLink>

          <NavLink
            to="/projects"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `rounded-lg px-4 py-3 font-medium transition ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`
            }
          >
            Projects
          </NavLink>

          <NavLink
            to="/profile"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `rounded-lg px-4 py-3 font-medium transition ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`
            }
          >
            Profile
          </NavLink>

          <NavLink
            to="/settings"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `rounded-lg px-4 py-3 font-medium transition ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`
            }
          >
            Settings
          </NavLink>

        </nav>

        {/* Logout */}
        <div className="mt-6  border-gray-200 pt-64">

          <button
            type="button"
            onClick={handleLogout}
            className="w-full rounded-lg px-4 py-3 text-left font-medium text-red-500 transition hover:bg-red-50"
          >
            Logout
          </button>

        </div>

      </aside>

    </>
  )
}

export default Sidebar