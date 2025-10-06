/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  trailingSlash: false,
  experimental: {
    esmExternals: false
  }
};

module.exports = nextConfig;