import Lenis from 'lenis'
import { useEffect, useLayoutEffect, useRef } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { gsap, prefersReducedMotion, ScrollTrigger, scrollToTarget, setLenis, useGSAP } from '../lib/motion.js'
import Footer from './Footer.jsx'
import Header from './Header.jsx'

function Layout() {
  const { pathname } = useLocation()
  const scope = useRef(null)

  useEffect(() => {
    if (prefersReducedMotion()) return undefined

    const lenis = new Lenis()
    const raf = (time) => lenis.raf(time * 1000)
    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)
    setLenis(lenis)

    return () => {
      gsap.ticker.remove(raf)
      lenis.destroy()
      setLenis(null)
    }
  }, [])

  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener('load', refresh)
    document.fonts?.ready.then(refresh)
    return () => window.removeEventListener('load', refresh)
  }, [pathname])

  useLayoutEffect(() => {
    scrollToTarget(0, { immediate: true, force: true })
  }, [pathname])

  useGSAP(
    () => {
      if (prefersReducedMotion()) return

      scope.current.querySelectorAll('[data-reveal]').forEach((element) => {
        gsap.from(element, {
          autoAlpha: 0,
          y: 24,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: element, start: 'top 90%', once: true },
        })
      })
    },
    { scope, dependencies: [pathname], revertOnUpdate: true },
  )

  return (
    <div className={`relative min-h-dvh ${pathname === '/' ? 'bg-page-warm' : 'bg-page'}`}>
      <Header />
      <div ref={scope}>
        <main key={pathname}>
          <Outlet />
        </main>
        {pathname !== '/atelier' && <Footer />}
      </div>
    </div>
  )
}

export default Layout
