import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  compiler: {
    // This enables the new JSX transform from React 17
    reactRemoveProperties: process.env.NODE_ENV === 'production',
    removeConsole: process.env.NODE_ENV === 'production'
  },
  experimental: {
    turbo: {
      resolveAlias: {
        canvas: { browser: './empty.js' }
      }
    }
  },
  webpack: config => {
    config.externals = [...config.externals, { canvas: 'canvas' }]
    return config
  }
}

export default nextConfig
