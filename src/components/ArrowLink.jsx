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
function ArrowLink({ to, children }) {
  const classes = 'group inline-flex items-center gap-1 whitespace-nowrap text-base-lg leading-6 text-muted transition-colors duration-200 hover:text-ink'

  if (!to) {
    return <span className={classes}>{children}{arrow}</span>
  }

  return <Link to={to} className={classes}>{children}{arrow}</Link>
}

export default ArrowLink
