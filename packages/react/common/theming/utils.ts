import { CssComponent } from '@stitches/core/types/styled-component'
import { Appearance } from '../../src/types'
import { CLASS_NAMES, PREPENDED_CLASS_NAMES } from './../../src/constants'

export function generateClassNames(
  /**
   * name of css class name variable
   */
  classNameKey:
    | 'button'
    | 'container'
    | 'anchor'
    | 'divider'
    | 'label'
    | 'input'
    | 'loader'
    | 'message',
  /**
   * stiches CSS output
   */
  defaultStyles: string,
  /**
   * appearance variables
   */
  appearance?: Appearance
) {
  const classNames = []

  const className = CLASS_NAMES[classNameKey]

  classNames.push(
    appearance?.prependedClassName
      ? appearance?.prependedClassName + '_' + className
      : PREPENDED_CLASS_NAMES + '_' + className
  )

  if (appearance?.className?.[classNameKey]) {
    classNames.push(appearance?.className?.[classNameKey])
  }

  // if (
  //   appearance?.extendAppearance === undefined ||
  //   appearance?.extendAppearance === true
  // ) {
  classNames.push(defaultStyles)
  // }

  return classNames
}
