/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // keep the admin bundle out of the public pages
    optimizePackageImports: ['lucide-react', 'react-icons'],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.ufs.sh',
      },
    ],
  },
};

export default nextConfig;
