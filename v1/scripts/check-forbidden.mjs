// 스펙 §6: disclaimer·forbiddenWords를 뺀 JSON 어디에든 금지어가 있으면 빌드 실패
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const root = dirname(dirname(fileURLToPath(import.meta.url)))
const data = JSON.parse(readFileSync(join(root, 'src/data/samsung.json'), 'utf8'))

const words = data.forbiddenWords ?? []
const hits = []

function walk(node, path) {
  if (typeof node === 'string') {
    for (const w of words) {
      if (node.includes(w)) hits.push({ path, word: w, text: node })
    }
  } else if (Array.isArray(node)) {
    node.forEach((v, i) => walk(v, `${path}[${i}]`))
  } else if (node && typeof node === 'object') {
    for (const [k, v] of Object.entries(node)) {
      if (path === '' && (k === 'disclaimer' || k === 'forbiddenWords')) continue
      walk(v, path ? `${path}.${k}` : k)
    }
  }
}

walk(data, '')

if (hits.length > 0) {
  console.error('금지어 발견:')
  for (const h of hits) console.error(`  ${h.path}: "${h.word}" ← ${h.text}`)
  process.exit(1)
}
console.log('금지어 검사 통과')
