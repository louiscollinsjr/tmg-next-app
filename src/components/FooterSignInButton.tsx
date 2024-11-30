'use client'

import { signIn } from 'next-auth/react'

export default function FooterSignInButton() {
  return (
    <button
      onClick={() => signIn(undefined, { callbackUrl: '/' })}
      className="text-gray-500 hover:text-gray-700 transition-colors"
    >
      Sign In
    </button>
  )
}
