import { SupabaseClient } from '@supabase/supabase-js'
import React, { useState } from 'react'
import { VIEWS, I18nVariables, RedirectTo } from '@supabase/auth-ui-shared'
import { Appearance } from '../../../types'
import { Anchor, Button, Container, Input, Label, Message } from './../../UI'

function MagicLink({
  setAuthView,
  supabaseClient,
  redirectTo,
  i18n,
  appearance,
  showLinks,
}: {
  setAuthView: any
  supabaseClient: SupabaseClient
  redirectTo?: RedirectTo
  i18n: I18nVariables
  appearance?: Appearance
  showLinks?: boolean
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
    const { error } = await supabaseClient.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: redirectTo },
    })
    if (error) setError(error.message)
    else setMessage('Check your email for the magic link')
    setLoading(false)
  }

  const labels = i18n?.magic_link

  return (
    <form id="auth-magic-link" onSubmit={handleMagicLinkSignIn}>
      <Container gap="large" direction="vertical" appearance={appearance}>
        <Container gap="large" direction="vertical" appearance={appearance}>
          <div>
            <Label appearance={appearance}>{labels?.email_input_label}</Label>
            <Input
              name="email"
              type="email"
              placeholder={labels?.email_input_placeholder}
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
            {loading ? labels?.loading_button_label : labels?.button_label}
          </Button>
        </Container>
        {showLinks && (
          <Anchor
            href="#auth-sign-in"
            onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
              e.preventDefault()
              setAuthView(VIEWS.SIGN_IN)
            }}
            appearance={appearance}
          >
            {i18n?.sign_in?.link_text}
          </Anchor>
        )}
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
