import { Link } from 'react-router-dom'

const arrow = (
  <img
    src="/images/icons/arrow-up-right.svg"
    alt=""
    width="16"
    height="16"
    className="transition-transform duration-200 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
  />
)

// Renders plain text until the destination exists.
function ArrowLink({ to, href, children }) {
  const classes = 'group relative inline-flex before:absolute before:inset-x-0 before:-inset-y-2.5 items-center gap-1 whitespace-nowrap text-base-lg leading-6 text-muted transition-colors duration-200 hover:text-ink'

  if (href) {
    return <a href={href} target="_blank" rel="noreferrer" className={classes}>{children}{arrow}</a>
  }

  if (!to) {
    return <span className={classes}>{children}{arrow}</span>
  }

  return <Link to={to} className={classes}>{children}{arrow}</Link>
}

export default ArrowLink
