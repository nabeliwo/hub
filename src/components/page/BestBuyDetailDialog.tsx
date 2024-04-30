'use client'

import { Dialog } from '@headlessui/react'
import { useRouter } from 'next/navigation'

import { path } from '@/constants/path'
import type { BestBuy } from '@/services/bestBuy'

type Props = {
  bestBuy: BestBuy
}

export function BestBuyDetailDialog({ bestBuy }: Props) {
  const router = useRouter()
  const onClose = () => {
    router.replace(path.bestBuy, { scroll: false })
  }

  return (
    <Dialog open className="relative z-50" onClose={onClose}>
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      <div className="fixed inset-0 flex w-screen items-center justify-center py-2 md:p-4">
        <Dialog.Panel className="w-full max-w-sm bg-grey-bestbuy md:rounded-2xl">
          <Dialog.Title>{bestBuy.title}</Dialog.Title>

          <img src={bestBuy.image} alt={bestBuy.alt} width="100%" height="auto" />

          <p>{bestBuy.description}</p>

          <button onClick={() => onClose()}>Deactivate</button>
          <button onClick={() => onClose()}>Cancel</button>
        </Dialog.Panel>
      </div>
    </Dialog>
  )
}
