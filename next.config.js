/** @type {import('next').NextConfig} */
module.exports = {
  webpack5: false,
  reactStrictMode: true,
  // env 내용 추가
  env: {
    BASE_URL: process.env.BASE_URL,
    SECRET: process.env.SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  },
  async rewrites() {
    return [
      {
        source: '/api2/:path*',
        destination: 'http://localhost:3001/api2/:path*' // Proxy to Backend
      },
      {
        source: '/uploads/:path*',
        destination: 'http://localhost:3001/uploads/:path*' // Proxy to Backend
      },
      {
        source: "/json/:path*",
        destination: "https://geolocation-db.com/json/:path*"
      }

    ]
  }
};
