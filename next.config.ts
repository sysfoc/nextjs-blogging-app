// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
// };

// export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Choose the appropriate output based on your hosting:
  // For most platforms (Vercel, standalone servers):
  // output: 'standalone',
  
  // For static export (if generating static HTML):
  // output: 'export',
  
  // React strict mode
  reactStrictMode: true,
  
  // Image configuration - CRITICAL for your image issues
  images: {
    // For external images when using next/image
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Allows all HTTPS domains
      },
    ],
    // Uncomment if you're having persistent image optimization issues
    // unoptimized: true,
  },
  
  // Experimental features
  experimental: {
    // Essential for Mongoose in serverless/API routes
    serverComponentsExternalPackages: ['mongoose'],
  },
  
  // Custom headers for static files - improves caching
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
  
  // Optional: Webpack configuration if needed
  // webpack: (config, { isServer }) => {
  //   if (!isServer) {
  //     config.resolve.fallback = {
  //       ...config.resolve.fallback,
  //       fs: false,
  //     };
  //   }
  //   return config;
  // },
};

export default nextConfig;