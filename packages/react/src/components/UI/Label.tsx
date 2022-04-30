import { css } from '@stitches/core'

const labelDefaultStyles = css({
  fontSize: '12px',
  marginBottom: '4px',
  color: 'gray',
  display: 'block',
})

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode
}

const Label: React.FC<LabelProps> = ({ children, ...props }) => {
  return (
    <label {...props} className={labelDefaultStyles()}>
      {children}
    </label>
  )
}

export { Label }
