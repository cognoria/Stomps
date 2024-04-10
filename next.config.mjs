// /** @type {import('next').NextConfig} */

// const nextConfig = {};

// export default nextConfig;

import nextCors from 'next-cors';

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async middleware(req, res) {
    await nextCors(req, res, {
      // Options
      methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
      origin: '*',
      optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    })
  },
}

export default nextConfig