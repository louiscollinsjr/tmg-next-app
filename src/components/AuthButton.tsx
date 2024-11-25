'use client'

import { signIn, signOut, useSession } from 'next-auth/react'
import Link from 'next/link'

export default function AuthButton() {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return (
      <div className="flex items-center gap-6">
        <button
          disabled
          className="text-sm text-gray-400 cursor-wait transition-colors animate-pulse"
        >
          Sign in
        </button>
        <button
          disabled
          className="bg-gray-300 text-white text-sm font-normal px-6 py-2 rounded-xl cursor-wait transition-colors animate-pulse"
        >
          Get Started
        </button>
      </div>
    )
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
