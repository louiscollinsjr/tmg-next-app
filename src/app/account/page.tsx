'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import type { Session } from 'next-auth';
import RatingStars from '@/components/RatingStars';
import { getUserStats, UserStats } from '@/app/actions/getUserStats';
import { getUserProjects, ProjectData } from '@/app/actions/getUserProjects';
import { getUserReviews, ReviewData } from '@/app/actions/getUserReviews';
import ProjectCard from '@/components/ProjectCard';
import ReviewCard from '@/components/ReviewCard';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

interface ExtendedSession extends Session {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    id?: string;
    _id?: string;
  }
}

interface ExtendedUserStats extends UserStats {
  isPro: boolean;
}

const ProfileCard = ({ user }: { user: ExtendedSession['user'] }) => {
  const [stats, setStats] = useState<ExtendedUserStats>({
    projectCount: 0,
    reviewCount: 0,
    averageRating: 0,
    isPro: false
  });
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [reviews, setReviews] = useState<ReviewData[]>([]);
  const session = useSession();

  useEffect(() => {
    const fetchData = async () => {
      if (user.email) {
        try {
          console.log('Fetching data for user:', user.email); // Debug log
          const [userStats, userProjects, userReviews] = await Promise.all([
            getUserStats(user.email),
            getUserProjects(user.email),
            getUserReviews(user.email)
          ]);
          console.log('Fetched reviews:', userReviews); // Debug log
          setStats(userStats);
          setProjects(userProjects);
          setReviews(userReviews);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };
    fetchData();
  }, [user.email]);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="md:pt-32 px-2">
      <div className="rounded-2xl p-1 shadow-sm">
        <div className="flex items-center space-x-4">
          <div className="relative pt-3">
            {user.image ? (
              <img
                src={user.image}
                alt={user.name || ''}
                className="w-16 h-16 rounded-full"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center text-xl font-semibold">
                {user.name ? getInitials(user.name) : '??'}
              </div>
            )}
          </div>
          <div>
            <div className="mt-4">
              <div className="flex items-center gap-2">
                <h2 className="text-3xl font-semibold pr-4">{user.name || 'Anonymous User'}</h2>
                {stats.isPro && (
                  <div className="flex items-center gap-1 bg-black text-white font-bold text-xs px-4 py-1 rounded-full">
                    <span>TMG Verified Pro</span>
                    <div className="bg-green-500 rounded-full p-0.5">
                      <CheckCircleIcon className="w-3 h-3 text-white" />
                    </div>
                  </div>
                )}
              </div>
              <p className="text-gray-600 text-sm">{user.email || ''}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-6 p-4 text-xs md:w-[35%]">
          <div className="text-left">
          <div className="text-gray-600">Projects</div>
            <div className="text-lg font-bold">{stats.projectCount}</div>
            
          </div>
          <div className="text-left">
          <div className="text-gray-600">Reviews</div>
          <div className="text-lg font-bold">{stats.reviewCount}</div>
          </div>
          <div className="text-left">
          <div className="text-gray-600">Rating</div>
            <div className="flex justify-left text-base">
              <div className='pt-1'> <RatingStars rating={stats.averageRating} size='sm' /></div>
              <span className='ml-2 font-semibold text-base'>{stats.averageRating}</span>
            </div>
           
          </div>
        </div>
      </div>

      {/* Projects Section */}
      <div className="mt-8">
        <h3 className="text-2xl font-semibold mb-8">My Projects</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2">
          {projects.length > 0 ? (
            projects.map(project => (
              <ProjectCard key={project._id} project={project} />
            ))
          ) : (
            <p className="text-gray-500 text-center py-8">
              No projects yet. Start creating your first project!
            </p>
          )}
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-12">
        <h3 className="text-2xl font-semibold mb-8">My Reviews</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2">
          {reviews && reviews.length > 0 ? (
            reviews.map(review => (
              <ReviewCard 
                key={review._id} 
                review={review}
                userName={session?.data?.user?.name || 'Anonymous User'}
              />
            ))
          ) : (
            <div className="col-span-full">
              <p className="text-gray-500 text-center py-8">
                No reviews yet. Start reviewing projects to build your reputation!
              </p>
            </div>
          )}
        </div>
      </div>
      
    </div>
  );
};

const AccountPage = () => {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.push('/');
    }
  }, [session, router]);

  if (!session) {
    return null;
  }

  return (
    <div>
      <Navigation />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-[61.25rem] mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <ProfileCard user={session?.user || {}} />
        </div>
        
      </div>
      <Footer />
    </div>
  );
};

export default AccountPage;
