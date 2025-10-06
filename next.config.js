/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  trailingSlash: false,
  output: 'standalone',
  experimental: {
    esmExternals: false
  }
};

module.exports = nextConfig;
