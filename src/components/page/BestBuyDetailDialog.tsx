'use client'

import { Dialog } from '@headlessui/react'
import { useRouter } from 'next/navigation'

import { path } from '@/constants/path'
import type { BestBuy } from '@/services/bestBuy'

import { HtmlContent } from '../shared/HtmlContent'
import { XMarkIcon } from '../ui/icon/XMarkIcon'

type Props = {
  bestBuy: BestBuy
}

export function BestBuyDetailDialog({ bestBuy }: Props) {
  const router = useRouter()
  const onClose = () => {
    router.push(path.bestBuy, { scroll: false })
  }

  return (
    <Dialog open className="relative z-50" onClose={onClose}>
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      <div className="fixed inset-0 flex w-screen items-center justify-center">
        <Dialog.Panel className="flex max-h-best-buy-max w-full max-w-3xl flex-col bg-white md:rounded-2xl">
          <div className="flex items-start justify-between gap-2 p-4">
            <Dialog.Title>{bestBuy.title}</Dialog.Title>

            <button onClick={() => onClose()}>
              <XMarkIcon alt="Close" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto">
            <img
              className="bg-grey-bestbuy"
              src={bestBuy.image}
              alt={bestBuy.alt}
              width="100%"
              height="auto"
            />

            <div className="p-4">
              <HtmlContent>{bestBuy.content}</HtmlContent>
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  )
}
