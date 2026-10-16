import { Icon, type IconName } from '../icons'

interface RowProps {
  color: string
  icon: IconName
  name: string
  share: string
  expanded?: boolean
  onClick?: () => void
}

export default function Row({ color, icon, name, share, expanded, onClick }: RowProps) {
  return (
    <button
      className={expanded ? 'row row--open' : 'row'}
      onClick={onClick}
      aria-expanded={expanded}
    >
      <span className="row__dot" style={{ background: `var(--${color})` }}>
        <Icon name={icon} size={18} />
      </span>
      <span className="row__name">{name}</span>
      <span className="row__share">{share}</span>
    </button>
  )
}
