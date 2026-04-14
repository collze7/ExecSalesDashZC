/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // This ensures your API routes work correctly on Vercel
  async headers() {
    return [
      {
        // Allow webhook from any origin (Writer playbooks)
        source: '/api/webhook',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'POST, OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type' },
        ],
      },
    ];
  },
};

module.exports = nextConfig;