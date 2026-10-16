import { Icon } from '../icons'

export default function Header({ title, onBack }: { title: string; onBack?: () => void }) {
  return (
    <div className="header">
      {onBack ? (
        <button className="icon-btn" onClick={onBack} aria-label="뒤로">
          <Icon name="chevron-left" />
        </button>
      ) : (
        <div className="icon-btn icon-btn--hidden" aria-hidden="true" />
      )}
      <h1 className="header__title">{title}</h1>
      <div className="icon-btn icon-btn--hidden" aria-hidden="true" />
    </div>
  )
}
