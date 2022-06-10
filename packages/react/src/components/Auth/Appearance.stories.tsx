import { css } from '@stitches/core'
import { createClient } from '@supabase/supabase-js'
import { useDarkMode } from 'storybook-dark-mode'
import { Auth } from '.'
import { Button, Message } from '../UI'

const supabase = createClient(
  'https://rsnibhkhsbfnncjmwnkj.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYxNTIxNDE1MywiZXhwIjoxOTMwNzkwMTUzfQ.OQEbAaTfgDdLCCht251P2JRD3QDnui6nsU8N-tZA_Mc'
)

export default {
  title: 'Auth/Apperanace',
  component: Auth,
}

const myButtonStyles = css({
  fontFamily: 'arial',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
  fontSize: '16px',
  padding: '8px 4px',
  cursor: 'pointer',
  borderWidth: '2px',
  borderStyle: 'solid',
  width: '100%',

  transitionPproperty: 'background-color',
  transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
  transitionDuration: '100ms',

  variants: {
    color: {
      default: {
        backgroundColor: 'black',
        color: 'white',
      },
      primary: {
        backgroundColor: 'black',
        color: 'white',
        borderColor: 'black',
        '&:hover': {
          backgroundColor: 'darkgray',
        },
      },
    },
  },
})

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

/**
 *
 * [1] global themes
 * [2] dark mode
 * [3] extend appearance
 * [4] prepend css class name
 * [5] extend css class
 * [6] add inline style
 * [7] extendAppearance bool
 * [8] dark mode
 * [9] localization
 * [10] localization variables
 *
 * future:
 *
 * [1] phone auth support, OTP form
 * [2] treeshake imports for individual views
 * [3] prop for callback error support "onError", "onResponse", "onChange".
 *      also support a 'hideMessages' prop
 * [4] more inputs, username etc. maybe custom inputs
 *
 */

export const Default = (args: any) => {
  return (
    <Auth.UserContextProvider supabaseClient={supabase}>
      <Container>
        <Auth
          dark={useDarkMode() ? true : false}
          supabaseClient={supabase}
          providers={['google', 'facebook']}
          appearance={{
            theme: 'supabase',
            prependedClassName: 'jonnys-awesome-login',
            variables: {
              light: {
                colors: {
                  brand: 'red',
                  brandAccent: 'darkred',
                },
              },
            },
          }}
          localization={{
            lang: 'ja',
          }}
        />
      </Container>
    </Auth.UserContextProvider>
  )
}

Default.args = {}
