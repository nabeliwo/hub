import { bestBuy, profile } from '@/constants/meta'

type Props = {
  title: string
  image: string
}

export function BestBuyImage({ title, image }: Props) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: 1200,
        height: 630,
        padding: 50,
        backgroundColor: '#fff',
        fontFamily: 'Inter, "M PLUS 1p"',
        letterSpacing: '0.025em',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          width: 525,
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
          {bestBuy.siteName}
        </p>

        <p style={{ color: '#222', fontSize: '3rem' }}>{title}</p>
      </div>

      <img
        style={{
          width: 525,
          height: 525,
          backgroundColor: '#f2f5f7',
          borderRadius: 16,
        }}
        src={`${profile.url}${image}`}
        alt=""
      />
    </div>
  )
}
