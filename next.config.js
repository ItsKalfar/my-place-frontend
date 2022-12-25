/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [process.env.NEXY_PUBLIC_SUBDOMAIN],
  },
};

module.exports = nextConfig;
