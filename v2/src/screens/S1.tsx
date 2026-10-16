import { useState } from 'react'
import { Icon } from '../icons'
import Shell from '../components/Shell'
import UploadSheet from '../components/UploadSheet'
import Disclaimer from '../components/Disclaimer'

// S1 시작 (피그마 17:212). "사진 선택" → S2 시트 → onPick. "예시 둘러보기" → S5로 바로.
export default function S1({ onPick, onExample }: { onPick: () => void; onExample: () => void }) {
  const [sheetOpen, setSheetOpen] = useState(false)
  return (
    <>
      <Shell
        top={
          <>
            <span className="brand-pill">Polaris Navigator</span>
            <h1 className="headline">
              보유 종목 사진을
              <br />
              올려주세요
            </h1>
          </>
        }
      >
        <button className="dropzone" onClick={() => setSheetOpen(true)}>
          <span className="dropzone__icon">
            <Icon name="upload" size={24} />
          </span>
          <span className="dropzone__label">사진 선택</span>
        </button>
        <button className="btn btn--outline" onClick={onExample}>
          사진 없이 예시 둘러보기
        </button>
        <div className="spacer" />
        <Disclaimer />
      </Shell>
      {sheetOpen && (
        <UploadSheet
          onPick={() => {
            setSheetOpen(false)
            onPick()
          }}
          onClose={() => setSheetOpen(false)}
        />
      )}
    </>
  )
}
