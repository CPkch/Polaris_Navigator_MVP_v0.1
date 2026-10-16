export default function Button({
  label,
  onClick,
  disabled,
}: {
  label: string
  onClick?: () => void
  disabled?: boolean
}) {
  return (
    <button className="btn" onClick={onClick} disabled={disabled}>
      {label}
    </button>
  )
}
