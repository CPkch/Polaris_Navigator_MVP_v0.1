import { useState } from 'react'
import { Icon } from '../icons'

interface ImageSlotProps {
  src: string
  alt: string
  height: number
  label: string
}

// 파일이 있으면 이미지, 없으면 회색 상자 (스펙 §4 ImageSlot)
export default function ImageSlot({ src, alt, height, label }: ImageSlotProps) {
  const [loaded, setLoaded] = useState(false)
  return (
    <div className="img-slot" style={{ height }}>
      <img
        src={src}
        alt={alt}
        style={loaded ? undefined : { display: 'none' }}
        onLoad={() => setLoaded(true)}
      />
      {!loaded && (
        <>
          <Icon name="image" />
          <span className="img-slot__label">{label}</span>
        </>
      )}
    </div>
  )
}
