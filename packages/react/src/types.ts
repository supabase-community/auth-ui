import { CssComponent } from '@stitches/core/types/styled-component'
import { Provider, SupabaseClient } from '@supabase/supabase-js'
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
export interface Localization {
  // [key: string]: I18nVariables
  ['en']: I18nVariables
  ['ja']: I18nVariables
  ['de_formal']: I18nVariables
  ['de_informal']: I18nVariables
  ['dk']: I18nVariables
  ['fi']: I18nVariables
  ['fr']: I18nVariables
  ['it']: I18nVariables
  ['es']: I18nVariables
  ['pt']: I18nVariables
  ['nl']: I18nVariables
  ['no']: I18nVariables
  ['se']: I18nVariables
  ['zh_cn']: I18nVariables
  ['zh_tw']: I18nVariables
}

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
  theme?: Theme
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
  showLinks?: boolean

  /**
   * This will toggle on the dark variation of the theme
   */
  dark?: boolean
  /**
   * Override the labels and button text
   */
  localization?: {
    lang?: 'en' | 'ja' | 'fr' // ess
    variables?: I18nVariables
  }
  appearance?: Appearance
  theme?: 'default' | string
}

export type I18nVariables = {
  sign_up?: {
    email_label?: string
    password_label?: string
    email_input_placeholder?: string
    password_input_placeholder?: string
    button_label?: string
    social_provider_text?: string
    link_text?: string
    error_message?: string
  }
  sign_in?: {
    email_label?: string
    password_label?: string
    email_input_placeholder?: string
    password_input_placeholder?: string
    button_label?: string
    social_provider_text?: string
    link_text?: string
    error_message?: string
  }
  magic_link?: {
    email_input_label?: string
    email_input_placeholder?: string
    button_label?: string
    link_text?: string
    error_message?: string
  }
  forgotten_password?: {
    email_label?: string
    password_label?: string
    email_input_placeholder?: string
    button_label?: string
    link_text?: string
    error_message?: string
  }
  update_password?: {
    password_label?: string
    password_input_placeholder?: string
    button_label?: string
    error_message?: string
  }
}
