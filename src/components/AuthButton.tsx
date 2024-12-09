'use client'

import { signIn, signOut, useSession } from 'next-auth/react'
import Link from 'next/link'

export default function AuthButton() {
  const { data: session, status } = useSession()

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

  if (session) {
    return (
      <div className="flex items-center gap-6">
        <button
          onClick={() => signOut()}
          className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
        >
          Sign out
        </button>
        <Link 
          href="/app/account" 
          className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
        >
          Dashboard
        </Link>
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
