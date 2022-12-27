/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      process.env.NEXT_PUBLIC_SUBDOMAIN,
      `${process.env.NEXT_PUBLIC_SUBDOMAIN}/ipfs`,
      `${process.env.NEXT_PUBLIC_SUBDOMAIN}/ipfs/`,
      process.env.NEXT_PUBLIC_INFURA_HOST,
    ],
  },
};

module.exports = nextConfig;
