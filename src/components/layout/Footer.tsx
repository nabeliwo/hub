import { TextLink } from '../ui/TextLink'

export function Footer() {
  // TODO: path にあわせてブログと週報とベストバイごとの RSS のリンクを置く

  return (
    <footer className="flex justify-between border-t border-grey-border p-4 md:p-12">
      <p>© nabeliwo</p>
      <p>
        Blog RSS /{' '}
        <TextLink href="https://github.com/nabeliwo/hub" target="_blank" rel="noopener noreferrer">
          GitHub
        </TextLink>
      </p>
    </footer>
  )
}
