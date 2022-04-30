import { css } from '@stitches/core'

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
}

const Container: React.FC<ContainerProps> = ({ children, ...props }) => {
  return (
    <div
      {...props}
      className={containerDefaultStyles({
        direction: props.direction,
        gap: props.gap,
      })}
    >
      {children}
    </div>
  )
}

export { Container }
