'use client'

import { signIn, signOut, useSession } from 'next-auth/react'
import Link from 'next/link'

export default function AuthButton() {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return <div className="text-xs text-gray-400 opacity-80">Loading...</div>
  }

  if (session) {
    return (
      <div className="flex items-center gap-6">
        <button
          onClick={() => signOut()}
          className="text-xs  text-gray-600 hover:text-gray-900 transition-colors"
        >
          Sign out
        </button>
        <Link 
          href="/account" 
          className="bg-black text-white text-xs font-semibold px-4 py-1 rounded-full hover:bg-gray-700 transition-colors"
        >
          Dashboard
        </Link>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-6">
      <button
        onClick={() => signIn(undefined, { callbackUrl: '/' })}
        className="text-sm  text-gray-600 hover:text-gray-900 transition-colors"
      >
        Sign in
      </button>
      <button
        onClick={() => signIn(undefined, { callbackUrl: '/account' })}
        className="bg-black text-white text-sm font-normal px-6 py-2 rounded-xl hover:bg-gray-700 transition-colors"
      >
        Get Started
      </button>
    </div>
  )
}
