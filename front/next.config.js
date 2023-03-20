/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  async rewrites() {
    return [
      {
        source: "/sapi/:path*",
        destination: "http://127.0.0.1:8080/:path*",
      }
    ]
  }
}

module.exports = nextConfig
