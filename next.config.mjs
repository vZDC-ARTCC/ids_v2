/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'radar.weather.gov',
                port: '',
                pathname: '**',
            },
            {
                protocol: 'https',
                hostname: 'utfs.io',
                port: '',
                pathname: '**',
            },
        ],
    },
};

export default nextConfig;
