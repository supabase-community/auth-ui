import { css } from '@stitches/core'
import { generateClassNames } from '@supabase/auth-ui-shared'
import { Appearance } from '../../types'
import { JSXElement, JSX, Component, createMemo, createEffect } from 'solid-js'

const buttonDefaultStyles = css({
  fontFamily: '$buttonFontFamily',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
  borderRadius: '$borderRadiusButton',
  fontSize: '$baseButtonSize',
  padding: '$buttonPadding',
  cursor: 'pointer',
  borderWidth: '$buttonBorderWidth',
  borderStyle: 'solid',
  width: '100%',

  transitionProperty: 'background-color',
  transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
  transitionDuration: '100ms',

  variants: {
    color: {
      default: {
        backgroundColor: '$defaultButtonBackground',
        color: '$defaultButtonText',
        borderColor: '$defaultButtonBorder',
        '&:hover': {
          backgroundColor: '$defaultButtonBackgroundHover',
        },
      },
      primary: {
        backgroundColor: '$brand',
        color: '$brandButtonText',
        borderColor: '$brandAccent',
        '&:hover': {
          backgroundColor: '$brandAccent',
        },
      },
    },
  },
})

interface ButtonProps extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
  children: JSXElement
  icon?: JSXElement
  color?: 'default' | 'primary'
  loading?: boolean
  appearance?: Appearance
}

const Button: Component<ButtonProps> = (props) => {
  const classNames = createMemo(() =>
    generateClassNames(
      'button',
      buttonDefaultStyles({ color: props.color }),
      props.appearance
    )
  )

  return (
    <button
      {...props}
      style={props.appearance?.style?.button}
      class={classNames().join(' ')}
      disabled={props.loading}
    >
      {props.icon}
      {props.children}
    </button>
  )
}

export { Button }
