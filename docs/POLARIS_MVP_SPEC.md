# Polaris Navigator — MVP 빌드 스펙 v1.1 (2026-10-16, 정보 정리본)

> **주의 (2026-10-16 정리):** 이 스펙의 피그마 프레임 ID(v3 페이지, 46:xxx)와 §3 토큰 값은 낡았다.
> 프레임은 "3 Screens v4" 페이지(M1 48:895 · M2 48:907 · M2b 48:930 · M3 48:953 · M3b 48:969 · M4 48:985 · X1 48:996),
> 토큰은 총정리 §5 값(10/16 10:36 팔레트)을 쓴다. 버튼은 검정 알약 + 흰 글자, 초록 #1F9D55는 링크·진행 바·형광에만.

클로드 코드용. 이 파일과 `samsung.json`만으로 MVP를 만든다.
피그마(목록형 UI, 기준): https://www.figma.com/design/3cYwjtDxjqvJNtkXhIMouR → 페이지 "3 Screens v3", 프레임 M1 46:637 · M2 46:690 · M2b 46:791 · M3 46:892 · M3b 46:941 · M4 46:990 · X1 46:1027
피그마(3D 디오라마 콘셉트, 탐색 중): https://www.figma.com/design/H9Nxe6b7vL2ctgpSvW1b9s — 콘셉트가 확정되면 M1+M2가 D0/D1로 바뀐다(§8).

## 0. 한 줄
삼성전자 하나를 질문 세 개로 이해하는 모바일 웹앱. 런타임에 LLM·서버·로그인 없음. 데이터는 `samsung.json` 하나.

## 1. 범위 (이것만)
- 화면 5장: M1 무엇을 하는 곳인가 → M2 어떻게 돈을 벌까 → M3 한 문장으로 → M4 다 봤어요, 그리고 X1 출처 원문(M1·M2에서 열림)
- 뺀 것: 시작 화면, 오류 화면(정적 데이터), 탭 바, 검색, 설정, 로그인, 다른 종목, 사진 업로드·포트폴리오, 데스크톱, 헤더 오른쪽 아이콘, 진행 막대의 단계 이름, 화면 안 설명 문구, 매출·영업이익 숫자, 부문 코드(DX/DS)
- 저장은 M3에서 쓴 문장 하나 → `localStorage['polaris.sentence']`

## 2. 스택
- Vite + React + TypeScript. 라우터 없이 `screen` 상태 하나 (`'M1'|'M2'|'M3'|'M4'|'X1'`), X1은 돌아갈 화면을 기억
- CSS 변수 + CSS 파일 하나. UI 라이브러리 없음. 아이콘은 인라인 SVG(stroke 2, 라운드)
- 폰트 Noto Sans KR(Google Fonts). 390px 기준, 최대 430px 가운데 정렬
- 파일: `src/App.tsx`, `src/screens/{M1,M2,M3,M4,X1}.tsx`, `src/components/{Header,Progress,DarkCard,Row,Button,Disclaimer,ImageSlot}.tsx`, `src/data/samsung.json`, `src/styles.css`

## 3. 토큰 (피그마 변수 "Polaris"와 같음)
```
--bg-canvas:#F2F2F3  --bg-sheet:#FFFFFF  --bg-subtle:#F6F6F7  --bg-field:#EFEFF1
--surface-dark:#0F1411  --surface-dark-2:#1C3A2A   (어두운 카드 = linear-gradient(135deg, dark, dark-2))
--accent:#05F067  --accent-deep:#0A8F4C
--text:#121212  --text-2:#6B6F73  --text-3:#9DA1A6  --on-dark:#FFFFFF  --on-dark-2:#A9B8AE
--border:#E7E7EA  --border-strong:#CFCFD4
--industry-1:#0F7B6C(반도체) --industry-2:#1D4ED8(스마트폰·TV·가전) --industry-3:#C2410C(디스플레이) --industry-4:#7C3AED(자동차 부품·오디오)
간격 4/8/12/16/20/24/32 · 모서리 8/14/16/20/pill · 그림자 없음
글꼴 Title 22 Bold / Heading 18 Bold / Body 15 / Body Strong 15 Medium / Caption 13 / Label 12 Medium
```
초록은 버튼·진행 바·형광에만. 산업 색은 행 왼쪽 원(색 14% 배경 + 같은 색 아이콘)에만. 등락 초록·빨강 없음.

## 4. 공통 부품
- Header: 왼쪽 뒤로(40px 흰 원, M1에서는 없음) · 가운데 제목(18 Bold). 오른쪽 없음
- Progress: "1 / 3"(12, text-2) 위, 6px 막대(배경 field, 값 accent). 값 너비 1/3·2/3·3/3
- DarkCard: 그라데이션, 모서리 20, 패딩 20. 질문(12, on-dark-2) → 답(22 Bold, white). 출처 줄 없음
- Row: 흰, 모서리 16, 패딩 12/14. 왼쪽 40px 산업 원+아이콘, 이름(15 Medium), 오른쪽 비중(15 Medium). 부제 없음
- Button: 초록 알약, 높이 52, 15 Medium #121212. 비활성: 배경 field, 글자 text-3
- Disclaimer: 13, text-3, 가운데. `disclaimer` 문구 고정. 화면마다 맨 아래 한 번
- 링크 줄: 13 accent-deep + 14px chevron, 오른쪽 정렬
- ImageSlot: 배경 field, 모서리 16. 파일이 있으면 이미지, 없으면 회색 상자

## 5. 화면 (공통: 상단 14 · 좌우 24 · 블록 간격 16 · 하단 24. 길면 세로 스크롤)
- M1: Header("삼성전자") → Progress 1/3 → DarkCard(`verdict`) → 링크 "이 문장의 출처 보기" → X1 → ImageSlot 342×180(`images.m1`) → Button "다음" → M2 → Disclaimer
- M2: Header(뒤로→M1) → Progress 2/3 → "어떻게 돈을 벌까?"(22 Bold) + "네 갈래예요. 눌러서 펼쳐 보세요."(15, text-2) → `segments` Row 4개(아코디언, 처음엔 첫 행 펼침, 한 번에 하나) → `segmentsCaption`(13, text-3) → Button "다음" → M3 → Disclaimer
  - 펼침 패널(행 아래, 위 모서리 0/아래 16, 패딩 16): 1px 구분선 → ImageSlot 310×120(`segment.image`) → `segment.text`(15) → 링크 "출처 보기" → X1. 0.25s ease
- M3: Header(뒤로→M2) → Progress 3/3 → "한 문장으로 설명해 보세요" + "칩을 누르면 글에 들어가요." → `chips` 4개(알약, subtle 배경 + border, 13) → textarea(흰, border, 모서리 14, 높이 120, placeholder "삼성전자는 …") → Button "다 썼어요"(빈 입력이면 비활성) → M4 → Disclaimer
  - 칩을 누르면 커서 위치에 삽입(뒤에 공백). 입력은 즉시 localStorage
- M4: Header("다 봤어요", 뒤로→M3) → DarkCard("내가 쓴 한 문장", 저장된 문장) → 흰 카드: "회사 한 줄 요약"(13, text-2) · `verdict.answer`(15 Medium) · "비슷하면 잘 읽은 거예요. 다르면 2번을 다시 봐요."(13, text-3) → Button "처음으로" → M1(문장 유지) → Disclaimer
- X1: Header("이 문장은 어디서 왔나", 뒤로→직전 화면) → 흰 카드: "확인하는 문장"(13) · 문장(18 Bold) · "2025 사업보고서 › 주요 사업의 내용"(13, text-3) → 흰 카드: "원문"(13) · 앞부분(15, text-3) · 형광(accent 22% 배경, 모서리 8, 패딩 6/8, 15) · 뒷부분 → "형광 = 이 문장의 근거"(13, text-3) → Row "DART에서 원문 보기" → 새 탭 `source.url` → Disclaimer
  - `sources.P1.text`가 비어 있으면 원문 카드에 "원문 확인 중"만 표시

## 6. 데이터 규칙
- 모든 문장·숫자는 `samsung.json`에서만. 코드에 하드코딩 금지. 숫자는 값 그대로(계산·반올림 없음)
- 금지어(`forbiddenWords`)가 `disclaimer`·`forbiddenWords`를 뺀 JSON 어디에든 있으면 빌드 실패

## 7. 완료 조건
1. M1 → M2 → M3 → M4 → M1이 버튼만으로 돌아간다
2. M1·M2에서 X1이 열리고 뒤로 가면 원래 자리(스크롤 포함)로 돌아온다
3. M3 빈 입력이면 버튼 비활성, 새로고침해도 문장이 남아 있다
4. 390px에서 가로 스크롤 없음, 토큰 밖의 색·크기 없음, 그림자 없음
5. 금지어 검사 통과, 고지 문구가 모든 화면 맨 아래 한 번
6. 이미지 자리는 파일이 없으면 회색 상자, 있으면 이미지

## 8. 3D 디오라마 콘셉트가 확정되면 (아직 미확정)
- M1+M2 → D0 하나: Header → 안내 한 줄 → 디오라마 이미지 390×400(`images.diorama`) + 건물 위 Pin 4개(`segments.name` · `share`, dot 색 = 산업 색) → DarkCard(`verdict`) → 출처 링크 → Button "한 문장으로 설명해 보기" → M3
- Pin을 누르면 D1: 배경 25% 어둡게 + Bottom Sheet(이름 · 비중 · `segment.text` · 출처 링크). 시트 밖을 누르면 닫힘
- Pin 좌표는 `segments[].pin: {x, y}`로 JSON에 추가. 디오라마는 PNG 2배(780×800)
- M3·M4·X1은 그대로
