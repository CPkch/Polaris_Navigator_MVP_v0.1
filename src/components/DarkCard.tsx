export default function DarkCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="dark-card">
      <p className="dark-card__label">{label}</p>
      <p className="dark-card__value">{value}</p>
    </div>
  )
}
