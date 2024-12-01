'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ProfileContent from '@/components/ProfileContent';
import type { Session } from 'next-auth';

// Extend the built-in session types
interface ExtendedSession extends Session {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    id?: string;
    isPro?: boolean;
  }
}

export default function AccountPage() {
  const { data: session, status } = useSession() as { 
    data: ExtendedSession | null;
    status: "loading" | "authenticated" | "unauthenticated";
  };
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('profile');
  
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex flex-col bg-zinc-50 font-roboto">
        <Navigation />
        <div className="flex-grow w-full">
          <div className="text-black max-w-[61.25rem] mx-auto px-4 sm:px-6 lg:px-8 py-8">Loading...</div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50 font-roboto">
      <Navigation />
      <div className="flex-grow w-full bg-zinc-50 pt-32">
        <div className="h-full">
          <div className="bg-zinc-50 h-full">
            {/* Header */}
            <div className="bg-zinc-50 text-black">
              <div className="max-w-[61.25rem] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="py-4">
                  <h1 className="text-2xl font-semibold">Account Settings</h1>
                </div>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="bg-zinc-50">
              <div className="max-w-[61.25rem] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="border-b border-gray-200">
                  <nav className="-mb-px flex space-x-8">
                    <button
                      onClick={() => setActiveTab('profile')}
                      className={`${
                        activeTab === 'profile'
                          ? 'border-black text-black'
                          : 'border-transparent text-gray-600 hover:text-black hover:border-gray-300'
                      } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                    >
                      Profile
                    </button>
                    <button
                      onClick={() => setActiveTab('security')}
                      className={`${
                        activeTab === 'security'
                          ? 'border-black text-black'
                          : 'border-transparent text-gray-600 hover:text-black hover:border-gray-300'
                      } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                    >
                      Security
                    </button>
                    <button
                      onClick={() => setActiveTab('notifications')}
                      className={`${
                        activeTab === 'notifications'
                          ? 'border-black text-black'
                          : 'border-transparent text-gray-600 hover:text-black hover:border-gray-300'
                      } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                    >
                      Notifications
                    </button>
                  </nav>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="max-w-[61.25rem] mx-auto px-4 sm:px-6 lg:px-8 py-8">
              {activeTab === 'profile' && session?.user?.email && (
                <div className="bg-white rounded-lg p-6">
                  {/* Basic Profile Info */}
                  <div className="space-y-6 mb-8">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        defaultValue={session?.user?.name || ''}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        defaultValue={session?.user?.email || ''}
                        disabled
                        className="mt-1 block w-full rounded-md border-gray-300 bg-gray-100 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                      />
                    </div>
                    <div>
                      <button
                        type="button"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                  <ProfileContent userId={session.user.email} />
                </div>
              )}
              
              {activeTab === 'security' && (
                <div className="bg-white rounded-lg p-6">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">Change Password</h3>
                      <p className="mt-1 text-sm text-gray-500">
                        Update your password to maintain account security
                      </p>
                      <div className="mt-4 space-y-4">
                        <div>
                          <label htmlFor="current-password" className="block text-sm font-medium text-gray-700">
                            Current Password
                          </label>
                          <input
                            type="password"
                            name="current-password"
                            id="current-password"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                          />
                        </div>
                        <div>
                          <label htmlFor="new-password" className="block text-sm font-medium text-gray-700">
                            New Password
                          </label>
                          <input
                            type="password"
                            name="new-password"
                            id="new-password"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                          />
                        </div>
                        <div>
                          <button
                            type="button"
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                          >
                            Update Password
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="pt-6 border-t border-gray-200">
                      <h3 className="text-lg font-medium text-gray-900">Two-Factor Authentication</h3>
                      <p className="mt-1 text-sm text-gray-500">
                        Add an extra layer of security to your account
                      </p>
                      <div className="mt-4">
                        <button
                          type="button"
                          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                        >
                          Enable 2FA
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'notifications' && (
                <div className="bg-white rounded-lg p-6">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">Email Notifications</h3>
                      <p className="mt-1 text-sm text-gray-500">
                        Manage your email notification preferences
                      </p>
                      <div className="mt-4 space-y-4">
                        <div className="flex items-center">
                          <input
                            id="notifications-updates"
                            name="notifications-updates"
                            type="checkbox"
                            className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                          />
                          <label htmlFor="notifications-updates" className="ml-3 text-sm text-gray-700">
                            Product updates and announcements
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            id="notifications-security"
                            name="notifications-security"
                            type="checkbox"
                            defaultChecked
                            className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                          />
                          <label htmlFor="notifications-security" className="ml-3 text-sm text-gray-700">
                            Security alerts
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            id="notifications-marketing"
                            name="notifications-marketing"
                            type="checkbox"
                            className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                          />
                          <label htmlFor="notifications-marketing" className="ml-3 text-sm text-gray-700">
                            Marketing communications
                          </label>
                        </div>
                      </div>
                      <div className="mt-6">
                        <button
                          type="button"
                          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                        >
                          Save Preferences
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
