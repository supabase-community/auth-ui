import { CssComponent } from '@stitches/core/types/styled-component'
import { Provider, SupabaseClient } from '@supabase/supabase-js'
import { JSXElement } from 'solid-js'
import { JSX } from 'solid-js/jsx-runtime'
import { ThemeVariables } from '../common/theming'

export type FormEvent = Event & {
  submitter: HTMLElement;
} & {
  currentTarget: HTMLFormElement;
  target: Element;
}

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
}

export enum SocialLayouts {'horizontal', 'vertical'}
export type SocialLayout = keyof typeof SocialLayouts | SocialLayouts
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
    anchor?: JSX.CSSProperties
    button?: JSX.CSSProperties
    container?: JSX.CSSProperties
    divider?: JSX.CSSProperties
    input?: JSX.CSSProperties
    label?: JSX.CSSProperties
    loader?: JSX.CSSProperties
    message?: JSX.CSSProperties
  }
}

export interface Auth {
  supabaseClient: SupabaseClient
  children?: JSXElement
  socialLayout?: SocialLayout | string
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
    lang?: 'en' | 'ja' // es
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
  }
  sign_in?: {
    email_label?: string
    password_label?: string
    email_input_placeholder?: string
    password_input_placeholder?: string
    button_label?: string
    social_provider_text?: string
    link_text?: string
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
    email_input_placeholder?: string
    button_label?: string
    link_text?: string
  }
  update_password?: {
    password_label?: string
    password_input_placeholder?: string
    button_label?: string
  }
}