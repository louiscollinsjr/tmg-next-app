'use client'

import { signIn, signOut, useSession } from 'next-auth/react'

export default function AuthButton() {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return <div className="text-xs text-white opacity-80">Loading...</div>
  }

  if (session) {
    return (
      <div className="flex items-center gap-4">
        <span className="text-xs text-white">
          {session.user?.name}
        </span>
        <button
          onClick={() => signOut()}
          className="text-xs text-white hover:text-gray-200 transition-colors"
        >
          Sign out
        </button>
      </div>
    )
  }

  return (
    <button
      onClick={() => signIn(undefined, { callbackUrl: '/' })}
      className="text-xs text-white hover:text-gray-200 transition-colors"
    >
      Sign in
    </button>
  )
}
