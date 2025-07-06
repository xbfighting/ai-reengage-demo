import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    NODE_ENV: process.env.NODE_ENV || 'development',
    APP_ENV: process.env.APP_ENV || (process.env.NODE_ENV === 'production' ? 'prod' : 'dev'),
  },
};

export default nextConfig;
