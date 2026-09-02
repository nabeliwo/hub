/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // slug のタイポ(razyer)を修正したので、旧 URL からリダイレクトする。
      // rewrites の destination は redirects を通らないため、旧ドメイン側のパスも個別に受ける
      {
        source: '/blog/2021/04/razyer-tartarus-pro',
        destination: '/blog/2021/04/razer-tartarus-pro',
        permanent: true,
      },
      {
        source: '/2021/04/razyer-tartarus-pro',
        destination: '/blog/2021/04/razer-tartarus-pro',
        permanent: true,
      },
    ]
  },

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
