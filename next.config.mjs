/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_URL}/api/:path*`,
      },
      {
        source: '/static/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_URL}/static/:path*`,
      },
    ]
  },
  async headers() {
    return [
      {
        source: '/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=2592000, immutable', // 1 month = 30 days * 24 hours * 60 minutes * 60 seconds
          },
        ],
      },
    ]
  },
}

export default nextConfig
