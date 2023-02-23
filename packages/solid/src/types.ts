import { BaseAppearance, BaseAuth } from '@supabase/auth-ui-shared'
import { JSXElement } from 'solid-js'
import { JSX } from 'solid-js/jsx-runtime'

export type FormEvent = Event & {
  submitter: HTMLElement
} & {
  currentTarget: HTMLFormElement
  target: Element
}

export interface Appearance extends BaseAppearance {
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

export interface Auth extends BaseAuth {
  children?: JSXElement
  appearance?: Appearance
}
