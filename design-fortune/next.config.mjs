/** @type {import("next").NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  assetPrefix: '',   // 정적 자산을 루트(/) 기준 절대 경로로 강제
}
export default nextConfig
