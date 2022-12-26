/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [process.env.NEXT_PUBLIC_SUBDOMAIN],
  },
};

module.exports = nextConfig;
