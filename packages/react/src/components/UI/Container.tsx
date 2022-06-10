import { css } from '@stitches/core'
import { generateClassNames } from '../../../common/theming'
import { CLASS_NAMES, PREPENDED_CLASS_NAMES } from '../../constants'
import { Appearance } from '../../types'

const containerDefaultStyles = css({
  display: 'flex',
  gap: '4px',
  variants: {
    direction: {
      horizontal: {
        flexDirection: 'row',
        margin: '4px 0',
      },
      vertical: {
        flexDirection: 'column',
        margin: '8px 0',
      },
    },
    gap: {
      small: {
        gap: '4px',
      },
      medium: {
        gap: '8px',
      },
      large: {
        gap: '16px',
      },
    },
  },
})

export interface ContainerProps
  extends React.HtmlHTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  direction?: 'horizontal' | 'vertical'
  gap?: 'small' | 'medium' | 'large'
  appearance?: Appearance
}

const Container: React.FC<ContainerProps> = ({
  children,
  appearance,
  ...props
}) => {
  const classNames = generateClassNames(
    'container',
    containerDefaultStyles({
      direction: props.direction,
      gap: props.gap,
    }),
    appearance
  )

  return (
    <div
      {...props}
      style={appearance?.style?.container}
      className={classNames.join(' ')}
    >
      {children}
    </div>
  )
}

export { Container }
