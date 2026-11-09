import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { Draggable } from 'gsap/Draggable'
import { InertiaPlugin } from 'gsap/InertiaPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger, Draggable, InertiaPlugin, useGSAP)

export { Draggable, gsap, ScrollTrigger, useGSAP }

export const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

let lenis = null

export const setLenis = (instance) => {
  lenis = instance
}

export const setScrollLocked = (locked) => {
  document.documentElement.style.overflow = locked ? 'hidden' : ''
  if (locked) lenis?.stop()
  else lenis?.start()
}

export const scrollToTarget = (target, options) => {
  if (lenis) lenis.scrollTo(target, options)
  else if (target === 0) window.scrollTo(0, 0)
  else target.scrollIntoView()
}
