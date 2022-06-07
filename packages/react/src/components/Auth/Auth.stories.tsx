import React, { useState } from 'react'
import { Auth } from './'
import { createClient } from '@supabase/supabase-js'
import { Button, Message } from '../UI'
import { useDarkMode } from 'storybook-dark-mode'
// @ts-ignore

const supabase = createClient(
  'https://rsnibhkhsbfnncjmwnkj.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYxNTIxNDE1MywiZXhwIjoxOTMwNzkwMTUzfQ.OQEbAaTfgDdLCCht251P2JRD3QDnui6nsU8N-tZA_Mc'
)

export default {
  title: 'Auth/Auth',
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
    <Auth.UserContextProvider {...args}>
      <Container {...args}>
        <Auth {...args} useDarkMode={useDarkMode() ? true : false} />
      </Container>
    </Auth.UserContextProvider>
  )
}

export const withSocialAuth = (args: any) => (
  <Auth.UserContextProvider {...args}>
    <Container {...args}>
      <Auth {...args} />
    </Container>
  </Auth.UserContextProvider>
)
export const withAllSocialAuth = (args: any) => (
  <Auth.UserContextProvider {...args}>
    <Container {...args}>
      <Auth
        {...args}
        providers={[
          'apple',
          'azure',
          'bitbucket',
          'discord',
          'facebook',
          'github',
          'gitlab',
          'google',
          'keycloak',
          'linkedin',
          'notion',
          'slack',
          'spotify',
          'twitch',
          'twitter',
          'workos',
        ]}
      />
    </Container>
  </Auth.UserContextProvider>
)
export const withSocialLargeButtons = (args: any) => (
  <Auth.UserContextProvider {...args}>
    <Container {...args}>
      <Auth {...args} />
    </Container>
  </Auth.UserContextProvider>
)
export const withColouredSocialAuth = (args: any) => (
  <Auth.UserContextProvider {...args}>
    <Container {...args}>
      <Auth {...args} />
    </Container>
  </Auth.UserContextProvider>
)
export const withSocialAuthHorizontal = (args: any) => (
  <Auth.UserContextProvider {...args}>
    <Container {...args}>
      <Auth {...args} />
    </Container>
  </Auth.UserContextProvider>
)
export const updatePassword = (args: any) => (
  <Container {...args}>
    <Auth.UpdatePassword {...args} />
  </Container>
)

export const magicLink = (args: any) => (
  <Container {...args}>
    <Auth.MagicLink {...args} />
  </Container>
)

export const ChangeViewState = (args: any) => {
  const [view, setView] = useState<
    'sign_in' | 'sign_up' | 'forgotten_password' | 'magic_link'
  >('sign_in')

  return (
    <div>
      <div>
        <button
          style={{
            background: view === 'sign_up' ? 'white' : '',
            cursor: 'pointer',
          }}
          onClick={() => setView('sign_up')}
        >
          Sign up
        </button>
        <button
          style={{
            background: view === 'sign_in' ? 'white' : '',
            cursor: 'pointer',
          }}
          onClick={() => setView('sign_in')}
        >
          Sign in
        </button>
        <button
          style={{
            background: view === 'forgotten_password' ? 'white' : '',
            cursor: 'pointer',
          }}
          onClick={() => setView('forgotten_password')}
        >
          Forgotten password
        </button>
        <button
          style={{
            background: view === 'magic_link' ? 'white' : '',
            cursor: 'pointer',
          }}
          onClick={() => setView('magic_link')}
        >
          Magic link
        </button>
      </div>
      <Auth.UserContextProvider supabaseClient={supabase}>
        <Container supabaseClient={supabase}>
          <Auth supabaseClient={supabase} view={view} />
        </Container>
      </Auth.UserContextProvider>
    </div>
  )
}

Default.args = {
  supabaseClient: supabase,
}

withSocialAuth.args = {
  supabaseClient: supabase,
  providers: ['facebook', 'google'],
}

withAllSocialAuth.args = {
  supabaseClient: supabase,
  providers: [
    'apple',
    'azure',
    'bitbucket',
    'discord',
    'facebook',
    'github',
    'gitlab',
    'google',
    'twitch',
    'twitter',
  ],
}

withSocialLargeButtons.args = {
  supabaseClient: supabase,
  providers: [
    'apple',
    'azure',
    'bitbucket',
    'discord',
    'facebook',
    'github',
    'gitlab',
    'google',
    'twitch',
    'twitter',
  ],
  socialButtonSize: 'large',
}

withColouredSocialAuth.args = {
  supabaseClient: supabase,
  socialColors: true,
  providers: [
    'apple',
    'azure',
    'bitbucket',
    'discord',
    'facebook',
    'github',
    'gitlab',
    'google',
    'twitch',
    'twitter',
  ],
}

withSocialAuthHorizontal.args = {
  supabaseClient: supabase,
  providers: ['facebook', 'google'],
  socialLayout: 'horizontal',
}

updatePassword.args = {
  supabaseClient: supabase,
}

magicLink.args = {
  supabaseClient: supabase,
}
