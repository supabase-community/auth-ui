// import css for san serif font styling
import './preview.css'
import { themes } from '@storybook/theming'

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  darkMode: {
    darkClass: 'dark',
    lightClass: 'light',
    // Override the default dark theme
    // dark: { ...themes.dark, appBg: 'black' },
    // Override the default light theme
    // light: { ...themes.normal, appBg: 'white' },
    stylePreview: true,
  },
}
