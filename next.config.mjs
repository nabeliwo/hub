/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      // 旧 blog.nabeliwo.com へのアクセスを blog にリダイレクトする
      {
        source: '/:year(\\d{4})-:month(\\d{2})-:day(\\d{2})',
        destination: '/weekly/:year/:month-:day',
      },

      // 旧 nippo.nabeliwo.com へのアクセスを weekly にリダイレクトする
      {
        source: '/:year(\\d{4})/:month(\\d{2})/:slug',
        destination: '/blog/:year/:month/:slug',
      },
    ]
  },
}

export default nextConfig
