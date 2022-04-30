import { css } from '@stitches/core'

const anchorHTMLAttributes = css({
  fontSize: '12px',
  marginBottom: '6px',
  color: 'darkgray',
  display: 'block',
  textDecoration: 'underline',
  '&:hover': {
    color: 'gray',
  },
})

interface LabelProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode
}

const Anchor: React.FC<LabelProps> = ({ children, ...props }) => {
  return (
    <a {...props} className={anchorHTMLAttributes()}>
      {children}
    </a>
  )
}

export { Anchor }
