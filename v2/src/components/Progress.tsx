export default function Progress({ step }: { step: 1 | 2 | 3 }) {
  return (
    <div className="progress">
      <p className="progress__label">{step} / 3</p>
      <div className="progress__track">
        <div className="progress__value" style={{ width: `${(step / 3) * 100}%` }} />
      </div>
    </div>
  )
}
