import { useRef } from 'react'
import { data } from '../data'
import Shell from '../components/Shell'
import Header from '../components/Header'
import Progress from '../components/Progress'
import Button from '../components/Button'
import Disclaimer from '../components/Disclaimer'

interface M3Props {
  sentence: string
  onChange: (value: string) => void
  onBack: () => void
  onDone: () => void
}

export default function M3({ sentence, onChange, onBack, onDone }: M3Props) {
  const fieldRef = useRef<HTMLTextAreaElement>(null)

  // 칩: 커서 위치에 삽입, 뒤에 공백 (스펙 §5)
  const insertChip = (label: string) => {
    const el = fieldRef.current
    const start = el?.selectionStart ?? sentence.length
    const end = el?.selectionEnd ?? sentence.length
    const inserted = label + ' '
    onChange(sentence.slice(0, start) + inserted + sentence.slice(end))
    requestAnimationFrame(() => {
      if (!el) return
      el.focus()
      const pos = start + inserted.length
      el.setSelectionRange(pos, pos)
    })
  }

  return (
    <Shell
      top={
        <>
          <Header title={data.company.name} onBack={onBack} />
          <Progress step={3} />
        </>
      }
    >
      <div className="title-block">
        <h2>한 문장으로 설명해 보세요</h2>
        <p>칩을 누르면 글에 들어가요.</p>
      </div>
      <div className="chips">
        {data.chips.map((chip) => (
          <button
            key={chip}
            className={sentence.includes(chip) ? 'chip chip--on' : 'chip'}
            onClick={() => insertChip(chip)}
          >
            {chip}
          </button>
        ))}
      </div>
      <textarea
        ref={fieldRef}
        className="textarea"
        value={sentence}
        onChange={(e) => onChange(e.target.value)}
        placeholder="삼성전자는 …"
      />
      <div className="spacer" />
      <Button label="다 썼어요" onClick={onDone} disabled={sentence.trim().length === 0} />
      <Disclaimer />
    </Shell>
  )
}
