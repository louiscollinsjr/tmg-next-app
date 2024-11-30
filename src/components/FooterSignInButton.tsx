'use client'

import { useState } from 'react'
import { signIn, signOut, useSession } from 'next-auth/react'
import Link from 'next/link'

export default function FooterSignInButton() {
  const { data: session, status } = useSession()
  const [isOpen, setIsOpen] = useState(false)

  if (status === 'loading') {
    return <div className="text-gray-500">Loading...</div>
  }

  if (session) {
    return (
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-gray-500 hover:text-gray-700 transition-colors flex items-center gap-1"
        >
          {session.user?.name || session.user?.email || 'Account'}
          <svg
            className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {isOpen && (
          <div className="absolute bottom-full mb-2 w-48 bg-white rounded-lg shadow-lg py-1 text-sm">
            <Link
              href="/account"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Account
            </Link>
            <button
              onClick={() => {
                setIsOpen(false)
                signOut({ callbackUrl: '/' })
              }}
              className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
            >
              Sign out
            </button>
          </div>
        )}
      </div>
    )
  }

  return (
    <button
      onClick={() => signIn(undefined, { callbackUrl: '/' })}
      className="text-gray-500 hover:text-gray-700 transition-colors"
    >
      Sign In
    </button>
  )
}
