import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Output configuration - based on your hosting
  // output: 'standalone', // For custom servers
  // output: 'export',     // For static export
  
  reactStrictMode: true,
  
  // Image configuration
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    // Try enabling this if images still don't show immediately
    // unoptimized: true,
  },
  
  // CORRECTED: This key has been moved out of 'experimental' in Next.js 16
  serverExternalPackages: ['mongoose'],
  
  // Custom headers for static files
  async headers() {
    return [
      {
        source: '/posts/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
  
  // Optional: Add if you're using webpack custom config
  // webpack: (config, { isServer }) => {
  //   if (!isServer) {
  //     config.resolve.fallback = {
  //       ...config.resolve.fallback,
  //       fs: false,
  //       net: false,
  //       tls: false,
  //     };
  //   }
  //   return config;
  // },
};

export default nextConfig;