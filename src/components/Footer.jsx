function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white">

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              TaskKiller
            </h2>

            <p className="mt-3 text-sm leading-6 text-gray-500">
              Manage your tasks, Projects and team in one place.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-semibold text-gray-900">
              Product
            </h3>

            <div className="mt-4 flex flex-col gap-3">

              <a
                href="/tasks"
                className="text-sm text-gray-500 hover:text-blue-600"
              >
                Tasks
              </a>

              <a
                href="/Projects"
                className="text-sm text-gray-500 hover:text-blue-600"
              >
                Projects
              </a>

              <a
                href="/calendar"
                className="text-sm text-gray-500 hover:text-blue-600"
              >
                Calendar
              </a>

            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-gray-900">
              Company
            </h3>

            <div className="mt-4 flex flex-col gap-3">

              <a
                href="/about"
                className="text-sm text-gray-500 hover:text-blue-600"
              >
                About
              </a>

              <a
                href="/team"
                className="text-sm text-gray-500 hover:text-blue-600"
              >
                Team
              </a>

              <a
                href="/contact"
                className="text-sm text-gray-500 hover:text-blue-600"
              >
                Contact
              </a>

            </div>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-gray-900">
              Support
            </h3>

            <div className="mt-4 flex flex-col gap-3">

              <a
                href="/help"
                className="text-sm text-gray-500 hover:text-blue-600"
              >
                Help Center
              </a>

              <a
                href="/privacy"
                className="text-sm text-gray-500 hover:text-blue-600"
              >
                Privacy
              </a>

              <a
                href="/terms"
                className="text-sm text-gray-500 hover:text-blue-600"
              >
                Terms
              </a>

            </div>
          </div>

        </div>

        <div className="mt-10 border-t border-gray-200 pt-6">

          <p className="text-center text-sm text-gray-500">
            © 2026 TaskKiller. All rights reserved.
          </p>

        </div>

      </div>

    </footer>
  )
}

export default Footer