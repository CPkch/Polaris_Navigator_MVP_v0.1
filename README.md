# Polaris_Navigator_MVP_v0.1

삼성전자 하나를 질문 세 개로 이해하는 모바일 웹앱 MVP. 같은 기능을 디자인별로 폴더를 나눠 만든다.

| 폴더 | 내용 |
|---|---|
| `v1/` | A안 목록형 (피그마 파일 1, v4 페이지). 결정 기록은 `v1/DECISIONS.md` |
| `v2/` | Screens v1 민트 디자인 (피그마 파일 1, "3 Screens v1" 페이지). 기능은 v1과 같음. 결정 기록은 `v2/DECISIONS.md`. S1~S5 사진 흐름(시연용 흉내) 포함. |
| `docs/` | 모든 버전이 같이 쓰는 기준 문서 — 빌드 스펙(`POLARIS_MVP_SPEC.md`), 원본 데이터(`samsung.json`) |

## 실행

각 버전 폴더에서 따로 실행한다.

```
cd v1
npm install
npm run dev
```

`v1` 자리에 `v2`를 넣으면 v2가 뜬다.
