import { Link } from 'react-router-dom'
import { works } from '../data/site.js'

function Work() {
  return (
    <div className="mx-auto max-w-[1512px] px-page">
      <div className="pt-[110px] lg:pl-[39.9%]">
        <img src="/images/work/mascot.webp" alt="Pixel mascot typing on a laptop" width="312" height="312" className="mx-auto size-[clamp(180px,20.64vw,312px)] lg:mx-0" />
      </div>
      <h1 data-reveal className="mt-10 text-h1 font-medium leading-[1.2] tracking-[-0.01em] text-black lg:mt-[52px]">Works</h1>
      <div className="mt-8 grid grid-cols-1 gap-x-4 gap-y-12 sm:grid-cols-2 lg:mt-12 lg:grid-cols-3 lg:gap-y-16">
        {works.map(({ name, tags, to }) => (
          <article key={name} data-reveal className="flex flex-col gap-6">
            {to ? <Link to={to} aria-label={`${name} case study`} className="block aspect-[461/307] w-full bg-stone" /> : <div className="aspect-[461/307] w-full bg-stone" />}
            <div className="flex flex-col gap-2 text-base-lg uppercase leading-6 tracking-[0.02em]">
              <h2 className="font-medium text-ink">{name}</h2>
              {tags && <p className="text-muted">{tags}</p>}
            </div>
          </article>
        ))}
      </div>
      <div className="h-20 lg:h-[208px]" />
    </div>
  )
}

export default Work
