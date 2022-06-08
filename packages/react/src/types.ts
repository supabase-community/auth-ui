import { Provider } from '@supabase/supabase-js'

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
  }
  magic_link?: {
    email_label?: string
    password_label?: string
    sign_up_button_text?: string
    link_text?: string
  }
  forgotten_password?: {
    email_label?: string
    password_label?: string
    sign_up_button_text?: string
    link_text?: string
  }
  update_password?: {
    email_label?: string
    password_label?: string
    sign_up_button_text?: string
    link_text?: string
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

export type CustomTheme = {
  colors: { [x: string]: string }
  space: { [x: string]: string }
  fontSizes: { [x: string]: string }
  fonts: { [x: string]: string }
  fontWeights: { [x: string]: string }
  lineHeights: { [x: string]: string }
  letterSpacings: { [x: string]: string }
  sizes: { [x: string]: string }
  borderWidths: { [x: string]: string }
  borderStyles: { [x: string]: string }
  radii: { [x: string]: string }
  shadows: { [x: string]: string }
  zIndices: { [x: string]: string }
  transitions: { [x: string]: string }
}[]

export type RedirectTo = undefined | string
