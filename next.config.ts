import type { NextConfig } from 'next'
import withFlowbiteReact from 'flowbite-react/plugin/nextjs'

const nextConfig: NextConfig = {
  /* config options here */
  compiler: {
    // This enables the new JSX transform from React 17
    reactRemoveProperties: process.env.NODE_ENV === 'production',
    removeConsole: process.env.NODE_ENV === 'production'
  }  
}

export default withFlowbiteReact(nextConfig)