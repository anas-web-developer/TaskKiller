import { useEffect, useState } from 'react'

function Settings() {
  const [notifications, setNotifications] = useState(() => {
    return localStorage.getItem('notifications') !== 'false'
  })

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true'
  })

  const [saved, setSaved] = useState(false)

  useEffect(() => {
    localStorage.setItem('notifications', notifications)
  }, [notifications])

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode)

    if (darkMode) {
      document.body.classList.add('dark')
      document.body.style.backgroundColor = '#111827'
    } else {
      document.body.classList.remove('dark')
      document.body.style.backgroundColor = '#f9fafb'
    }
  }, [darkMode])

  function handleSave() {
    setSaved(true)

    setTimeout(() => {
      setSaved(false)
    }, 2000)
  }

  return (
    <main
      className={`min-h-screen px-4 py-10 transition-colors sm:px-6 lg:px-8 ${
        darkMode
          ? 'bg-gray-950 text-white'
          : 'bg-gray-50 text-gray-900'
      }`}
    >

      <div className="mx-auto max-w-3xl">

        {/* Header */}
        <div className="mb-8">

          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            Preferences
          </p>

          <h1
            className={`mt-2 text-3xl font-bold ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}
          >
            Settings
          </h1>

          <p
            className={`mt-2 ${
              darkMode ? 'text-gray-400' : 'text-gray-500'
            }`}
          >
            Manage your TaskKiller preferences.
          </p>

        </div>

        {/* Settings Card */}
        <div
          className={`rounded-2xl border shadow-sm transition-colors ${
            darkMode
              ? 'border-gray-700 bg-gray-900'
              : 'border-gray-200 bg-white'
          }`}
        >

          {/* Notifications */}
          <div
            className={`flex items-center justify-between gap-6 border-b p-6 ${
              darkMode
                ? 'border-gray-700'
                : 'border-gray-200'
            }`}
          >

            <div>

              <h2
                className={`font-semibold ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}
              >
                Notifications
              </h2>

              <p
                className={`mt-1 text-sm ${
                  darkMode ? 'text-gray-400' : 'text-gray-500'
                }`}
              >
                Receive notifications about your tasks.
              </p>

            </div>

            <button
              type="button"
              onClick={() => setNotifications(!notifications)}
              className={`relative h-6 w-11 shrink-0 rounded-full transition ${
                notifications
                  ? 'bg-blue-600'
                  : 'bg-gray-300'
              }`}
            >
              <span
                className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
                  notifications
                    ? 'left-6'
                    : 'left-1'
                }`}
              ></span>
            </button>

          </div>

          {/* Dark Mode */}
          <div
            className={`flex items-center justify-between gap-6 border-b p-6 ${
              darkMode
                ? 'border-gray-700'
                : 'border-gray-200'
            }`}
          >

            <div>

              <h2
                className={`font-semibold ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}
              >
                Dark Mode
              </h2>

              <p
                className={`mt-1 text-sm ${
                  darkMode ? 'text-gray-400' : 'text-gray-500'
                }`}
              >
                Use a darker appearance for the app.
              </p>

            </div>

            <button
              type="button"
              onClick={() => setDarkMode(!darkMode)}
              className={`relative h-6 w-11 shrink-0 rounded-full transition ${
                darkMode
                  ? 'bg-blue-600'
                  : 'bg-gray-300'
              }`}
            >
              <span
                className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
                  darkMode
                    ? 'left-6'
                    : 'left-1'
                }`}
              ></span>
            </button>

          </div>

          {/* Account */}
          <div className="p-6">

            <h2
              className={`font-semibold ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}
            >
              Account
            </h2>

            <p
              className={`mt-1 text-sm ${
                darkMode ? 'text-gray-400' : 'text-gray-500'
              }`}
            >
              Your account preferences are saved on this device.
            </p>

            <button
              type="button"
              onClick={handleSave}
              className="mt-5 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              Save Settings
            </button>

            {saved && (
              <p className="mt-3 text-sm font-medium text-green-500">
                Settings saved successfully!
              </p>
            )}

          </div>

        </div>

      </div>

    </main>
  )
}

export default Settings