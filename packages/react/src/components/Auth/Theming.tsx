import { createStitches, createTheme } from '@stitches/core'

/**
 * Create default theme
 *
 * createStitches()
 * https://stitches.dev/docs/api#theme
 *
 * to add a new theme use  createTheme({})
 * https://stitches.dev/docs/api#theme
 */

const supabase = {
  colors: {
    brand: 'hsl(252 62% 55%)',
    brandAccent: 'hsl(252 62% 45%)',
    brandButtonText: 'white',
    defaultButtonBackground: 'white',
    defaultButtonBorder: 'lightgray',
    defaultButtonText: 'gray',
    dividerBackground: '#eaeaea',
    inputBackground: 'transparent',
    inputBorder: 'lightgray',
    inputText: 'black',
    inputPlaceholder: 'darkgray',
  },
  space: {
    spaceSmall: '4px',
    spaceMedium: '8px',
    spaceLarge: '16px',
  },
  fontSizes: {
    baseInputSize: '14px',
    baseLabelSize: '12px',
  },
  fonts: {
    bodyFontFamily: '',
    inputFontFamily: '',
    buttonFontFamily: '',
    labelFontFamily: '',
    linkFontFamily: '',
  },
  fontWeights: {},
  lineHeights: {},
  letterSpacings: {},
  sizes: {},
  borderWidths: {},
  borderStyles: {},
  radii: {},
  shadows: {},
  zIndices: {},
  transitions: {},
}

const defaultDarkTheme = {
  colors: {
    brandButtonText: 'white',
    defaultButtonBackground: '#080808',
    defaultButtonBorder: 'black',
    defaultButtonText: 'white',
    dividerBackground: 'black',
    inputBackground: 'transparent',
    inputBorder: 'gray',
    inputText: 'white',
    inputPlaceholder: 'darkgray',
  },
}

const minimal = {
  colors: {
    brand: 'black',
    brandAccent: '#333333',
    brandButtonText: 'white',
    defaultButtonBackground: 'white',
    defaultButtonBorder: 'lightgray',
    defaultButtonText: 'gray',
    dividerBackground: '#eaeaea',
    inputBackground: 'transparent',
    inputBorder: 'lightgray',
    inputText: 'black',
    inputPlaceholder: 'darkgray',
  },
  space: {
    spaceSmall: '4px',
    spaceMedium: '8px',
    spaceLarge: '16px',
  },
  fontSizes: {
    baseInputSize: '14px',
    baseLabelSize: '12px',
  },
  fonts: {
    bodyFontFamily: '',
    inputFontFamily: '',
    buttonFontFamily: '',
    labelFontFamily: '',
    linkFontFamily: '',
  },
  fontWeights: {},
  lineHeights: {},
  letterSpacings: {},
  sizes: {},
  borderWidths: {},
  borderStyles: {},
  radii: {},
  shadows: {},
  zIndices: {},
  transitions: {},
}

const minimalDark = {
  colors: {
    brand: 'white',
    brandAccent: '#afafaf',
    brandButtonText: 'black',
    defaultButtonBackground: '#080808',
    defaultButtonBorder: 'black',
    defaultButtonText: 'white',
    dividerBackground: 'black',
    inputBackground: 'transparent',
    inputBorder: 'gray',
    inputText: 'black',
    inputPlaceholder: 'darkgray',
  },
}

const darkThemes = {
  supabase: defaultDarkTheme,
  minimal: minimalDark,
}

export { supabase, minimal, darkThemes }
