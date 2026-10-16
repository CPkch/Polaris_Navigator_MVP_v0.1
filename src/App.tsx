import { useLayoutEffect, useRef, useState } from 'react'
import { data } from './data'
import M1 from './screens/M1'
import M2 from './screens/M2'
import M3 from './screens/M3'
import M4 from './screens/M4'
import X1, { type SourceView } from './screens/X1'

type MainScreen = 'M1' | 'M2' | 'M3' | 'M4'

const SENTENCE_KEY = 'polaris.sentence'

function loadSentence(): string {
  try {
    return localStorage.getItem(SENTENCE_KEY) ?? ''
  } catch {
    return ''
  }
}

export default function App() {
  const [screen, setScreen] = useState<MainScreen>('M1')
  // X1은 별도 화면 스택: 열 때 직전 화면과 스크롤 위치를 기억했다가 뒤로 가면 복원 (스펙 §7-2)
  const [sourceView, setSourceView] = useState<SourceView | null>(null)
  const savedScroll = useRef(0)
  const [sentence, setSentenceState] = useState(loadSentence)
  const [openSegment, setOpenSegment] = useState<string | null>(data.segments[0]?.id ?? null)

  const setSentence = (value: string) => {
    setSentenceState(value)
    try {
      localStorage.setItem(SENTENCE_KEY, value)
    } catch {
      // 저장 실패해도 화면 동작은 유지
    }
  }

  const openSource = (view: SourceView) => {
    savedScroll.current = window.scrollY
    setSourceView(view)
  }

  useLayoutEffect(() => {
    window.scrollTo(0, sourceView ? 0 : savedScroll.current)
  }, [sourceView])

  useLayoutEffect(() => {
    savedScroll.current = 0
    window.scrollTo(0, 0)
  }, [screen])

  if (sourceView) {
    return <X1 view={sourceView} onBack={() => setSourceView(null)} />
  }

  switch (screen) {
    case 'M1':
      return (
        <M1
          onNext={() => setScreen('M2')}
          onSource={() => openSource({ claim: data.verdict.answer, sourceId: data.verdict.sourceId })}
        />
      )
    case 'M2':
      return (
        <M2
          openId={openSegment}
          onToggle={setOpenSegment}
          onBack={() => setScreen('M1')}
          onNext={() => setScreen('M3')}
          onSource={(seg) => openSource({ claim: seg.text, sourceId: seg.sourceId })}
        />
      )
    case 'M3':
      return (
        <M3
          sentence={sentence}
          onChange={setSentence}
          onBack={() => setScreen('M2')}
          onDone={() => setScreen('M4')}
        />
      )
    case 'M4':
      return (
        <M4
          sentence={sentence}
          onBack={() => setScreen('M3')}
          onRestart={() => setScreen('M1')}
        />
      )
  }
}
