import { SupabaseClient } from '@supabase/supabase-js'
import React, { useState } from 'react'
import { VIEWS } from '../../../constants'
import { Appearance, Localization, RedirectTo } from '../../../types'
import { Anchor, Button, Container, Input, Label, Message } from './../../UI'

function MagicLink({
  setAuthView,
  supabaseClient,
  redirectTo,
  i18n,
  appearance,
}: {
  setAuthView: any
  supabaseClient: SupabaseClient
  redirectTo?: RedirectTo
  i18n: Localization
  appearance: Appearance
}) {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleMagicLinkSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setMessage('')
    setLoading(true)
    const { error } = await supabaseClient.auth.signIn(
      { email },
      { redirectTo }
    )
    if (error) setError(error.message)
    else setMessage('Check your email for the magic link')
    setLoading(false)
  }

  return (
    <form id="auth-magic-link" onSubmit={handleMagicLinkSignIn}>
      <Container gap="large" direction="vertical" appearance={appearance}>
        <Container gap="large" direction="vertical" appearance={appearance}>
          <div>
            <Label appearance={appearance}>Email address</Label>
            <Input
              type="email"
              placeholder="Your email address"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
              appearance={appearance}
            />
          </div>
          <Button
            color="primary"
            type="submit"
            loading={loading}
            appearance={appearance}
          >
            Send magic link
          </Button>
        </Container>
        <Anchor
          href="#auth-sign-in"
          onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
            e.preventDefault()
            setAuthView(VIEWS.SIGN_IN)
          }}
          appearance={appearance}
        >
          Sign in with password
        </Anchor>
        {message && <Message appearance={appearance}>{message}</Message>}
        {error && (
          <Message color="danger" appearance={appearance}>
            {error}
          </Message>
        )}
      </Container>
    </form>
  )
}

export { MagicLink }
