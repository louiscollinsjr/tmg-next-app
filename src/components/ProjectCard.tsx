'use client'

import { ProjectData } from '@/app/actions/getUserProjects'
import { formatDistanceToNow } from 'date-fns'
import { ArchiveBoxArrowDownIcon } from '@heroicons/react/24/outline'

interface ProjectCardProps {
  project: ProjectData
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const statusColors = {
    open: 'bg-green-100 text-green-800',
    inProgress: 'bg-blue-100 text-blue-800',
    completed: 'bg-gray-100 text-gray-800',
    cancelled: 'bg-red-100 text-red-800'
  }

  const statusColor = statusColors[project.status as keyof typeof statusColors] || statusColors.open

  return (
    <div className="bg-[#f2f3EE] rounded-lg p-6 hover:shadow-md transition-shadow relative">
      <button 
        className="absolute top-3 right-3 p-1.5 hover:bg-gray-100 rounded-full transition-colors"
        title="Archive project"
      >
        <ArchiveBoxArrowDownIcon className="w-4 h-4 text-gray-500" />
      </button>
      <div className="flex justify-between items-start mb-4 text-[#64635f">
        <div>
          <h3 className="text-sm font-semibold mb-2">{project.title}</h3>
          <p className="text-xs text-[#64635f] line-clamp-2 mb-3">{project.description}</p>
        </div>
        {project.imageUrl && (
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-20 h-20 object-cover rounded-lg"
          />
        )}
      </div>

      <div className="flex justify-between items-center text-sm">
       
        <div className="flex items-center gap-3">
          <span className={`py-1 rounded-full text-xs font-medium capitalize  text-[#64635f]`}>
            {project.status || '--'}
          </span>
          <span className="text-xs text-[#64635f]">
            {formatDistanceToNow(new Date(project.createdAt), { addSuffix: true })}
          </span>
        </div>
      </div>
    </div>
  )
}

export default ProjectCard
