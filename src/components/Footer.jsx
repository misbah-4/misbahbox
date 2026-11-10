import { site } from '../data/site.js'

function Footer() {
  return (
    <footer id="contact" className="mx-auto flex max-w-[1512px] flex-col gap-20 px-page pb-8 pt-24 text-ink lg:gap-[120px]">
      <div data-reveal className="text-title font-medium leading-[1.2] tracking-[-0.02em]">
        <p>
          Let’s make <em>it</em> <em className="text-faint">worth</em> it.
        </p>
        <a
          href={site.mailto}
          className="break-all underline decoration-from-font transition-opacity duration-200 hover:opacity-60 sm:break-normal"
        >
          {site.email}
        </a>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-x-6 text-[16px] leading-11 md:text-[18px]">
        <p className="tracking-[0.0175em]">© 2026</p>
        <ul className="flex items-center gap-5 md:gap-6">
          {site.socials.map(({ label, href }) => (
            <li key={label} className="underline decoration-from-font">
              {href ? <a href={href} target="_blank" rel="noreferrer" className="inline-block">{label}</a> : label}
            </li>
          ))}
        </ul>
      </div>
    </footer>
  )
}

export default Footer
