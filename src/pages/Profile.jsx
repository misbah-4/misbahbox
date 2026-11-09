import { useRef } from 'react'
import ArrowLink from '../components/ArrowLink.jsx'
import MeshImage from '../components/MeshImage.jsx'
import GlassKeyboard from '../components/originkit/ui/single-glass-keyboard-custom-style.tsx'
import ScaledStage from '../components/ScaledStage.jsx'
import { communityLogos, eventCards, partnerLogos } from '../data/site.js'
import { gsap, prefersReducedMotion, ScrollTrigger, useGSAP } from '../lib/motion.js'

const P = '/images/profile'

function Hero() {
  return (
    <section className="relative mx-auto max-w-[1512px] px-page pb-12 pt-[120px] lg:h-[594px] lg:pb-0 lg:pt-[175px]">
      {/* The key is lit for black: inverting it and multiplying drops the black and keeps its colours. */}
      <div className="mx-auto size-[clamp(180px,18.1vw,274px)] mix-blend-multiply invert hue-rotate-180 lg:translate-x-0.5">
        <GlassKeyboard />
      </div>
      <div className="mt-8 flex justify-center lg:absolute lg:right-[78px] lg:top-[508px] lg:mt-0">
        <ArrowLink href="https://studione.world">(Building Studione )</ArrowLink>
      </div>
    </section>
  )
}

// The last image is the card's resting state.
const INTRO_IMAGES = [
  '/images/atelier/brand-os.webp',
  '/images/atelier/shoes.webp',
  '/images/atelier/phone-orange.webp',
  '/images/atelier/phone-blue.webp',
  '/images/home/fleetkit.webp',
  `${P}/intro-card.webp`,
]
const INTRO_GROW = 1.1
const INTRO_FLIP_BEAT = 0.35
const INTRO_TEXT_GAP = 12

function Intro() {
  const scope = useRef(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return undefined

      const content = scope.current.querySelector('[data-intro-content]')
      const card = scope.current.querySelector('[data-intro-card]')
      const heading = scope.current.querySelector('h1')
      const text = scope.current.querySelector('p')
      const layers = gsap.utils.toArray('img', card)
      const show = (active) => layers.forEach((layer, index) => {
        layer.style.visibility = index === active ? 'visible' : 'hidden'
      })
      const flipThroughImages = (vars) => {
        const steps = { index: 0 }

        return gsap.to(steps, {
          index: layers.length,
          duration: layers.length * INTRO_FLIP_BEAT,
          ease: `steps(${layers.length})`,
          repeat: -1,
          onUpdate: () => show(Math.floor(steps.index) % layers.length),
          ...vars,
        })
      }
      const media = gsap.matchMedia()

      // Desktop: the words start together and the growing card pushes them apart.
      media.add('(min-width: 768px)', () => {
        // The content holds still on screen while the dark panel's edge rises to uncover it.
        gsap.fromTo(
          content,
          { y: () => -scope.current.offsetHeight },
          {
            y: 0,
            ease: 'none',
            scrollTrigger: { trigger: scope.current, start: 'top bottom', end: 'bottom bottom', scrub: true, invalidateOnRefresh: true },
          },
        )

        const middle = card.getBoundingClientRect().left + card.getBoundingClientRect().width / 2
        const steps = { index: 0 }
        const flip = flipThroughImages({ paused: true })
        let inView = true
        let grown = false
        const viewport = ScrollTrigger.create({
          trigger: card,
          start: 'top bottom',
          end: 'bottom top',
          onToggle: (self) => {
            inView = self.isActive
            if (grown) flip.paused(!inView)
          },
        })

        show(0)
        gsap.set(card, { scale: 0 })
        gsap.set(heading, { x: middle - INTRO_TEXT_GAP - heading.getBoundingClientRect().right })
        gsap.set(text, { x: middle + INTRO_TEXT_GAP - text.getBoundingClientRect().left })

        gsap
          .timeline({ scrollTrigger: { trigger: scope.current, start: 'center 70%', once: true } })
          .to(card, { scale: 1, duration: INTRO_GROW, ease: 'power3.inOut' }, 0)
          .to([heading, text], { x: 0, duration: INTRO_GROW, ease: 'power3.inOut' }, 0)
          .to(steps, {
            index: layers.length - 1,
            duration: INTRO_GROW,
            ease: `steps(${layers.length - 1})`,
            onUpdate: () => show(Math.round(steps.index)),
          }, 0)
          .call(() => {
            grown = true
            flip.paused(!inView)
          })

        return () => {
          viewport.kill()
          flip.kill()
          show(layers.length - 1)
        }
      })

      // Phones: the card keeps its size and cuts through the images while in view.
      media.add('(max-width: 767.98px)', () => {
        gsap.from([heading, card, text], {
          autoAlpha: 0,
          y: 24,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.08,
          scrollTrigger: { trigger: scope.current, start: 'top 80%', once: true },
        })

        flipThroughImages({
          scrollTrigger: { trigger: card, start: 'top bottom', end: 'bottom top', toggleActions: 'play pause resume pause' },
        })

        return () => show(layers.length - 1)
      })

      return () => media.revert()
    },
    { scope },
  )

  return (
    <section ref={scope} className="@container relative z-10 overflow-hidden bg-night text-white">
      <div data-intro-content className="relative mx-auto flex max-w-[1512px] flex-col items-center gap-10 px-page py-20 [--u:min(100cqw/1512,1px)] md:block md:h-[calc(var(--u)*760)] md:p-0">
        <h1 className="text-h1 font-medium leading-[1.28] tracking-[0.16px] md:absolute md:left-[calc(var(--u)*256)] md:top-[calc(var(--u)*302)] md:whitespace-nowrap md:text-[calc(var(--u)*48)]">
          Hi, I’m <em className="font-normal">Misbah</em>
        </h1>
        <div data-intro-card role="img" aria-label="Portfolio page preview" className="relative h-[347px] w-[295px] overflow-hidden rounded-[2.5px] md:absolute md:left-[calc(var(--u)*600)] md:top-[calc(var(--u)*176)] md:h-[calc(var(--u)*347)] md:w-[calc(var(--u)*295)]">
          {INTRO_IMAGES.map((src, index) => (
            <img key={src} src={src} alt="" className={`absolute inset-0 size-full object-cover ${index === INTRO_IMAGES.length - 1 ? '' : 'invisible'}`} />
          ))}
        </div>
        <p className="max-w-[386px] text-center text-lead leading-[1.2] tracking-[0.01em] text-[#f5f5f5] md:absolute md:left-[calc(var(--u)*959)] md:top-[calc(var(--u)*289)] md:w-[calc(var(--u)*386)] md:max-w-none md:text-left md:text-[calc(var(--u)*28)]">
          I’m a product designer and developer. I turn early ideas into products people find easy to use.
        </p>
      </div>
    </section>
  )
}

const FOCUS_TEXT_ZOOM = 1.25
const FOCUS_SENTENCE = 'I design complex web apps with a heavy emphasis on usability and I care about interface motion, and interaction design.'
const FOCUS_SEGMENTS = [
  { text: 'I design complex ', first: true },
  { text: 'web apps', first: true, italic: true },
  { text: ' with a heavy ' },
  { text: 'emphasis', emphasis: true },
  { text: ' on usability and I care about interface ' },
  { text: 'motion,', lift: true },
  { text: ' and ' },
  { text: 'interaction design.', last: true },
]
const FOCUS_LETTERS = FOCUS_SEGMENTS.flatMap(({ text, ...kind }) => [...text].map((char) => ({ char, ...kind })))
const FOCUS_BOLD_REACH = 2.5
const FOCUS_MEDIUM_REACH = 4.5
const FOCUS_LIFT_REACH = 5
const FOCUS_HEAD_LEAD = 5
const FOCUS_PHONE_DIM = 0.45
const FOCUS_RECAP = ['web apps', 'usability', 'interface motion,']
const FOCUS_LAST_START = FOCUS_LETTERS.findIndex(({ last }) => last)
const RECAP_LINE_DELAY = 0.2
const RECAP_LINE_ERASE = 0.6
const FOCUS_START = { head: -FOCUS_HEAD_LEAD, open: 0, stack: 0, erase: 0 }

const focusBounds = (key, left, widths) => {
  const indexes = FOCUS_LETTERS.flatMap(({ char, [key]: match }, index) => (match && char !== ' ' ? [index] : []))
  const start = indexes[0]
  const end = indexes[indexes.length - 1]
  return (left[start] + left[end] + widths[end]) / 2
}

function Focus() {
  const section = useRef(null)
  const reduced = prefersReducedMotion()

  useGSAP(
    () => {
      if (reduced) return undefined

      const frame = section.current.querySelector('[data-focus-frame]')
      const heading = section.current.querySelector('h2')
      const track = section.current.querySelector('[data-focus-track]')
      const letters = gsap.utils.toArray('[data-focus-letter]')
      const fillScreen = () => Math.max(1, window.innerHeight / section.current.offsetHeight)
      const toCentre = () => section.current.offsetHeight / 2 - (heading.offsetTop + heading.offsetHeight / 2)
      const last = FOCUS_LETTERS.length - 1
      const recap = section.current.querySelector('[data-focus-recap]')
      const recapLines = gsap.utils.toArray('[data-focus-recap-line]').map((line) => gsap.utils.toArray(line.children))
      const state = { ...FOCUS_START }
      const drawn = letters.map(() => ({}))
      const metrics = { left: [], widths: [], firstCentre: 0, lastCentre: 0, ready: false }
      let cancelled = false
      let phone = false

      const render = () => {
        if (!metrics.ready) return

        const { left, widths, firstCentre, lastCentre } = metrics
        const head = state.head
        const index = gsap.utils.clamp(0, last, head)
        const lower = Math.floor(index)
        const upper = Math.min(last, lower + 1)
        const headX = gsap.utils.interpolate(left[lower] + widths[lower] / 2, left[upper] + widths[upper] / 2, index - lower)
        const camera = gsap.utils.clamp(firstCentre, lastCentre, headX)
        const scale = Number(gsap.getProperty(heading, 'scale')) || 1
        const edge = window.innerWidth * 0.46

        track.style.transform = `translate3d(${-camera}px, 0, 0)`

        letters.forEach((letter, i) => {
          const kind = FOCUS_LETTERS[i]
          const reach = Math.abs(i - head)
          const read = i < head
          let weight = kind.first && !read ? 500 : kind.last && read ? 500 : kind.emphasis && read ? 700 : 400
          if (reach <= FOCUS_BOLD_REACH) weight = 700
          else if (reach <= FOCUS_MEDIUM_REACH) weight = Math.max(weight, 500)
          if (phone) weight = kind.emphasis ? 700 : 500
          if (kind.italic) weight = 400

          // Phones show the highlight with opacity, since changing font weight forces layout.
          let highlight = 1
          if (phone && !read) highlight = FOCUS_PHONE_DIM
          if (phone && reach <= FOCUS_MEDIUM_REACH) highlight = 1

          const distance = Math.abs(left[i] + widths[i] / 2 - camera) * scale
          const inWindow = 1 - gsap.utils.clamp(0, 1, (distance - edge * 0.62) / (edge * 0.38))
          const stays = (kind.first && head < 8) || (kind.last && head > last - 8)
          const opacity = stays ? 1 : Math.round(state.open * inWindow * highlight * 100) / 100
          const lift = kind.lift ? Math.round(Math.max(0, 1 - reach / FOCUS_LIFT_REACH) * 18) / 100 : 0

          const was = drawn[i]
          if (was.weight !== weight) letter.style.fontWeight = String((was.weight = weight))
          if (was.opacity !== opacity) letter.style.opacity = String((was.opacity = opacity))
          if (was.lift !== lift) letter.style.transform = `translateY(${-(was.lift = lift)}em)`
        })
      }

      // The recap stacks from the bottom up, then each line is cut away letter by letter.
      const renderRecap = () => {
        recapLines.forEach((line, row) => {
          const shown = state.stack > recapLines.length - 1 - row
          const erased = gsap.utils.clamp(0, 1, (state.erase - row * RECAP_LINE_DELAY) / RECAP_LINE_ERASE)
          line.forEach((letter, column) => {
            const opacity = shown && column / line.length >= erased ? '1' : '0'
            if (letter.style.opacity !== opacity) letter.style.opacity = opacity
          })
        })
      }

      // Each letter box is locked at Medium so the heavier and lighter cuts never shift the line.
      const measure = () => {
        letters.forEach((letter) => {
          letter.style.width = ''
          letter.style.fontWeight = ''
        })
        drawn.forEach((was) => delete was.weight)
        const size = parseFloat(getComputedStyle(track).fontSize)
        letters.forEach((letter) => {
          letter.dataset.width = letter.getBoundingClientRect().width / Number(gsap.getProperty(heading, 'scale')) / size
        })
        letters.forEach((letter) => {
          letter.style.width = `${letter.dataset.width}em`
        })
        metrics.left = letters.map((letter) => letter.offsetLeft)
        metrics.widths = letters.map((letter) => letter.offsetWidth)
        metrics.firstCentre = focusBounds('first', metrics.left, metrics.widths)
        metrics.lastCentre = focusBounds('last', metrics.left, metrics.widths)
        recap.style.left = `${metrics.left[FOCUS_LAST_START]}px`
        metrics.ready = true
        render()
      }

      document.fonts.ready.then(() => {
        if (!cancelled) measure()
      })

      const media = gsap.matchMedia()

      // Grows to fill the screen, reads along the sentence, then returns to its own size.
      media.add('(min-width: 768px)', () => {
        phone = false
        Object.assign(state, FOCUS_START)
        measure()

        gsap
          .timeline({
            defaults: { ease: 'power2.inOut' },
            onUpdate: () => {
              render()
              renderRecap()
            },
            scrollTrigger: {
              trigger: section.current,
              start: 'center center',
              end: '+=375%',
              pin: true,
              scrub: true,
              invalidateOnRefresh: true,
              onRefresh: measure,
            },
          })
          .to(frame, { scaleY: fillScreen, duration: 1 }, 0)
          .to(heading, { scale: FOCUS_TEXT_ZOOM, y: toCentre, duration: 1 }, 0)
          .to(state, { open: 1, duration: 0.4, ease: 'none' }, 1)
          .to(state, { head: last + FOCUS_HEAD_LEAD, duration: 5.6, ease: 'none' }, 1)
          .to(state, { open: 0, duration: 0.4, ease: 'none' }, 6.6)
          .to(state, { stack: FOCUS_RECAP.length, duration: 0.6, ease: 'none' }, 7)
          .to(state, { erase: 1, duration: 0.6, ease: 'none' }, 7.7)
          .to(frame, { scaleY: 1, duration: 1 }, 8.3)
          .to(heading, { scale: 1, y: 0, duration: 1 }, 8.3)
      })

      // Phones: CSS sticky holds the line, so only the letters follow the scroll.
      media.add('(max-width: 767.98px)', () => {
        phone = true
        Object.assign(state, FOCUS_START)
        measure()

        gsap
          .timeline({
            defaults: { ease: 'none' },
            onUpdate: render,
            scrollTrigger: { trigger: section.current, start: 'top top', end: 'bottom bottom', scrub: 0.3, onRefresh: measure },
          })
          .to(state, { open: 1, duration: 0.4 }, 0)
          .to(state, { head: last + FOCUS_HEAD_LEAD, duration: 5 }, 0)
          .to(state, { open: 0, duration: 0.4 }, 4.8)
      })

      return () => {
        cancelled = true
        media.revert()
      }
    },
    { scope: section },
  )

  return (
    <section ref={section} className={`relative z-20 flex justify-center overflow-x-clip px-page text-white ${reduced ? 'py-24' : 'h-[240svh]'} md:h-auto md:pb-[clamp(120px,22vw,334px)] md:pt-[clamp(80px,16.67vw,252px)]`}>
      <div data-focus-frame className="absolute inset-x-0 bottom-0 top-0 bg-night" />
      {reduced ? (
        <h2 className="relative w-full max-w-[777px] text-center text-display font-medium leading-[1.28] tracking-[-0.006em]">{FOCUS_SENTENCE}</h2>
      ) : (
        <div className="sticky top-0 flex h-svh w-full items-center justify-center md:static md:h-auto md:items-start">
        <h2 aria-label={FOCUS_SENTENCE} className="relative h-[1.28em] w-full max-w-[777px] text-[min(7.5vw,2.5rem)] font-medium md:text-display leading-[1.28] tracking-[-0.006em] will-change-transform">
          <span data-focus-track aria-hidden="true" className="absolute left-1/2 top-0 flex w-max whitespace-pre will-change-transform">
            {FOCUS_LETTERS.map(({ char, italic, first }, index) => (
              <span key={index} data-focus-letter className={`inline-block text-center ${italic ? 'italic' : ''}`} style={{ opacity: first ? 1 : 0 }}>
                {char}
              </span>
            ))}
            <span data-focus-recap className="absolute bottom-full flex flex-col items-start leading-none">
              {FOCUS_RECAP.map((line) => (
                <span key={line} data-focus-recap-line className="flex">
                  {[...line].map((char, index) => (
                    <span key={index} style={{ opacity: 0 }}>
                      {char}
                    </span>
                  ))}
                </span>
              ))}
            </span>
          </span>
        </h2>
        </div>
      )}
    </section>
  )
}

const PHILOSOPHY_GAP = '3.8495em'
const OPEN_IMAGE = { duration: 0.7, ease: 'power3.inOut' }

function Philosophy() {
  const scope = useRef(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return undefined

      const scrollTrigger = { trigger: '[data-philosophy]', start: 'top 70%', toggleActions: 'play none none reverse' }
      const media = gsap.matchMedia()

      // From 640px the lines are fixed, so the words can part around the opening picture.
      media.add('(min-width: 640px)', () => {
        gsap
          .timeline({ scrollTrigger })
          .fromTo('[data-philosophy-gap]', { width: 0 }, { width: PHILOSOPHY_GAP, ...OPEN_IMAGE }, 0)
          .fromTo('[data-philosophy-image]', { width: 0, right: 0 }, { width: '2.73em', right: '0.56em', ...OPEN_IMAGE }, 0)
      })

      // Below that the lines wrap freely, so only the picture opens and the words hold still.
      media.add('(max-width: 639.98px)', () => {
        gsap.fromTo('[data-philosophy-image]', { clipPath: 'inset(0 50%)' }, { clipPath: 'inset(0 0%)', ...OPEN_IMAGE, scrollTrigger })
      })

      return () => media.revert()
    },
    { scope },
  )

  return (
    <section ref={scope} className="flex justify-center px-page py-24 lg:h-[633px] lg:py-0 lg:pt-[201px]">
      <p data-reveal data-philosophy className="w-full max-w-[15.48em] text-center text-[min(7.6vw,2rem)] sm:text-h1 md:-translate-x-[8.5px] leading-[1.53] tracking-normal text-black">
        Everything I make starts with{' '}
        <br className="max-sm:hidden" />
        <span className="relative whitespace-pre font-script">
          minimalism
          <span data-philosophy-gap className="inline-block" style={{ width: PHILOSOPHY_GAP }} />
          <img data-philosophy-image src={`${P}/minimalism.webp`} alt="" className="absolute right-[0.56em] top-0 h-[1.625em] w-[2.73em] max-w-none object-cover" />
        </span>
        <wbr />
        so people{' '}
        <br className="max-sm:hidden" />
        only see what matters.
      </p>
    </section>
  )
}

function LogoBox({ box, children }) {
  return (
    <div className="flex h-[72px] items-center justify-center lg:h-[100px] lg:w-[var(--box)]" style={{ '--box': `${box}px` }}>
      {children}
    </div>
  )
}

const MARQUEE_SPEED = 56
const MARQUEE_COPIES = [0, 1, 2, 3]

function PartnerMarquee() {
  const track = useRef(null)

  useGSAP(() => {
    if (prefersReducedMotion()) return

    gsap.to(track.current, {
      xPercent: -50,
      duration: track.current.scrollWidth / 2 / MARQUEE_SPEED,
      ease: 'none',
      repeat: -1,
      scrollTrigger: { trigger: track.current, start: 'top bottom', end: 'bottom top', toggleActions: 'play pause resume pause' },
    })
  })

  return (
    <div className="-mx-page overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
      <div ref={track} className="flex w-max items-center">
        {MARQUEE_COPIES.flatMap((copy) =>
          partnerLogos.map(({ src, alt, width, box }) => (
            <div key={`${copy}-${alt}`} className="shrink-0 pr-8 lg:pr-10" aria-hidden={copy > 0}>
              <LogoBox box={box}><img src={src} alt={copy > 0 ? '' : alt} width={width} className="max-w-[140px] lg:max-w-none" /></LogoBox>
            </div>
          )),
        )}
      </div>
    </div>
  )
}

function Collaboration() {
  return (
    <section className="bg-void px-page py-20 text-white lg:h-[554px] lg:py-0 lg:pt-[104px]">
      <div data-reveal className="flex justify-center">
        {[1, 2, 3, 4].map((n) => (
          <img loading="lazy" decoding="async" key={n} src={`${P}/avatar-${n}.webp`} alt="" width="59" height="59" className="-ml-2 size-[58.69px] first:ml-0" />
        ))}
      </div>
      <p data-reveal className="mx-auto mt-[35px] max-w-[413px] text-center text-body-lg tracking-[-0.01em]">
        Teams I’ve worked with
      </p>
      <div data-reveal className="mt-10 lg:mt-[96px]">
        <PartnerMarquee />
      </div>
    </section>
  )
}

const GLASS_EDGE = 'absolute inset-0 rounded-[inherit] shadow-[inset_0_0_4px_-1px_rgba(255,255,255,0.25)]'

function Pointer({ src, left, top, transform }) {
  return (
    <div className="absolute flex h-[27.115px] w-[27.81px] items-center justify-center" style={{ left, top }}>
      <div className="relative h-[18.303px] w-[21.134px]" style={{ transform }}>
        <img src={src} alt="" className="absolute left-[9.67%] top-[5%] block h-[83.01%] w-[80.66%] max-w-none" />
      </div>
    </div>
  )
}

function RoleLabel({ left, top, width, bg, color, children }) {
  return (
    <div className="absolute flex h-[24.719px] items-center justify-center whitespace-nowrap rounded-[18.681px] p-[7.784px] text-[7.914px] font-medium leading-[1.2] tracking-[0.0791px] max-sm:h-7 max-sm:!w-auto max-sm:text-[14px]" style={{ left, top, width, backgroundColor: bg, color }}>
      {children}
    </div>
  )
}

function Pop({ origin, children }) {
  return (
    <div data-pop className="absolute inset-0" style={{ transformOrigin: origin }}>
      {children}
    </div>
  )
}

function CommunityIllustration() {
  const scope = useRef(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return

      const [star, avatar, writer, designer, photo, social, glass] = gsap.utils.toArray('[data-pop]')
      const pop = { autoAlpha: 0, scale: 0.5, rotation: -12, duration: 0.55, ease: 'back.out(2)' }

      gsap
        .timeline({ scrollTrigger: { trigger: scope.current, start: 'top 80%', once: true } })
        .from('[data-glow]', { autoAlpha: 0, scale: 0.2, duration: 1, ease: 'power2.out' }, 0)
        .from('[data-pill]', { autoAlpha: 0, scale: 0.3, duration: 0.5, ease: 'back.out(1.4)' }, 0.05)
        .from('[data-pill-text]', { autoAlpha: 0, duration: 0.3, ease: 'power1.out' }, 0.35)
        .from(star, pop, 0.25)
        .from(avatar, pop, 0.45)
        .from(writer, pop, 0.65)
        .from(designer, pop, 0.8)
        .from(photo, pop, 0.95)
        .from(social, pop, 1.15)
        .from(glass, pop, 1.3)
    },
    { scope },
  )

  return (
    <div ref={scope} className="font-inter">
      <ScaledStage width={440} height={293}>
        <div data-glow className="absolute left-[209px] top-[118px] size-[57px]">
          <img src={`${P}/ill-glow.svg`} alt="" className="absolute left-[-167.72%] top-[-167.72%] block size-[435.44%] max-w-none" />
        </div>
        <Pop origin="387.5px 94.5px">
          <img loading="lazy" decoding="async" src={`${P}/ill-avatar.webp`} alt="" width="55" height="55" className="absolute left-[360px] top-[67px] block size-[55px] max-w-none" />
        </Pop>
        <Pop origin="393.5px 192.5px">
          <div className="absolute left-[347px] top-[146px] flex size-[93.154px] items-center justify-center">
            <div className="relative size-[83px] rotate-[7.52deg]">
              <img loading="lazy" decoding="async" src={`${P}/ill-star.webp`} alt="" className="absolute left-[13.51%] top-[12.14%] block h-[70.35%] w-[72.98%] max-w-none" />
            </div>
          </div>
        </Pop>
        <div data-pill className="absolute inset-0" style={{ transformOrigin: '233px 146.5px' }}>
          <div className="absolute left-[140px] top-[122px] h-[49px] w-[186px] rounded-[21px] bg-[rgba(217,217,217,0.24)] backdrop-blur-[11.4px] max-sm:left-[115px] max-sm:w-[222px]">
            <div className={GLASS_EDGE} />
          </div>
          <img loading="lazy" decoding="async" src={`${P}/ill-thumb.webp`} alt="" className="absolute left-[150px] top-[132px] size-[30px] max-w-none rounded-[12px] object-cover max-sm:left-[124px]" />
          <div data-pill-text>
            <p className="absolute left-[186px] top-[134px] whitespace-nowrap text-[8px] leading-[1.2] tracking-[0.08px] text-[#f2f2f2] max-sm:left-[160px] max-sm:top-[137px] max-sm:text-[15px] max-sm:font-medium">Community Led Events</p>
            <p className="absolute left-[186px] top-[147px] whitespace-nowrap text-[8px] font-medium leading-[1.2] tracking-[0.08px] text-[#f2f2f2] max-sm:hidden">Engaging Community Gatherings</p>
          </div>
        </div>
        <Pop origin="120px 226px">
          <Pointer src={`${P}/pointer-1.svg`} left={142.05} top={194} transform="rotate(35deg)" />
          <RoleLabel left={86} top={214.01} width={67.73} bg="#ffffff" color="#0a0a0a">Content Writer</RoleLabel>
        </Pop>
        <Pop origin="302px 207px">
          <Pointer src={`${P}/pointer-2.svg`} left={261.03} top={174.49} transform="rotate(145deg) scaleY(-1)" />
          <RoleLabel left={278.41} top={194.51} width={47.597} bg="#fafd86" color="#3b3c01">Designer</RoleLabel>
        </Pop>
        <Pop origin="58.5px 163.5px">
          <div className="absolute left-[26.08px] top-[130.86px] flex size-[64.931px] items-center justify-center">
            <div className="relative size-[52px] rotate-17 rounded-[11px]">
              <img loading="lazy" decoding="async" src={`${P}/ill-rounded.webp`} alt="" className="absolute inset-0 size-full max-w-none rounded-[11px] object-cover" />
              <div className={GLASS_EDGE} />
            </div>
          </div>
        </Pop>
        <Pop origin="154px 80px">
          <Pointer src={`${P}/pointer-3.svg`} left={176} top={85.62} transform="rotate(-35deg) scaleY(-1)" />
          <RoleLabel left={120.52} top={68} width={67.73} bg="#78fda5" color="#013c15">Social Director</RoleLabel>
        </Pop>
        <Pop origin="47.5px 122.5px">
          <div className="absolute left-[16.66px] top-[92.88px] flex h-[59.342px] w-[61.571px] items-center justify-center">
            <div className="relative h-[49.042px] w-[52px] rotate-[-12.8deg] rounded-[11px] bg-[rgba(86,86,86,0.33)] backdrop-blur-[3.65px]">
              <div className={GLASS_EDGE} />
            </div>
          </div>
        </Pop>
      </ScaledStage>
    </div>
  )
}

function Community() {
  return (
    <section className="overflow-hidden bg-void px-page pb-20 pt-16 text-white lg:h-[1467px] lg:pb-0 lg:pt-[84px]">
      <div className="mx-auto max-w-[440px] lg:-translate-x-[17px]">
        <CommunityIllustration />
      </div>
      <h2 data-reveal className="mx-auto mt-[80px] max-w-[413px] text-center text-h2 leading-[1.2]">
        Communities I’ve built with
      </h2>
      <div data-reveal className="mx-auto mt-16 flex max-w-[1206px] flex-wrap items-center justify-center gap-x-8 opacity-60 lg:mt-[120px] lg:flex-nowrap lg:gap-x-10">
        {communityLogos.map(({ src, alt, box }) => (
          <LogoBox key={alt} box={box}><img src={src} alt={alt} /></LogoBox>
        ))}
        <LogoBox box={217}><img src={`${P}/logo-updates.svg`} alt="Updates" width="217" height="100" className="max-w-[140px] lg:max-w-none" /></LogoBox>
      </div>
      <div data-reveal className="mx-auto mt-16 max-w-[927px] lg:mt-[149px]">
        <div className="no-scrollbar -mx-page overflow-x-auto px-page md:mx-0 md:overflow-visible md:px-0">
        <div className="w-[640px] md:w-auto">
        <ScaledStage width={927} height={398}>
          {eventCards.map(({ left, top, w, h, rotate, bg, src }) => (
            <div key={src} className="absolute flex items-center justify-center" style={{ left, top, width: w, height: h }}>
              <div className="relative h-[291.94px] w-[232.99px] overflow-hidden rounded transition-transform duration-300 ease-out hover:-translate-y-2" style={{ backgroundColor: bg, rotate: `${rotate}deg` }}>
                <MeshImage src={src} alt="Community event" className="absolute left-1/2 top-2 h-[242px] w-[216px] -translate-x-1/2 rounded" />
              </div>
            </div>
          ))}
        </ScaledStage>
        </div>
        </div>
      </div>
    </section>
  )
}

function StarPiece() {
  return <img loading="lazy" decoding="async" src={`${P}/hobby-star.webp`} alt="" draggable={false} className="absolute left-[6.27%] top-[4.91%] h-[84.83%] w-[87.46%]" />
}

function SquigglePiece() {
  return <img src={`${P}/hobby-squiggle.svg`} alt="" draggable={false} className="absolute left-[-0.79%] top-[-3.95%] block h-[107.9%] w-[115.19%] max-w-none" />
}

function CoinPiece() {
  return (
    <>
      <img src={`${P}/hobby-circle.svg`} alt="" draggable={false} className="absolute left-6 top-6 size-[35px]" />
      <img src={`${P}/hobby-coin-1.svg`} alt="" draggable={false} className="absolute left-0 top-0 size-[50px]" />
      <img src={`${P}/hobby-coin-2.svg`} alt="" draggable={false} className="absolute left-[5px] top-[5px] size-10" />
      <img src={`${P}/hobby-dollar.svg`} alt="" draggable={false} className="absolute left-[18px] top-[11px]" />
    </>
  )
}

function MarkPiece() {
  const diamonds = [[17.16, 8], [17.16, 25.3], [8.7, 16.44], [25.61, 16.44]]

  return (
    <div className="absolute inset-0 overflow-hidden rounded-[9px] bg-[#fd6e36]">
      {diamonds.map(([left, top]) => (
        <div key={`${left}-${top}`} className="absolute flex size-[13.667px] items-center justify-center" style={{ left, top }}>
          <div className="size-[9.664px] -rotate-45 rounded-[2px] bg-[#301208]" />
        </div>
      ))}
    </div>
  )
}

const HOBBY_PIECES = [
  // The star is a 146px bitmap, so it stops growing before it turns soft.
  { Art: StarPiece, width: 83, height: 83, limit: 167 },
  { Art: SquigglePiece, width: 130.648, height: 101.156 },
  { Art: CoinPiece, width: 59, height: 59 },
  { Art: MarkPiece, width: 48, height: 48 },
]
const PIECE_POOL = [...HOBBY_PIECES, ...HOBBY_PIECES, ...HOBBY_PIECES]

const SPAWN_DISTANCE = 130
const SPAWN_GAP_MS = 90
const GRAVITY = 3000
const HOP = 70
const MAX_TILT = 12
const AUTO_DROP_MIN = 0.6
const AUTO_DROP_MAX = 1.1
const pieceSize = () => gsap.utils.clamp(110, 288, window.innerWidth * 0.16)
const fallTime = (distance) => Math.sqrt((2 * Math.max(distance, 1)) / GRAVITY)

function Hobbies() {
  const scope = useRef(null)

  useGSAP(
    (_, contextSafe) => {
      if (prefersReducedMotion()) return undefined

      const section = scope.current
      const pieces = gsap.utils.toArray('[data-piece]')
      const running = new Map()
      const last = { x: 0, y: 0, time: 0, placed: false }
      let next = 0
      let layer = 1

      const drop = contextSafe((x, y) => {
        const piece = pieces[next]
        next = (next + 1) % pieces.length
        running.get(piece)?.kill()

        const size = Math.min(pieceSize(), Number(piece.dataset.limit) || Infinity)
        const fit = size / Math.max(Number(piece.dataset.width), Number(piece.dataset.height))
        const tilt = gsap.utils.random(-MAX_TILT, MAX_TILT)
        const hang = y + 16
        const floor = Math.max(window.innerHeight, hang + 1)
        const exit = floor + size

        gsap.set(piece, { x, y, xPercent: -50, yPercent: -50, rotation: tilt, scale: fit * 0.7, autoAlpha: 1, zIndex: (layer += 1) })

        const timeline = gsap.timeline()
        timeline
          .to(piece, { scale: fit, duration: 0.22, ease: 'back.out(2)' }, 0)
          .to(piece, { y: hang, duration: 0.3, ease: 'sine.out' }, 0)
          .to(piece, { y: floor, rotation: tilt + gsap.utils.random(-8, 8), duration: fallTime(floor - hang), ease: 'power2.in' })
          .to(piece, { y: floor - HOP, duration: fallTime(HOP), ease: 'power2.out' })
          .to(piece, { y: exit, duration: fallTime(exit - floor + HOP), ease: 'power2.in' })
          .set(piece, { autoAlpha: 0 })
        running.set(piece, timeline)
      })

      const pointIn = (event) => [event.clientX, event.clientY]

      const place = (x, y, now) => {
        last.x = x
        last.y = y
        last.time = now
        last.placed = true
        drop(x, y)
      }

      const onMove = (event) => {
        const [x, y] = pointIn(event)
        const now = performance.now()
        if (!last.placed) {
          last.x = x
          last.y = y
          last.placed = true
          return
        }
        if (Math.hypot(x - last.x, y - last.y) >= SPAWN_DISTANCE && now - last.time >= SPAWN_GAP_MS) place(x, y, now)
      }
      const onLeave = () => {
        last.placed = false
      }
      const onDown = (event) => {
        if (event.pointerType === 'touch') place(...pointIn(event), performance.now())
      }

      section.addEventListener('pointermove', onMove)
      section.addEventListener('pointerleave', onLeave)
      section.addEventListener('pointerdown', onDown)

      // Touch screens have no cursor to follow, so pieces fall on their own while in view.
      const media = gsap.matchMedia()
      media.add('(pointer: coarse)', () => {
        let nextDrop = null
        const dropAtRandom = () => {
          const box = section.getBoundingClientRect()
          drop(box.left + box.width * gsap.utils.random(0.15, 0.85), box.top + box.height * gsap.utils.random(0.1, 0.35))
          nextDrop = gsap.delayedCall(gsap.utils.random(AUTO_DROP_MIN, AUTO_DROP_MAX), dropAtRandom)
        }
        const inView = ScrollTrigger.create({
          trigger: section,
          start: 'top 80%',
          end: 'bottom 20%',
          onToggle: (self) => {
            nextDrop?.kill()
            if (self.isActive) dropAtRandom()
          },
        })

        return () => {
          nextDrop?.kill()
          inView.kill()
        }
      })

      return () => {
        media.revert()
        section.removeEventListener('pointermove', onMove)
        section.removeEventListener('pointerleave', onLeave)
        section.removeEventListener('pointerdown', onDown)
      }
    },
    { scope },
  )

  return (
    <section ref={scope} className="relative flex h-[clamp(320px,42vw,764px)] items-center justify-center px-page">
      <p data-reveal className="text-center text-[clamp(1.625rem,4.67vw,5.25rem)] font-medium leading-[1.28] tracking-[-0.03em] text-black">
        <span className="md:block">Beyond design: football, video games, </span>
        <span className="text-faint md:block">still life drawings, and Arcades.</span>
      </p>
      {/* Pieces fall in a screen-sized layer, so only the screen's edge can cut them off. */}
      <div className="pointer-events-none fixed inset-0 z-30 overflow-hidden">
        {PIECE_POOL.map(({ Art, width, height, limit }, index) => (
          <div key={index} data-piece data-width={width} data-height={height} data-limit={limit} aria-hidden="true" className="invisible absolute left-0 top-0" style={{ width, height }}>
            <Art />
          </div>
        ))}
      </div>
    </section>
  )
}

function Profile() {
  return (
    <>
      <Hero />
      <Intro />
      <div className="bg-night">
        <Focus />
      </div>
      <Philosophy />
      <Collaboration />
      <Community />
      <Hobbies />
    </>
  )
}

export default Profile
