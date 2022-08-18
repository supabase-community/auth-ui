import { CssComponent } from '@stitches/core/types/styled-component'
import { Provider, SupabaseClient } from '@supabase/supabase-js'
import { I18nVariables } from '../common/lib/Localization'
import { ThemeVariables } from '../common/theming'

export interface AnimationTailwindClasses {
  enter?: string
  enterFrom?: string
  enterTo?: string
  leave?: string
  leaveFrom?: string
  leaveTo?: string
}

export type AuthProviders = Provider

export type Localization = I18nVariables

export type SocialLayout = 'horizontal' | 'vertical'
export type SocialButtonSize = 'tiny' | 'small' | 'medium' | 'large' | 'xlarge'

export type ViewSignIn = 'sign_in'
export type ViewSignUp = 'sign_up'
export type ViewMagicLink = 'magic_link'
export type ViewForgottenPassword = 'forgotten_password'
export type ViewUpdatePassword = 'update_password'

export type ViewType =
  | ViewSignIn
  | ViewSignUp
  | ViewMagicLink
  | ViewForgottenPassword
  | ViewUpdatePassword

export interface ViewsMap {
  [key: string]: ViewType
}

export interface Theme {
  default: ThemeVariables
  [key: string]: ThemeVariables
}

export type RedirectTo = undefined | string

export interface Appearance {
  // theme?: 'supabase' | 'minimal' // | 'flat' | 'minimal' | 'bubblegum'
  theme?: Theme
  extendAppearance?: boolean
  prependedClassName?: string
  variables?: {
    default: ThemeVariables
    [key: string]: ThemeVariables
  }
  className?: {
    anchor?: string | CssComponent
    button?: string | CssComponent
    container?: string | CssComponent
    divider?: string | CssComponent
    input?: string | CssComponent
    label?: string | CssComponent
    loader?: string | CssComponent
    message?: string | CssComponent
  }
  style?: {
    anchor?: React.CSSProperties
    button?: React.CSSProperties
    container?: React.CSSProperties
    divider?: React.CSSProperties
    input?: React.CSSProperties
    label?: React.CSSProperties
    loader?: React.CSSProperties
    message?: React.CSSProperties
  }
}

export interface Auth {
  supabaseClient: SupabaseClient
  children?: React.ReactNode
  socialLayout?: SocialLayout
  providers?: Provider[]
  view?: ViewType
  redirectTo?: RedirectTo
  onlyThirdPartyProviders?: boolean
  magicLink?: boolean

  /**
   * This will toggle on the dark variation of the theme
   */
  dark?: boolean
  /**
   * Override the labels and button text
   */
  localization?: {
    lang?: 'en' | 'ja' // es
    variables?: I18nVariables
  }
  appearance?: Appearance
  theme?: 'default' | string
}
