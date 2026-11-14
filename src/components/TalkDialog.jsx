import { useEffect, useRef, useState } from 'react'
import { site } from '../data/site.js'
import { setScrollLocked } from '../lib/motion.js'

// The Tally form "Let's talk" asks for a name; "Pick a time" then opens the 30-minute Calendly booking
// with that name filled in.
const FORM_URL = 'https://tally.so/embed/1WdePg?hideTitle=1&transparentBackground=1&alignLeft=1'
// One field and the button; the form is short enough to load at a fixed height without Tally's sizing script.
const FORM_HEIGHT = 200
const OPEN_EVENT = 'misbah:open-talk'

export const openTalk = () => window.dispatchEvent(new Event(OPEN_EVENT))

function TalkDialog() {
  const dialog = useRef(null)
  const [opened, setOpened] = useState(false)

  useEffect(() => {
    const open = () => {
      setOpened(true)
      dialog.current?.showModal()
      setScrollLocked(true)
    }
    window.addEventListener(OPEN_EVENT, open)
    return () => window.removeEventListener(OPEN_EVENT, open)
  }, [])

  const close = () => dialog.current?.close()

  return (
    <dialog
      ref={dialog}
      aria-labelledby="talk-title"
      onClose={() => setScrollLocked(false)}
      // A click on the dimmed area outside the panel closes it.
      onClick={(event) => {
        if (event.target === dialog.current) close()
      }}
      className="m-auto w-[min(520px,calc(100%-32px))] max-h-[calc(100dvh-32px)] overflow-y-auto overscroll-contain rounded-[4px] bg-page p-0 text-ink backdrop:bg-black/45 open:animate-[talk-in_220ms_cubic-bezier(0.22,1,0.36,1)] motion-reduce:open:animate-none"
    >
      <div className="flex flex-col gap-2 px-6 pt-6 md:px-8 md:pt-8">
        <div className="flex items-start justify-between gap-4">
          <h2 id="talk-title" className="text-h3 font-medium leading-[1.2]">Let’s talk</h2>
          <button type="button" onClick={close} aria-label="Close" className="-mr-2 -mt-2 grid size-11 shrink-0 cursor-pointer place-items-center text-[24px] leading-none text-muted transition-opacity hover:opacity-60">
            ×
          </button>
        </div>
        <p className="text-base-lg leading-[1.4] text-muted">Leave your name, then pick a time for a 30-minute call.</p>
      </div>
      <div className="px-6 pt-2 md:px-8">
        {/* Loaded the first time the dialog opens, then kept, so reopening is instant. */}
        {opened && <iframe src={FORM_URL} title="Let’s talk" width="100%" height={FORM_HEIGHT} className="block w-full border-0" />}
      </div>
      <p className="px-6 pb-6 text-[16px] text-muted md:px-8 md:pb-8">
        Prefer email?{' '}
        <a href={site.mailto} className="text-ink underline decoration-from-font underline-offset-2">Write to me</a>
      </p>
    </dialog>
  )
}

export default TalkDialog
