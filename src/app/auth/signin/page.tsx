'use client'

import { signIn } from 'next-auth/react'
import Image from 'next/image'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function SignIn() {
  const router = useRouter()
  const [isSignUp, setIsSignUp] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const name = formData.get('name') as string

    try {
      if (isSignUp) {
        // Sign up
        const res = await fetch('/api/auth/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password, name }),
        })

        if (!res.ok) {
          const data = await res.json()
          throw new Error(data.error || 'Failed to create account')
        }

        // After successful signup, sign in
        const result = await signIn('credentials', {
          email,
          password,
          redirect: false,
        })

        if (result?.error) {
          throw new Error(result.error)
        }

        router.push('/')
      } else {
        // Sign in
        const result = await signIn('credentials', {
          email,
          password,
          redirect: false,
        })

        if (result?.error) {
          throw new Error(result.error)
        }

        router.push('/')
      }
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-primary">
      <div className="flex-grow flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md mt-20 px-12">
          <div className="text-center mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-2">Sign in to TryMyGuys</h2>
            <p className="text-gray-500 font-normal">{isSignUp ? 'Create your account to get started' : 'Welcome back! Please sign in to continue'}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 mb-6">
            {isSignUp && (
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="John Doe"
                />
              </div>
            )}
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                required
                minLength={8}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <div className="text-red-500 text-sm">{error}</div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50"
            >
              {loading ? 'Loading...' : isSignUp ? 'Create Account' : 'Sign In'}
            </button>
          </form>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 py-4 bg-white text-gray-400 font-semibold">or</span>
            </div>
          </div>

          <div className="space-y-4">
            <button
              onClick={() => signIn('google', { callbackUrl: '/' })}
              className="w-full flex items-center justify-center gap-3 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Image
                src="/google.svg"
                alt="Google"
                width={20}
                height={20}
                className="w-5 h-5"
              />
              <span className="text-gray-700">Continue with Google</span>
            </button>

            <button
              onClick={() => signIn('github', { callbackUrl: '/' })}
              className="w-full flex items-center justify-center gap-3 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Image
                src="/github.svg"
                alt="GitHub"
                width={20}
                height={20}
                className="w-5 h-5"
              />
              <span className="text-gray-700">Continue with GitHub</span>
            </button>
          </div>

          <div className="mt-6 text-center">
            <span className="text-gray-500 font-normal">
              {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
              <button
                type="button"
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-blue-600 hover:underline font-medium"
              >
                {isSignUp ? 'Sign in' : 'Sign up'}
              </button>
            </span>
          </div>
        </div>
      </div>

      <footer className="py-6">
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 text-xs text-white/80">
          <div className="text-white/60">&copy; {new Date().getFullYear()} TryMyGuys.com</div>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-white hover:underline">Privacy Policy</Link>
            <span className="hidden md:inline text-white/50">|</span>
            <Link href="/terms" className="hover:text-white hover:underline">Terms of Use</Link>
            <span className="hidden md:inline text-white/50">|</span>
            <Link href="/legal" className="hover:text-white hover:underline">Legal</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
