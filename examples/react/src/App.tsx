import styles from './App.module.css'
import { createClient } from '@supabase/supabase-js'
import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import Selectors from './Selectors'
import { AppState } from './store'
import { useState } from 'react'

const supabase = createClient(
  'https://fmlovqieocwjaghmavax.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZtbG92cWllb2N3amFnaG1hdmF4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2Njc1MTE3NzYsImV4cCI6MTk4MzA4Nzc3Nn0.gdJ0CmtGcauVXXD1TY5GtHPePPoC2IEP2_vYQLjYnIg'
)

const classes: { [key: string]: string } = {
  'rgb(202, 37, 37)': styles['container-redshadow'],
  'rgb(65, 163, 35)': styles['container-greenshadow'],
  'rgb(8, 107, 177)': styles['container-blueshadow'],
  'rgb(235, 115, 29)': styles['container-orangeshadow'],
}

function App() {
  const buttonColor = useState('rgb(202, 37, 37)')
  const borderRadius = useState('5px')
  const theme = useState('dark')
  const socialLayout = useState('horizontal')

  const [customButtonColor] = buttonColor
  const [customBorderRadius] = borderRadius
  const [customTheme] = theme
  const [customSocialLayout] = socialLayout

  const value = { buttonColor, borderRadius, theme, socialLayout }

  return (
    <AppState.Provider value={value}>
      <div className={styles.header}>
        <div className={styles['auth-container']}>
          <div className={classes[customButtonColor]}>
            <Auth
              supabaseClient={supabase}
              appearance={{
                theme: ThemeSupa,
                style: {
                  button: {
                    borderRadius: customBorderRadius,
                    borderColor: 'rgba(0,0,0,0)',
                  },
                },
                variables: {
                  default: {
                    colors: {
                      brand: customButtonColor,
                      brandAccent: `gray`,
                    },
                  },
                },
              }}
              providers={['apple', 'google', 'github']}
              socialLayout={customSocialLayout}
              theme={customTheme}
            />
          </div>
        </div>
        <Selectors />
      </div>
    </AppState.Provider>
  )
}

export default App
