import { BaseAppearance, BaseAuth, ViewType } from '@supabase/auth-ui-shared'
import { CSSProperties, ReactNode } from 'react'

export interface Appearance extends BaseAppearance {
  style?: {
    anchor?: CSSProperties
    button?: CSSProperties
    container?: CSSProperties
    divider?: CSSProperties
    input?: CSSProperties
    label?: CSSProperties
    loader?: CSSProperties
    message?: CSSProperties
  }
}

export interface Auth extends BaseAuth {
  children?: ReactNode
  appearance?: Appearance
  onViewChange?: (view: ViewType) => void
}
