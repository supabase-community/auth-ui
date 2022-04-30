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
