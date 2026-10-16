import { Icon, type IconName } from '../icons'

interface RowProps {
  color: string
  icon: IconName
  name: string
  share: string
  expanded?: boolean
  onClick?: () => void
}

// Screens v1 Flow Card 식: 36px 베이지 타일 안에 산업 색 선 아이콘
export default function Row({ color, icon, name, share, expanded, onClick }: RowProps) {
  return (
    <button
      className={expanded ? 'row row--open' : 'row'}
      onClick={onClick}
      aria-expanded={expanded}
    >
      <span className="row__tile" style={{ color: `var(--${color})` }}>
        <Icon name={icon} size={20} />
      </span>
      <span className="row__name">{name}</span>
      <span className="row__share">{share}</span>
    </button>
  )
}
