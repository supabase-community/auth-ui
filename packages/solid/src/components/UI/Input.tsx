import { css } from '@stitches/core'
import { Component, JSX, JSXElement } from 'solid-js'
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

interface InputProps extends JSX.InputHTMLAttributes<HTMLInputElement> {
  children?: JSXElement 
  type: 'text' | 'password' | 'email'
  appearance?: Appearance
}

const Input: Component<InputProps> = (props) => {
  const classNames = generateClassNames(
    'input',
    inputDefaultStyles({
      type: props.type === 'password' ? 'password' : 'default',
    }),
    props.appearance
  )

  return (
    <input
      {...props}
      style={props.appearance?.style?.input}
      class={classNames.join(' ')}
    >
      {props.children}
    </input>
  )
}

export { Input }