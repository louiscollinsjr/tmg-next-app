'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export default function AccountPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('profile');
  
  // Redirect if not authenticated
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex flex-col bg-primary">
        <Navigation />
        <div className="flex-grow w-full">
          <div className="animate-pulse text-white max-w-[61.25rem] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16">Loading...</div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-primary">
      <Navigation />
      <div className="flex-grow w-full bg-primary pt-32">
        <div className="h-full">
          <div className="bg-white h-full">
            {/* Header */}
            <div className="bg-primary text-white">
              <div className="max-w-[61.25rem] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="py-4">
                  <h1 className="text-2xl font-semibold">Account Settings</h1>
                </div>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="bg-primary">
              <div className="max-w-[61.25rem] mx-auto px-4 sm:px-6 lg:px-8">
                <nav className="flex -mb-px">
                  <button
                    onClick={() => setActiveTab('profile')}
                    className={`px-6 py-3 text-sm font-medium ${
                      activeTab === 'profile'
                        ? 'border-b-2 border-white text-white'
                        : 'text-[#d1d1d1] hover:text-white'
                    }`}
                  >
                    Profile
                  </button>
                  <button
                    onClick={() => setActiveTab('security')}
                    className={`px-6 py-3 text-sm font-medium ${
                      activeTab === 'security'
                        ? 'border-b-2 border-white text-white'
                        : 'text-[#d1d1d1] hover:text-white'
                    }`}
                  >
                    Security
                  </button>
                  <button
                    onClick={() => setActiveTab('notifications')}
                    className={`px-6 py-3 text-sm font-medium ${
                      activeTab === 'notifications'
                        ? 'border-b-2 border-white text-white'
                        : 'text-[#d1d1d1] hover:text-white'
                    }`}
                  >
                    Notifications
                  </button>
                </nav>
              </div>
            </div>

            {/* Content */}
            <div className="bg-primary">
              <div className="max-w-[61.25rem] mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="bg-white rounded-lg shadow-lg p-6">
                  {activeTab === 'profile' && (
                    <div className="space-y-6 h-full">
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
                          className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                        />
                      </div>
                      <div>
                        <button
                          type="button"
                          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                        >
                          Save Changes
                        </button>
                      </div>
                    </div>
                  )}

                  {activeTab === 'security' && (
                    <div className="space-y-6 h-full">
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
                              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
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
                            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                          >
                            Enable 2FA
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'notifications' && (
                    <div className="space-y-6 h-full">
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
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                          >
                            Save Preferences
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
