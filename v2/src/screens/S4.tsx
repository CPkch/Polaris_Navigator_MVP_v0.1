import { data } from '../data'
import { Icon } from '../icons'
import Shell from '../components/Shell'
import Header from '../components/Header'
import PhotoPreview from '../components/PhotoPreview'
import Button from '../components/Button'
import Disclaimer from '../components/Disclaimer'

// S4 인식 결과 (피그마 17:327). 시연용 — 항상 company.name.
export default function S4({ onBack, onNext, onRetry }: { onBack: () => void; onNext: () => void; onRetry: () => void }) {
  return (
    <Shell
      top={
        <>
          <Header title="인식 완료" onBack={onBack} />
          <div className="callout">{data.company.name}</div>
        </>
      }
    >
      <PhotoPreview height={140} />
      <div className="cta-group">
        <Button label="디오라마 보기" onClick={onNext} />
        <button className="btn btn--secondary" onClick={onRetry}>
          <Icon name="upload" />
          다시 올리기
        </button>
      </div>
      <div className="spacer" />
      <Disclaimer />
    </Shell>
  )
}
