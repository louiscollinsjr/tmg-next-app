import { useEffect, useState } from 'react';

interface Project {
  _id: string;
  title: string;
  description: string;
  owner: {
    _id: string;
    name?: string;
  };
  professional: {
    _id: string;
    name?: string;
    companyName?: string;
  };
  status: 'planning' | 'in_progress' | 'on_hold' | 'completed' | 'cancelled';
  tags: string[];
  metadata?: {
    budget?: number;
    timeline?: string;
    location?: string;
  };
  images: string[];
  createdAt: string;
  updatedAt: string;
}

interface Review {
  _id: string;
  rating: number;
  title: string;
  content: string;
  isVerified: boolean;
  helpful: {
    count: number;
    users: string[];
  };
  professional: {
    name: string;
    companyName: string;
  };
  createdAt: string;
}

interface ProfileData {
  user: any;
  projects: Project[];
  reviews: Review[];
}

export default function ProfileContent({ userId }: { userId: string }) {
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch(`/api/users/${userId}/profile`);
        if (!response.ok) {
          throw new Error('Failed to fetch profile data');
        }
        const data = await response.json();
        setProfileData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchProfileData();
    } else {
      setError('No user ID provided');
      setLoading(false);
    }
  }, [userId]);

  if (loading) {
    return <div className="animate-pulse">Loading profile data...</div>;
  }

  if (error) {
    return (
      <div className="text-red-600 p-4">
        {error}
      </div>
    );
  }

  if (!profileData) {
    return <div>No profile data found</div>;
  }

  const { projects, reviews } = profileData;

  // Group projects by status
  const projectsByStatus = {
    in_progress: projects.filter(p => p.status === 'in_progress'),
    planning: projects.filter(p => p.status === 'planning'),
    on_hold: projects.filter(p => p.status === 'on_hold'),
    completed: projects.filter(p => p.status === 'completed'),
    cancelled: projects.filter(p => p.status === 'cancelled')
  };

  const formatStatus = (status: string): string => {
    const statusMap: { [key: string]: string } = {
      in_progress: 'IN PROGRESS',
      on_hold: 'ON HOLD',
      planning: 'PLANNING',
      completed: 'COMPLETED',
      cancelled: 'CANCELLED'
    };
    return statusMap[status] || status.toUpperCase();
  };

  return (
    <div className="space-y-8">
      {/* Projects */}
      <div className="mb-12 pt-8">
        <div className="mb-2 pl-2">
          <h2 className="text-2xl font-bold">Your Projects</h2>
        </div>
        <div className="text-xs flex space-x-4 mb-6  pl-2">
          <div>
            <span className="text-gray-500">In Progress:</span>
            <span className="text-black ml-1">{projectsByStatus.in_progress.length}</span>
          </div>
          <div>
            <span className="text-gray-500">Planning:</span>
            <span className="text-black ml-1">{projectsByStatus.planning.length}</span>
          </div>
          <div>
            <span className="text-gray-500">On Hold:</span>
            <span className="text-black ml-1">{projectsByStatus.on_hold.length}</span>
          </div>
          <div>
            <span className="text-gray-500">Completed:</span>
            <span className="text-black ml-1">{projectsByStatus.completed.length}</span>
          </div>
        </div>

        {Object.entries(projectsByStatus).map(([status, statusProjects]) => (
          statusProjects.length > 0 && (
            <div key={status} className="mb-8">
              <div className="space-y-4">
                {statusProjects.map((project) => (
                  <div key={project._id} className="py-2">
                    <div className="text-lg font-semibold">{project.title}</div>
                    <div className="text-xs text-gray-500 mt-1">{formatStatus(status)}</div>
                    <div className="text-xs text-gray-500 mt-1">
                      {project.professional?.name || project.professional?.companyName}
                    </div>
                    <div className="text-sm mt-1">{project.description}</div>
                    <div className="text-xs mt-1">
                      <span className="text-gray-500">Budget:</span>
                      <span className="text-black ml-1">${project.metadata?.budget}</span>
                      <span className="mx-2 text-gray-300">|</span>
                      <span className="text-gray-500">Timeline:</span>
                      <span className="text-black ml-1">{project.metadata?.timeline}</span>
                      <span className="mx-2 text-gray-300">|</span>
                      <span className="text-gray-500">Location:</span>
                      <span className="text-black ml-1">{project.metadata?.location}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        ))}
      </div>

      {/* Reviews */}
      <div>
        <div className="mb-1 pl-2">
          <h2 className="text-2xl font-bold">Your Reviews</h2>
        </div>
        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review._id} className="py-8 space-y-2">
              <div className="flex items-center">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`h-5 w-5 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <div className="ml-2 font-semibold">{review.title}</div>
              </div>
              <div className="text-xs text-gray-500">
                {/* Review for {review.professional.name || review.professional.companyName} • {new Date(review.createdAt).toLocaleDateString()} */}
              </div>
              <div className="text-sm">{review.content}</div>
              <div className="text-xs text-gray-500">
                {review.helpful.count} {review.helpful.count === 1 ? 'person' : 'people'} found this review helpful
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
