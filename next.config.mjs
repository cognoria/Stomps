/** @type {import('next').NextConfig} */

const nextConfig = {
    reactStrictMode: true,
    async headers() {
        return [
            {
                source: '/api/v1/embed/:path*',
                headers: [
                    { key: 'Access-Control-Allow-Origin', value: '*' },
                    { key: 'Access-Control-Allow-Methods', value: 'GET, OPTIONS' },
                    { key: 'Access-Control-Allow-Headers', value: 'Content-Type, Authorization' },
                ],
            },
        ];
    },
};

export default nextConfig;
