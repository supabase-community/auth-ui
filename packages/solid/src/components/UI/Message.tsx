import { css } from '@stitches/core'
import { Component, JSXElement, JSX } from 'solid-js'
import { generateClassNames } from '@supabase/auth-ui-shared'
import { Appearance } from '../../types'

const messageDefaultStyles = css({
  fontFamily: '$bodyFontFamily',
  fontSize: '$baseBodySize',
  marginBottom: '$labelBottomMargin',
  display: 'block',
  textAlign: 'center',
  variants: {
    color: {
      default: {
        color: '$messageText',
      },
      danger: {
        color: '$messageTextDanger',
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
