/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allow LAN access for mobile testing
  allowedDevOrigins: ['192.168.0.109'],

  // Image optimization — offloaded to browser pre-compression and R2 static serving
  images: {
    unoptimized: true, // Crucial: stops Vercel from using its 1000-image free tier quota
    imageSizes: [128, 256, 384],
    deviceSizes: [640, 768, 1024, 1280],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pub-852428233a5149cca229b4639882cad0.r2.dev',
      },
      {
        protocol: 'https',
        hostname: 'images.brand2brands.com',
      },
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
