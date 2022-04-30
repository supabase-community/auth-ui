import { css } from '@stitches/core'

const inputDefaultStyles = css({
  background: 'transparent',
  borderRadius: '4px',
  padding: '10px 15px',
  cursor: 'text',
  borderWidth: '1px',
  borderColor: 'lightgray',
  borderStyle: 'solid',
  fontSize: '14px',
  width: '100%',
  boxSizing: 'border-box',
  '&:hover': {
    borderColor: 'gray',
    outline: 'none',
  },
  '&:focus': {
    borderColor: 'gray',
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
