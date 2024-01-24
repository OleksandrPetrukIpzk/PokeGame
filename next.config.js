/** @type {import('next').NextConfig} */
const nextConfig = {
}

module.exports = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'raw.githubusercontent.com',
                port: '',
            },
            {
                protocol: 'https',
                hostname: 'www.google.com',
                port: '',
            },

        ],
    },
}
