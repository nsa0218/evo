/** @type {import('next').NextConfig} */
const nextConfig = {
  srcDir: './src',
  experimental: {
    appDir: true,
  },
  output: 'standalone',
}

module.exports = nextConfig