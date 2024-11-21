import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'TMG - Find Trusted Home Service Professionals',
    short_name: 'TMG',
    description: 'Connect with trusted local home service professionals recommended by your community.',
    start_url: '/',
    display: 'standalone',
    orientation: 'portrait',
    background_color: '#ffffff',
    theme_color: '#000000',
    dir: 'ltr',
    lang: 'en-US',
    icons: [
      {
        src: '/favicon.ico',
        sizes: '48x48',
        type: 'image/x-icon',
      },
      {
        src: '/favicon-16x16.png',
        sizes: '16x16',
        type: 'image/png',
      },
      {
        src: '/favicon-32x32.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        src: '/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any'
      },
      {
        src: '/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable'
      },
      {
        src: '/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any'
      },
      {
        src: '/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable'
      },
    ],
    shortcuts: [
      {
        name: 'Find Professionals',
        url: '/find-professionals',
        description: 'Browse trusted professionals in your area',
      },
      {
        name: 'Start Project',
        url: '/start-project',
        description: 'Begin your home improvement project',
      },
    ],
    categories: [
      'home',
      'services',
      'business',
      'lifestyle',
    ],
    prefer_related_applications: false,
  }
}
