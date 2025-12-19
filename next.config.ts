import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    unoptimized: true,
    domains: ['networthmama.com', 'www.networthmama.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'networthmama.com',
      },
      {
        protocol: 'https',
        hostname: 'www.networthmama.com',
      },
    ],
  },
};

export default nextConfig;


