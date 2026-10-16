import { data } from '../data'
import { Icon } from '../icons'
import Shell from '../components/Shell'
import Header from '../components/Header'
import Button from '../components/Button'
import Disclaimer from '../components/Disclaimer'

// S5 디오라마 (피그마 17:440). 종목 줄과 "기업 분석" 모두 M1로.
export default function S5({ onBack, onAnalyze }: { onBack: () => void; onAnalyze: () => void }) {
  return (
    <Shell top={<Header title={data.company.name} onBack={onBack} />}>
      <div className="diorama">
        <img className="diorama__img" src={data.images.diorama} alt={`${data.company.name} 디오라마`} />
      </div>
      <button className="stock-row" onClick={onAnalyze}>
        <span className="stock-row__icon">
          <Icon name="chip" size={18} />
        </span>
        <span className="stock-row__text">
          <span className="stock-row__name">{data.company.name}</span>
          <span className="stock-row__sub">{data.company.industry}</span>
        </span>
        <Icon name="chevron-right" />
      </button>
      <Button label="기업 분석" onClick={onAnalyze} />
      <div className="spacer" />
      <Disclaimer />
    </Shell>
  )
}
