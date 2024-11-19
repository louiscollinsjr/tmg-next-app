import { Suspense } from 'react';
import dbConnect from '@/lib/db/mongodb';
import User from '@/lib/models/User';
import Project from '@/lib/models/Project';
import Review from '@/lib/models/Review';

async function getUserProfile(userId: string) {
  await dbConnect();
  
  // Fetch user data
  const user = await User.findById(userId).select('-__v');
  if (!user) return null;

  // Fetch user's projects
  const projects = await Project.find({ owner: userId })
    .select('-__v')
    .sort({ createdAt: -1 });

  // Fetch reviews for user's projects
  const reviews = await Review.find({
    project: { $in: projects.map(p => p._id) }
  })
    .populate('author', 'name')
    .select('-__v')
    .sort({ createdAt: -1 });

  return {
    user,
    projects,
    reviews
  };
}

async function ProfileContent({ userId }: { userId: string }) {
  const profile = await getUserProfile(userId);
  
  if (!profile) {
    return <div>User not found</div>;
  }

  const { user, projects, reviews } = profile;

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* User Info */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">{user.name}</h1>
        {user.isPro && (
          <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full inline-block mb-4">
            PRO
          </div>
        )}
        {user.business && (
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">{user.business.name}</h2>
            <p>{user.business.description}</p>
          </div>
        )}
      </div>

      {/* Projects */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((project) => (
            <div key={project._id} className="border rounded-lg p-4">
              <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
              <p className="text-gray-600">{project.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Reviews */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Reviews</h2>
        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review._id} className="border rounded-lg p-4">
              <div className="flex items-center mb-2">
                <span className="text-yellow-500">{'★'.repeat(review.rating)}</span>
                <span className="text-gray-300">{'★'.repeat(5 - review.rating)}</span>
              </div>
              <h3 className="font-semibold mb-1">{review.title}</h3>
              <p className="text-gray-600">{review.content}</p>
              <p className="text-sm text-gray-500 mt-2">
                By {(review.author as any).name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ProfilePage({
  params,
}: {
  params: { userId: string };
}) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProfileContent userId={params.userId} />
    </Suspense>
  );
}
