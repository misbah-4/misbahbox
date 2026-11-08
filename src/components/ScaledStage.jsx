import { useLayoutEffect, useRef, useState } from 'react'

// Holds a fixed Figma composition and shrinks it to fit narrower containers.
function ScaledStage({ width, height, minScale = 0, children }) {
  const ref = useRef(null)
  const [scale, setScale] = useState(1)

  useLayoutEffect(() => {
    const observer = new ResizeObserver(([entry]) => {
      setScale(Math.min(1, Math.max(minScale, entry.contentRect.width / width)))
    })
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [width, minScale])

  return (
    <div ref={ref} className="relative w-full" style={{ height: height * scale }}>
      <div
        className="absolute left-1/2 top-0 origin-top"
        style={{ width, height, transform: `translateX(-50%) scale(${scale})` }}
      >
        {children}
      </div>
    </div>
  )
}

export default ScaledStage
