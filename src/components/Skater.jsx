// The green guy riding a skateboard: 16 frames from the reference animation, recoloured.
// The hero steps through the strip on its own clock, so the push sound can land on the right frame.
export const PUSH = 1.6
export const SKATER_FRAMES = 16
export const SKATER_RATIO = 248 / 316

export default function Skater({ className = '' }) {
  return (
    <div className={`relative overflow-hidden ${className}`} style={{ aspectRatio: `${1 / SKATER_RATIO}` }} aria-hidden="true">
      <img
        data-skater-strip
        src="/images/home/skater.webp"
        alt=""
        width={316 * SKATER_FRAMES}
        height={248}
        className="absolute left-0 top-0 h-full w-auto max-w-none"
      />
    </div>
  )
}
