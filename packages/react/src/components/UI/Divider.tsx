import { css } from '@stitches/core'

const dividerDefaultStyles = css({
  background: '$dividerBackground',
  display: 'block',
  margin: '16px 0',
  height: '1px',
  width: '100%',
})

interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {}

const Divider: React.FC<DividerProps> = ({ children, ...props }) => {
  return <div {...props} className={dividerDefaultStyles()}></div>
}

export { Divider }
