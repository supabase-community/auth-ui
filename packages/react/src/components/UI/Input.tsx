import { css } from '@stitches/core'
import { generateClassNames } from '../../../common/theming'
import { Appearance } from '../../types'

const inputDefaultStyles = css({
  fontFamily: '$inputFontFamily',
  background: '$inputBackground',
  borderRadius: '$inputBorderRadius',
  padding: '$inputPadding',
  cursor: 'text',
  borderWidth: '$inputBorderWidth',
  borderColor: '$inputBorder',
  borderStyle: 'solid',
  fontSize: '$baseInputSize',
  width: '100%',
  color: '$inputText',
  boxSizing: 'border-box',
  '&:hover': {
    borderColor: '$inputBorderHover',
    outline: 'none',
  },
  '&:focus': {
    borderColor: '$inputBorderFocus',
    outline: 'none',
  },
  '&::placeholder': {
    color: '$inputPlaceholder',
    letterSpacing: 'initial',
  },
  transitionPproperty: 'background-color, border',
  transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
  transitionDuration: '100ms',
  variants: {
    type: {
      default: {
        letterSpacing: '0px',
      },
      password: {
        letterSpacing: '6px',
      },
    },
  },
})

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  children?: React.ReactNode
  type: 'text' | 'password' | 'email'
  appearance?: Appearance
}

const Input: React.FC<InputProps> = ({ children, appearance, ...props }) => {
  const classNames = generateClassNames(
    'input',
    inputDefaultStyles({
      type: props.type === 'password' ? 'password' : 'default',
    }),
    appearance
  )

  return (
    <input
      {...props}
      style={appearance?.style?.input}
      className={classNames.join(' ')}
    >
      {children}
    </input>
  )
}

export { Input }
