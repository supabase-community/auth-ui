import { css } from '@stitches/core'
import { Component, JSXElement, JSX } from 'solid-js'
import { generateClassNames } from '../../../common/theming'
import { Appearance } from '../../types'

const labelDefaultStyles = css({
  fontFamily: '$labelFontFamily',
  fontSize: '$baseLabelSize',
  marginBottom: '$labelBottomMargin',
  color: '$inputLabelText',
  display: 'block',
})

interface LabelProps extends JSX.LabelHTMLAttributes<HTMLLabelElement> {
  children: JSXElement
  appearance?: Appearance
}

const Label: Component<LabelProps> = (props) => {
  const classNames = generateClassNames(
    'label',
    labelDefaultStyles(),
    props.appearance
  )

  return (
    <label
      {...props}
      style={props.appearance?.style?.label}
      class={classNames.join(' ')}
    >
      {props.children}
    </label>
  )
}

export { Label }