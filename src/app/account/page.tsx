'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import type { Session } from 'next-auth';
import RatingStars from '@/components/RatingStars';
import { getUserStats, UserStats } from '../actions/getUserStats';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { getUserProjects, ProjectData } from '../actions/getUserProjects';
import ProjectCard from '@/components/ProjectCard';

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

  useEffect(() => {
    const fetchData = async () => {
      if (user.email) {
        try {
          const [userStats, userProjects] = await Promise.all([
            getUserStats(user.email),
            getUserProjects(user.email)
          ]);
          setStats(userStats);
          setProjects(userProjects);
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
    <div className="pt-32">
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
        <h3 className="text-2xl font-semibold mb-4">My Projects</h3>
        <div className="grid grid-cols-3 gap-4">
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
