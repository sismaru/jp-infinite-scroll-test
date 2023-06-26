/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = nextConfig

module.exports = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'jpassets.jobplanet.co.kr',
          port: '',
        },
      ],
    },
}
