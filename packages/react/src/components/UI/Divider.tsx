import { css } from '@stitches/core'
import { generateClassNames } from '../../../common/theming'
import { CLASS_NAMES } from '../../constants'
import { Appearance } from '../../types'

const dividerDefaultStyles = css({
  background: '$dividerBackground',
  display: 'block',
  margin: '16px 0',
  height: '1px',
  width: '100%',
})

interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  appearance?: Appearance
}

const Divider: React.FC<DividerProps> = ({
  children,
  appearance,
  ...props
}) => {
  const classNames = generateClassNames(
    'divider',
    dividerDefaultStyles(),
    appearance
  )

  return (
    <div
      {...props}
      style={appearance?.style?.divider}
      className={classNames.join(' ')}
    ></div>
  )
}

export { Divider }
