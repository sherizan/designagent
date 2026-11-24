import type { NextConfig } from "next";

// Pages that existed when the site was a multi-plugin marketplace. They now land on
// the bridge instead of a 404.
const RETIRED = [
  "/build",
  "/submit",
  "/plugins/backgrounds",
  "/plugins/brand",
  "/plugins/design",
  "/plugins/design-qa",
  "/plugins/designreview",
  "/plugins/setup",
  "/plugins/tokens",
  "/plugins/voice",
];

const nextConfig: NextConfig = {
  async redirects() {
    return RETIRED.map((source) => ({ source, destination: "/", permanent: false }));
  },
};

export default nextConfig;
