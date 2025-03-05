// old code
// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: 'http',
//         hostname: '194.238.19.18',
//       },
//       {
//         protocol: 'https',
//         hostname: '*',
//       },
//     ],
//     domains: ['michiley.com'], // Add your external image domain here
//   },
//   experimental: {
//     // esmExternals: 'loose',
//   },
// }

// export default nextConfig




// new code , for better error finding on build time

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '194.238.19.18',
      },
      {
        protocol: 'https',
        hostname: '*',
      },
    ],
    domains: ['michiley.com', "zdsl.com.bd"], // Add your external image domain here
  },
  experimental: {
    outputFileTracing: true, // Enables detailed tracing for debugging
    // Uncomment if needed to troubleshoot external ES modules
    // esmExternals: 'loose',
  },
  webpack(config, { isServer }) {
    // Fallback for server-side rendering issues
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false, // Prevents `fs` module issues during client-side builds
      };
    }

    // Add build-time logs for debugging
    // console.log('Webpack configuration:', config);

    return config;
  },
  async headers() {
    // Example: Add custom headers if needed for debugging
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Debug-Mode',
            value: 'true', // Custom debug header
          },
        ],
      },
    ];
  },
};

export default nextConfig;



