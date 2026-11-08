import ArrowLink from '../components/ArrowLink.jsx'
import ScaledStage from '../components/ScaledStage.jsx'
import { communityLogos, eventCards, partnerLogos } from '../data/site.js'

const P = '/images/profile'

function Hero() {
  return (
    <section className="relative mx-auto max-w-[1512px] px-page pb-12 pt-[120px] lg:h-[594px] lg:pb-0 lg:pt-[175px]">
      <img src={`${P}/hero.png`} alt="Red pixel handheld game console" width="274" height="274" className="mx-auto size-[clamp(180px,18.1vw,274px)] lg:translate-x-0.5" />
      <div className="mt-8 flex justify-center lg:absolute lg:right-[78px] lg:top-[508px] lg:mt-0">
        <ArrowLink>(Building Studione )</ArrowLink>
      </div>
    </section>
  )
}

function Intro() {
  return (
    <section className="@container bg-night text-white">
      <div className="relative mx-auto flex max-w-[1512px] flex-col items-center gap-10 px-page py-20 [--u:min(100cqw/1512,1px)] md:block md:h-[calc(var(--u)*760)] md:p-0">
        <h1 data-reveal className="text-h1 font-medium leading-[1.28] tracking-[0.16px] md:absolute md:left-[calc(var(--u)*256)] md:top-[calc(var(--u)*302)] md:whitespace-nowrap md:text-[calc(var(--u)*48)]">
          Hi, I’m <em className="font-normal">Misbah</em>
        </h1>
        <img data-reveal src={`${P}/intro-card.png`} alt="Portfolio page preview" width="295" height="347" className="h-[347px] w-[295px] rounded-[2.5px] object-cover md:absolute md:left-[calc(var(--u)*600)] md:top-[calc(var(--u)*176)] md:h-[calc(var(--u)*347)] md:w-[calc(var(--u)*295)]" />
        <p data-reveal className="max-w-[386px] text-center text-lead leading-[1.2] tracking-[0.01em] text-[#f5f5f5] md:absolute md:left-[calc(var(--u)*959)] md:top-[calc(var(--u)*289)] md:w-[calc(var(--u)*386)] md:max-w-none md:text-left md:text-[calc(var(--u)*28)]">
          I am a Designer and Developer focused on bringing intuitive concepts to life.
        </p>
      </div>
    </section>
  )
}

function Focus() {
  return (
    <section className="flex justify-center bg-night px-page pb-[clamp(120px,22vw,334px)] pt-[clamp(80px,16.67vw,252px)] text-white">
      <h2 data-reveal className="max-w-[777px] text-center text-display font-medium leading-[1.28] tracking-[-0.006em]">
        I design complex <em className="font-normal">web apps</em>
      </h2>
    </section>
  )
}

function Philosophy() {
  return (
    <section className="flex justify-center px-page py-24 lg:h-[633px] lg:py-0 lg:pt-[201px]">
      <p data-reveal className="max-w-[15.48em] -translate-x-[8.5px] text-center text-h1 leading-[1.53] tracking-normal text-black">
        My work is rooted in{' '}
        <span className="relative whitespace-pre font-script">
          {'minimalism           '}
          <img src={`${P}/minimalism.png`} alt="" className="absolute right-[0.56em] top-0 h-[1.625em] w-[2.73em] max-w-none object-cover" />
        </span>
        because clarity creates stronger experiences.
      </p>
    </section>
  )
}

function LogoBox({ box, children }) {
  return (
    <div className="flex h-[72px] items-center justify-center lg:h-[100px] lg:w-[var(--box)]" style={{ '--box': `${box}px` }}>
      {children}
    </div>
  )
}

function Collaboration() {
  return (
    <section className="bg-night px-page py-20 text-white lg:h-[554px] lg:py-0 lg:pt-[104px]">
      <div data-reveal className="flex justify-center">
        {[1, 2, 3, 4].map((n) => (
          <img key={n} src={`${P}/avatar-${n}.png`} alt="" width="59" height="59" className="-ml-2 size-[58.69px] first:ml-0" />
        ))}
      </div>
      <p data-reveal className="mx-auto mt-[35px] max-w-[413px] text-center text-body-lg tracking-[-0.01em]">
        Trusted by developers and used by micro-startups and agencies
      </p>
      <div data-reveal className="mx-auto mt-10 flex max-w-[1206px] flex-wrap items-center justify-center gap-x-8 lg:mt-[96px] lg:flex-nowrap lg:gap-x-10">
        {partnerLogos.map(({ src, alt, width, box }) => (
          <LogoBox key={alt} box={box}><img src={src} alt={alt} width={width} className="max-w-[140px] lg:max-w-none" /></LogoBox>
        ))}
      </div>
    </section>
  )
}

function Pointer({ src, left, top, rotate, flip }) {
  return (
    <div className="absolute flex h-[27.115px] w-[27.81px] items-center justify-center" style={{ left, top }}>
      <img src={src} alt="" className="h-[18.303px] w-[21.134px]" style={{ transform: `${flip ? 'scaleY(-1) ' : ''}rotate(${rotate}deg)` }} />
    </div>
  )
}

function RoleLabel({ left, top, width, bg, color, children }) {
  return (
    <div className="absolute flex h-[24.719px] items-center justify-center whitespace-nowrap rounded-[18.681px] text-[7.914px] font-medium leading-[1.2] tracking-[0.01em]" style={{ left, top, width, backgroundColor: bg, color }}>
      {children}
    </div>
  )
}

function Glass({ left, top, box, rotate, blur, tint }) {
  return (
    <div className="absolute flex items-center justify-center" style={{ left, top, width: box, height: box }}>
      <div className="size-[52px] rounded-[11px] shadow-[inset_0_0_4px_-1px_rgba(255,255,255,0.25)]" style={{ transform: `rotate(${rotate}deg)`, backgroundColor: tint, backdropFilter: `blur(${blur}px)` }} />
    </div>
  )
}

function CommunityIllustration() {
  return (
    <ScaledStage width={440} height={293}>
      <div className="absolute left-[209px] top-[118px] size-[57px]">
        <img src={`${P}/ill-glow.svg`} alt="" className="absolute left-[-167.72%] top-[-167.72%] block size-[435.44%] max-w-none" />
      </div>
      <img src={`${P}/ill-avatar.png`} alt="" width="55" height="55" className="absolute left-[360px] top-[67px]" />
      <div className="absolute left-[347px] top-[146px] flex size-[93.154px] items-center justify-center">
        <div className="relative size-[83px] rotate-[7.52deg]">
          <img src={`${P}/ill-star.png`} alt="" className="absolute left-[13.51%] top-[12.14%] h-[70.35%] w-[72.98%]" />
        </div>
      </div>
      <div className="absolute left-[140px] top-[122px] h-[49px] w-[186px] rounded-[21px] bg-[rgba(217,217,217,0.24)] shadow-[inset_0_0_4px_-1px_rgba(255,255,255,0.25)] backdrop-blur-[11.4px]" />
      <img src={`${P}/ill-thumb.png`} alt="" className="absolute left-[150px] top-[132px] size-[30px] rounded-[12px] object-cover" />
      <p className="absolute left-[186px] top-[134px] whitespace-nowrap text-[8px] leading-[1.2] text-[#f2f2f2]">Community Led Events</p>
      <p className="absolute left-[186px] top-[147px] whitespace-nowrap text-[8px] font-medium leading-[1.2] text-[#f2f2f2]">Engaging Community Gatherings</p>
      <Pointer src={`${P}/pointer-1.svg`} left={142.05} top={194} rotate={35} />
      <RoleLabel left={86} top={214.01} width={67.73} bg="#ffffff" color="#0a0a0a">Content Writer</RoleLabel>
      <Pointer src={`${P}/pointer-2.svg`} left={261.03} top={174.49} rotate={145} flip />
      <RoleLabel left={278.41} top={194.51} width={47.597} bg="#fafd86" color="#3b3c01">Designer</RoleLabel>
      <Pointer src={`${P}/pointer-3.svg`} left={176} top={85.62} rotate={-35} flip />
      <RoleLabel left={120.52} top={68} width={67.73} bg="#78fda5" color="#013c15">Social Director</RoleLabel>
      <Glass left={28.43} top={133.21} box={60.24} rotate={10} blur={2} tint="rgba(86,86,86,0.25)" />
      <Glass left={19} top={88} box={56.756} rotate={-5.51} blur={3.65} tint="rgba(86,86,86,0.33)" />
    </ScaledStage>
  )
}

function Community() {
  return (
    <section className="overflow-hidden bg-void px-page pb-20 pt-16 text-white lg:h-[1467px] lg:pb-0 lg:pt-[84px]">
      <div data-reveal className="mx-auto max-w-[440px] lg:-translate-x-[17px]">
        <CommunityIllustration />
      </div>
      <h2 data-reveal className="mx-auto mt-[80px] max-w-[413px] text-center text-h2 leading-[1.2]">
        Built with creators, Loved by communities
      </h2>
      <div data-reveal className="mx-auto mt-16 flex max-w-[1206px] flex-wrap items-center justify-center gap-x-8 lg:mt-[120px] lg:flex-nowrap lg:gap-x-10">
        {communityLogos.map(({ src, alt, box }) => (
          <LogoBox key={alt} box={box}><img src={src} alt={alt} /></LogoBox>
        ))}
        <LogoBox box={217}><img src={`${P}/logo-updates.svg`} alt="Updates" width="217" height="100" className="max-w-[140px] lg:max-w-none" /></LogoBox>
      </div>
      <div data-reveal className="mx-auto mt-16 max-w-[927px] lg:mt-[149px]">
        <ScaledStage width={927} height={398} minScale={0.5}>
          {eventCards.map(({ left, top, w, h, rotate, bg, src }) => (
            <div key={src} className="absolute flex items-center justify-center" style={{ left, top, width: w, height: h }}>
              <div className="relative h-[291.94px] w-[232.99px] overflow-hidden rounded transition-transform duration-300 ease-out hover:-translate-y-2" style={{ backgroundColor: bg, rotate: `${rotate}deg` }}>
                <img src={src} alt="Community event" className="absolute left-1/2 top-2 h-[242px] w-[216px] -translate-x-1/2 rounded object-cover" />
              </div>
            </div>
          ))}
        </ScaledStage>
      </div>
    </section>
  )
}

function HobbyMark() {
  const diamonds = [[17.16, 8], [17.16, 25.3], [8.7, 16.44], [25.61, 16.44]]

  return (
    <div className="absolute flex size-[55.606px] items-center justify-center" style={{ left: 371.2, top: 116.2 }}>
      <div className="relative size-12 -rotate-10 overflow-hidden rounded-[9px] bg-[#fd6e36]">
        {diamonds.map(([left, top]) => (
          <div key={`${left}-${top}`} className="absolute flex size-[13.667px] items-center justify-center" style={{ left, top }}>
            <div className="size-[9.664px] -rotate-45 rounded-[2px] bg-[#301208]" />
          </div>
        ))}
      </div>
    </div>
  )
}

function Hobbies() {
  return (
    <section className="relative mx-auto max-w-[1512px] px-page py-16 lg:h-[624px] lg:py-0 lg:pt-[77px]">
      <div className="mx-auto max-w-[776px] lg:translate-x-[80px]">
        <ScaledStage width={776} height={376}>
          <div className="absolute left-0 top-[234px] flex size-[107.258px] items-center justify-center">
            <div className="relative size-[83px] rotate-[-21.03deg]">
              <img src={`${P}/hobby-star.png`} alt="" className="absolute left-[6.27%] top-[4.91%] h-[84.83%] w-[87.46%]" />
            </div>
          </div>
          <div className="absolute left-[399px] top-[275px] h-[101.156px] w-[130.648px]">
            <img src={`${P}/hobby-squiggle.svg`} alt="" className="absolute left-[-0.79%] top-[-3.95%] block h-[107.9%] w-[115.19%] max-w-none" />
          </div>
          <img src={`${P}/hobby-circle.svg`} alt="" className="absolute left-[606px] top-[341px] size-[35px]" />
          <img src={`${P}/hobby-coin-1.svg`} alt="" className="absolute left-[582px] top-[317px] size-[50px]" />
          <img src={`${P}/hobby-coin-2.svg`} alt="" className="absolute left-[587px] top-[322px] size-10" />
          <img src={`${P}/hobby-dollar.svg`} alt="" className="absolute left-[600px] top-[328px]" />
          <div className="absolute left-[582px] top-0 h-[183px] w-[194px] overflow-hidden">
            <img src={`${P}/hobby-image.png`} alt="" className="absolute left-[-131.96%] top-0 h-[178.69%] w-[299.48%] max-w-none" />
          </div>
          <HobbyMark />
        </ScaledStage>
      </div>
      <p data-reveal className="mx-auto mt-8 max-w-[443px] text-center text-body-lg leading-[1.4] text-black lg:absolute lg:left-1/2 lg:top-[260px] lg:mt-0 lg:w-[443px] lg:-translate-x-1/2">
        Beyond design: football, video games, still life drawings, and Arcades.
      </p>
    </section>
  )
}

function Profile() {
  return (
    <>
      <Hero />
      <Intro />
      <Focus />
      <Philosophy />
      <Collaboration />
      <Community />
      <Hobbies />
    </>
  )
}

export default Profile
