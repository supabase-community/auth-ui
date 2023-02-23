import { css } from '@stitches/core'
import { generateClassNames } from '@supabase/auth-ui-shared'
import { Appearance } from '../../types'

const containerDefaultStyles = css({
  display: 'flex',
  gap: '4px',
  variants: {
    direction: {
      horizontal: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(48px, 1fr))',
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
