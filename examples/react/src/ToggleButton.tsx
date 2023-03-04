import { ReactNode } from 'react'

interface Props {
  className?: string
  children?: ReactNode
  color?: string
  defaultValue: string
  setSelected?: (v: string) => void
  selected?: string
}

export default function ToggleButton({
  children,
  color = 'transparent',
  defaultValue = '',
  className = '',
  setSelected = (v) => {},
  selected,
}: Props) {
  return (
    <button
      className={`toggle-button ${
        selected === defaultValue
          ? 'ring-scale-400 border-scale-800 ring-2 drop-shadow-lg border-2'
          : ''
      } ${className}`}
      style={{ backgroundColor: `${color}` }}
      onClick={() => {
        setSelected(defaultValue)
      }}
    >
      {children}
    </button>
  )
}
