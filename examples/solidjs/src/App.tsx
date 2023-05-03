import styles from './App.module.css'
import { createClient } from '@supabase/supabase-js'
import Selectors from './Selectors'
import {
  customBorderRadius,
  customButtonColor,
  customSocialLayout,
  customTheme,
} from './store'
import { Auth } from '@supabase/auth-ui-solid'
import { ThemeSupa } from '@supabase/auth-ui-shared'

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)

const classes: { [key: string]: string } = {
  'rgb(202, 37, 37)': styles['container-redshadow'],
  'rgb(65, 163, 35)': styles['container-greenshadow'],
  'rgb(8, 107, 177)': styles['container-blueshadow'],
  'rgb(235, 115, 29)': styles['container-orangeshadow'],
}

function App() {
  return (
    <div class={styles.header}>
      <div class={styles['auth-container']}>
        <div class={classes[customButtonColor()]}>
          <Auth
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              style: {
                button: {
                  'border-radius': customBorderRadius(),
                  'border-color': 'rgba(0,0,0,0)',
                },
              },
              variables: {
                default: {
                  colors: { brand: customButtonColor(), brandAccent: `gray` },
                },
              },
            }}
            providers={['apple', 'google', 'github']}
            socialLayout={customSocialLayout()}
            theme={customTheme()}
          />
        </div>
      </div>
      <Selectors />
    </div>
  )
}

export default App
