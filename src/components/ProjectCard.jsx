function ProjectCard({ name, tasks, progress }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">

      <h3 className="font-semibold text-gray-900">
        {name}
      </h3>

      <p className="mt-2 text-sm text-gray-500">
        {tasks} tasks
      </p>

      <div className="mt-5 h-2 rounded-full bg-gray-100">
        <div
          className="h-2 rounded-full bg-blue-600"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <p className="mt-2 text-right text-sm font-medium text-gray-600">
        {progress}%
      </p>

    </div>
  )
}

export default ProjectCard