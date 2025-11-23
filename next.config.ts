import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [{ hostname: "img.gamedistribution.com" }]
  }
}

export default nextConfig
