import { useEffect, useState } from 'react';

interface Project {
  _id: string;
  title: string;
  description: string;
  status: 'planning' | 'in_progress' | 'on_hold' | 'completed' | 'cancelled';
  tags: string[];
  metadata?: {
    budget?: number;
    timeline?: string;
    location?: string;
  };
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
  author: {
    name: string;
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

  return (
    <div className="space-y-8">
      {/* Projects */}
      <div className="mb-12">
        <div className="mb-2">
          <h2 className="text-2xl font-bold">Projects</h2>
        </div>
        <div className="text-xs flex space-x-4 mb-6">
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
              <h3 className="text-xl font-semibold mb-4 capitalize">{status.replace('_', ' ')}</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {statusProjects.map((project) => (
                  <div key={project._id} className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-semibold">{project.title}</h3>
                      <div className={`text-sm px-2 py-1 rounded-full ${
                        status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                        status === 'planning' ? 'bg-yellow-100 text-yellow-800' :
                        status === 'on_hold' ? 'bg-orange-100 text-orange-800' :
                        status === 'completed' ? 'bg-green-100 text-green-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {status.replace('_', ' ')}
                      </div>
                    </div>
                    <p className="text-gray-600 mb-4">{project.description}</p>
                    {project.metadata && (
                      <div className="text-sm text-gray-500">
                        {project.metadata.budget && (
                          <div>Budget: ${project.metadata.budget}</div>
                        )}
                        {project.metadata.timeline && (
                          <div>Timeline: {project.metadata.timeline}</div>
                        )}
                        {project.metadata.location && (
                          <div>Location: {project.metadata.location}</div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )
        ))}
      </div>

      {/* Reviews */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Reviews</h2>
        <div className="space-y-6">
          {reviews.map((review) => (
            <div key={review._id} className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold">{review.title}</h3>
                <div className="flex items-center gap-2">
                  <div className="text-sm">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={i < review.rating ? 'text-yellow-400' : 'text-gray-300'}>
                        ★
                      </span>
                    ))}
                  </div>
                  {review.isVerified && (
                    <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">
                      Verified
                    </span>
                  )}
                </div>
              </div>
              <p className="text-gray-600 mb-2">{review.content}</p>
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>{review.author.name}</span>
                <span>{new Date(review.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="mt-2 text-sm text-gray-500">
                {review.helpful.count} people found this helpful
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
