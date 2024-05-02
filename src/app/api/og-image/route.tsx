import fs from 'fs'
import path from 'path'

import { ImageResponse } from 'next/og'

import { bestBuy } from '@/constants/meta'

import { BestBuyImage } from './_components/BestBuyImage'
import { DefaultImage } from './_components/DefaultImage'

import type { NextRequest } from 'next/server'

const cwd = process.cwd()

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const siteName = searchParams.get('site_name') ?? ''
  const title = searchParams.get('title') ?? ''
  const image = searchParams.get('image') ?? ''

  const inter = fs.readFileSync(path.join(cwd, 'public/fonts/Inter-Regular.ttf'))
  const mplus = fs.readFileSync(path.join(cwd, 'public/fonts/MPLUS1p-Regular.ttf'))

  return new ImageResponse(
    siteName === bestBuy.siteName ? (
      <BestBuyImage title={title} image={image} />
    ) : (
      <DefaultImage siteName={siteName} title={title} />
    ),
    {
      fonts: [
        {
          name: 'Inter',
          data: inter,
          weight: 500,
          style: 'normal',
        },
        {
          name: 'M PLUS 1p',
          data: mplus,
          weight: 500,
          style: 'normal',
        },
      ],
    },
  )
}
