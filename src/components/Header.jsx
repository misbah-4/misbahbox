import { Link, NavLink } from 'react-router-dom'
import { nav, site } from '../data/site.js'
import { scrollToTarget } from '../lib/motion.js'

const link = 'leading-[1.4] transition-opacity duration-200 hover:opacity-60'

function Header() {
  const goToContact = (event) => {
    const footer = document.getElementById('contact')
    if (!footer) return
    event.preventDefault()
    scrollToTarget(footer)
  }

  return (
    <header className="absolute inset-x-0 top-0 z-20 mx-auto flex h-[78px] max-w-[1512px] items-center justify-between px-page font-nav text-[14px] tracking-[-0.006em] text-black sm:text-nav">
      <Link to="/" className={`${link} uppercase`}>{site.brand}</Link>
      <nav aria-label="Primary" className="flex items-center gap-3 sm:gap-8 lg:gap-12">
        {nav.map((item) => (
          <NavLink key={item.to} to={item.to} className={link}>{item.label}</NavLink>
        ))}
        <a href={site.mailto} onClick={goToContact} className={link}>Let’s Talk</a>
      </nav>
    </header>
  )
}

export default Header
