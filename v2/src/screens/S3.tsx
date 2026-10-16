import { useEffect, useState } from 'react'
import Shell from '../components/Shell'
import Header from '../components/Header'
import PhotoPreview from '../components/PhotoPreview'

const READ_MS = 1500

// S3 읽는 중 (피그마 17:298). 시연용 — 진행 막대가 차면 자동으로 onDone.
export default function S3({ onBack, onDone }: { onBack: () => void; onDone: () => void }) {
  const [filled, setFilled] = useState(false)

  useEffect(() => {
    const raf = requestAnimationFrame(() => setFilled(true))
    const timer = setTimeout(onDone, READ_MS)
    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(timer)
    }
  }, [onDone])

  return (
    <Shell top={<Header title="사진 읽는 중" onBack={onBack} />}>
      <PhotoPreview height={220} />
      <div className="progress__track">
        <div
          className="progress__value progress__value--reading"
          style={{ width: filled ? '100%' : '0%', transitionDuration: `${READ_MS}ms` }}
        />
      </div>
      <div className="spacer" />
    </Shell>
  )
}
