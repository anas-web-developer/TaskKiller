import { useEffect, useState } from 'react'

const API_URL = 'http://localhost:5000/tasks'

function Tasks() {
  const [tasks, setTasks] = useState([])

  const [title, setTitle] = useState('')
  const [project, setProject] = useState('')
  const [status, setStatus] = useState('Pending')
  const [dueDate, setDueDate] = useState('')

  const [editingId, setEditingId] = useState(null)

  const [search, setSearch] = useState(() => {
    const params = new URLSearchParams(window.location.search)

    return params.get('search') || ''
  })

  const [filterStatus, setFilterStatus] = useState('All')

  const [loading, setLoading] = useState(true)

  // Get tasks from API
  useEffect(() => {
    async function fetchTasks() {
      try {
        const response = await fetch(API_URL)
        const data = await response.json()

        setTasks(data)
      } catch (error) {
        console.error('Error loading tasks:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchTasks()
  }, [])

  // Add or Update Task
  async function handleSubmit(e) {
    e.preventDefault()

    if (!title || !project || !dueDate) {
      alert('Please fill all fields.')
      return
    }

    const taskData = {
      title,
      project,
      status,
      dueDate,
    }

    try {
      if (editingId !== null) {
        const response = await fetch(`${API_URL}/${editingId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(taskData),
        })

        const updatedTask = await response.json()

        setTasks(
          tasks.map((task) =>
            task.id === editingId ? updatedTask : task
          )
        )

        setEditingId(null)
      } else {
        const response = await fetch(API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(taskData),
        })

        const newTask = await response.json()

        setTasks([...tasks, newTask])
      }

      setTitle('')
      setProject('')
      setStatus('Pending')
      setDueDate('')
    } catch (error) {
      console.error('Error saving task:', error)
    }
  }

  // Edit Task
  function handleEdit(task) {
    setTitle(task.title)
    setProject(task.project)
    setStatus(task.status)
    setDueDate(task.dueDate)

    setEditingId(task.id)
  }

  // Delete Task
  async function handleDelete(id) {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      })

      setTasks(
        tasks.filter((task) => task.id !== id)
      )
    } catch (error) {
      console.error('Error deleting task:', error)
    }
  }

  // Search + Filter
  const filteredTasks = tasks.filter((task) => {

    const searchText = search.toLowerCase()

    const matchesSearch =
      task.title.toLowerCase().includes(searchText) ||
      task.project.toLowerCase().includes(searchText)

    const matchesStatus =
      filterStatus === 'All' ||
      task.status === filterStatus

    return matchesSearch && matchesStatus
  })

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">

      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-8">

          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            Task Management
          </p>

          <h1 className="mt-2 text-3xl font-bold text-gray-900">
            All Tasks
          </h1>

          <p className="mt-2 text-gray-500">
            Create, manage and track your tasks.
          </p>

        </div>

        {/* Search + Filter */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row">

          <input
            type="text"
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none focus:border-blue-500"
          />

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none focus:border-blue-500"
          >
            <option value="All">All Status</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>

        </div>

        {/* Add / Edit Task */}
        <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

          <h2 className="text-xl font-bold text-gray-900">
            {editingId !== null ? 'Edit Task' : 'Add New Task'}
          </h2>

          <form
            onSubmit={handleSubmit}
            className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2"
          >

            <input
              type="text"
              placeholder="Task title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-blue-500"
            />

            <input
              type="text"
              placeholder="Project name"
              value={project}
              onChange={(e) => setProject(e.target.value)}
              className="rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-blue-500"
            />

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-blue-500"
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>

            <input
              type="text"
              placeholder="Due date e.g. Oct 25"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-blue-500"
            />

            <button
              type="submit"
              className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 md:col-span-2"
            >
              {editingId !== null ? 'Update Task' : 'Add Task'}
            </button>

          </form>

        </div>

        {/* Tasks Table */}
        <div className="w-full overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

          <table className="w-full table-fixed">

            <thead className="border-b border-gray-200 bg-gray-50">

              <tr>

                <th className="w-[28%] px-2 py-3 text-left text-[10px] font-semibold uppercase tracking-wide text-gray-500 sm:px-6 sm:py-4 sm:text-xs">
                  Task
                </th>

                <th className="w-[20%] px-2 py-3 text-left text-[10px] font-semibold uppercase tracking-wide text-gray-500 sm:px-6 sm:py-4 sm:text-xs">
                  Project
                </th>

                <th className="w-[22%] px-2 py-3 text-left text-[10px] font-semibold uppercase tracking-wide text-gray-500 sm:px-6 sm:py-4 sm:text-xs">
                  Status
                </th>

                <th className="w-[15%] px-2 py-3 text-left text-[10px] font-semibold uppercase tracking-wide text-gray-500 sm:px-6 sm:py-4 sm:text-xs">
                  Due
                </th>

                <th className="w-[15%] px-2 py-3 text-right text-[10px] font-semibold uppercase tracking-wide text-gray-500 sm:px-6 sm:py-4 sm:text-xs">
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

              ) : filteredTasks.length > 0 ? (

                filteredTasks.map((task) => (

                  <tr
                    key={task.id}
                    className="transition hover:bg-gray-50"
                  >

                    <td className="break-words px-2 py-4 text-xs font-semibold leading-4 text-gray-900 sm:px-6 sm:py-5 sm:text-sm">
                      {task.title}
                    </td>

                    <td className="break-words px-2 py-4 text-xs text-gray-500 sm:px-6 sm:py-5 sm:text-sm">
                      {task.project}
                    </td>

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

                    <td className="px-2 py-4 text-xs text-gray-500 sm:px-6 sm:py-5 sm:text-sm">
                      {task.dueDate}
                    </td>

                    <td className="px-2 py-4 text-right sm:px-6 sm:py-5">

                      <div className="flex justify-end gap-2">

                        <button
                          type="button"
                          onClick={() => handleEdit(task)}
                          className="text-xs font-semibold text-blue-600 hover:text-blue-700 sm:text-sm"
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDelete(task.id)}
                          className="text-xs font-semibold text-red-500 hover:text-red-600 sm:text-sm"
                        >
                          Delete
                        </button>

                      </div>

                    </td>

                  </tr>

                ))

              ) : (

                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-10 text-center text-sm text-gray-500"
                  >
                    No tasks found.
                  </td>
                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>

    </main>
  )
}

export default Tasks