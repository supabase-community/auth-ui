import { css } from '@stitches/core'

const inputDefaultStyles = css({
  background: 'transparent',
  borderRadius: '4px',
  padding: '10px 15px',
  cursor: 'text',
  borderWidth: '1px',
  borderColor: '$inputBorder',
  borderStyle: 'solid',
  fontSize: '$baseInput',
  width: '100%',
  color: '$inputText',
  boxSizing: 'border-box',
  '&:hover': {
    borderColor: '$inputText',
    outline: 'none',
  },
  '&:focus': {
    borderColor: '$inputText',
    outline: 'none',
  },
  '&::placeholder': {
    color: 'darkgray',
    letterSpacing: 'initial',
  },
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

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  children?: React.ReactNode
  type: 'text' | 'password' | 'email'
}

const Input: React.FC<InputProps> = ({ children, ...props }) => {
  return (
    <input
      {...props}
      className={inputDefaultStyles({
        type: props.type === 'password' ? 'password' : 'default',
      })}
    >
      {children}
    </input>
  )
}

export { Input }
