import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    APP_ENV: process.env.APP_ENV || (process.env.NODE_ENV === 'production' ? 'prod' : 'dev'),
  },
  
  // 放宽构建要求
  eslint: {
    // 在构建时忽略 ESLint 错误
    ignoreDuringBuilds: true,
  },
  
  typescript: {
    // 在构建时忽略 TypeScript 错误
    ignoreBuildErrors: true,
  },
  
  // 实验性功能
  experimental: {
    // 允许更宽松的严格模式
    typedRoutes: false,
  },
};

export default nextConfig;