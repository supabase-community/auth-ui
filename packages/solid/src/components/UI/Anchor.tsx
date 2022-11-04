import { css } from '@stitches/core'
import { generateClassNames } from '../../../common/theming'
import { Appearance } from '../../types'
import { JSX } from 'solid-js/jsx-runtime'
import { Component, JSXElement } from 'solid-js'

const anchorHTMLAttributes = css({
  fontFamily: '$bodyFontFamily',
  fontSize: '$baseBodySize',
  marginBottom: '$anchorBottomMargin',
  color: '$anchorTextColor',
  display: 'block',
  textAlign: 'center',
  textDecoration: 'underline',
  '&:hover': {
    color: '$anchorTextHoverColor',
  },
  fontWeight:'200',
  textDecorationLine:'none'
})

interface LabelProps extends JSX.AnchorHTMLAttributes<HTMLAnchorElement> {
  children:JSXElement 
  appearance?: Appearance
}

const Anchor: Component<LabelProps> = (props) => {
  const classNames = generateClassNames(
    'anchor',
    anchorHTMLAttributes(),
    props.appearance
  )

  return (
    <a
      {...props}
      style={props.appearance?.style?.anchor}
      class={classNames.join(' ')}
    >
      {props.children}
    </a>
  )
}

export { Anchor }