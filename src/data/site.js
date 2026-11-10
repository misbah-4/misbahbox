export const site = {
  brand: 'Misbahbox',
  email: 'hello@misbah.com',
  mailto: 'mailto:hellodamiii@gmail.com',
  socials: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/musbaudeen' },
    { label: 'Twitter/X', href: 'https://x.com/designincues' },
    { label: 'Instagram', href: 'https://www.instagram.com/misbahbox' },
  ],
}

// Update these two words each time the hero moodboard changes.
export const moodboardLabel = ['November', 'Moodboard']

export const nav = [
  { label: 'Work', to: '/work' },
  { label: 'Profile', to: '/profile' },
  { label: 'Atelier', to: '/atelier' },
]

export const selectedWorks = [
  { name: 'placeam', cta: 'View Case Study' },
  { name: 'fleetkit', cta: 'View Case Study', to: '/work/fleetkit' },
  { name: 'acemyx', cta: 'View Live Site' },
]

export const sideProjects = [
  { label: 'Kanvas: Browser extension for inspecting designs', href: 'https://github.com/misbah-4/design-inspector' },
  { label: 'Benchwork: Workflow tracker for design engineers', href: 'https://usebenchwork.vercel.app' },
  { label: 'Moodmakr: Figma plugin for annotating your design taste', href: 'https://github.com/misbah-4/Moodtip' },
  { label: 'PitchCraft: Football manager game', href: 'https://playpitchcraft.vercel.app' },
  { label: 'Handson: Machine learning project' },
]

// Move a quote into approvedTestimonials only after the person quoted has signed off on the wording.
const approvedTestimonials = []

// Drafts stay out of production builds entirely.
const draftTestimonials = import.meta.env.DEV
  ? [
      {
        brand: 'Placeam',
        name: 'UncleJude',
        avatar: '/images/home/avatar.webp',
        box: 204,
        quote: 'Misbah just gets it. You drop a rough idea in the chat and a few days later you’re clicking through something that feels like a real product.',
      },
      {
        brand: 'Fleetkit',
        name: '[Name needed]',
        avatar: '/images/home/avatar-fleetkit.webp',
        logo: '/images/home/logo-fleetkit.svg',
        width: 108,
        box: 204,
        quote: 'Honestly the easiest designer we’ve worked with. Asks the right questions, moves fast, and the handoff to dev was painless.',
      },
      {
        brand: 'Acemyx',
        name: 'Abdurrahman',
        avatar: '/images/home/avatar-acemyx.webp',
        logo: '/images/profile/logo-acemyx.svg',
        width: 117,
        height: 30,
        box: 217,
        quote: 'Send Misbah the messy version. What comes back is clean, simple and ready to build.',
      },
    ]
  : []

export const testimonials = [...approvedTestimonials, ...draftTestimonials]

export const works = [
  { name: 'Placeam' },
  { name: 'Fleetkit', to: '/work/fleetkit' },
  { name: 'Acemyx', tags: 'identity, digital, education' },
  { name: 'Placeam AI Studio' },
  { name: 'Voomies' },
  { name: 'Campusx' },
]

export const partnerLogos = [
  { src: '/images/profile/logo-acemyx.svg', alt: 'Acemyx', width: 117, box: 204 },
  { src: '/images/profile/logo-campusx.svg', alt: 'CampusX', width: 138, box: 204 },
  { src: '/images/profile/logo-fleetkit.svg', alt: 'Fleetkit', width: 108, box: 204 },
  { src: '/images/profile/logo-looprail.svg', alt: 'Looprail', width: 217, box: 217 },
  { src: '/images/profile/logo-studione.svg', alt: 'Studione', width: 111, box: 217 },
]

export const communityLogos = [
  { src: '/images/profile/logo-gdgoc.svg', alt: 'GDGoC', box: 204 },
  { src: '/images/profile/logo-nacoss.svg', alt: 'NACOSS', box: 204 },
  { src: '/images/profile/logo-cowrywise.svg', alt: 'Cowrywise', box: 204 },
  { src: '/images/profile/logo-kwarabuild.svg', alt: 'KwaraBuild', box: 217 },
]

export const eventCards = [
  { left: 0, top: 36.66, w: 262.23, h: 314.695, rotate: -6, bg: '#fdfdfd', src: '/images/profile/event-1.webp' },
  { left: 183.79, top: 91, w: 251.136, h: 306.206, rotate: 3.66, bg: '#f44a32', src: '/images/profile/event-2.webp' },
  { left: 339.79, top: 0, w: 254.993, h: 309.179, rotate: -4.46, bg: '#0038ff', src: '/images/profile/event-3.webp' },
  { left: 512.79, top: 93, w: 240.443, h: 297.853, rotate: -1.48, bg: '#fdfdfd', src: '/images/profile/event-4.webp' },
  { left: 664.76, top: 19.98, w: 261.957, h: 314.489, rotate: 5.94, bg: '#fdfdfd', src: '/images/profile/event-5.webp' },
]
