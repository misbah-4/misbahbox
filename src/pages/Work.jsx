import { Link } from 'react-router-dom'
import { works } from '../data/site.js'

function Work() {
  return (
    <div className="mx-auto max-w-[1512px] px-page">
      <div className="pt-[110px] lg:pl-[39.9%]">
        <div className="mx-auto flex h-[202px] w-[174px] items-center justify-center lg:mx-0">
          <img src="/images/project/hero.svg" alt="" className="h-[178.33px] w-[142.44px] -rotate-169" />
        </div>
      </div>
      <div data-reveal className="mt-10 flex items-end justify-between gap-4 lg:mt-[52px]">
        <h1 className="text-h1 font-medium leading-[1.2] tracking-[-0.01em] text-black">Works</h1>
        <p className="text-base-lg leading-6 text-muted">(Case Studies)</p>
      </div>
      <div className="mt-8 grid grid-cols-1 gap-x-4 gap-y-12 sm:grid-cols-2 lg:mt-12 lg:grid-cols-3 lg:gap-y-16">
        {works.map(({ name, tags, to }) => (
          <article key={name} data-reveal className="flex flex-col gap-6">
            {to ? <Link to={to} aria-label={`${name} case study`} className="block aspect-[461/307] w-full bg-stone" /> : <div className="aspect-[461/307] w-full bg-stone" />}
            <div className="flex flex-col gap-2 md:gap-1 text-base-lg uppercase leading-6 tracking-[0.02em] max-md:text-[14px] max-md:leading-5 md:text-[18px]">
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
