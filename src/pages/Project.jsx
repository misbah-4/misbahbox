import { Navigate, useParams } from 'react-router-dom'
import { projects } from '../data/projects.js'

function Section({ heading, body, image, first }) {
  return (
    <>
      <section data-reveal className={`mx-auto w-full max-w-measure ${first ? '' : 'mt-16 lg:mt-24'}`}>
        {heading && <h2 className="mb-6 text-lead font-medium leading-[1.4] text-copy">{heading}</h2>}
        <div className="flex flex-col gap-6 text-base-lg leading-[1.55] text-copy">
          {body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
      </section>
      {image && (
        <div
          data-reveal
          className={`mx-auto aspect-[756/405] w-full max-w-[756px] ${image.tight ? 'mt-12' : 'mt-16 lg:mt-24'}`}
          style={{ backgroundColor: image.bg }}
        >
          <img loading="lazy" decoding="async" src={image.src} alt={image.alt} className="size-full object-cover" />
        </div>
      )}
    </>
  )
}

function Project() {
  const { slug } = useParams()
  const project = projects[slug]

  if (!project) return <Navigate to="/work" replace />

  return (
    <article className="mx-auto max-w-[1512px] px-page pt-[170px]">
      <div className="mx-auto flex h-[202px] w-[174px] items-center justify-center">
        <img src={project.hero} alt="" className="h-[178.33px] w-[142.44px] -rotate-169" />
      </div>
      <div className="mx-auto mt-[102px] w-full max-w-measure">
        <h1 data-reveal className="text-h1 font-medium leading-[1.2] tracking-[-0.01em] text-black">{project.title}</h1>
      </div>
      <div className="mt-12">
        {project.sections.map((section, index) => (
          <Section key={section.heading ?? 'intro'} first={index === 0} {...section} />
        ))}
      </div>
      <div className="h-20 lg:h-[207px]" />
    </article>
  )
}

export default Project
