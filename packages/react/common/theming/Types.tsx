export type ThemeVariables = {
  colors?: {
    brand?: string
    brandAccent?: string
    brandButtonText?: string
    defaultButtonBackground?: string
    defaultButtonBackgroundHover?: string
    defaultButtonBorder?: string
    defaultButtonText?: string
    dividerBackground?: string
    inputBackground?: string
    inputBorder?: string
    inputBorderFocus?: string
    inputBorderHover?: string
    inputLabelText?: string
    inputPlaceholder?: string
    inputText?: string
    messageText?: string
    messageTextDanger?: string
    anchorTextColor?: string
    anchorTextHoverColor?: string
  }
  space?: {
    spaceSmall?: string
    spaceMedium?: string
    spaceLarge?: string
    labelBottomMargin?: string
    anchorBottomMargin?: string
    emailInputSpacing?: string
    socialAuthSpacing?: string
    buttonPadding?: string
    inputPadding?: string
  }
  fontSizes?: {
    baseBodySize?: string
    baseInputSize?: string
    baseLabelSize?: string
    baseButtonSize?: string
  }
  fonts?: {
    bodyFontFamily?: string
    buttonFontFamily?: string
    inputFontFamily?: string
    labelFontFamily?: string
  }
  borderWidths?: {
    buttonBorderWidth?: string
    inputBorderWidth?: string
  }
  radii?: {
    buttonBorderRadius?: string
    inputBorderRadius?: string
  }
}
