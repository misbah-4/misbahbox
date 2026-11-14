// Skateboard sound for the hero, made with Web Audio so there are no files to load.
// Browsers only allow sound after the visitor taps, clicks or presses a key, so it stays silent until then.
// Scrolling does not count as permission.
const UNLOCK_EVENTS = ['touchstart', 'pointerdown', 'touchend', 'pointerup', 'click', 'keydown']
const VOLUME = 0.3
const ROLL_LEVEL = 0.22
const ROLL_SMOOTHING = 0.12

let context = null
let master = null
let rollGain = null
let noise = null
let rolling = 0

const noiseBuffer = (ctx) => {
  // Brown noise: the low rumble of wheels on concrete.
  const buffer = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate)
  const data = buffer.getChannelData(0)
  let last = 0
  for (let i = 0; i < data.length; i++) {
    last = (last + 0.02 * (Math.random() * 2 - 1)) / 1.02
    data[i] = last * 3.5
  }
  return buffer
}

const build = () => {
  const ctx = context
  noise = noiseBuffer(ctx)
  master = ctx.createGain()
  master.gain.value = VOLUME
  master.connect(ctx.destination)

  // Rolling: looped rumble through a low-pass, with a slow wobble like uneven pavement.
  const source = ctx.createBufferSource()
  source.buffer = noise
  source.loop = true
  const lowpass = ctx.createBiquadFilter()
  lowpass.type = 'lowpass'
  lowpass.frequency.value = 520
  const wobble = ctx.createOscillator()
  const wobbleDepth = ctx.createGain()
  wobble.frequency.value = 6.5
  wobbleDepth.gain.value = 0.25
  rollGain = ctx.createGain()
  rollGain.gain.value = 0
  const wobbleGain = ctx.createGain()
  wobbleGain.gain.value = 1
  wobble.connect(wobbleDepth).connect(wobbleGain.gain)
  source.connect(lowpass).connect(wobbleGain).connect(rollGain).connect(master)
  source.start()
  wobble.start()
  setRolling(rolling)
}

const unlock = () => {
  UNLOCK_EVENTS.forEach((name) => window.removeEventListener(name, unlock, true))
  if (context) return
  const Context = window.AudioContext || window.webkitAudioContext
  if (!Context) return
  // Created and resumed inside the input handler: waiting even a moment can lose iOS's permission.
  context = new Context()
  context.resume()
  build()
}

// A hidden tab stops the hero's clock, so stop the sound with it.
const onVisibility = () => {
  if (!context) return
  if (document.hidden) context.suspend()
  else context.resume()
}

export function armSkateSound() {
  UNLOCK_EVENTS.forEach((name) => window.addEventListener(name, unlock, { capture: true, passive: true }))
  document.addEventListener('visibilitychange', onVisibility)
  return () => {
    UNLOCK_EVENTS.forEach((name) => window.removeEventListener(name, unlock, true))
    document.removeEventListener('visibilitychange', onVisibility)
    setRolling(0)
  }
}

// 0 is silent, 1 is full rolling volume. Changes are smoothed, so it can be called every frame.
export function setRolling(level) {
  rolling = level
  if (!context || !rollGain) return
  rollGain.gain.setTargetAtTime(level * ROLL_LEVEL, context.currentTime, ROLL_SMOOTHING)
}

// The kick: a low thump as the foot lands, then a short grit scrape as it pushes.
export function playPush() {
  if (!context || context.state !== 'running') return
  const ctx = context
  const now = ctx.currentTime

  const thump = ctx.createOscillator()
  const thumpGain = ctx.createGain()
  thump.type = 'sine'
  thump.frequency.setValueAtTime(110, now)
  thump.frequency.exponentialRampToValueAtTime(55, now + 0.09)
  thumpGain.gain.setValueAtTime(0.0001, now)
  thumpGain.gain.exponentialRampToValueAtTime(0.5, now + 0.008)
  thumpGain.gain.exponentialRampToValueAtTime(0.001, now + 0.12)
  thump.connect(thumpGain).connect(master)
  thump.start(now)
  thump.stop(now + 0.14)

  const scrape = ctx.createBufferSource()
  scrape.buffer = noise
  const band = ctx.createBiquadFilter()
  band.type = 'bandpass'
  band.frequency.value = 1400
  band.Q.value = 0.8
  const scrapeGain = ctx.createGain()
  scrapeGain.gain.setValueAtTime(0.0001, now + 0.03)
  scrapeGain.gain.exponentialRampToValueAtTime(0.35, now + 0.06)
  scrapeGain.gain.exponentialRampToValueAtTime(0.001, now + 0.26)
  scrape.connect(band).connect(scrapeGain).connect(master)
  scrape.start(now + 0.03, Math.random())
  scrape.stop(now + 0.3)
}
