import { data } from '../data'
import { Icon } from '../icons'
import Shell from '../components/Shell'
import Header from '../components/Header'
import Progress from '../components/Progress'
import DarkCard from '../components/DarkCard'
import ImageSlot from '../components/ImageSlot'
import Button from '../components/Button'
import Disclaimer from '../components/Disclaimer'

export default function M1({ onNext, onSource }: { onNext: () => void; onSource: () => void }) {
  return (
    <Shell
      top={
        <>
          <Header title={data.company.name} />
          <Progress step={1} />
          <DarkCard label={data.verdict.question} value={data.verdict.answer} />
        </>
      }
    >
      <button className="link-line" onClick={onSource}>
        이 문장의 출처 보기
        <Icon name="chevron-right" size={14} />
      </button>
      <ImageSlot src={data.images.m1} alt="칩·폰·TV 그림" height={180} label="GPT 이미지 · 칩 · 폰 · TV · 16:9" />
      <div className="spacer" />
      <Button label="다음" onClick={onNext} />
      <Disclaimer />
    </Shell>
  )
}
