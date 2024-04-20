import styles from './PostWrapper.module.css'

import type { PropsWithChildren } from 'react'

export function PostWrapper({ children }: PropsWithChildren) {
  return <div className={styles.wrapper}>{children}</div>
}
