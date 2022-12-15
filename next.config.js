/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = nextConfig;

module.exports = {
  trailingSlash: true,

  images: {
      domains: ['s3.pirveli.com'],
      disableStaticImages: true
  },
  env: {
    MEDICAL_API: 'https://medical.pirveli.com'
  },

  async rewrites() {
      return [

          {
              source: "/asclepius/v1/:path*",
              destination:
                  "https://asclepius.pirveli.com/asclepius/v1/:path*",
          },

      ]
  },
};