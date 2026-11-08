import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export { gsap, ScrollTrigger, useGSAP }

export const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

let lenis = null

export const setLenis = (instance) => {
  lenis = instance
}

export const scrollToTarget = (target, options) => {
  if (lenis) lenis.scrollTo(target, options)
  else if (target === 0) window.scrollTo(0, 0)
  else target.scrollIntoView()
}
