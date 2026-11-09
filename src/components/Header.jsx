import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { nav, site } from '../data/site.js'
import { scrollToTarget, setScrollLocked } from '../lib/motion.js'

const link = 'leading-[1.4] transition-opacity duration-200 hover:opacity-60'
const reveal = 'block transition-transform duration-[250ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none'
const menuRow = 'block overflow-hidden text-[40px] leading-[1.25] tracking-[-0.02em]'
const footerCell = 'flex h-[72px] items-center justify-center text-[16px]'
const MENU_LINK_STAGGER = 40
const MENU_LINK_DELAY = 80
const MENU_BREAKPOINT = '(min-width: 768px)'
const SCROLL_THRESHOLD = 8
const ALWAYS_VISIBLE_ZONE = 80

function MenuIcon({ open }) {
  const line = 'absolute left-1/2 top-1/2 -ml-2.5 -mt-[0.75px] h-[1.5px] w-5 bg-current transition-transform duration-300 ease-out'

  return (
    <>
      <span className={`${line} ${open ? 'rotate-45' : '-translate-y-[3px]'}`} />
      <span className={`${line} ${open ? '-rotate-45' : 'translate-y-[3px]'}`} />
    </>
  )
}

function Header() {
  const [open, setOpen] = useState(false)
  const [scrolledAway, setScrolledAway] = useState(false)

  // Slides away while scrolling down and returns as soon as the visitor scrolls up.
  useEffect(() => {
    let last = window.scrollY

    const onScroll = () => {
      const current = window.scrollY
      const moved = current - last
      if (Math.abs(moved) < SCROLL_THRESHOLD) return
      setScrolledAway(moved > 0 && current > ALWAYS_VISIBLE_ZONE)
      last = current
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const setMenu = (next) => {
    setScrollLocked(next)
    setOpen(next)
  }

  const goToContact = (event) => {
    setMenu(false)
    const footer = document.getElementById('contact')
    if (!footer) return
    event.preventDefault()
    scrollToTarget(footer)
  }

  useEffect(() => {
    if (!open) return undefined

    const close = () => {
      setScrollLocked(false)
      setOpen(false)
    }
    const onKeyDown = (event) => {
      if (event.key === 'Escape') close()
    }
    const desktop = window.matchMedia(MENU_BREAKPOINT)

    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('popstate', close)
    desktop.addEventListener('change', close)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('popstate', close)
      desktop.removeEventListener('change', close)
    }
  }, [open])

  const rowMotion = (index) => ({
    className: `${reveal} ${open ? 'translate-y-0' : 'translate-y-full'}`,
    style: { transitionDelay: open ? `${MENU_LINK_DELAY + index * MENU_LINK_STAGGER}ms` : '0ms' },
  })
  const menuLinkTone = (active) => (active ? 'text-white' : 'text-white/45')

  return (
    <>
    {/* White plus difference blending reads black on light sections and white on dark ones. */}
    <header className={`pointer-events-none fixed inset-x-0 top-0 z-50 mx-auto flex h-[78px] max-w-[1512px] items-center justify-between px-page font-nav text-[14px] tracking-[-0.006em] text-white mix-blend-difference transition-transform duration-300 ease-out focus-within:translate-y-0 motion-reduce:transition-none sm:text-nav [&>*]:pointer-events-auto ${scrolledAway && !open ? '-translate-y-full' : 'translate-y-0'}`}>
      <Link to="/" onClick={() => setMenu(false)} className={`${link} relative z-10 font-bold uppercase before:absolute before:-inset-x-2 before:-inset-y-3`}>{site.brand}</Link>

      <nav aria-label="Primary" className="hidden items-center gap-8 md:flex lg:gap-12">
        {nav.map((item) => (
          <NavLink key={item.to} to={item.to} className={link}>{item.label}</NavLink>
        ))}
        <a href={site.mailto} onClick={goToContact} className={link}>Let’s Talk</a>
      </nav>

      <button
        type="button"
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setMenu(!open)}
        className="relative z-10 -mr-3 size-11 cursor-pointer md:hidden"
      >
        <MenuIcon open={open} />
      </button>
    </header>

      <div
        id="mobile-menu"
        className={`fixed inset-0 z-40 flex flex-col bg-void text-white transition-[clip-path,visibility] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none md:hidden ${open ? 'visible [clip-path:inset(0)]' : 'invisible [clip-path:inset(0_0_100%_0)]'}`}
      >
        <nav aria-label="Mobile" className="flex flex-1 flex-col justify-center px-page font-sans">
          {nav.map((item, index) => (
            <NavLink key={item.to} to={item.to} onClick={() => setMenu(false)} className={({ isActive }) => `${menuRow} ${menuLinkTone(isActive)}`}>
              <span {...rowMotion(index)}>{item.label}</span>
            </NavLink>
          ))}
          <a href={site.mailto} onClick={goToContact} className={`${menuRow} ${menuLinkTone(false)}`}>
            <span {...rowMotion(nav.length)}>Let’s Talk</span>
          </a>
        </nav>
        <div className="grid grid-cols-2 divide-x divide-white/15 border-t border-white/15 pb-[env(safe-area-inset-bottom)] font-sans">
          <a href={site.mailto} className={footerCell}>Mail</a>
          <a href={site.socials[0].href} target="_blank" rel="noreferrer" className={footerCell}>{site.socials[0].label}</a>
        </div>
      </div>
    </>
  )
}

export default Header
