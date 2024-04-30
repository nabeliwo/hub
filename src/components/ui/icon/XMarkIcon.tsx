type Props = {
  alt: string
}

export function XMarkIcon({ alt }: Props) {
  return (
    <svg
      aria-label={alt}
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-6"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
    </svg>
  )
}
