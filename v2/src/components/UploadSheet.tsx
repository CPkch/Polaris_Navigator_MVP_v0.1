import { Icon } from '../icons'

// S2 사진 올리기 시트 (피그마 17:254). 시연용 — 어느 줄을 눌러도 파일 창 없이 onPick.
export default function UploadSheet({ onPick, onClose }: { onPick: () => void; onClose: () => void }) {
  return (
    <div className="dim" onClick={onClose}>
      <div className="bottom-sheet" role="dialog" aria-label="사진 올리기" onClick={(e) => e.stopPropagation()}>
        <div className="bottom-sheet__handle" />
        <h2 className="bottom-sheet__title">사진 올리기</h2>
        <button className="sheet-option" onClick={onPick}>
          <span className="sheet-option__icon">
            <Icon name="camera" />
          </span>
          <span className="sheet-option__text">
            <span className="sheet-option__label">사진 촬영</span>
            <span className="sheet-option__sub">보유 화면을 바로 찍어요</span>
          </span>
          <Icon name="chevron-right" size={18} />
        </button>
        <button className="sheet-option" onClick={onPick}>
          <span className="sheet-option__icon">
            <Icon name="image" />
          </span>
          <span className="sheet-option__text">
            <span className="sheet-option__label">앨범에서 선택</span>
            <span className="sheet-option__sub">미리 캡처해 둔 화면을 골라요</span>
          </span>
          <Icon name="chevron-right" size={18} />
        </button>
        <button className="bottom-sheet__cancel" onClick={onClose}>
          취소
        </button>
      </div>
    </div>
  )
}
