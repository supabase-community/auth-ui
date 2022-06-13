import { css } from '@stitches/core'
import { generateClassNames } from '../../../common/theming'
import { Appearance } from '../../types'

const loaderDefaultStyles = css({
  borderRadius: '50%',
  width: '10em',
  height: '10em',
  margin: '60px auto',
  fontSize: '10px',
  position: 'relative',
  textIndent: '-9999em',

  borderTop: '1.1em solid rgba(255, 255, 255, 0.2)',
  borderRight: '1.1em solid rgba(255, 255, 255, 0.2)',
  borderBottom: '1.1em solid rgba(255, 255, 255, 0.2)',
  borderLeft: '1.1em solid #ffffff',

  '-webkit-transform': 'translateZ(0)',
  '-ms-transform': 'translateZ(0)',
  transform: 'translateZ(0)',
  '-webkit-animation': 'load8 1.1s infinite linear',
  animation: 'load8 1.1s infinite linear',

  '&:after': {
    borderRadius: '50%',
    width: '10em',
    height: '10em',
  },

  // @-webkit-keyframes load8 {
  //   0% {
  //     -webkit-transform: rotate(0deg);
  //     transform: rotate(0deg);
  //   }
  //   100% {
  //     -webkit-transform: rotate(360deg);
  //     transform: rotate(360deg);
  //   }
  // }
  // @keyframes load8 {
  //   0% {
  //     -webkit-transform: rotate(0deg);
  //     transform: rotate(0deg);
  //   }
  //   100% {
  //     -webkit-transform: rotate(360deg);
  //     transform: rotate(360deg);
  //   }
  // }
})

export interface LoaderProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  appearance?: Appearance
}

function Loader({ appearance, ...props }: LoaderProps) {
  const classNames = generateClassNames(
    'loader',
    loaderDefaultStyles(),
    appearance
  )

  return (
    <div
      {...props}
      style={appearance?.style?.loader}
      className={classNames.join(' ')}
    ></div>
  )
}

export { Loader }
