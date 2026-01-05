import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // External packages for server components
  serverExternalPackages: ['@designagent/core', '@designagent/preview'],
};

export default nextConfig;
