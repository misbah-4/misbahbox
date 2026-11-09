import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { Draggable, gsap, prefersReducedMotion, useGSAP } from '../lib/motion.js'

const STAGE_HEIGHT = 982
const LOOP_WIDTH = 2693
const OFFSCREEN_MARGIN = 450
const MAX_SQUEEZE = 0.2
const PREVIEW_DURATION = 0.6
const PREVIEW_FILL = 0.86
const INTRO = 'I am a Developer and Designer focused on bringing intuitive concepts to life.'

const getScale = () => Math.min(1.15, window.innerHeight / STAGE_HEIGHT)
const wrapX = gsap.utils.wrap(-OFFSCREEN_MARGIN, LOOP_WIDTH - OFFSCREEN_MARGIN)

const PreviewContext = createContext(null)

function PreviewButton({ src, alt, children }) {
  const open = useContext(PreviewContext)

  return (
    <button type="button" aria-label={`Preview: ${alt}`} onClick={(event) => open(event.currentTarget, src, alt)} className="block size-full cursor-pointer">
      {children}
    </button>
  )
}

function Item({ left, top, width, height, children }) {
  return (
    <div data-item data-left={left} data-width={width} className="absolute left-0 will-change-transform" style={{ top, width, height }}>
      {children}
    </div>
  )
}

function Picture({ src, alt, ...box }) {
  return (
    <Item {...box}>
      <PreviewButton src={`/images/atelier/${src}.webp`} alt={alt}>
        <img src={`/images/atelier/${src}.webp`} alt={alt} className="size-full object-cover" />
      </PreviewButton>
    </Item>
  )
}

function VerticalLabel({ top, height, children }) {
  return (
    <Item left={1575} top={top} width={30} height={height}>
      <div className="flex size-full items-center justify-center">
        <p className="-rotate-90 whitespace-nowrap text-[25.304px] leading-[1.2] text-ink">{children}</p>
      </div>
    </Item>
  )
}

function Atelier() {
  const section = useRef(null)
  const proxy = useRef(null)
  const dragged = useRef(false)
  const overlay = useRef(null)
  const backdrop = useRef(null)
  const previewImage = useRef(null)
  const opened = useRef(null)
  const [scale, setScale] = useState(getScale)
  const scaleRef = useRef(scale)

  useEffect(() => {
    const update = () => {
      scaleRef.current = getScale()
      setScale(scaleRef.current)
    }
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  const previewDuration = () => (prefersReducedMotion() ? 0 : PREVIEW_DURATION)

  const openPreview = (button, src, alt) => {
    if (dragged.current || opened.current) return

    const from = button.getBoundingClientRect()
    const { naturalWidth, naturalHeight } = button.querySelector('img')
    const fit = Math.min((window.innerWidth * PREVIEW_FILL) / naturalWidth, (window.innerHeight * PREVIEW_FILL) / naturalHeight)
    const width = naturalWidth * fit
    const height = naturalHeight * fit

    opened.current = button
    previewImage.current.src = src
    previewImage.current.alt = alt
    gsap.set(overlay.current, { display: 'block' })
    gsap.set(button, { visibility: 'hidden' })
    overlay.current.focus()

    const duration = previewDuration()
    gsap.fromTo(backdrop.current, { opacity: 0 }, { opacity: 1, duration, ease: 'power2.out' })
    gsap.fromTo(
      previewImage.current,
      { left: from.left, top: from.top, width: from.width, height: from.height },
      { left: (window.innerWidth - width) / 2, top: (window.innerHeight - height) / 2, width, height, duration, ease: 'power3.inOut' },
    )
  }

  const closePreview = () => {
    const button = opened.current
    if (!button) return

    const to = button.getBoundingClientRect()
    const duration = previewDuration()
    gsap.to(backdrop.current, { opacity: 0, duration, ease: 'power2.in' })
    gsap.to(previewImage.current, {
      left: to.left,
      top: to.top,
      width: to.width,
      height: to.height,
      duration,
      ease: 'power3.inOut',
      onComplete: () => {
        gsap.set(button, { visibility: 'visible' })
        gsap.set(overlay.current, { display: 'none' })
        opened.current = null
        button.focus({ preventScroll: true })
      },
    })
  }

  const closeRef = useRef(closePreview)

  useEffect(() => {
    closeRef.current = closePreview
  })

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') closeRef.current()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  useGSAP(
    () => {
      const reduced = prefersReducedMotion()
      const items = gsap.utils.toArray('[data-item]')
      const getDragX = () => gsap.getProperty(proxy.current, 'x')
      let lastX = 0
      let speed = 0
      let direction = -1

      const [draggable] = Draggable.create(proxy.current, {
        trigger: section.current,
        type: 'x',
        inertia: !reduced,
        cursor: 'grab',
        activeCursor: 'grabbing',
        dragClickables: true,
        onPress() {
          dragged.current = false
        },
        onDragStart() {
          dragged.current = true
        },
      })

      const render = () => {
        const dragX = getDragX()
        const delta = dragX - lastX
        lastX = dragX
        if (delta) direction = Math.sign(delta)
        speed += (Math.min(Math.abs(delta) / 60, 1) - speed) * 0.12

        const stageScale = scaleRef.current
        const viewport = window.innerWidth / stageScale

        items.forEach((item) => {
          const width = Number(item.dataset.width)
          const x = wrapX(Number(item.dataset.left) + dragX / stageScale)
          const position = gsap.utils.clamp(0, 1, (x + width / 2) / viewport)
          const leading = direction < 0 ? position : 1 - position
          const squeeze = reduced ? 1 : 1 - MAX_SQUEEZE * speed * (0.3 + 0.7 * leading)

          item.style.transform = `translate3d(${x}px, 0, 0) scale(${squeeze})`
        })
      }

      render()
      gsap.ticker.add(render)
      return () => {
        gsap.ticker.remove(render)
        draggable.kill()
      }
    },
    { scope: section },
  )

  return (
    <PreviewContext.Provider value={openPreview}>
    <section ref={section} className="relative h-dvh touch-pan-y select-none overflow-hidden [&_img]:[-webkit-user-drag:none]">
      <h1 className="sr-only">Atelier</h1>
      <div ref={proxy} className="hidden" />
      <div className="absolute left-0 top-0 origin-top-left" style={{ height: STAGE_HEIGHT, transform: `scale(${scale})` }}>
        <Item left={222} top={453} width={200} height={61}>
          <p className="whitespace-nowrap text-[48px] italic leading-[1.28] tracking-[-0.006em] text-ink">Welcome</p>
        </Item>
        <Picture src="brand-os" alt="Brand OS landing page" left={490} top={327} width={238} height={347} />
        <Item left={807} top={440} width={386} height={102}>
          <p className="text-[28px] leading-[1.2] tracking-[-0.006em] text-ink">{INTRO}</p>
        </Item>
        <Picture src="shoes" alt="Black leather slip-on shoes" left={1203} top={405} width={254} height={191} />
        <VerticalLabel top={256.2} height={46}>008</VerticalLabel>
        <VerticalLabel top={518.66} height={211}>Home baked Toasts</VerticalLabel>
        <Item left={1615.76} top={191} width={313.307} height={599}>
          <PreviewButton src="/images/atelier/toasts.webp" alt="Three slices of toast with jam">
            <span className="relative block size-full overflow-hidden">
              <img src="/images/atelier/toasts.webp" alt="Three slices of toast with jam" className="absolute left-[-32.54%] top-[-6.79%] h-[117.48%] w-[149.49%] max-w-none" />
            </span>
          </PreviewButton>
        </Item>
        <Picture src="phone-orange" alt="Hand holding a phone against orange" left={2028} top={318} width={278} height={366} />
        <Picture src="phone-blue" alt="Hand holding a phone against blue" left={2465} top={377} width={228} height={285} />
      </div>
    </section>
    <div ref={overlay} role="dialog" aria-modal="true" aria-label="Image preview" tabIndex={-1} onClick={closePreview} className="fixed inset-0 z-30 hidden cursor-zoom-out outline-none">
      <div ref={backdrop} className="absolute inset-0 bg-page" />
      <img ref={previewImage} alt="" className="fixed max-w-none object-cover" />
    </div>
    </PreviewContext.Provider>
  )
}

export default Atelier
