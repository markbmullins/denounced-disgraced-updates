/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ["res.cloudinary.com", "files.cdn.printful.com", "printful-upload.s3-accelerate.amazonaws.com"],
  },
};

module.exports = nextConfig;
