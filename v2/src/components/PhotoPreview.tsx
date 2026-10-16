import { Icon } from '../icons'

// 올린 사진 자리 (피그마 Photo Preview 16:59). 시연이라 항상 빈 상태.
export default function PhotoPreview({ height }: { height: number }) {
  return (
    <div className="photo-preview" style={{ height }}>
      <Icon name="image" size={28} />
      <span className="caption">올린 사진 미리보기</span>
    </div>
  )
}
