type Props = {
  title: string
  description: string
  href: string
}

export function Header({ title, description, href }: Props) {
  return (
    <header>
      <a
        href={href}
        className="mb-4 inline-block bg-blue px-4 text-white hover:bg-blue-light md:mb-2"
      >
        {title}
      </a>

      <p className="text-sm leading-4 md:pl-4 md:text-base md:leading-8">{description}</p>
    </header>
  )
}
