import { CssComponent } from '@stitches/core/types/styled-component'
import { Provider } from '@supabase/supabase-js'
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
  sign_up?: {
    email_label?: string
    password_label?: string
    button_text?: string
    social_provider_text: string
    link_text?: string
  }
  sign_in?: {
    email_label?: string
    password_label?: string
    button_text?: string
    social_provider_text: string
    link_text?: string
    link_text_return?: string
  }
  magic_link?: {
    email_input_label?: string
    email_input_placeholder?: string
    button_label?: string
    link_text?: string
  }
  forgotten_password?: {
    email_label?: string
    password_label?: string
    button_text?: string
    link_text?: string
  }
  update_password?: {
    password_label?: string
    password_input_placeholder?: string
    button_label?: string
  }
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

export type RedirectTo = undefined | string

export interface Appearance {
  theme?: 'supabase' | 'minimal' // | 'flat' | 'minimal' | 'bubblegum'
  extendAppearance?: boolean
  prependedClassName?: string
  variables?: {
    light?: ThemeVariables
    dark?: ThemeVariables
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
