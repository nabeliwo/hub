export const path = {
  home: '/',
  mission: '/mission',
  philosophy: '/philosophy',
  biography: '/biography',
  favorite: '/favorite',
  blog: '/blog',
  weekly: '/weekly',
  bestBuy: '/best-buy',
  bestBuyItem: (itemId: string) => `/best-buy/${itemId}`,
}

export const navigationMap = [
  {
    category: 'Profile',
    items: [
      {
        label: 'About Me',
        path: path.home,
      },
      {
        label: 'Mission',
        path: path.mission,
      },
      {
        label: 'Philosophy',
        path: path.philosophy,
      },
      {
        label: 'Biography',
        path: path.biography,
      },
      {
        label: 'Favorite',
        path: path.favorite,
      },
    ],
  },
  {
    category: 'Log',
    items: [
      {
        label: 'Blog',
        path: path.blog,
      },
      {
        label: 'Weekly',
        path: path.weekly,
      },
      {
        label: 'Best Buy',
        path: path.bestBuy,
      },
    ],
  },
] as const
