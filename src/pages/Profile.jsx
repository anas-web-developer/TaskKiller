import { useState } from 'react'

function Profile() {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user')

    if (savedUser) {
      return JSON.parse(savedUser)
    }

    return {
      email: 'guest@example.com',
    }
  })

  const [name, setName] = useState(
    localStorage.getItem('userName') || 'TaskKiller User'
  )

  function handleSave(e) {
    e.preventDefault()

    localStorage.setItem('userName', name)

    setUser({
      ...user,
      name: name,
    })

    alert('Profile updated successfully!')
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">

      <div className="mx-auto max-w-3xl">

        {/* Header */}
        <div className="mb-8">

          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            Account
          </p>

          <h1 className="mt-2 text-3xl font-bold text-gray-900">
            My Profile
          </h1>

          <p className="mt-2 text-gray-500">
            Manage your personal information.
          </p>

        </div>

        {/* Profile Card */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">

          {/* Avatar */}
          <div className="mb-8 flex items-center gap-4">

            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-2xl font-bold text-blue-600">
              {name.charAt(0).toUpperCase()}
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900">
                {name}
              </h2>

              <p className="text-sm text-gray-500">
                {user.email}
              </p>
            </div>

          </div>

          {/* Form */}
          <form
            onSubmit={handleSave}
            className="space-y-5"
          >

            {/* Name */}
            <div>

              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Full Name
              </label>

              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-blue-500"
              />

            </div>

            {/* Email */}
            <div>

              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Email
              </label>

              <input
                type="email"
                value={user.email}
                disabled
                className="w-full cursor-not-allowed rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-500 outline-none"
              />

            </div>

            {/* Save */}
            <button
              type="submit"
              className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              Save Changes
            </button>

          </form>

        </div>

      </div>

    </main>
  )
}

export default Profile