import { useEffect, useState } from 'react'

const API_URL = 'http://localhost:5000/tasks'

function TaskGrid() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchTasks() {
      try {
        const response = await fetch(API_URL)
        const data = await response.json()

        setTasks(data)
      } catch (error) {
        console.error('Error loading recent tasks:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchTasks()
  }, [])

  const recentTasks = tasks.slice(-5).reverse()

  return (
    <section className="bg-gray-50 py-12">

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="mb-6 flex items-center justify-between">

          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
              Tasks
            </p>

            <h2 className="mt-1 text-2xl font-bold text-gray-900">
              Recent Tasks
            </h2>
          </div>

          <a
            href="/tasks"
            className="text-sm font-semibold text-blue-600 transition hover:text-blue-700"
          >
            View All
          </a>

        </div>

        {/* Table */}
        <div className="w-full overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

          <table className="w-full table-fixed">

            <thead className="border-b border-gray-200 bg-gray-50">

              <tr>

                <th className="w-[30%] px-2 py-3 text-left text-[10px] font-semibold uppercase tracking-wide text-gray-500 sm:px-6 sm:py-4 sm:text-xs">
                  Task
                </th>

                <th className="w-[20%] px-2 py-3 text-left text-[10px] font-semibold uppercase tracking-wide text-gray-500 sm:px-6 sm:py-4 sm:text-xs">
                  Project
                </th>

                <th className="w-[22%] px-2 py-3 text-left text-[10px] font-semibold uppercase tracking-wide text-gray-500 sm:px-6 sm:py-4 sm:text-xs">
                  Status
                </th>

                <th className="w-[18%] px-2 py-3 text-left text-[10px] font-semibold uppercase tracking-wide text-gray-500 sm:px-6 sm:py-4 sm:text-xs">
                  Due
                </th>

                <th className="w-[10%] px-2 py-3 text-right text-[10px] font-semibold uppercase tracking-wide text-gray-500 sm:px-6 sm:py-4 sm:text-xs">
                  Action
                </th>

              </tr>

            </thead>

            <tbody className="divide-y divide-gray-100">

              {loading ? (

                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-10 text-center text-sm text-gray-500"
                  >
                    Loading tasks...
                  </td>
                </tr>

              ) : recentTasks.length > 0 ? (

                recentTasks.map((task) => (

                  <tr
                    key={task.id}
                    className="transition hover:bg-gray-50"
                  >

                    {/* Task */}
                    <td className="break-words px-2 py-4 text-xs font-semibold leading-4 text-gray-900 sm:px-6 sm:py-5 sm:text-sm">
                      {task.title}
                    </td>

                    {/* Project */}
                    <td className="break-words px-2 py-4 text-xs text-gray-500 sm:px-6 sm:py-5 sm:text-sm">
                      {task.project}
                    </td>

                    {/* Status */}
                    <td className="px-2 py-4 sm:px-6 sm:py-5">

                      <span
                        className={
                          task.status === 'Completed'
                            ? 'inline-flex whitespace-nowrap rounded-full bg-green-100 px-2 py-1 text-[9px] font-semibold text-green-700 sm:px-3 sm:text-xs'
                            : task.status === 'In Progress'
                              ? 'inline-flex whitespace-nowrap rounded-full bg-blue-100 px-2 py-1 text-[9px] font-semibold text-blue-700 sm:px-3 sm:text-xs'
                              : 'inline-flex whitespace-nowrap rounded-full bg-orange-100 px-2 py-1 text-[9px] font-semibold text-orange-700 sm:px-3 sm:text-xs'
                        }
                      >
                        {task.status}
                      </span>

                    </td>

                    {/* Due */}
                    <td className="px-2 py-4 text-xs text-gray-500 sm:px-6 sm:py-5 sm:text-sm">
                      {task.dueDate}
                    </td>

                    {/* Action */}
                    <td className="px-2 py-4 text-right sm:px-6 sm:py-5">

                      <button
                        type="button"
                        className="font-bold text-gray-400 transition hover:text-gray-900"
                      >
                        ...
                      </button>

                    </td>

                  </tr>

                ))

              ) : (

                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-10 text-center text-sm text-gray-500"
                  >
                    No tasks available.
                  </td>
                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>

    </section>
  )
}

export default TaskGrid