import { data, type Segment } from '../data'
import { Icon } from '../icons'
import Header from '../components/Header'
import Progress from '../components/Progress'
import Row from '../components/Row'
import ImageSlot from '../components/ImageSlot'
import Button from '../components/Button'
import Disclaimer from '../components/Disclaimer'

interface M2Props {
  openId: string | null
  onToggle: (id: string | null) => void
  onBack: () => void
  onNext: () => void
  onSource: (segment: Segment) => void
}

// 아코디언: 한 번에 하나, 펼친 행을 다시 누르면 접힘. 펼침 상태는 App이 들고 있어 X1에 다녀와도 유지.
export default function M2({ openId, onToggle, onBack, onNext, onSource }: M2Props) {
  return (
    <div className="screen">
      <Header title={data.company.name} onBack={onBack} />
      <Progress step={2} />
      <div className="title-block">
        <h2>어떻게 돈을 벌까?</h2>
        <p>네 갈래예요. 눌러서 펼쳐 보세요.</p>
      </div>
      <div className="seg-list">
        {data.segments.map((seg) => {
          const open = openId === seg.id
          return (
            <div key={seg.id}>
              <Row
                color={seg.color}
                icon={seg.icon}
                name={seg.name}
                share={seg.share}
                expanded={open}
                onClick={() => onToggle(open ? null : seg.id)}
              />
              <div className={open ? 'acc-panel acc-panel--open' : 'acc-panel'}>
                <div className="acc-panel__inner">
                  <div className="acc-panel__content">
                    <div className="divider" />
                    <ImageSlot src={seg.image} alt={`${seg.name} 그림`} height={120} label={`GPT 이미지 · ${seg.name}`} />
                    <p>{seg.text}</p>
                    <button className="link-line" onClick={() => onSource(seg)}>
                      출처 보기
                      <Icon name="chevron-right" size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <p className="caption">{data.segmentsCaption}</p>
      <Button label="다음" onClick={onNext} />
      <Disclaimer />
    </div>
  )
}
