/** @type {import('next').NextConfig} */
module.exports = {
  webpack5: false,
  reactStrictMode: true,
  // env 내용 추가
  env: {
    BASE_URL: process.env.BASE_URL,
    SECRET: process.env.SECRET,
    CERTIFICATION_TOKEN: process.env.CERTIFICATION_TOKEN,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://34.64.244.63:5000/api/:path*", // Proxy to Backend
        // destination: 'http://localhost:3001/api3/:path*' // Proxy to Backend
      },
      {
        source: "/api2/:path*",
        destination: "http://34.64.244.63:3001/api2/:path*", // Proxy to Backend
        // destination: "http://localhost:3001/api2/:path*", // Proxy to Backend
      },
      {
        source: "/uploads/:path*",
        destination: "http://34.64.87.11:3001/uploads/:path*", // Proxy to Backend
      },
      {
        source: "/json/:path*",
        destination: "https://geolocation-db.com/json/:path*",
      },
    ];
  },
};
