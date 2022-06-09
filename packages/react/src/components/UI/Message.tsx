import { css } from '@stitches/core'

const messageDefaultStyles = css({
  fontFamily: '$bodyFontFamily',
  fontSize: '$baseBodySize',
  marginBottom: '$labelBottomMargin',
  display: 'block',
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

interface MessageProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode
  color?: 'default' | 'danger'
}

const Message: React.FC<MessageProps> = ({ children, ...props }) => {
  return (
    <span {...props} className={messageDefaultStyles({ color: props.color })}>
      {children}
    </span>
  )
}

export { Message }
