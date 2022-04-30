import { css } from '@stitches/core'

const messageDefaultStyles = css({
  fontSize: '12px',
  marginBottom: '4px',
  display: 'block',
  color: 'gray',
  variants: {
    color: {
      default: {
        color: 'gray',
      },
      danger: {
        color: 'red',
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
