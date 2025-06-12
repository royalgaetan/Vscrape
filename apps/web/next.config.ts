import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  /* config options here */
  webpack: (config) => {
    config.resolve.alias["@vscrape/shared"] = path.resolve(
      __dirname,
      "../shared/src"
    );
    return config;
  },
};

export default nextConfig;
