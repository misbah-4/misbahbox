import { gsap } from '../lib/motion.js'

// Block letters in the spirit of the reference: fixed stems, horizontals that stretch with the letter.
// Each letter is one path redrawn for its width, so there are no seams and the counters are real holes.
// Units are the cap height.
const STEM = 0.2
// The H follows the reference: two hairline stems and a thick bar across the middle third.
const HAIR = 0.044
const BAR_TOP = 0.328
const BAR_BOTTOM = 0.668
const GAP = 0.035
const ROUND = 0.24
// Right-hand walls are lighter than left stems, as in the reference's counters.
const WALL = 0.12

const rect = (x0, y0, x1, y1) => `M${x0} ${y0}H${x1}V${y1}H${x0}Z`
const roundRect = (x0, y0, x1, y1, radius) => {
  const r = Math.min(radius, (x1 - x0) / 2, (y1 - y0) / 2)
  if (r <= 0) return rect(x0, y0, x1, y1)
  return `M${x0 + r} ${y0}H${x1 - r}A${r} ${r} 0 0 1 ${x1} ${y0 + r}V${y1 - r}A${r} ${r} 0 0 1 ${x1 - r} ${y1}H${x0 + r}A${r} ${r} 0 0 1 ${x0} ${y1 - r}V${y0 + r}A${r} ${r} 0 0 1 ${x0 + r} ${y0}Z`
}

const SHAPES = {
  H: (w) => {
    if (w <= 2 * HAIR) return rect(0, 0, w, 1)
    const right = w - HAIR
    return `M0 0H${HAIR}V${BAR_TOP}H${right}V0H${w}V1H${right}V${BAR_BOTTOM}H${HAIR}V1H0Z`
  },
  // Like the reference's "a" turned over: a rounded counter on top, a slot through the right side,
  // and a bottom bar whose top edge slopes, so it thins towards the right and lengthens as the letter stretches.
  e: (w) => {
    const r = Math.min(ROUND, w / 2)
    if (w <= STEM + WALL + 0.04) return `M0 0H${w - r}A${r} ${r} 0 0 1 ${w} ${r}V1H0Z`
    return (
      `M0 0H${w - r}A${r} ${r} 0 0 1 ${w} ${r}V.56H${STEM}V.74L${w} .86V1H0Z` +
      roundRect(STEM, STEM, w - WALL, 0.44, 0.1)
    )
  },
  l: (w) => `M0 0H${Math.min(STEM, w)}V.8H${w}V1H0Z`,
  // Rounded counter that lengthens, a heavy left wall against a lighter right one,
  // and only two opposite outer corners rounded.
  o: (w) => {
    const r = Math.min(ROUND, w / 2)
    const outer = `M0 0H${w - r}A${r} ${r} 0 0 1 ${w} ${r}V1H${r}A${r} ${r} 0 0 1 0 ${1 - r}Z`
    if (w <= STEM + WALL + 0.04) return outer
    return outer + roundRect(STEM, STEM, w - WALL, 1 - STEM, 0.1)
  },
}

// base: resting width. min: squeezed width while another letter takes its turn.
const LETTERS = [
  { char: 'H', base: 0.38, min: 0.2 },
  { char: 'e', base: 0.6, min: 0.48 },
  { char: 'l', base: 0.4, min: 0.28 },
  { char: 'l', base: 0.4, min: 0.28 },
  { char: 'o', base: 0.6, min: 0.44 },
]
const FIRST = 0
const LAST = LETTERS.length - 1
const MIDDLE = LETTERS.slice(1, LAST).map((_, n) => n + 1)
// The room the others give up is the room the stretching letter takes, so the word keeps its width.
const SLACK = LETTERS.reduce((sum, { base, min }) => sum + base - min, 0)

const BASE = LETTERS.map(({ base }) => base)
const turn = (k) => LETTERS.map(({ base, min }, n) => (n === k ? base + SLACK - (base - min) : min))
const middleWidth = (widths) => MIDDLE.reduce((sum, n) => sum + widths[n], 0) + (MIDDLE.length - 1) * GAP

export const GREETING_WIDTH = BASE.reduce((sum, w) => sum + w, 0) + LAST * GAP

function Glyph({ char, base }) {
  return (
    <svg data-glyph className="block h-[1em] shrink-0" style={{ width: `${base}em` }} viewBox={`0 0 ${base} 1`} preserveAspectRatio="none">
      <path d={SHAPES[char](base)} fill="currentColor" fillRule="evenodd" />
    </svg>
  )
}

export default function Greeting({ className = '' }) {
  const glyph = (n) => <Glyph key={n} {...LETTERS[n]} />

  return (
    <div data-greeting className={`flex items-start text-[#00a652] ${className}`} style={{ gap: `${GAP}em` }}>
      <span className="sr-only">Hello</span>
      {glyph(FIRST)}
      <span
        data-greeting-middle
        aria-hidden="true"
        className="flex shrink-0 justify-end overflow-hidden"
        style={{ gap: `${GAP}em`, width: `${middleWidth(BASE)}em` }}
      >
        {MIDDLE.map(glyph)}
      </span>
      {glyph(LAST)}
    </div>
  )
}

// Matches the reference's rhythm: each swap eases in and out over most of a second, with barely a pause.
const TURN_SWAP = 0.95
const TURN_HOLD = 0.07
const TURN_EASE = 'expo.inOut'

// A paused timeline the hero seeks through: unfold from the H, letters take turns stretching, fold back.
export function greetingTimeline(root) {
  // DOM order is H, middle letters, last letter, which matches LETTERS.
  const glyphs = gsap.utils.toArray('[data-glyph]', root)
  const middle = root.querySelector('[data-greeting-middle]')
  const widths = BASE.map((w) => ({ w }))
  const reveal = { m: middleWidth(BASE) }

  // Seeking runs every frame, so skip the redraw while the letters are holding still.
  let drawn = ''
  const render = () => {
    const key = widths.map(({ w }) => w.toFixed(4)).join() + reveal.m.toFixed(4)
    if (key === drawn) return
    drawn = key
    glyphs.forEach((svg, n) => {
      const w = Math.max(widths[n].w, 0.001)
      svg.style.width = `${w}em`
      svg.setAttribute('viewBox', `0 0 ${w} 1`)
      svg.firstChild.setAttribute('d', SHAPES[LETTERS[n].char](w))
    })
    middle.style.width = `${Math.max(reveal.m, 0)}em`
  }

  const tl = gsap.timeline({ paused: true, onUpdate: render })
  const toWidths = (target, at) => {
    target.forEach((w, n) => tl.to(widths[n], { w, duration: TURN_SWAP, ease: TURN_EASE }, at))
    tl.to(reveal, { m: middleWidth(target), duration: TURN_SWAP, ease: TURN_EASE }, at)
  }

  tl.set(root, { autoAlpha: 1 }, 0.001)
    .fromTo(widths[FIRST], { w: HAIR }, { w: BASE[FIRST], duration: 0.35, ease: 'power3.out' }, 0)
    .fromTo(widths[LAST], { w: 0 }, { w: BASE[LAST], duration: 0.3, ease: 'power3.out' }, 0.3)
    .fromTo(reveal, { m: 0 }, { m: middleWidth(BASE), duration: 0.6, ease: 'power3.inOut' }, 0.5)

  let at = 1.2
  LETTERS.forEach((_, k) => {
    toWidths(turn(k), at)
    at += TURN_SWAP + TURN_HOLD
  })
  toWidths(BASE, at)
  at += TURN_SWAP + TURN_HOLD

  tl.to(reveal, { m: 0, duration: 0.55, ease: 'power3.in' }, at)
    .to(widths[LAST], { w: 0, duration: 0.3, ease: 'power3.in' }, at + 0.5)
    .to(widths[FIRST], { w: HAIR, duration: 0.3, ease: 'power3.in' }, at + 0.75)
    .set(root, { autoAlpha: 0 }, at + 1.1)
  render()
  return tl
}
