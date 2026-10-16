import { useCallback, useLayoutEffect, useRef, useState } from 'react'
import { data } from './data'
import S1 from './screens/S1'
import S3 from './screens/S3'
import S4 from './screens/S4'
import S5 from './screens/S5'
import M1 from './screens/M1'
import M2 from './screens/M2'
import M3 from './screens/M3'
import M4 from './screens/M4'
import X1, { type SourceView } from './screens/X1'

// S2(사진 선택 시트)는 S1 안의 오버레이라 별도 화면이 아님
type MainScreen = 'S1' | 'S3' | 'S4' | 'S5' | 'M1' | 'M2' | 'M3' | 'M4'

const SENTENCE_KEY = 'polaris.sentence'

function loadSentence(): string {
  try {
    return localStorage.getItem(SENTENCE_KEY) ?? ''
  } catch {
    return ''
  }
}

export default function App() {
  const [screen, setScreen] = useState<MainScreen>('S1')
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

  // S3의 타이머 effect가 매 렌더마다 다시 걸리지 않도록 고정
  const goS4 = useCallback(() => setScreen('S4'), [])

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
    case 'S1':
      return <S1 onPick={() => setScreen('S3')} onExample={() => setScreen('S5')} />
    case 'S3':
      return <S3 onBack={() => setScreen('S1')} onDone={goS4} />
    case 'S4':
      return <S4 onBack={() => setScreen('S1')} onNext={() => setScreen('S5')} onRetry={() => setScreen('S1')} />
    case 'S5':
      return <S5 onBack={() => setScreen('S1')} onAnalyze={() => setScreen('M1')} />
    case 'M1':
      return (
        <M1
          onBack={() => setScreen('S5')}
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
          onRestart={() => setScreen('S1')}
        />
      )
  }
}
