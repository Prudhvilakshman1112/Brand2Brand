/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allow LAN access for mobile testing
  allowedDevOrigins: ['192.168.0.109'],

  // Image optimization — offloaded to Cloudinary (stops Vercel transformation usage)
  images: {
    loader: 'custom',
    loaderFile: './src/lib/cloudinaryLoader.js',
    imageSizes: [128, 256, 384],
    deviceSizes: [640, 768, 1024, 1280],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'xpmudrchipnbmvlawsuw.supabase.co',
      },
    ],
  },

  // Production optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },

  // Performance headers
  async headers() {
    return [
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
