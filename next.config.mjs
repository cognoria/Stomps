// /** @type {import('next').NextConfig} */

// const nextConfig = {};

// export default nextConfig;

import nextCors from 'next-cors';
// import embedJs from './src/app/api/embed/route.js';

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async middleware(req, res) {
    await nextCors(req, res, {
      // Options
      methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
      origin: '*',
      optionsSuccessStatus: 200,
    })
  },
  async headers() {
    return [
      {
        source: '/embed.js',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/embed.js',
        destination: '/_next/static/chunks/embed.js',
        permanent: true,
      },
    ];
  },
  // async serverRuntimeConfig() {
  //   return {
  //     embedJs,
  //   };
  // },
  async rewrites() {
    return [
      {
        source: '/embed.js',
        destination: '/api/embed',
      },
    ];
  },
}

export default nextConfig
