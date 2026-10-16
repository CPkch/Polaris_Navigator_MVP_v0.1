import type { ReactNode } from 'react'

// Screens v1 화면 틀: 위 띠(캔버스색, 헤더·진행 막대·요약 카드) + 아래 시트(위 모서리 24, 본문)
export default function Shell({ top, children }: { top: ReactNode; children: ReactNode }) {
  return (
    <div className="screen">
      <div className="top">{top}</div>
      <div className="sheet">{children}</div>
    </div>
  )
}
