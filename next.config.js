/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  future: {
    webpack5: true,
  },
};

module.exports = nextConfig;

module.exports = {
  images: {
    domains: ["s3.pirveli.ge"],
  },
};
