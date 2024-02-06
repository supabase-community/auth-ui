import { css } from '@stitches/core'
import { Component, JSXElement, JSX } from 'solid-js'
import { generateClassNames } from '@supabase/auth-ui-shared'
import { Appearance } from '../../types'

const messageDefaultStyles = css({
  fontFamily: '$bodyFontFamily',
  fontSize: '$baseInputSize',
  marginBottom: '$labelBottomMargin',
  display: 'block',
  textAlign: 'center',
  borderRadius: '0.375rem',
  padding: '1.5rem 1rem',
  lineHeight: '1rem',
  variants: {
    color: {
      default: {
        color: '$messageText',
        backgroundColor: '$messageBackground',
        border: '1px solid $messageBorder',
      },
      danger: {
        color: '$messageTextDanger',
        backgroundColor: '$messageBackgroundDanger',
        border: '1px solid $messageBorderDanger',
      },
    },
  },
})

interface MessageProps extends JSX.HTMLAttributes<HTMLSpanElement> {
  children: JSXElement
  color?: 'default' | 'danger'
  appearance?: Appearance
}

const Message: Component<MessageProps> = (props) => {
  const classNames = generateClassNames(
    'message',
    messageDefaultStyles({ color: props.color }),
    props.appearance
  )

  return (
    <span
      {...props}
      style={props.appearance?.style?.message}
      class={classNames.join(' ')}
    >
      {props.children}
    </span>
  )
}

export { Message }
