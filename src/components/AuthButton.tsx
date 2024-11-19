'use client'

import { signIn, signOut, useSession } from 'next-auth/react'
import Link from 'next/link'

export default function AuthButton() {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return <div className="text-xs text-white opacity-80">Loading...</div>
  }

  if (session) {
    return (
      <div className="flex items-center gap-6">
        <button
          onClick={() => signOut()}
          className="text-xs text-white hover:text-gray-200 transition-colors"
        >
          Sign out
        </button>
        <Link 
          href="/account" 
          className="bg-[#0071e3] text-white text-xs font-semibold px-4 py-1 rounded-full hover:bg-[#0077ed] transition-colors"
        >
          Dashboard
        </Link>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-4">
      <button
        onClick={() => signIn(undefined, { callbackUrl: '/' })}
        className="text-xs text-white hover:text-gray-200 transition-colors"
      >
        Sign in
      </button>
      <button
        onClick={() => signIn(undefined, { callbackUrl: '/account' })}
        className="bg-[#0071e3] text-white text-xs font-semibold px-4 py-1 rounded-full hover:bg-[#0077ed] transition-colors"
      >
        Get Started
      </button>
    </div>
  )
}
