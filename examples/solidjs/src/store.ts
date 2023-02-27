import { SocialLayout } from '@supabase/auth-ui-shared'
import { createSignal } from 'solid-js'

export const [customButtonColor, setCustomButtonColor] =
  createSignal('rgb(202, 37, 37)')
export const [customBorderRadius, setCustomBorderRadius] = createSignal('5px')
export const [customTheme, setCustomTheme] = createSignal('dark')
export const [customSocialLayout, setCustomSocialLayout] =
  createSignal<SocialLayout>('horizontal')
