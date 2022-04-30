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
    sign_up_button_text?: string
  }
  sign_in?: {
    email_label?: string
    password_label?: string
    sign_up_button_text?: string
  }
}
