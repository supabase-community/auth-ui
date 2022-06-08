import { SupabaseClient } from '@supabase/supabase-js'
import React, { useState } from 'react'
import { Localization, RedirectTo } from '../../../types'
import { VIEWS } from './../../../constants'
import { Anchor, Button, Container, Input, Label, Message } from './../../UI'

function ForgottenPassword({
  setAuthView,
  supabaseClient,
  redirectTo,
  i18n,
}: {
  setAuthView: any
  supabaseClient: SupabaseClient
  redirectTo?: RedirectTo
  i18n: Localization
}) {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handlePasswordReset = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setMessage('')
    setLoading(true)
    const { error } = await supabaseClient.auth.api.resetPasswordForEmail(
      email,
      { redirectTo }
    )
    if (error) setError(error.message)
    else setMessage('Check your email for the password reset link')
    setLoading(false)
  }

  return (
    <form id="auth-forgot-password" onSubmit={handlePasswordReset}>
      <Container gap="large" direction="vertical">
        <Container gap="large" direction="vertical">
          <div>
            <Label htmlFor="email">Your email address</Label>
            <Input
              name="email"
              type="email"
              placeholder="Your email address"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
            />
          </div>
          <Button type="submit" color="primary" loading={loading}>
            Send reset password instructions
          </Button>
        </Container>
        <Anchor
          href="#auth-sign-in"
          onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
            e.preventDefault()
            setAuthView(VIEWS.SIGN_IN)
          }}
        >
          Go back to sign in
        </Anchor>
        {message && <Message>{message}</Message>}
        {error && <Message color="danger">{error}</Message>}
      </Container>
    </form>
  )
}

export { ForgottenPassword }
