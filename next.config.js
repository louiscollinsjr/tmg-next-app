/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'images.unsplash.com',
      'randomuser.me',
      'picsum.photos',
      'cloudinary.com',
      'res.cloudinary.com',
      'example.com'
    ],
  },
}

module.exports = nextConfig
