import { useEffect, useState } from 'react'

const PROJECTS_API = 'http://localhost:5000/projects'
const TASKS_API = 'http://localhost:5000/tasks'

function Projects() {
  const [projects, setProjects] = useState([])
  const [tasks, setTasks] = useState([])

  const [projectName, setProjectName] = useState('')
  const [loading, setLoading] = useState(true)

  // Get projects and tasks from API
  useEffect(() => {
    async function fetchData() {
      try {
        const [projectsResponse, tasksResponse] = await Promise.all([
          fetch(PROJECTS_API),
          fetch(TASKS_API),
        ])

        const projectsData = await projectsResponse.json()
        const tasksData = await tasksResponse.json()

        setProjects(projectsData)
        setTasks(tasksData)
      } catch (error) {
        console.error('Error loading projects:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Add Project
  async function addProject(e) {
    e.preventDefault()

    if (!projectName.trim()) {
      return
    }

    const newProject = {
      name: projectName.trim(),
    }

    try {
      const response = await fetch(PROJECTS_API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProject),
      })

      const savedProject = await response.json()

      setProjects([...projects, savedProject])
      setProjectName('')
    } catch (error) {
      console.error('Error adding project:', error)
    }
  }

  // Delete Project
  async function deleteProject(id) {
    try {
      await fetch(`${PROJECTS_API}/${id}`, {
        method: 'DELETE',
      })

      setProjects(
        projects.filter((project) => project.id !== id)
      )
    } catch (error) {
      console.error('Error deleting project:', error)
    }
  }

  // Get tasks belonging to project
  function getProjectTasks(projectName) {
    return tasks.filter(
      (task) => task.project === projectName
    )
  }

  // Calculate project progress
  function getProjectProgress(projectName) {
    const projectTasks = getProjectTasks(projectName)

    if (projectTasks.length === 0) {
      return 0
    }

    const completedTasks = projectTasks.filter(
      (task) => task.status === 'Completed'
    ).length

    return Math.round(
      (completedTasks / projectTasks.length) * 100
    )
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">

      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-8">

          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            Project Management
          </p>

          <h1 className="mt-2 text-3xl font-bold text-gray-900">
            My Projects
          </h1>

          <p className="mt-2 text-gray-500">
            Manage all your projects in one place.
          </p>

        </div>

        {/* Add Project */}
        <form
          onSubmit={addProject}
          className="mb-8 flex flex-col gap-3 rounded-2xl border border-gray-200 bg-white p-5 sm:flex-row"
        >

          <input
            type="text"
            placeholder="Enter project name"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="flex-1 rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-blue-500"
          />

          <button
            type="submit"
            className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            Add Project
          </button>

        </form>

        {/* Loading */}
        {loading ? (

          <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center text-gray-500">
            Loading projects...
          </div>

        ) : (

          /* Project Grid */
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">

            {projects.length > 0 ? (

              projects.map((project) => {

                const projectTasks = getProjectTasks(project.name)
                const progress = getProjectProgress(project.name)

                return (
                  <div
                    key={project.id}
                    className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
                  >

                    {/* Project Header */}
                    <div className="flex items-start justify-between gap-4">

                      <div className="min-w-0">

                        <h2 className="break-words text-xl font-bold text-gray-900">
                          {project.name}
                        </h2>

                        <p className="mt-2 text-sm text-gray-500">
                          {projectTasks.length} tasks
                        </p>

                      </div>

                      <button
                        type="button"
                        onClick={() => deleteProject(project.id)}
                        className="shrink-0 text-sm font-semibold text-red-500 transition hover:text-red-600"
                      >
                        Delete
                      </button>

                    </div>

                    {/* Progress */}
                    <div className="mt-6">

                      <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">

                        <div
                          className="h-full rounded-full bg-blue-600 transition-all duration-300"
                          style={{
                            width: `${progress}%`,
                          }}
                        ></div>

                      </div>

                      <p className="mt-2 text-right text-sm font-medium text-gray-600">
                        {progress}%
                      </p>

                    </div>

                  </div>
                )
              })

            ) : (

              <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center text-gray-500 md:col-span-2 lg:col-span-3">
                No projects available.
              </div>

            )}

          </div>

        )}

      </div>

    </main>
  )
}

export default Projects