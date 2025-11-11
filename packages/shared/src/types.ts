import { CssComponent } from '@stitches/core/types/styled-component'
import {
  EmailOtpType,
  MobileOtpType,
  Provider,
  SupabaseClient,
} from '@supabase/supabase-js'
import { ThemeVariables } from './theming'

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
}

// export type SocialLayout = 'horizontal' | 'vertical'
export enum SocialLayouts {
  'horizontal',
  'vertical',
}
export type SocialLayout = keyof typeof SocialLayouts
export type SocialButtonSize = 'tiny' | 'small' | 'medium' | 'large' | 'xlarge'

export type ViewSignIn = 'sign_in'
export type ViewSignUp = 'sign_up'
export type ViewMagicLink = 'magic_link'
export type ViewForgottenPassword = 'forgotten_password'
export type ViewUpdatePassword = 'update_password'
export type ViewVerifyOtp = 'verify_otp'

export type ViewType =
  | ViewSignIn
  | ViewSignUp
  | ViewMagicLink
  | ViewForgottenPassword
  | ViewUpdatePassword
  | ViewVerifyOtp

export interface ViewsMap {
  [key: string]: ViewType
}

export interface Theme {
  default: ThemeVariables
  [key: string]: ThemeVariables
}

export type RedirectTo = undefined | string
export type OtpType = EmailOtpType | MobileOtpType

export interface BaseAppearance {
  theme?: Theme
  prependedClassName?: string
  extend?: boolean
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
}

export type ProviderScopes = {
  [key in Partial<Provider>]: string
}

export interface BaseAuth {
  supabaseClient: SupabaseClient
  socialLayout?: SocialLayout
  providers?: Provider[]
  providerScopes?: Partial<ProviderScopes>
  queryParams?: { [key: string]: string }
  view?: ViewType
  redirectTo?: RedirectTo
  onlyThirdPartyProviders?: boolean
  magicLink?: boolean
  showLinks?: boolean
  otpType?: OtpType
  additionalData?: { [key: string]: any }

  /**
   * This will toggle on the dark variation of the theme
   */
  dark?: boolean
  /**
   * Override the labels and button text
   */
  localization?: {
    variables?: I18nVariables
  }
  theme?: 'default' | string
  passwordLimit?: boolean
}

export type I18nVariables = {
  sign_up?: {
    email_label?: string
    password_label?: string
    email_input_placeholder?: string
    password_input_placeholder?: string
    button_label?: string
    loading_button_label?: string
    social_provider_text?: string
    link_text?: string
    confirmation_text?: string
  }
  sign_in?: {
    email_label?: string
    password_label?: string
    email_input_placeholder?: string
    password_input_placeholder?: string
    button_label?: string
    loading_button_label?: string
    social_provider_text?: string
    link_text?: string
  }
  magic_link?: {
    email_input_label?: string
    email_input_placeholder?: string
    button_label?: string
    loading_button_label?: string
    link_text?: string
    confirmation_text?: string
    empty_email_address?: string
  }
  forgotten_password?: {
    email_label?: string
    password_label?: string
    email_input_placeholder?: string
    button_label?: string
    loading_button_label?: string
    link_text?: string
    confirmation_text?: string
  }
  update_password?: {
    password_label?: string
    password_input_placeholder?: string
    button_label?: string
    loading_button_label?: string
    confirmation_text?: string
  }
  verify_otp?: {
    email_input_label?: string
    email_input_placeholder?: string
    phone_input_label?: string
    phone_input_placeholder?: string
    token_input_label?: string
    token_input_placeholder?: string
    button_label?: string
    loading_button_label?: string
    send_button_label?: string
    sending_button_label?: string
  }
}
