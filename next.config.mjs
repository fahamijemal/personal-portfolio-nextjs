/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [{ source: "/om", destination: "/", permanent: true }];
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
