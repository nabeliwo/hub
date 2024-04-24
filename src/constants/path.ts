export const path = {
  aboutMe: '/',
  mission: '/mission',
  philosophy: '/philosophy',
  biography: '/biography',
  favorite: '/favorite',
  blog: '/blog',
  blogItem: (slug: string) => `/blog${slug}`,
  blogCategories: '/blog/categories',
  blogCategoryItem: (categoryName: string) => `/blog/categories/${categoryName}`,
  blogTags: '/blog/tags',
  blogTagItem: (tagName: string) => `/blog/tags/${tagName}`,
  weekly: '/weekly',
  weeklyItem: (slug: string) => `/weekly${slug}`,
  bestBuy: '/best-buy',
  bestBuyItem: (slug: string) => `/best-buy${slug}`,
}

export const navigationMap = [
  {
    category: 'Profile',
    items: [
      {
        label: 'About Me',
        path: path.aboutMe,
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
