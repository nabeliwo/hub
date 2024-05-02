type Props = {
  siteName: string
  title: string
}

export function DefaultImage({ siteName, title }: Props) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        width: 1200,
        height: 630,
        padding: '3rem',
        backgroundColor: '#fff',
        fontFamily: 'Inter, "M PLUS 1p"',
        letterSpacing: '0.025em',
      }}
    >
      <p
        style={{
          padding: '0.5rem 2rem',
          backgroundColor: '#2286FF',
          color: '#fff',
          fontSize: '3rem',
        }}
      >
        {siteName}
      </p>

      <p style={{ color: '#222', fontSize: '3rem' }}>{title}</p>
    </div>
  )
}
