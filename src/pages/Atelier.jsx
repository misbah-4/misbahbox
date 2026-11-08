import { useLayoutEffect, useRef, useState } from 'react'
import { gsap, prefersReducedMotion, ScrollTrigger, useGSAP } from '../lib/motion.js'

const TRACK_WIDTH = 2915
const TRACK_HEIGHT = 982
const INTRO = 'I am a Developer and Designer focused on bringing intuitive concepts to life.'

const getScale = () => Math.min(1.15, window.innerHeight / TRACK_HEIGHT)

function Image({ src, alt, left, top, width, height }) {
  return <img src={`/images/atelier/${src}.png`} alt={alt} className="absolute object-cover" style={{ left, top, width, height }} />
}

function VerticalLabel({ top, height, children }) {
  return (
    <div className="absolute flex w-[30px] items-center justify-center" style={{ left: 1575, top, height }}>
      <p className="-rotate-90 whitespace-nowrap text-[25.304px] leading-[1.2] text-ink">{children}</p>
    </div>
  )
}

function Atelier() {
  const section = useRef(null)
  const track = useRef(null)
  const [scale, setScale] = useState(getScale)
  const [pinned] = useState(() => !prefersReducedMotion())

  useLayoutEffect(() => {
    const update = () => setScale(getScale())
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  useGSAP(
    () => {
      if (!pinned) return

      gsap.to(track.current, {
        x: () => Math.min(0, window.innerWidth - track.current.offsetWidth),
        ease: 'none',
        scrollTrigger: {
          trigger: section.current,
          pin: true,
          scrub: true,
          start: 'top top',
          end: () => `+=${Math.max(0, track.current.offsetWidth - window.innerWidth)}`,
          invalidateOnRefresh: true,
        },
      })
      ScrollTrigger.refresh()
    },
    { scope: section, dependencies: [pinned, scale], revertOnUpdate: true },
  )

  return (
    <div>
      <section ref={section} className={`relative h-dvh ${pinned ? 'overflow-hidden' : 'no-scrollbar overflow-x-auto'}`}>
        <h1 className="sr-only">Atelier</h1>
        <div ref={track} className="relative" style={{ width: TRACK_WIDTH * scale, height: TRACK_HEIGHT * scale }}>
          <div className="absolute left-0 top-0 origin-top-left" style={{ width: TRACK_WIDTH, height: TRACK_HEIGHT, transform: `scale(${scale})` }}>
            <p className="absolute whitespace-nowrap text-[48px] italic leading-[1.28] tracking-[-0.006em] text-ink" style={{ left: 222, top: 453 }}>Welcome</p>
            <Image src="brand-os" alt="Brand OS landing page" left={490} top={327} width={238} height={347} />
            <p className="absolute w-[386px] text-[28px] leading-[1.2] tracking-[-0.006em] text-ink" style={{ left: 807, top: 440 }}>{INTRO}</p>
            <Image src="shoes" alt="Black leather slip-on shoes" left={1203} top={405} width={254} height={191} />
            <VerticalLabel top={256.2} height={46}>008</VerticalLabel>
            <VerticalLabel top={518.66} height={211}>Home baked Toasts</VerticalLabel>
            <div className="absolute overflow-hidden" style={{ left: 1615.76, top: 191, width: 313.307, height: 599 }}>
              <img src="/images/atelier/toasts.png" alt="Three slices of toast with jam" className="absolute left-[-32.54%] top-[-6.79%] h-[117.48%] w-[149.49%] max-w-none" />
            </div>
            <Image src="phone-orange" alt="Hand holding a phone against orange" left={2028} top={318} width={278} height={366} />
            <Image src="phone-blue" alt="Hand holding a phone against blue" left={2465} top={377} width={228} height={285} />
          </div>
        </div>
      </section>
    </div>
  )
}

export default Atelier
