import { css } from '@stitches/core'
import { generateClassNames } from '../../../common/theming'
import { Appearance } from '../../types'

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
  appearance?: Appearance
}

const Message: React.FC<MessageProps> = ({
  children,
  appearance,
  ...props
}) => {
  const classNames = generateClassNames(
    'message',
    messageDefaultStyles({ color: props.color }),
    appearance
  )

  return (
    <span
      {...props}
      style={appearance?.style?.message}
      className={classNames.join(' ')}
    >
      {children}
    </span>
  )
}

export { Message }
