import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import ArrowLink from '../components/ArrowLink.jsx'
import ScaledStage from '../components/ScaledStage.jsx'
import Greeting, { GREETING_WIDTH, greetingTimeline } from '../components/Greeting.jsx'
import Skater, { PUSH, SKATER_FRAMES, SKATER_RATIO } from '../components/Skater.jsx'
import { moodboardLabel, selectedWorks, sideProjects, testimonials } from '../data/site.js'
import { Draggable, gsap, prefersReducedMotion, ScrollTrigger, useGSAP } from '../lib/motion.js'
import { armSkateSound, playPush, setRolling } from '../lib/skateSound.js'

const PHONE_STAGE_SCALE = 0.78
const ORBIT_EDGE_MARGIN = 70
const ORBIT_RADIUS = 430
const STAGE = { width: 575, height: 337 }

// The green guy rolls in from the right, pushes twice in the middle, then rolls out left.
// Sized so the drawing (238 of each frame's 248px) stands 150px tall, the same as "Hello".
const SKATER = { width: 199, enter: 1, hold: PUSH * 2, exit: 0.9 }
const SKATE_DURATION = SKATER.enter + SKATER.hold + SKATER.exit
// In the reference his foot meets the ground on frame 2 of each push.
const PUSH_FRAME = 2

// Once he is gone, "Hello" unfolds and plays. Then the deck cuts through these, and he rolls back in.
// On phones the greeting shrinks to keep the 16px page gutter.
const GREETING_SIZE = 150

const DECK = { width: 206, height: 300, beat: 0.55, enter: 0.3, exit: 0.25 }
const DECK_CARDS = [
  { src: 'card-5', rotate: -1.5 },
  { src: 'card-2', rotate: 1.2 },
  { src: 'card-6', rotate: -0.8 },
  { src: 'card-3', rotate: 1.8 },
  { src: 'card-4', rotate: -1.2 },
  { src: 'card-1', rotate: 0.9 },
]
const DECK_DURATION = DECK.beat * DECK_CARDS.length
const CYCLE_DURATION = SKATE_DURATION + DECK_DURATION // the greeting's length is added once it is built

// Words sit across the deck's edges: dark on the page, white where they cross the images.
function DeckLabel({ className }) {
  const [before, after] = moodboardLabel

  return (
    <div className={`absolute inset-0 text-[14px] uppercase leading-none max-sm:text-[16px] ${className}`}>
      <span className="absolute left-[-44px] top-1/2 -translate-y-1/2 whitespace-nowrap max-sm:left-[-66px]">{before}</span>
      <span className="absolute left-[151px] top-1/2 -translate-y-1/2 whitespace-nowrap">{after}</span>
    </div>
  )
}

function Showcase() {
  const scope = useRef(null)
  const [reduced] = useState(prefersReducedMotion)

  useGSAP(
    () => {
      if (reduced) return undefined

      const skater = scope.current.querySelector('[data-skater]')
      const strip = scope.current.querySelector('[data-skater-strip]')
      const disarm = armSkateSound()
      let lastFrame = -1
      const deck = scope.current.querySelector('[data-deck]')
      const deckCards = gsap.utils.toArray('[data-deck-card]')
      const greeting = greetingTimeline(scope.current.querySelector('[data-greeting]'))
      const greetingEnd = SKATE_DURATION + greeting.duration()
      const cycle = CYCLE_DURATION + greeting.duration()
      // On phones the skater enters just past the screen edge instead of far outside it.
      const orbit = Math.min(ORBIT_RADIUS, (window.innerWidth / 2 + ORBIT_EDGE_MARGIN) / PHONE_STAGE_SCALE)
      let elapsed = 0
      let active = true

      const trigger = ScrollTrigger.create({
        trigger: scope.current,
        start: 'top bottom',
        end: 'bottom top',
        onToggle: (self) => {
          active = self.isActive
        },
      })

      const tick = (_time, deltaTime) => {
        if (!active) {
          setRolling(0)
          return
        }
        elapsed += deltaTime / 1000
        const time = elapsed % cycle
        const deckTime = time - greetingEnd
        greeting.time(gsap.utils.clamp(0, greeting.duration(), time - SKATE_DURATION))

        if (deckTime >= 0) {
          const current = Math.min(Math.floor(deckTime / DECK.beat), deckCards.length - 1)
          const entering = gsap.utils.clamp(0, 1, deckTime / DECK.enter)
          const leaving = gsap.utils.clamp(0, 1, (DECK_DURATION - deckTime) / DECK.exit)
          const presence = gsap.parseEase('power2.out')(Math.min(entering, leaving))

          deck.style.visibility = 'visible'
          deck.style.opacity = presence
          deck.style.transform = `scale(${0.92 + 0.08 * presence})`
          deckCards.forEach((card, index) => {
            card.style.zIndex = deckCards.length - ((current - index + deckCards.length) % deckCards.length)
          })
        } else {
          deck.style.visibility = 'hidden'
        }

        if (time >= SKATE_DURATION) {
          skater.style.visibility = 'hidden'
          setRolling(0)
          lastFrame = -1
          return
        }

        // One frame every 100ms, and a kick sound the moment his foot lands.
        const frame = Math.floor((time % PUSH) / (PUSH / SKATER_FRAMES))
        if (frame !== lastFrame) {
          strip.style.transform = `translate3d(${(-100 * frame) / SKATER_FRAMES}%, 0, 0)`
          if (frame === PUSH_FRAME) playPush()
          lastFrame = frame
        }
        const rollOut = time - SKATER.enter - SKATER.hold
        let x = 0
        if (time < SKATER.enter) x = orbit * (1 - gsap.parseEase('power2.out')(time / SKATER.enter))
        else if (rollOut > 0) x = -orbit * gsap.parseEase('power2.in')(rollOut / SKATER.exit)
        skater.style.visibility = 'visible'
        skater.style.transform = `translate3d(${x}px, 0, 0)`
        // The rumble grows as he rolls on screen and fades as he leaves.
        setRolling(1 - Math.min(1, Math.abs(x) / orbit) * 0.8)
      }

      gsap.ticker.add(tick)
      return () => {
        gsap.ticker.remove(tick)
        disarm()
        greeting.kill()
        trigger.kill()
      }
    },
    { scope },
  )

  return (
    <div ref={scope} className="overflow-x-clip px-page pt-[102px]">
      <ScaledStage width={STAGE.width} height={STAGE.height} minScale={PHONE_STAGE_SCALE}>
        <div
          data-skater
          className="absolute left-1/2 top-1/2 text-ink will-change-transform"
          style={{ width: SKATER.width, marginLeft: -SKATER.width / 2, marginTop: (-SKATER.width * SKATER_RATIO) / 2, visibility: reduced ? 'visible' : 'hidden' }}
        >
          <Skater className="block w-full" />
        </div>
        {!reduced && (
          <div
            className="absolute top-1/2 -translate-y-1/2"
            style={{ fontSize: `min(${GREETING_SIZE}px, calc((100vw - 32px) / ${PHONE_STAGE_SCALE * GREETING_WIDTH}))`, left: `calc(50% - ${GREETING_WIDTH / 2}em)` }}
          >
            <Greeting className="invisible" />
          </div>
        )}
        {!reduced && (
          <div
            data-deck
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 invisible will-change-transform"
            style={{ width: DECK.width, height: DECK.height, marginLeft: -DECK.width / 2, marginTop: -DECK.height / 2 }}
          >
            <DeckLabel className="z-0 text-ink" />
            {DECK_CARDS.map(({ src, rotate }) => (
              <img
                key={src}
                data-deck-card
                src={`/images/home/${src}.webp`}
                alt=""
                className="absolute inset-0 size-full object-cover"
                style={{ rotate: `${rotate}deg` }}
              />
            ))}
            <DeckLabel className="z-10 overflow-hidden text-white mix-blend-difference" />
          </div>
        )}
      </ScaledStage>
    </div>
  )
}

function Intro() {
  return (
    <section className="mx-auto mt-16 flex max-w-[1512px] flex-col gap-10 px-page lg:flex-row lg:items-start lg:justify-between">
      <div data-reveal className="flex w-full max-w-[644px] flex-col items-start gap-[34px]">
        <h1 className="text-h1 font-medium leading-[1.2] tracking-[0.01em] text-black">
          I’m a Product Designer / <span className="text-soft">Engineer.</span>
        </h1>
        {/* Colours from the "+20%" pill in the wallet reference; the green is a shade darker to pass 4.5:1 contrast. */}
        <p className="rounded-3xl bg-[#dcf9e4] px-4 py-2 text-[16px] leading-[1.4] md:text-[18px] tracking-[0.02em] text-[#317845]">Open to work</p>
      </div>
      <div data-reveal className="flex w-full max-w-[531px] flex-col items-start gap-8 lg:gap-12">
        <p className="text-body-lg leading-[1.4] tracking-[0.02em] text-black lg:h-[92px]">
          I design and build <u className="decoration-from-font">web</u> and{' '}
          <u className="decoration-from-font">mobile products</u> for startups, across commerce, AI, fashion and productivity tools.
        </p>
        <div className="tracking-[0.02em]">
          <ArrowLink href="https://concrete-insect-dc1.notion.site/About-Me-418d16188a5780a2a5ead827a5ab73d7?pvs=73">Know more about me</ArrowLink>
        </div>
      </div>
    </section>
  )
}

const WORK_IMAGE = {
  placeam: (
    <div className="absolute inset-0 bg-mist">
      <img loading="lazy" decoding="async" src="/images/home/placeam.webp" alt="Placeam mobile shopping screens" className="absolute left-1/2 top-[10.66%] w-[97.04%] -translate-x-1/2" />
    </div>
  ),
  fleetkit: <img loading="lazy" decoding="async" src="/images/home/fleetkit.webp" alt="Fleetkit wordmark on violet" className="absolute inset-0 size-full object-cover" />,
  acemyx: (
    <div className="absolute inset-0 overflow-hidden bg-stone">
      <div className="absolute left-[14.42%] top-[38.11%] h-[98.67%] w-[83.55%] overflow-hidden rounded-lg">
        <img loading="lazy" decoding="async" src="/images/home/acemyx.webp" alt="Acemyx analytics dashboard" className="absolute left-[-3.54%] top-[-26.49%] h-[126.49%] w-[103.54%] max-w-none" />
      </div>
    </div>
  ),
}

function WorkCard({ name, cta, to, href }) {
  const image = (
    <div className="relative aspect-[541/375] w-full origin-bottom overflow-hidden transition-transform duration-300 ease-out group-hover/card:scale-[1.02]">
      {WORK_IMAGE[name]}
    </div>
  )

  return (
    <article className="group/card flex w-[min(84vw,541px)] shrink-0 flex-col items-center gap-6 lg:w-[541px]">
      {to && <Link to={to} aria-label={`${name} case study`} className="block w-full">{image}</Link>}
      {href && <a href={href} target="_blank" rel="noreferrer" aria-label={`${name} live site`} className="block w-full">{image}</a>}
      {!to && !href && image}
      <div className="flex w-full items-center justify-between gap-4 px-4 max-md:*:text-[14px] md:*:text-[18px] lg:w-[461px] lg:px-0">
        <h3 className="text-base-lg font-medium uppercase leading-6 text-ink">{name}</h3>
        <ArrowLink to={to} href={href}>{cta}</ArrowLink>
      </div>
    </article>
  )
}

const WHEEL_SETTLE_MS = 200

function SelectedWorks() {
  const track = useRef(null)
  const dragged = useRef(false)

  useGSAP(() => {
    const media = gsap.matchMedia()

    // Touch screens keep native swiping; a mouse drags the row.
    media.add('(pointer: fine)', () => {
      const getBounds = () => ({
        minX: Math.min(0, document.documentElement.clientWidth - track.current.scrollWidth),
        maxX: 0,
      })

      const [draggable] = Draggable.create(track.current, {
        type: 'x',
        bounds: getBounds(),
        inertia: !prefersReducedMotion(),
        edgeResistance: 0.85,
        dragClickables: true,
        cursor: 'grab',
        activeCursor: 'grabbing',
        onPress() {
          dragged.current = false
          this.applyBounds(getBounds())
        },
        onDragStart() {
          dragged.current = true
        },
      })

      // Trackpad sideways swipes and Shift + wheel move the row too; a plain wheel still scrolls the page.
      let target = 0
      let lastWheel = 0
      const moveTo = gsap.quickTo(track.current, 'x', { duration: 0.5, ease: 'power3.out', onUpdate: () => draggable.update() })
      const onWheel = (event) => {
        const sideways = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.shiftKey ? event.deltaY : 0
        if (!sideways) return
        event.preventDefault()
        event.stopPropagation()
        const now = performance.now()
        if (now - lastWheel > WHEEL_SETTLE_MS) target = Number(gsap.getProperty(track.current, 'x'))
        lastWheel = now
        const { minX } = getBounds()
        target = gsap.utils.clamp(minX, 0, target - sideways)
        moveTo(target)
      }
      const row = track.current.parentElement
      row.addEventListener('wheel', onWheel, { passive: false })

      return () => {
        row.removeEventListener('wheel', onWheel)
        draggable.kill()
      }
    })

    return () => media.revert()
  })

  const blockClickAfterDrag = (event) => {
    if (dragged.current) event.preventDefault()
  }

  return (
    <section className="mt-20 overflow-x-clip lg:mt-[142px]">
      <h2 data-reveal className="mx-auto max-w-[1512px] px-page text-h3 leading-[1.4] text-black">Selected Works</h2>
      <div data-reveal className="no-scrollbar mt-6 overflow-x-auto pointer-fine:overflow-visible lg:mt-10">
        <div ref={track} onClickCapture={blockClickAfterDrag} className="flex w-max select-none gap-2 [&_img]:[-webkit-user-drag:none]">
          {selectedWorks.map((work) => <WorkCard key={work.name} {...work} />)}
        </div>
      </div>
    </section>
  )
}

function SideProjects() {
  return (
    <section className="mx-auto mt-20 max-w-[1512px] px-page lg:mt-[97px]">
      <div className="flex max-w-[1339px] flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
        <div data-reveal className="flex items-center gap-2">
          <h2 className="whitespace-nowrap text-body-lg leading-[1.4] text-black">Cool stuff I’ve done</h2>
          <img src="/images/icons/arrow-large.svg" alt="" width="24" height="24" className="-scale-y-100" />
        </div>
        <ul data-reveal className="w-full max-w-[623px]">
          {sideProjects.map(({ label, href }, index) => (
            <li
              key={label}
              className={`text-body-lg leading-[1.4] transition-colors duration-200 hover:text-black ${index === 0 ? 'text-black' : 'text-muted'}`}
            >
              {index > 0 && <img src="/images/icons/divider.svg" alt="" className="my-[13px] block h-px w-full" />}
              {href ? (
                <a href={href} target="_blank" rel="noreferrer" className="group relative inline-flex items-center gap-1 before:absolute before:inset-x-0 before:-inset-y-2.5">
                  {label}
                  <img src="/images/icons/arrow-up-right.svg" alt="" width="16" height="16" className="shrink-0 transition-transform duration-200 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              ) : label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

const TESTIMONIAL_ROTATE_MS = 6000
const SWAP_OUT = { autoAlpha: 0, y: -8, duration: 0.18, ease: 'power1.in' }
const SWAP_IN = { autoAlpha: 1, y: 0, duration: 0.28, ease: 'power2.out', stagger: 0.03 }

function BrandLogo({ brand, logo, width, height = 22, box, onSelect }) {
  return (
    <button
      type="button"
      data-swap
      aria-label={`Read the ${brand} testimonial`}
      onClick={onSelect}
      className="flex h-[100px] shrink-0 cursor-pointer items-center justify-center transition-opacity duration-150 hover:opacity-60 max-sm:h-12 max-sm:!w-[104px]"
      style={{ width: box }}
    >
      {logo
        ? <img src={logo} alt="" width={width} height={height} style={{ '--logo-h': `${height}px` }} className="max-sm:h-[calc(var(--logo-h)*0.7)] max-sm:w-auto" />
        : <span className="font-bold uppercase tracking-[0.04em] text-black/20">{brand}</span>}
    </button>
  )
}

function Testimonials() {
  const scope = useRef(null)
  const inView = useRef(false)
  const switching = useRef(false)
  const firstRender = useRef(true)
  const [active, setActive] = useState(0)
  const activeRef = useRef(active)
  const count = testimonials.length

  useGSAP(
    () => {
      if (firstRender.current) {
        firstRender.current = false
        return
      }
      gsap.fromTo('[data-swap]', { autoAlpha: 0, y: 8 }, {
        ...SWAP_IN,
        onComplete: () => {
          switching.current = false
        },
      })
    },
    { scope, dependencies: [active] },
  )

  const show = (next) => {
    if (switching.current || next === activeRef.current) return
    activeRef.current = next

    if (prefersReducedMotion()) {
      setActive(next)
      return
    }

    switching.current = true
    gsap.to('[data-swap]', { ...SWAP_OUT, onComplete: () => setActive(next) })
  }
  const showRef = useRef(show)

  useEffect(() => {
    showRef.current = show
  })

  useEffect(() => {
    if (count < 2 || prefersReducedMotion()) return undefined

    const watcher = new IntersectionObserver(([entry]) => {
      inView.current = entry.isIntersecting
    })
    watcher.observe(scope.current)
    const timer = setInterval(() => {
      if (inView.current) showRef.current((activeRef.current + 1) % count)
    }, TESTIMONIAL_ROTATE_MS)

    return () => {
      watcher.disconnect()
      clearInterval(timer)
    }
  }, [count])

  if (count === 0) return null

  const current = testimonials[active]
  const [left, right] = testimonials.flatMap((item, index) => (index === active ? [] : [{ ...item, index }]))

  return (
    <section ref={scope} className="mx-auto mt-20 max-w-[1512px] px-page lg:mt-[110px]">
      <div data-reveal className="flex items-start justify-between gap-6 text-body-lg leading-[1.4] text-black">
        <h2 className="max-w-[223px]">Honest impressions from the founders</h2>
        <p className="max-w-[170px] text-right">What it’s like to work with me.</p>
      </div>
      <div data-reveal className="mt-10 flex flex-wrap items-center justify-center gap-x-4 gap-y-6 sm:gap-6 lg:mt-[62px] lg:flex-nowrap">
        <div className="order-2 lg:order-1">
          {left && <BrandLogo {...left} onSelect={() => show(left.index)} />}
        </div>
        <figure aria-live="polite" className="order-1 flex min-h-[272px] w-full max-w-[571px] flex-col items-center justify-center gap-12 py-10 lg:order-2 lg:h-[328px] lg:py-0">
          <blockquote data-swap className="max-w-[438px] text-center text-base-lg text-black">{current.quote}</blockquote>
          <figcaption data-swap className="flex items-center gap-3 text-base-lg text-black">
            {current.avatar && <img loading="lazy" decoding="async" src={current.avatar} alt="" width="40" height="40" />}
            {current.name} - {current.brand}
          </figcaption>
        </figure>
        <div className="order-3">
          {right && <BrandLogo {...right} onSelect={() => show(right.index)} />}
        </div>
      </div>
    </section>
  )
}

function Home() {
  return (
    <>
      <Showcase />
      <Intro />
      <SelectedWorks />
      <SideProjects />
      <Testimonials />
    </>
  )
}

export default Home
