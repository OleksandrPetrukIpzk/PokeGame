/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '*',
                port: '',
            },
        ],
    },
    i18n: {
        locales: ['en', 'ua'],
        defaultLocale: 'en',
    },
};

module.exports = nextConfig;
