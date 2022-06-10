import { SupabaseClient } from '@supabase/supabase-js'
import React, { useEffect, useRef, useState } from 'react'
import {
  Appearance,
  Localization,
  RedirectTo,
  ViewsMap,
  ViewType,
} from './../../../types'
import { Anchor, Button, Container, Input, Label, Message } from './../../UI'

interface EmailAuthProps {
  authView: 'sign_up' | 'sign_in'
  defaultEmail: string
  defaultPassword: string
  id: 'auth-sign-up' | 'auth-sign-in'
  setAuthView: any
  setDefaultEmail: (email: string) => void
  setDefaultPassword: (password: string) => void
  supabaseClient: SupabaseClient
  redirectTo?: RedirectTo
  magicLink?: boolean
  i18n: Localization
  appearance?: Appearance
}

const VIEWS: ViewsMap = {
  SIGN_IN: 'sign_in',
  SIGN_UP: 'sign_up',
  FORGOTTEN_PASSWORD: 'forgotten_password',
  MAGIC_LINK: 'magic_link',
  UPDATE_PASSWORD: 'update_password',
}

function EmailAuth({
  authView,
  defaultEmail,
  defaultPassword,
  id,
  setAuthView,
  setDefaultEmail,
  setDefaultPassword,
  supabaseClient,
  redirectTo,
  magicLink,
  i18n,
  appearance,
}: EmailAuthProps) {
  const isMounted = useRef<boolean>(true)
  const [email, setEmail] = useState(defaultEmail)
  const [password, setPassword] = useState(defaultPassword)
  const [rememberMe, setRememberMe] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    setEmail(defaultEmail)
    setPassword(defaultPassword)

    return () => {
      isMounted.current = false
    }
  }, [authView])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    switch (authView) {
      case 'sign_in':
        const { error: signInError } = await supabaseClient.auth.signIn(
          {
            email,
            password,
          },
          { redirectTo }
        )
        if (signInError) setError(signInError.message)
        break
      case 'sign_up':
        const {
          user: signUpUser,
          session: signUpSession,
          error: signUpError,
        } = await supabaseClient.auth.signUp(
          {
            email,
            password,
          },
          { redirectTo }
        )
        if (signUpError) setError(signUpError.message)
        // Check if session is null -> email confirmation setting is turned on
        else if (signUpUser && !signUpSession)
          setMessage('Check your email for the confirmation link.')
        break
    }

    /*
     * it is possible the auth component may have been unmounted at this point
     * check if component is mounted before setting a useState
     */
    if (isMounted.current) setLoading(false)
  }

  const handleViewChange = (newView: ViewType) => {
    setDefaultEmail(email)
    setDefaultPassword(password)
    setAuthView(newView)
  }

  return (
    <form
      id={id}
      onSubmit={handleSubmit}
      autoComplete={'on'}
      style={{ width: '100%' }}
    >
      <Container direction="vertical" gap="large" appearance={appearance}>
        <Container direction="vertical" gap="large" appearance={appearance}>
          <div>
            <Label htmlFor="email" appearance={appearance}>
              {i18n[authView].email_label}
            </Label>
            <Input
              autoFocus
              type="email"
              name="email"
              defaultValue={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
              autoComplete="email"
              appearance={appearance}
            />
          </div>
          <div>
            <Label htmlFor="password" appearance={appearance}>
              {i18n[authView].password_label}
            </Label>
            <Input
              type="password"
              name="password"
              defaultValue={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
              autoComplete={
                authView === 'sign_in' ? 'current-password' : 'new-password'
              }
              appearance={appearance}
            />
          </div>
        </Container>

        <Button type="submit" color="primary" appearance={appearance}>
          {i18n[authView].button_text}
        </Button>

        <Container direction="vertical" gap="small" appearance={appearance}>
          {authView === VIEWS.SIGN_IN && magicLink && (
            <Anchor
              href="#auth-magic-link"
              onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                e.preventDefault()
                setAuthView(VIEWS.MAGIC_LINK)
              }}
              appearance={appearance}
            >
              {i18n.magic_link.link_text}
            </Anchor>
          )}
          {authView === VIEWS.SIGN_IN && (
            <Anchor
              href="#auth-forgot-password"
              onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                e.preventDefault()
                setAuthView(VIEWS.FORGOTTEN_PASSWORD)
              }}
              appearance={appearance}
            >
              {i18n.forgotten_password.link_text}
            </Anchor>
          )}
          {authView === VIEWS.SIGN_IN ? (
            <Anchor
              href="#auth-sign-up"
              onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                e.preventDefault()
                handleViewChange(VIEWS.SIGN_UP)
              }}
              appearance={appearance}
            >
              {i18n.sign_up.link_text}
            </Anchor>
          ) : (
            <Anchor
              href="#auth-sign-in"
              onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                e.preventDefault()
                handleViewChange(VIEWS.SIGN_IN)
              }}
              appearance={appearance}
            >
              {i18n.sign_in.link_text}
            </Anchor>
          )}
        </Container>
      </Container>
      {message && <Message appearance={appearance}>{message}</Message>}
      {error && (
        <Message color="danger" appearance={appearance}>
          {error}
        </Message>
      )}
    </form>
  )
}

export { EmailAuth }
