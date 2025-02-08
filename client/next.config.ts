import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode : false,
  images: {
    domains: ['picsum.photos','res.cloudinary.com'], // Add domains if using external images
    formats: ['image/avif', 'image/webp'], // Optional: Enable modern formats
  },
  
};

export default nextConfig;
