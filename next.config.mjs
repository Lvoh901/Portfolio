/** @type {import('next').NextConfig} */
const nextConfig = {
  // Self-contained server output for the Docker image.
  output: 'standalone',
  experimental: {
    // keep the admin bundle out of the public pages
    optimizePackageImports: ['lucide-react', 'react-icons'],
  },
};

export default nextConfig;
