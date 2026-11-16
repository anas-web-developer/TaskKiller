import { useState } from 'react'

function Navbar() {
  const [search, setSearch] = useState('')

  const handleSearch = (e) => {
    e.preventDefault()

    if (!search.trim()) {
      return
    }

    window.location.href = `/tasks?search=${encodeURIComponent(search)}`
  }

  const user = localStorage.getItem('user')

  function handleLogout() {
    localStorage.removeItem('user')
    window.location.href = '/login'
  }

  return (
    <nav className="border-b border-gray-200 bg-white">

      <div className="grid w-full grid-cols-[auto_1fr_auto] items-center gap-3 px-5 py-4 sm:px-8 lg:px-10">

        {/* Logo */}
        <div className="justify-self-start">
          <a
            href="/"
            className="text-lg font-bold text-gray-900 sm:text-2xl"
          >
            TaskKiller
          </a>
        </div>

        {/* Search */}
        <form
          onSubmit={handleSearch}
          className="w-36 justify-self-center sm:w-60 md:w-72"
        >
          <input
            type="text"
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-xs text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:bg-white sm:text-sm"
          />
        </form>

        {/* Login / Logout */}
        <div className="justify-self-end">

          {user ? (

            <button
              type="button"
              onClick={handleLogout}
              className="rounded-lg bg-red-500 px-3 py-2 text-xs font-semibold text-white transition hover:bg-red-600 sm:px-4 sm:text-sm"
            >
              Logout
            </button>

          ) : (

            <a
              href="/login"
              className="rounded-lg bg-blue-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-blue-700 sm:px-4 sm:text-sm"
            >
              Login
            </a>

          )}

        </div>

      </div>

    </nav>
  )
}

export default Navbar