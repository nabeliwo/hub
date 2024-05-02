export const GA_TAG_ID = process.env.NEXT_PUBLIC_GA_ID || ''

export const hasGaTagId = GA_TAG_ID !== ''

export function pageview(path: string) {
  window.gtag('config', GA_TAG_ID, {
    page_path: path,
  })
}
