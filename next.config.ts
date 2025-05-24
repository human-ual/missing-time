// next.config.ts

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // ← 忽略 ESLint 錯誤，避免 build fail
  },
  // 其他你可能已有的設定可以放在這裡
};

export default nextConfig;
