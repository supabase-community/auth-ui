import { css } from '@stitches/core'

const labelDefaultStyles = css({
  fontSize: '$baseLabelSize',
  marginBottom: '$spaceLarge',
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
