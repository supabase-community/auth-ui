import { createClient } from '@supabase/supabase-js'
import { useDarkMode } from 'storybook-dark-mode'
import { Auth } from './'
import { Button, Message } from '../UI'
import { ThemeSupa } from './../../../common/theming/defaultThemes'

const supabase = createClient(
  'https://rsnibhkhsbfnncjmwnkj.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYxNTIxNDE1MywiZXhwIjoxOTMwNzkwMTUzfQ.OQEbAaTfgDdLCCht251P2JRD3QDnui6nsU8N-tZA_Mc'
)

export default {
  title: 'Auth/Appearance',
  component: Auth,
}

export const Default = (args: any) => {
  const Container = (props: any) => {
    // @ts-ignore
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

  return (
    <Auth.UserContextProvider supabaseClient={supabase}>
      <Container>
        <Auth
          theme={useDarkMode() ? 'dark' : 'default'}
          supabaseClient={supabase}
          providers={['google', 'facebook']}
          appearance={{
            theme: ThemeSupa,
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

// export const Test = (args: any) => {
//   return (
//     <Auth
//       supabaseClient={supabase}
//       appearance={{ theme: ThemeSupa }}
//       socialLayout="vertical"
//     />
//   )
// }

// Test.args = {}
