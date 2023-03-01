import { SupabaseClient } from '@supabase/supabase-js'
import React, { useEffect, useRef, useState } from 'react'
import {
  VIEWS,
  I18nVariables,
  RedirectTo,
  merge,
} from '@supabase/auth-ui-shared'
import { Appearance } from '../../../types'
import { Anchor, Button, Container, Input, Label, Message } from './../../UI'
import { createStitches, createTheme } from '@stitches/core'

function ForgottenPassword({
  setAuthView = () => {},
  supabaseClient,
  redirectTo,
  i18n,
  appearance,
  showLinks = false,
  theme = 'default',
}: {
  setAuthView?: any
  supabaseClient: SupabaseClient
  redirectTo?: RedirectTo
  i18n: I18nVariables
  appearance?: Appearance
  showLinks?: boolean
  theme?: 'default' | string
}) {
  const isMounted = useRef<boolean>(true)
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    isMounted.current = true
    if (theme !== 'default') {
      createStitches({
        theme: merge(
          appearance?.theme?.default ?? {},
          appearance?.variables?.default ?? {}
        ),
      })
    }

    return () => {
      isMounted.current = false
    }
  }, [appearance])

  const handlePasswordReset = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setMessage('')
    setLoading(true)
    const { error } = await supabaseClient.auth.resetPasswordForEmail(email, {
      redirectTo,
    })
    if (error) setError(error.message)
    else setMessage('Check your email for the password reset link')
    setLoading(false)
  }

  const labels = i18n?.forgotten_password

  return (
    <form
      id="auth-forgot-password"
      onSubmit={handlePasswordReset}
      className={
        theme !== 'default'
          ? createTheme(
              merge(
                // @ts-ignore
                appearance?.theme[theme],
                appearance?.variables?.[theme] ?? {}
              )
            )
          : undefined
      }
    >
      <Container gap="large" direction="vertical" appearance={appearance}>
        <Container gap="large" direction="vertical" appearance={appearance}>
          <div>
            <Label htmlFor="email" appearance={appearance}>
              {labels?.email_label}
            </Label>
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
            type="submit"
            color="primary"
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

export { ForgottenPassword }
