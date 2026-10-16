import raw from './data/samsung.json'
import type { IconName } from './icons'

export interface Segment {
  id: string
  name: string
  share: string
  icon: IconName
  color: string
  text: string
  sourceId: string
  image: string
}

export interface Source {
  type: 'paragraph' | 'figure'
  doc: string
  section: string
  text: string
  highlight?: string
  url: string
  status?: string
}

export interface Data {
  company: { name: string; ticker: string; market: string; industry: string; basis: string }
  verdict: { question: string; answer: string; sourceId: string }
  segments: Segment[]
  segmentsCaption: string
  chips: string[]
  sources: Record<string, Source>
  images: { m1: string; diorama: string }
  disclaimer: string
  forbiddenWords: string[]
}

export const data = raw as Data
