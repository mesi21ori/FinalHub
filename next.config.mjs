// //my-nextjs-prisma-project\next.config.mjs
// /** @type {import('next').NextConfig} */
// const nextConfig = {};

// export default nextConfig;


/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Helps with debugging and catching potential issues
  images: {
    domains: ['localhost'], // Add the domain of the image source (e.g., 'localhost')
  },
};

export default nextConfig;
