import { data } from '../data'
import Header from '../components/Header'
import DarkCard from '../components/DarkCard'
import Button from '../components/Button'
import Disclaimer from '../components/Disclaimer'

interface M4Props {
  sentence: string
  onBack: () => void
  onRestart: () => void
}

export default function M4({ sentence, onBack, onRestart }: M4Props) {
  return (
    <div className="screen">
      <Header title="다 봤어요" onBack={onBack} />
      <DarkCard label="내가 쓴 한 문장" value={sentence} />
      <div className="card">
        <p className="card__label">회사 한 줄 요약</p>
        <p className="card__strong">{data.verdict.answer}</p>
        <p className="caption">비슷하면 잘 읽은 거예요. 다르면 2번을 다시 봐요.</p>
      </div>
      <div className="spacer" />
      <Button label="처음으로" onClick={onRestart} />
      <Disclaimer />
    </div>
  )
}
