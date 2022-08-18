import { css } from '@stitches/core'
import { createClient } from '@supabase/supabase-js'
import { useDarkMode } from 'storybook-dark-mode'
import { Auth } from '.'
import { Button, Message } from '../UI'
import { Supa } from './../../../common/theming/defaultThemes'

const supabase = createClient(
  'https://rsnibhkhsbfnncjmwnkj.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYxNTIxNDE1MywiZXhwIjoxOTMwNzkwMTUzfQ.OQEbAaTfgDdLCCht251P2JRD3QDnui6nsU8N-tZA_Mc'
)

export default {
  title: 'Auth/Apperanace',
  component: Auth,
}

const Container = (props: any) => {
  const { user } = Auth.useUser()
  if (user)
    return (
      <>
        <Message>Signed in: {user.email}</Message>
        <Button onClick={() => props.supabaseClient.auth.signOut()}>
          Sign out
        </Button>
      </>
    )
  return (
    <div style={{ maxWidth: '320px', margin: 'auto' }}>{props.children}</div>
  )
}

export const Default = (args: any) => {
  return (
    <Auth.UserContextProvider supabaseClient={supabase}>
      <Container>
        <Auth
          theme={useDarkMode() ? 'dark' : 'default'}
          supabaseClient={supabase}
          providers={['google', 'facebook']}
          appearance={{
            theme: Supa,
            prependedClassName: 'jonnys-awesome-login',
            variables: {
              default: {
                colors: {
                  brand: 'red',
                  brandAccent: 'darkred',
                },
              },
            },
          }}
        />
      </Container>
    </Auth.UserContextProvider>
  )
}

Default.args = {}
