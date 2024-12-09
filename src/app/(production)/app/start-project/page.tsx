'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState, useTransition, useEffect } from 'react'
import { submitProject, associatePendingProject } from '@/app/(production)/actions/submitProject'

export default function StartProject() {
  const { data: session } = useSession()
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    projectType: '',
    timeline: ''
  })

  // Check for pending project on mount and after auth
  useEffect(() => {
    const pendingProject = localStorage.getItem('pendingProject')
    if (pendingProject && session?.user) {
      const projectData = JSON.parse(pendingProject)
      startTransition(() => {
        // Perform UI state changes here if necessary
      });
      associatePendingProject(projectData).then(result => {
        if (result.success) {
          localStorage.removeItem('pendingProject')
          router.push('/app/account')
        }
      })
    }
  }, [session, router])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startTransition(() => {
      (function() {
        if (session?.user) {
          // User is authenticated, submit project directly
          submitProject(formData).then(result => {
            if (result.success) {
              router.push('/app/account')
            }
          })
        } else {
          // User is not authenticated, save to localStorage and redirect
          localStorage.setItem('pendingProject', JSON.stringify(formData))
          router.push('/auth/signin')
        }
      })();
    });
  }

  return (
    <>
      <div className="min-h-screen bg-zinc-50 -mt-[64px] pt-[64px]">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="max-w-5xl mx-auto px-4 sm:px-[22px] py-24">
            <div className="text-center">
              <h1 className="font-roboto text-4xl md:text-6xl font-medium text-gray-900 tracking-tight mb-6">
                Start Your Dream Project
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-12 font-roboto">
                Tell us about your project and get matched with qualified professionals
              </p>
              
              {/* Project Form */}
              <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="text-left">
                    <label className="block text-sm font-medium text-gray-700 mb-2 font-roboto">Project Title</label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/5 font-roboto"
                      placeholder="e.g., Kitchen Renovation in Oakland"
                    />
                  </div>

                  <div className="text-left">
                    <label className="block text-sm font-medium text-gray-700 mb-2 font-roboto">Project Type</label>
                    <select 
                      required
                      value={formData.projectType}
                      onChange={(e) => setFormData(prev => ({ ...prev, projectType: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/5 font-roboto"
                    >
                      <option value="">Select a project type</option>
                      <option value="kitchen">Kitchen Remodel</option>
                      <option value="bathroom">Bathroom Renovation</option>
                      <option value="painting">Interior Painting</option>
                      <option value="flooring">Flooring Installation</option>
                    </select>
                  </div>
                  
                  <div className="text-left">
                    <label className="block text-sm font-medium text-gray-700 mb-2 font-roboto">Project Description</label>
                    <textarea 
                      rows={4}
                      required
                      value={formData.description}
                      onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Describe your project in detail..."
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/5 font-roboto"
                    />
                  </div>
                  
                  <div className="text-left">
                    <label className="block text-sm font-medium text-gray-700 mb-2 font-roboto">Timeline</label>
                    <select 
                      required
                      value={formData.timeline}
                      onChange={(e) => setFormData(prev => ({ ...prev, timeline: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/5 font-roboto"
                    >
                      <option value="">When do you want to start?</option>
                      <option value="immediately">Immediately</option>
                      <option value="1-2weeks">1-2 weeks</option>
                      <option value="1month">Within a month</option>
                      <option value="planning">Just planning</option>
                    </select>
                  </div>
                  
                  <button 
                    type="submit"
                    disabled={isPending}
                    className="w-full bg-black text-white font-roboto px-8 py-3 rounded-xl hover:bg-gray-800 transition-colors disabled:opacity-50"
                  >
                    {isPending ? 'Submitting...' : 'Submit Project'}
                  </button>
                </form>
              </div>
            </div>
          </div>
          
          {/* Background Pattern */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#0000000A_1px,transparent_1px),linear-gradient(to_bottom,#0000000A_1px,transparent_1px)] bg-[size:24px_24px]" />
          </div>
        </section>
      </div>
    </>
  );
}
