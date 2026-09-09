import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    loader: "custom",
    loaderFile: "./sanity-image-loader.ts",
  },
};

export default nextConfig;
