'use client'

import { signIn, signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, Transition } from '@headlessui/react'
import { Fragment, useEffect, useState } from 'react'
import { Gear, SignOut, User } from '@phosphor-icons/react'

export default function AuthButton() {
  const { data: session, status } = useSession()
  const [dbImage, setDbImage] = useState<string | null>(null)

  useEffect(() => {
    if (session?.user?.email && !session.user.image) {
      // Only fetch from database if no Google image
      fetch(`/api/users/profile?email=${session.user.email}`)
        .then(res => res.json())
        .then(data => {
          if (data.image) {
            setDbImage(data.image)
          }
        })
        .catch(err => console.error('Error fetching user image:', err))
    }
  }, [session?.user?.email, session?.user?.image])

  if (status === 'loading') {
    return (
      <div>
        <button
          disabled
          className="text-sm text-gray-400 cursor-wait transition-colors animate-pulse"
        >
          Sign in
        </button>
      </div>
    )
  }

  if (session?.user) {
    // Get initials from name
    const initials = session.user.name
      ? session.user.name
          .split(' ')
          .map(word => word[0])
          .slice(0, 2)
          .join('')
          .toUpperCase()
      : '?'

    // Use Google image first, then database image, then initials
    const userImage = session.user.image || dbImage

    return (
      <div className="flex items-center gap-6">
        <Menu as="div" className="relative inline-block text-left">
          <Menu.Button className="flex items-center gap-2 focus:outline-none">
            <div className="relative w-12 h-12">
              {userImage ? (
                <Image
                  src={userImage}
                  alt={session.user.name || 'User'}
                  width={64}
                  height={64}
                  className="rounded-full object-cover border-2 border-white shadow-sm"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center text-white text-sm font-medium shadow-sm">
                  {initials}
                </div>
              )}
            </div>
          </Menu.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none py-1">
              <Menu.Item>
                {({ active }) => (
                  <Link
                    href="/app/account"
                    className={`${
                      active ? 'bg-gray-50' : ''
                    } flex items-center gap-2 px-4 py-2 text-sm text-gray-700`}
                  >
                    <User size={16} />
                    Profile
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <Link
                    href="/app/settings"
                    className={`${
                      active ? 'bg-gray-50' : ''
                    } flex items-center gap-2 px-4 py-2 text-sm text-gray-700`}
                  >
                    <Gear size={16} />
                    Settings
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => signOut()}
                    className={`${
                      active ? 'bg-gray-50' : ''
                    } flex items-center gap-2 px-4 py-2 text-sm text-gray-700 w-full text-left`}
                  >
                    <SignOut size={16} />
                    Sign out
                  </button>
                )}
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    )
  }

  return (
    <div>
      <button
        onClick={() => signIn(undefined, { callbackUrl: '/' })}
        className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
      >
        Sign in
      </button>
    </div>
  )
}
