import { css } from '@stitches/core'
import { generateClassNames } from '../../../common/theming'
import { Appearance } from '../../types'

const labelDefaultStyles = css({
  fontFamily: '$labelFontFamily',
  fontSize: '$baseLabelSize',
  marginBottom: '$labelBottomMargin',
  color: '$inputLabelText',
  display: 'block',
})

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode
  appearance?: Appearance
}

const Label: React.FC<LabelProps> = ({ children, appearance, ...props }) => {
  const classNames = generateClassNames(
    'label',
    labelDefaultStyles(),
    appearance
  )

  return (
    <label
      {...props}
      style={appearance?.style?.label}
      className={classNames.join(' ')}
    >
      {children}
    </label>
  )
}

export { Label }
