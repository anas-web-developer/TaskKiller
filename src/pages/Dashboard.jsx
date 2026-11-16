import { useEffect, useState } from 'react'

import StatCard from '../components/StatCard'
import TaskGrid from '../components/TaskGrid'

const API_URL = 'http://localhost:5000/tasks'

function Dashboard() {
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    async function fetchTasks() {
      try {
        const response = await fetch(API_URL)
        const data = await response.json()

        setTasks(data)
      } catch (error) {
        console.error('Error loading dashboard tasks:', error)
      }
    }

    fetchTasks()
  }, [])

  const totalTasks = tasks.length

  const completedTasks = tasks.filter(
    (task) => task.status === 'Completed'
  ).length

  const inProgressTasks = tasks.filter(
    (task) => task.status === 'In Progress'
  ).length

  const pendingTasks = tasks.filter(
    (task) => task.status === 'Pending'
  ).length

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">

      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-8">

          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            Dashboard
          </p>

          <h1 className="mt-2 text-3xl font-bold text-gray-900">
            Welcome to TaskKiller
          </h1>

          <p className="mt-2 text-gray-500">
            Manage your tasks and projects from one place.
          </p>

        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">

          <StatCard
            title="Total Tasks"
            value={totalTasks}
            description="All your tasks"
          />

          <StatCard
            title="Completed"
            value={completedTasks}
            description="Tasks completed"
          />

          <StatCard
            title="In Progress"
            value={inProgressTasks}
            description="Currently working"
          />

          <StatCard
            title="Pending"
            value={pendingTasks}
            description="Waiting to start"
          />

        </div>

        {/* Recent Tasks */}
        <div className="mt-10">
          <TaskGrid />
        </div>

      </div>

    </main>
  )
}

export default Dashboard