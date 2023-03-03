import { BaseAppearance } from '../types'
import { CLASS_NAMES, PREPENDED_CLASS_NAMES } from './../constants'

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
  appearance?: BaseAppearance
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

  if (appearance?.extend === undefined || appearance?.extend === true) {
    classNames.push(defaultStyles)
  }

  return classNames
}
