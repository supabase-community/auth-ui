import { css } from '@stitches/core'

const inputDefaultStyles = css({
  background: 'transparent',
  borderRadius: '4px',
  fontSize: '13px',
  padding: '10px 15px',
  cursor: 'text',
  //   outline: 'none',
  borderWidth: '1px',
  borderColor: 'lightgray',
  borderStyle: 'solid',
  '&:hover': {
    borderColor: 'gray',
    outline: 'none',
  },
  '&:focus': {
    borderColor: 'gray',
    outline: 'none',
  },
  width: '100%',
  boxSizing: 'border-box',
})

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  children?: React.ReactNode
}

const Input: React.FC<InputProps> = ({ children, ...props }) => {
  return (
    <input {...props} className={inputDefaultStyles()}>
      {children}
    </input>
  )
}

export { Input }
