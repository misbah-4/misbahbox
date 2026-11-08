import { useRef } from 'react'
import { Link } from 'react-router-dom'
import ArrowLink from '../components/ArrowLink.jsx'
import ScaledStage from '../components/ScaledStage.jsx'
import { selectedWorks, sideProjects } from '../data/site.js'
import { gsap, prefersReducedMotion, useGSAP } from '../lib/motion.js'

const SHOWCASE = [
  { left: 0, top: 44, w: 110.469, h: 93.753, depth: 18, layers: [{ src: 'card-1' }], dark: true },
  { left: 459, top: 123.55, w: 115.556, h: 118.463, depth: 34, layers: [{ src: 'card-2' }] },
  { left: 54.93, top: 156.98, w: 219.485, h: 125.004, depth: 12, layers: [{ src: 'card-3' }], dark: true },
  { left: 222.81, top: 28.34, w: 103.928, h: 59.191, depth: 26, layers: [{ src: 'card-4' }], dark: true },
  { left: 304.21, top: 0, w: 125.004, h: 173.698, depth: 40, layers: [{ src: 'card-5', style: { left: '-4.1%', top: 0, width: '146.78%', height: '100%', maxWidth: 'none' } }] },
  {
    left: 164.67,
    top: 205.68,
    w: 162.07,
    h: 131.5,
    depth: 22,
    dark: true,
    layers: [
      { src: 'card-1' },
      { src: 'card-6', style: { left: '-13.5%', top: '-2.16%', width: '117.52%', height: '117.52%', maxWidth: 'none' } },
    ],
  },
]

function Showcase() {
  const scope = useRef(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return

      gsap.from('[data-card]', { autoAlpha: 0, scale: 0.94, duration: 0.9, ease: 'power3.out', stagger: 0.06 })
      gsap.utils.toArray('[data-card]').forEach((card) => {
        gsap.to(card, {
          y: -Number(card.dataset.depth),
          ease: 'none',
          scrollTrigger: { trigger: scope.current, start: 'top top', end: 'bottom top', scrub: true },
        })
      })
    },
    { scope },
  )

  return (
    <div ref={scope} className="px-page pt-[102px]">
      <ScaledStage width={575} height={337}>
        {SHOWCASE.map(({ left, top, w, h, depth, layers, dark }) => (
          <div
            key={`${left}-${top}`}
            data-card
            data-depth={depth}
            className={`absolute overflow-hidden rounded-[1px] ${dark ? 'bg-[#141414]' : ''}`}
            style={{ left, top, width: w, height: h }}
          >
            {layers.map(({ src, style }) => (
              <img
                key={src}
                src={`/images/home/${src}.png`}
                alt=""
                className={`absolute ${style ? '' : 'inset-0 size-full object-cover'}`}
                style={style}
              />
            ))}
          </div>
        ))}
      </ScaledStage>
    </div>
  )
}

function Intro() {
  return (
    <section className="mx-auto mt-16 flex max-w-[1512px] flex-col gap-10 px-page lg:mt-[176px] lg:flex-row lg:items-start lg:justify-between">
      <div data-reveal className="flex w-full max-w-[644px] flex-col items-start gap-[34px]">
        <h1 className="text-h1 font-medium leading-[1.2] tracking-[0.01em] text-black">
          I’m a Product Designer / <span className="text-soft">Engineer.</span>
        </h1>
        <p className="rounded-3xl bg-stone px-4 py-2 text-[18px] leading-[1.4] tracking-[0.02em] text-black">Open to work</p>
      </div>
      <div data-reveal className="flex w-full max-w-[531px] flex-col items-start gap-8 lg:gap-12">
        <p className="text-body-lg leading-[1.4] tracking-[0.02em] text-black lg:h-[92px]">
          I help Startups companies Design and Build <u className="decoration-from-font">Web</u> &{' '}
          <u className="decoration-from-font">Mobile Experiences</u> across Commercial, AI, Fashion, Productivity tools, and Frontier Tech.
        </p>
        <div className="tracking-[0.02em]">
          <ArrowLink to="/profile">Know more about me</ArrowLink>
        </div>
      </div>
    </section>
  )
}

const WORK_IMAGE = {
  placeam: (
    <div className="absolute inset-0 bg-mist">
      <img src="/images/home/placeam.png" alt="Placeam mobile shopping screens" className="absolute left-1/2 top-[10.66%] w-[97.04%] -translate-x-1/2" />
    </div>
  ),
  fleetkit: <img src="/images/home/fleetkit.png" alt="Fleetkit wordmark on violet" className="absolute inset-0 size-full object-cover" />,
  acemyx: (
    <div className="absolute inset-0 overflow-hidden bg-stone">
      <div className="absolute left-[14.42%] top-[38.11%] h-[98.67%] w-[83.55%] overflow-hidden rounded-lg">
        <img src="/images/home/acemyx.png" alt="Acemyx analytics dashboard" className="absolute left-[-3.54%] top-[-26.49%] h-[126.49%] w-[103.54%] max-w-none" />
      </div>
    </div>
  ),
}

function WorkCard({ name, cta, to }) {
  const image = (
    <div className="relative aspect-[541/375] w-full overflow-hidden">
      <div className="absolute inset-0 transition-transform duration-500 ease-out group-hover/card:scale-[1.02]">{WORK_IMAGE[name]}</div>
    </div>
  )

  return (
    <article className="group/card flex w-[min(84vw,541px)] shrink-0 flex-col items-center gap-6 lg:w-[541px]">
      {to ? <Link to={to} aria-label={`${name} case study`} className="block w-full">{image}</Link> : image}
      <div className="flex w-full items-center justify-between gap-4 px-4 lg:w-[461px] lg:px-0">
        <h3 className="text-base-lg font-medium uppercase leading-6 text-ink">{name}</h3>
        <ArrowLink to={to}>{cta}</ArrowLink>
      </div>
    </article>
  )
}

function SelectedWorks() {
  return (
    <section className="mt-20 lg:mt-[142px]">
      <h2 data-reveal className="mx-auto max-w-[1512px] px-page text-h3 leading-[1.4] text-black">Selected Works</h2>
      <div data-reveal className="no-scrollbar mt-6 flex gap-2 overflow-x-auto lg:mt-10">
        {selectedWorks.map((work) => <WorkCard key={work.name} {...work} />)}
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
          {sideProjects.map((project, index) => (
            <li
              key={project}
              className={`text-body-lg leading-[1.4] transition-colors duration-200 hover:text-black ${index === 0 ? 'text-black' : 'text-muted'}`}
            >
              {index > 0 && <img src="/images/icons/divider.svg" alt="" className="my-[13px] block h-px w-full" />}
              {project}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function BrandLogo({ src, alt, box, width, height }) {
  return (
    <div className="flex h-[100px] shrink-0 items-center justify-center" style={{ width: box }}>
      <img src={src} alt={alt} width={width} height={height} />
    </div>
  )
}

function Testimonials() {
  return (
    <section className="mx-auto mt-20 max-w-[1512px] px-page lg:mt-[110px]">
      <div data-reveal className="flex items-start justify-between gap-6 text-body-lg leading-[1.4] text-black">
        <h2 className="max-w-[223px]">Honest impressions from the founders</h2>
        <p className="max-w-[170px] text-right">What it’s like to work with me.</p>
      </div>
      <div data-reveal className="mt-10 flex flex-wrap items-center justify-center gap-6 lg:mt-[62px] lg:flex-nowrap">
        <div className="order-2 lg:order-1">
          <BrandLogo src="/images/home/logo-fleetkit.svg" alt="Fleetkit" box={204} width={108} height={22} />
        </div>
        <figure className="order-1 flex w-full max-w-[571px] flex-col items-center gap-12 py-16 lg:order-2 lg:h-[328px] lg:justify-center lg:py-0">
          <blockquote className="max-w-[438px] text-center text-base-lg text-black">
            Trusted by developers and used by micro-startups and agencies
          </blockquote>
          <figcaption className="flex items-center gap-3 text-base-lg text-black">
            <img src="/images/home/avatar.png" alt="" width="40" height="40" />
            UncleJude - Placeam
          </figcaption>
        </figure>
        <div className="order-3">
          <BrandLogo src="/images/home/logo-studione.svg" alt="Studione" box={217} width={111} height={22} />
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
      <div className="h-16 lg:h-[138px]" />
    </>
  )
}

export default Home
