import { Fragment, useRef } from 'react'
import ArrowLink from '../components/ArrowLink.jsx'
import MeshImage from '../components/MeshImage.jsx'
import ScaledStage from '../components/ScaledStage.jsx'
import { communityLogos, eventCards, partnerLogos } from '../data/site.js'
import { gsap, prefersReducedMotion, ScrollTrigger, useGSAP } from '../lib/motion.js'

const P = '/images/profile'

const KEY_SRC = `${P}/hero-key.webp`
// The same three motions as the glass key it replaces: a slow drift, a light sweep and a press.
const KEY_DRIFT = 4.8
const KEY_SWEEP_EVERY = 3.6
const KEY_PRESS_EVERY = 3.2

function Hero() {
  const scope = useRef(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return undefined
      const key = scope.current.querySelector('[data-key]')
      const press = scope.current.querySelector('[data-key-press]')
      const sweep = scope.current.querySelector('[data-key-sweep]')

      const drift = gsap.timeline({ repeat: -1, yoyo: true, defaults: { ease: 'sine.inOut' } })
        .fromTo(key, { y: -5, rotation: -1.5 }, { y: 5, rotation: 1.5, duration: KEY_DRIFT })
      const shine = gsap.timeline({ repeat: -1 })
        .fromTo(sweep, { backgroundPosition: '130% 0' }, { backgroundPosition: '-30% 0', duration: 1.4, ease: 'power2.inOut' })
        .set({}, {}, KEY_SWEEP_EVERY)
      const tap = gsap.timeline({ repeat: -1, delay: 1.2 })
        .to(press, { y: 6, scaleY: 0.965, duration: 0.12, ease: 'power2.in' })
        .to(press, { y: 0, scaleY: 1, duration: 0.45, ease: 'back.out(3)' })
        .set({}, {}, KEY_PRESS_EVERY)

      // Rest while the hero is off screen.
      const visible = ScrollTrigger.create({
        trigger: scope.current,
        start: 'top bottom',
        end: 'bottom top',
        onToggle: (self) => [drift, shine, tap].forEach((motion) => motion.paused(!self.isActive)),
      })
      return () => visible.kill()
    },
    { scope },
  )

  return (
    <section ref={scope} className="relative mx-auto flex min-h-svh max-w-[1512px] flex-col items-center justify-center px-page pb-12 pt-[78px] lg:block lg:h-[594px] lg:min-h-0 lg:pb-0 lg:pt-[175px]">
      <div data-key className="relative mx-auto size-[min(64vw,274px)] will-change-transform lg:size-[clamp(180px,18.1vw,274px)] lg:translate-x-0.5">
        <div data-key-press className="relative size-full origin-bottom">
          <img src={KEY_SRC} alt="Keyboard key" width="277" height="278" className="block size-full" />
          {/* The light band only shows on the key itself, with a faint colour split at its edges like the glass had. */}
          <div
            data-key-sweep
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 mix-blend-screen"
            style={{
              maskImage: `url(${KEY_SRC})`,
              WebkitMaskImage: `url(${KEY_SRC})`,
              maskSize: '100% 100%',
              WebkitMaskSize: '100% 100%',
              backgroundImage:
                'linear-gradient(105deg, transparent 38%, rgba(80,160,255,0.18) 44%, rgba(255,255,255,0.42) 50%, rgba(255,120,200,0.18) 56%, transparent 62%)',
              backgroundSize: '250% 100%',
              backgroundPosition: '130% 0',
            }}
          />
        </div>
      </div>
      <div className="mt-8 flex justify-center lg:absolute lg:right-[78px] lg:top-[508px] lg:mt-0">
        <ArrowLink href="https://studione.world">(Building Studione )</ArrowLink>
      </div>
    </section>
  )
}

// The cards from Figma's Profile Intro Images, in order. The last image is the card's resting state: the portrait.
const INTRO_IMAGES = [2, 3, 4, 5, 1].map((n) => `${P}/intro-${n}.webp`)
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
        // Watch the section, not the card: the card rides in the scrolling content, which would offset its range.
        const viewport = ScrollTrigger.create({
          trigger: scope.current,
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
      <div data-intro-content className="relative mx-auto flex max-w-[1512px] flex-col items-center gap-8 px-page py-20 [--u:min(100cqw/1512,1px)] md:block md:h-[calc(var(--u)*760)] md:p-0">
        <h1 className="text-h1 font-medium leading-[1.28] tracking-[0.16px] md:absolute md:left-[calc(var(--u)*256)] md:top-[calc(var(--u)*302)] md:whitespace-nowrap md:text-[calc(var(--u)*48)]">
          Hi, I’m <em className="font-normal">Misbah</em>
        </h1>
        <div data-intro-card role="img" aria-label="Portfolio page preview" className="relative h-[259px] w-[220px] overflow-hidden rounded-[2.5px] md:absolute md:left-[calc(var(--u)*600)] md:top-[calc(var(--u)*176)] md:h-[calc(var(--u)*347)] md:w-[calc(var(--u)*295)]">
          {INTRO_IMAGES.map((src, index) => (
            <img key={src} src={src} alt="" className={`absolute inset-0 size-full object-cover ${index === INTRO_IMAGES.length - 1 ? '' : 'invisible'}`} />
          ))}
        </div>
        <p className="max-w-[320px] text-center text-lead leading-[1.3] md:max-w-[386px] md:leading-[1.2] tracking-[0.01em] text-[#f5f5f5] md:absolute md:left-[calc(var(--u)*959)] md:top-[calc(var(--u)*289)] md:w-[calc(var(--u)*386)] md:max-w-none md:text-left md:text-[calc(var(--u)*28)]">
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
            scrollTrigger: { trigger: section.current, start: 'top top', end: 'bottom 200%', scrub: 0.3, invalidateOnRefresh: true, onRefresh: measure },
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
    <section ref={section} className={`relative z-20 flex justify-center overflow-x-clip px-page text-white ${reduced ? 'py-24' : 'h-[320svh]'} md:h-auto md:pb-[clamp(120px,22vw,334px)] md:pt-[clamp(80px,16.67vw,252px)]`}>
      <div data-focus-frame className="absolute inset-x-0 bottom-0 top-0 bg-night" />
      {reduced ? (
        <h2 className="relative w-full max-w-[777px] text-center text-display font-medium leading-[1.28] tracking-[-0.006em]">{FOCUS_SENTENCE}</h2>
      ) : (
        <div className="sticky top-0 flex h-svh w-full items-center justify-center md:static md:h-auto md:items-start">
        <h2 aria-label={FOCUS_SENTENCE} className="relative h-[1.28em] w-full max-w-[777px] text-[28px] font-medium md:text-display leading-[1.28] tracking-[-0.006em] will-change-transform">
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

  // On phones Philosophy rises over the pinned Focus line. It overlaps Focus by a full screen; Collaboration
  // and Community follow it above Focus too, so the line stays pinned until they have covered the whole screen.
  return (
    <section ref={scope} className="flex flex-col items-center px-4 py-[104px] max-md:relative max-md:z-30 max-md:bg-page max-md:motion-safe:-mt-[100svh] md:px-page md:py-24 lg:h-[633px] lg:py-0 lg:pt-[201px]">
      <p data-reveal data-philosophy className="w-full max-w-[15.48em] text-center text-[20px] md:text-h1 md:-translate-x-[8.5px] leading-[1.53] tracking-normal text-black">
        Everything I make starts with{' '}
        <br className="max-sm:hidden" />
        <span className="relative whitespace-pre font-script">
          minimalism
          <span data-philosophy-gap className="inline-block" style={{ width: PHILOSOPHY_GAP }} />
          <img data-philosophy-image src={`${P}/philosophy.webp`} alt="" className="absolute right-[0.56em] top-0 h-[1.625em] w-[2.73em] max-w-none object-cover" />
        </span>
        <wbr />
        so people{' '}
        <br className="max-sm:hidden" />
        only see what matters.
      </p>
      <p data-reveal className="mt-8 text-base-lg leading-6 text-muted md:mt-[72px]">(Design Philosophy)</p>
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

// Every logo keeps its file proportions and scales by the same amount, so they read as one set.
function LogoRow({ logos }) {
  return (
    <div className="mx-auto flex max-w-[1206px] flex-wrap items-center justify-center gap-x-8 opacity-60 lg:flex-nowrap lg:gap-x-10">
      {logos.map(({ src, alt, height, box }) => (
        <LogoBox key={alt} box={box}>
          <img src={src} alt={alt} style={{ '--logo-h': `${height}px` }} className="h-[calc(var(--logo-h)*0.7)] w-auto max-w-none lg:h-(--logo-h)" />
        </LogoBox>
      ))}
    </div>
  )
}

function Collaboration() {
  return (
    <section className="bg-void px-page py-20 text-white max-md:relative max-md:z-30 lg:h-[554px] lg:py-0 lg:pt-[104px]">
      <div data-reveal className="flex justify-center">
        {[1, 2, 3, 4].map((n) => (
          <img loading="lazy" decoding="async" key={n} src={`${P}/avatar-${n}.webp`} alt="" width="59" height="59" className="-ml-1.5 size-11 first:ml-0 md:-ml-2 md:size-[58.69px]" />
        ))}
      </div>
      <p data-reveal className="mx-auto mt-[35px] max-w-[413px] text-center text-body-lg tracking-[-0.01em]">
        Teams I’ve worked with
      </p>
      <div data-reveal className="mt-10 lg:mt-[96px]">
        <LogoRow logos={partnerLogos} />
      </div>
    </section>
  )
}

function Community() {
  return (
    <section className="overflow-hidden bg-void px-page pb-20 pt-16 text-white max-md:relative max-md:z-30 lg:pb-[209px] lg:pt-[104px]">
      <h2 data-reveal className="mx-auto max-w-[413px] text-center text-base leading-[1.2] md:text-h2">
        Communities I’ve built with
      </h2>
      <div data-reveal className="mt-16 lg:mt-[120px]">
        <LogoRow logos={[...communityLogos, { src: `${P}/logo-updates.svg`, alt: 'Updates', height: 100, box: 217 }]} />
      </div>
      <div data-reveal className="mx-auto mt-16 max-w-[927px] lg:mt-[149px]">
        <div className="no-scrollbar -mx-page overflow-x-auto px-page md:mx-0 md:overflow-visible md:px-0">
        <div className="w-[640px] md:w-auto">
        <ScaledStage width={927} height={398}>
          {eventCards.map(({ left, top, w, h, rotate, bg, src, label }) => (
            <div key={left} className="absolute flex items-center justify-center" style={{ left, top, width: w, height: h }}>
              <div className="relative h-[291.94px] w-[232.99px] overflow-hidden rounded transition-transform duration-300 ease-out hover:-translate-y-2" style={{ backgroundColor: bg, rotate: `${rotate}deg` }}>
                {src && <MeshImage src={src} alt="Community event" className="absolute left-1/2 top-2 h-[242px] w-[216px] -translate-x-1/2 rounded" />}
                {/* The exported lettering already carries its full tilt on the page, so it undoes the card's rotation. */}
                {label && (
                  <img src={label.src} alt={label.alt} width={label.width} height={label.height} className="absolute left-[calc(50%+3.16px)] top-[calc(50%+2.98px)] -translate-x-1/2 -translate-y-1/2" style={{ rotate: `${-rotate}deg` }} />
                )}
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

// The Figma stickers. Each sits in its node's box; the rotated ones turn inside a box sized for the turn.
function GamepadArt() {
  return (
    <div className="flex size-full items-center justify-center">
      <img src={`${P}/hobby-gamepad.svg`} alt="" draggable={false} className="block h-[83.7%] w-[90.19%] max-w-none -rotate-[9.53deg]" />
    </div>
  )
}

function SwirlArt() {
  return <img src={`${P}/hobby-squiggle.svg`} alt="" draggable={false} className="absolute left-[-0.79%] top-[-3.95%] block h-[107.9%] w-[115.19%] max-w-none" />
}

function CoinArt() {
  return <img src={`${P}/hobby-icon.svg`} alt="" draggable={false} className="block size-full" />
}

function BoltArt() {
  return (
    <div className="flex size-full items-center justify-center">
      <div className="relative h-[80.54%] w-[75.35%] rotate-20">
        <img src={`${P}/hobby-bolt.svg`} alt="" draggable={false} className="absolute left-0 top-[-0.29%] block h-[100.58%] w-full max-w-none" />
      </div>
    </div>
  )
}

function BallArt() {
  return <img src={`${P}/hobby-ball.svg`} alt="" draggable={false} className="block size-full" />
}

// Figma positions, in em of the 48px line and measured from the text box's top left (x 371, y 244 on the artboard).
const HOBBY_STICKERS = [
  { Art: GamepadArt, left: 444.12, top: -56, width: 84.482, height: 68.224 },
  { Art: SwirlArt, left: 476, top: 108, width: 130.648, height: 101.156 },
  { Art: CoinArt, left: 659, top: 150, width: 59, height: 59 },
  { Art: BoltArt, left: 105, top: 104, width: 115.759, height: 122.69 },
]
const em = (px) => `${px / 48}em`

const HOBBY_PIECES = [
  ...HOBBY_STICKERS,
  { Art: BallArt, width: 36.25, height: 36.25 },
]
const PIECE_POOL = [...HOBBY_PIECES, ...HOBBY_PIECES, ...HOBBY_PIECES]

const spawnDistance = () => Math.min(130, window.innerWidth * 0.2)
const SPAWN_GAP_MS = 90
const GRAVITY = 3000
const HOP = 70
const MAX_TILT = 12
// About the size of the stickers placed around the line (their longest side is 59–151px in Figma).
const pieceSize = () => gsap.utils.clamp(48, 120, window.innerWidth * 0.08)
const fallTime = (distance) => Math.sqrt((2 * Math.max(distance, 1)) / GRAVITY)

// The page's own accents, used for the glitch instead of the reference's colours.
const GLITCH_COLORS = ['#fd6e36', '#0038ff', '#78fda5', '#fafd86']
const GLITCH_FRAME = 0.045
const GLITCH_WORD_GAP = 0.13
const GLITCH_FLICKER_EVERY = 3.2
const GLITCH_FLICKERS = [0.4, 0.8]
const HOBBY_LINES = [
  { text: 'Football, Video Gaming, Fine Art', tone: 'text-black' },
  { text: 'Drawings, and Strategy Games.', tone: 'text-black' },
]
// In Figma the "oo" of Football is two footballs set in the space of seven word spaces.
const FOOTBALL_GAP = '       '

const IDLE_BOB = 4
const IDLE_TILT = 3
const IDLE_BEATS = [3.4, 4.1, 3.7, 4.6]
const BALL_SPIN = 7
const BALL_REST = 0.9
const HOBBY_SENTENCE = HOBBY_LINES.map(({ text }) => text).join(' ')
const SLICE_BANDS = ['inset(0 0 66% 0)', 'inset(34% 0 33% 0)', 'inset(67% 0 0 0)']
const SPECKS = [[18, 108], [30, 118], [42, 104]]

// Repeatable pseudo-random numbers, so each word keeps its own shard layout.
const seeded = (seed) => {
  const value = Math.sin(seed * 12.9898) * 43758.5453
  return value - Math.floor(value)
}

const rgbSplit = (amount) => (amount
  ? `${-0.07 * amount}em 0 ${GLITCH_COLORS[1]}, ${0.07 * amount}em 0 ${GLITCH_COLORS[0]}, 0 ${0.05 * amount}em ${GLITCH_COLORS[3]}`
  : 'none')

function FootballLabel() {
  return (
    <>
      F
      <span className="relative whitespace-pre">
        {FOOTBALL_GAP}
        <img data-ball="spin" src={`${P}/hobby-ball.svg`} alt="" className="absolute top-[0.3125em] size-[0.7552em] max-w-none" style={{ left: 'var(--ball-1)' }} />
        <img data-ball="hop" src={`${P}/hobby-ball.svg`} alt="" className="absolute top-[0.3125em] size-[0.7552em] max-w-none origin-bottom" style={{ left: 'var(--ball-2)' }} />
      </span>
      tball,
    </>
  )
}

function GlitchWord({ word, index }) {
  const football = word === 'Football,'
  const ghost = football ? `F${FOOTBALL_GAP}tball,` : word

  const shards = [0, 1, 2].map((n) => {
    const r = (k) => seeded(index * 7 + n * 3 + k)
    return {
      left: `${-8 + r(1) * 50}%`,
      top: `${-25 + r(2) * 40}%`,
      width: `${45 + r(3) * 45}%`,
      height: `${70 + r(4) * 50}%`,
      rotate: `${-14 + r(5) * 28}deg`,
      background: GLITCH_COLORS[(index + n) % GLITCH_COLORS.length],
      clipPath: `polygon(${r(6) * 18}% 0, 100% ${r(7) * 22}%, ${82 + r(8) * 18}% 100%, 0 ${78 + r(9) * 22}%)`,
    }
  })

  return (
    <span data-word className="relative inline-block">
      <span data-word-text className="whitespace-pre">{football ? <FootballLabel /> : word}</span>
      <span data-shards aria-hidden="true" className="pointer-events-none invisible absolute inset-0">
        {shards.map((style, n) => (
          <span key={n} className="absolute" style={style} />
        ))}
        <span className="absolute inset-0 whitespace-pre text-white [-webkit-text-stroke:0.035em_#0a0a0a] [paint-order:stroke]">{ghost}</span>
      </span>
      <span data-slices aria-hidden="true" className="pointer-events-none invisible absolute inset-0">
        {SLICE_BANDS.map((band, n) => (
          <span key={band} data-slice className="absolute inset-0 whitespace-pre" style={{ clipPath: band, color: GLITCH_COLORS[(index + n + 1) % GLITCH_COLORS.length] }}>
            {ghost}
          </span>
        ))}
        {SPECKS.map(([left, top]) => (
          <span key={left} className="absolute size-[0.12em] rounded-full bg-[#f44a32]" style={{ left: `${left + seeded(index + left) * 40}%`, top: `${top}%` }} />
        ))}
      </span>
    </span>
  )
}

function Hobbies() {
  const scope = useRef(null)

  useGSAP(
    (_, contextSafe) => {
      if (prefersReducedMotion()) return undefined

      const words = scope.current.querySelector('[data-hobby-words]')
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
        if (Math.hypot(x - last.x, y - last.y) >= spawnDistance() && now - last.time >= SPAWN_GAP_MS) place(x, y, now)
      }
      const onLeave = () => {
        last.placed = false
      }
      const onDown = (event) => {
        if (event.pointerType === 'touch') place(...pointIn(event), performance.now())
      }

      // Pieces fall only where the visitor taps or moves across the words.
      words.addEventListener('pointermove', onMove)
      words.addEventListener('pointerleave', onLeave)
      words.addEventListener('pointerdown', onDown)

      // Each word arrives as colour shards, breaks into slices, then settles out of a colour split.
      const wordEls = gsap.utils.toArray('[data-word]', words)
      const glitching = new Set()
      const glitch = (word) => {
        const label = word.querySelector('[data-word-text]')
        const shards = word.querySelector('[data-shards]')
        const slices = word.querySelector('[data-slices]')
        glitching.add(word)

        return gsap
          .timeline({ onComplete: () => glitching.delete(word) })
          .set(label, { visibility: 'hidden', textShadow: 'none' }, 0)
          .set(shards, { visibility: 'visible' }, 0)
          .set(shards, { visibility: 'hidden' }, GLITCH_FRAME * 2)
          .set(word.querySelectorAll('[data-slice]'), { x: () => `${gsap.utils.random(-0.18, 0.18)}em` }, GLITCH_FRAME * 2)
          .set(slices, { visibility: 'visible' }, GLITCH_FRAME * 2)
          .set(slices, { visibility: 'hidden' }, GLITCH_FRAME * 4)
          .set(label, { visibility: 'visible', textShadow: rgbSplit(1) }, GLITCH_FRAME * 4)
          .set(label, { textShadow: rgbSplit(0.6) }, GLITCH_FRAME * 5)
          .set(label, { textShadow: rgbSplit(0.3) }, GLITCH_FRAME * 6)
          .set(label, { textShadow: rgbSplit(0) }, GLITCH_FRAME * 8)
      }

      const glitchRandomWord = () => {
        const resting = wordEls.filter((word) => !glitching.has(word))
        if (resting.length) glitch(gsap.utils.random(resting))
      }

      // The line is written once; after that single words flicker on their own, forever.
      const typeIn = gsap.timeline({ paused: true })
      wordEls.forEach((word, index) => {
        typeIn.add(() => {
          glitch(word)
        }, index * GLITCH_WORD_GAP)
      })
      typeIn.set({}, {}, wordEls.length * GLITCH_WORD_GAP + GLITCH_FRAME * 8)

      const flicker = gsap.timeline({ paused: true, repeat: -1 })
      GLITCH_FLICKERS.forEach((share) => flicker.add(glitchRandomWord, GLITCH_FLICKER_EVERY * share))
      flicker.set({}, {}, GLITCH_FLICKER_EVERY)
      typeIn.eventCallback('onComplete', () => flicker.paused(!inView.isActive))

      gsap.set('[data-word-text]', { visibility: 'hidden' })
      const inView = ScrollTrigger.create({
        trigger: words,
        start: 'top 75%',
        end: 'bottom top',
        onToggle: (self) => {
          if (!typeIn.progress()) typeIn.play()
          if (typeIn.progress() === 1) flicker.paused(!self.isActive)
        },
      })

      // Idle motion, like objects resting in water: each sticker bobs and tilts a little on its own slow beat.
      const idle = gsap.utils.toArray('[data-sticker]', scope.current).map((sticker, index) =>
        gsap.fromTo(
          sticker,
          { y: -IDLE_BOB, rotation: -IDLE_TILT },
          { y: IDLE_BOB, rotation: IDLE_TILT, duration: IDLE_BEATS[index % IDLE_BEATS.length], ease: 'sine.inOut', repeat: -1, yoyo: true, delay: -index * 0.9 },
        ),
      )
      // One football turns slowly; the other hops softly and settles with a slight squash.
      const spin = gsap.to(scope.current.querySelector('[data-ball="spin"]'), { rotation: 360, duration: BALL_SPIN, ease: 'none', repeat: -1 })
      const hop = gsap
        .timeline({ repeat: -1, repeatDelay: BALL_REST })
        .to('[data-ball="hop"]', { y: '-0.28em', duration: 0.42, ease: 'sine.out' })
        .to('[data-ball="hop"]', { y: 0, duration: 0.42, ease: 'sine.in' })
        .to('[data-ball="hop"]', { scaleY: 0.9, scaleX: 1.06, duration: 0.09, ease: 'sine.out' })
        .to('[data-ball="hop"]', { scaleY: 1, scaleX: 1, duration: 0.3, ease: 'back.out(2.5)' })
      const motion = [...idle, spin, hop]
      const onScreen = ScrollTrigger.create({
        trigger: scope.current,
        start: 'top bottom',
        end: 'bottom top',
        onToggle: (self) => motion.forEach((tween) => tween.paused(!self.isActive)),
      })

      return () => {
        onScreen.kill()
        inView.kill()
        typeIn.kill()
        flicker.kill()
        gsap.set('[data-word-text]', { visibility: 'visible', textShadow: 'none' })
        words.removeEventListener('pointermove', onMove)
        words.removeEventListener('pointerleave', onLeave)
        words.removeEventListener('pointerdown', onDown)
      }
    },
    { scope },
  )

  return (
    <section ref={scope} className="relative flex flex-col items-center px-page py-28 lg:pb-[132px] lg:pt-[244px]">
      {/* Figma: 48px Regular, 1.4 leading, 0.96px tracking, a 771px box; stickers are placed in em so they scale with the line. */}
      <div className="relative text-h3 md:text-[clamp(1.625rem,4.67vw,3rem)]">
      <p data-hobby-words className="w-[16.0625em] max-w-full text-center leading-[1.4] tracking-[0.02em] [--ball-1:-0.0313em] [--ball-2:0.7656em]">
        <span className="sr-only">{HOBBY_SENTENCE}</span>
        {HOBBY_LINES.map(({ text: line, tone }, lineIndex) => {
          const before = HOBBY_LINES.slice(0, lineIndex).reduce((count, { text: earlier }) => count + earlier.split(' ').length, 0)
          return (
            <span key={line} aria-hidden="true" className={`md:block ${tone}`}>
              {line.split(' ').map((word, index) => (
                <Fragment key={word}>
                  {index > 0 && ' '}
                  <GlitchWord word={word} index={before + index} />
                </Fragment>
              ))}
              {lineIndex < HOBBY_LINES.length - 1 && ' '}
            </span>
          )
        })}
      </p>
        {HOBBY_STICKERS.map(({ Art, left, top, width, height }) => (
          <div key={left} data-sticker aria-hidden="true" className="pointer-events-none absolute" style={{ left: em(left), top: em(top), width: em(width), height: em(height) }}>
            <Art />
          </div>
        ))}
      </div>
      <p data-reveal className="mt-8 text-base-lg leading-6 tracking-[0.02em] text-muted lg:mt-[89.6px]">(Beyond Design)</p>
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
