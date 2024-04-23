import styles from './HtmlContent.module.css'

type Props = {
  children: string
}

export function HtmlContent({ children }: Props) {
  return <div className={styles.wrapper} dangerouslySetInnerHTML={{ __html: children }} />
}
