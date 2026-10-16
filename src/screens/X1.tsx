import { data } from '../data'
import { Icon } from '../icons'
import Header from '../components/Header'
import Disclaimer from '../components/Disclaimer'

// X1이 확인하는 대상: 문장 + 그 문장의 출처 ID (한 줄 답 → P1, 갈래 설명 → F1)
export interface SourceView {
  claim: string
  sourceId: string
}

export default function X1({ view, onBack }: { view: SourceView; onBack: () => void }) {
  const source = data.sources[view.sourceId]
  const hasText = source.text.trim().length > 0

  // 원문 문단에서 형광(근거 범위) 앞뒤를 가름. 못 찾으면 전체를 평문으로.
  let before = ''
  let after = ''
  let highlight = ''
  if (source.type === 'paragraph' && hasText && source.highlight) {
    const i = source.text.indexOf(source.highlight)
    if (i >= 0) {
      before = source.text.slice(0, i)
      highlight = source.highlight
      after = source.text.slice(i + source.highlight.length)
    }
  }

  return (
    <div className="screen">
      <Header title="이 문장은 어디서 왔나" onBack={onBack} />
      <div className="card">
        <p className="card__label">확인하는 문장</p>
        <p className="card__claim">{view.claim}</p>
        <p className="caption">
          {source.doc} › {source.section}
        </p>
      </div>
      <div className="card">
        <p className="card__label">원문</p>
        {source.type === 'paragraph' ? (
          hasText ? (
            highlight ? (
              <>
                {before && <p className="muted">{before}</p>}
                <div className="highlight">
                  <p>{highlight}</p>
                </div>
                {after && <p className="muted">{after}</p>}
              </>
            ) : (
              <p>{source.text}</p>
            )
          ) : (
            <p className="muted">원문 확인 중</p>
          )
        ) : (
          <p>{source.text}</p>
        )}
      </div>
      {highlight !== '' && <p className="caption">형광 = 이 문장의 근거</p>}
      <a className="option-row" href={source.url} target="_blank" rel="noopener noreferrer">
        <span className="option-row__icon">
          <Icon name="arrow-right" />
        </span>
        <span className="option-row__label">
          {source.type === 'paragraph' ? '공시 원문 보기' : '출처 페이지 보기'}
        </span>
        <Icon name="chevron-right" size={18} />
      </a>
      <div className="spacer" />
      <Disclaimer />
    </div>
  )
}
