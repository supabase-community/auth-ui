/**
 * Create default theme
 *
 * createStitches()
 * https://stitches.dev/docs/api#theme
 *
 * to add a new theme use  createTheme({})
 * https://stitches.dev/docs/api#theme
 */

import { Theme } from './../types'

// brand: 'hsl(252 62% 55%)',
// brandAccent: 'hsl(252 62% 45%)',

export const ThemeSupa: Theme = {
  default: {
    colors: {
      brand: 'hsl(153 60.0% 53.0%)',
      brandAccent: 'hsl(154 54.8% 45.1%)',
      brandButtonText: 'white',
      defaultButtonBackground: 'white',
      defaultButtonBackgroundHover: '#eaeaea',
      defaultButtonBorder: 'lightgray',
      defaultButtonText: 'gray',
      dividerBackground: '#eaeaea',
      inputBackground: 'transparent',
      inputBorder: 'lightgray',
      inputBorderHover: 'gray',
      inputBorderFocus: 'gray',
      inputText: 'black',
      inputLabelText: 'gray',
      inputPlaceholder: 'darkgray',
      messageText: '#2b805a',
      messageBackground: '#e7fcf1',
      messageBorder: '#d0f3e1',
      messageTextDanger: '#ff6369',
      messageBackgroundDanger: '#fff8f8',
      messageBorderDanger: '#822025',
      anchorTextColor: 'gray',
      anchorTextHoverColor: 'darkgray',
    },
    space: {
      spaceSmall: '4px',
      spaceMedium: '8px',
      spaceLarge: '16px',
      labelBottomMargin: '8px',
      anchorBottomMargin: '4px',
      emailInputSpacing: '4px',
      socialAuthSpacing: '4px',
      buttonPadding: '10px 15px',
      inputPadding: '10px 15px',
    },
    fontSizes: {
      baseBodySize: '13px',
      baseInputSize: '14px',
      baseLabelSize: '14px',
      baseButtonSize: '14px',
    },
    fonts: {
      bodyFontFamily: `ui-sans-serif, sans-serif`,
      buttonFontFamily: `ui-sans-serif, sans-serif`,
      inputFontFamily: `ui-sans-serif, sans-serif`,
      labelFontFamily: `ui-sans-serif, sans-serif`,
    },
    // fontWeights: {},
    // lineHeights: {},
    // letterSpacings: {},
    // sizes: {},
    borderWidths: {
      buttonBorderWidth: '1px',
      inputBorderWidth: '1px',
    },
    // borderStyles: {},
    radii: {
      borderRadiusButton: '4px',
      buttonBorderRadius: '4px',
      inputBorderRadius: '4px',
    },
    // shadows: {},
    // zIndices: {},
    // transitions: {},
  },
  dark: {
    colors: {
      brandButtonText: 'white',
      defaultButtonBackground: '#2e2e2e',
      defaultButtonBackgroundHover: '#3e3e3e',
      defaultButtonBorder: '#3e3e3e',
      defaultButtonText: 'white',
      dividerBackground: '#2e2e2e',
      inputBackground: '#1e1e1e',
      inputBorder: '#3e3e3e',
      inputBorderHover: 'gray',
      inputBorderFocus: 'gray',
      inputText: 'white',
      inputPlaceholder: 'darkgray',
      messageText: '#85e0b7',
      messageBackground: '#072719',
      messageBorder: '#2b805a',
      messageBackgroundDanger: '#1f1315',
    },
  },
}

export const ThemeMinimal: Theme = {
  default: {
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
      messageText: '#2b805a',
      messageBackground: '#e7fcf1',
      messageBorder: '#d0f3e1',
      messageTextDanger: '#ff6369',
      messageBackgroundDanger: '#fff8f8',
      messageBorderDanger: '#822025',
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
      // linkFontFamily: '',
    },
    // fontWeights: {},
    // lineHeights: {},
    // letterSpacings: {},
    // sizes: {},
    borderWidths: {},
    // borderStyles: {},
    radii: {},
    // shadows: {},
    // zIndices: {},
    // transitions: {},
  },
  dark: {
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
      messageText: '#85e0b7',
      messageBackground: '#072719',
      messageBorder: '#2b805a',
      messageBackgroundDanger: '#1f1315',
    },
  },
}
