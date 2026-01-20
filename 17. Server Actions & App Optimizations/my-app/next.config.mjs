/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  images:{
    remotePatterns:[
      {
        protocol:"https",
        hostname:"imgs.search.brave.com",

      }
    ]
  }
};

export default nextConfig;
