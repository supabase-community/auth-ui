import { SupabaseClient } from '@supabase/supabase-js'
import React, { useEffect, useRef, useState } from 'react'
import {
  I18nVariables,
  RedirectTo,
  ViewSignUp,
  ViewSignIn,
  ViewsMap,
  ViewType,
  merge,
} from '@supabase/auth-ui-shared'
import { Appearance } from './../../../types'
import { Anchor, Button, Container, Input, Label, Message } from './../../UI'
import { createStitches, createTheme } from '@stitches/core'

export interface EmailAuthProps {
  authView: ViewSignIn | ViewSignUp
  defaultEmail?: string
  defaultPassword?: string
  setAuthView?: any
  setDefaultEmail?: (email: string) => void
  setDefaultPassword?: (password: string) => void
  supabaseClient: SupabaseClient
  showLinks?: boolean
  redirectTo?: RedirectTo
  magicLink?: boolean
  i18n: I18nVariables
  appearance?: Appearance
  theme?: 'default' | string
}

const VIEWS: ViewsMap = {
  SIGN_IN: 'sign_in',
  SIGN_UP: 'sign_up',
  FORGOTTEN_PASSWORD: 'forgotten_password',
  MAGIC_LINK: 'magic_link',
  UPDATE_PASSWORD: 'update_password',
}

function EmailAuth({
  authView = 'sign_in',
  defaultEmail = '',
  defaultPassword = '',
  setAuthView = () => {},
  setDefaultEmail = (email) => {},
  setDefaultPassword = (password) => {},
  supabaseClient,
  showLinks = false,
  redirectTo,
  magicLink,
  i18n,
  appearance,
  theme = 'default',
}: EmailAuthProps) {
  const isMounted = useRef<boolean>(true)
  const [email, setEmail] = useState(defaultEmail)
  const [password, setPassword] = useState(defaultPassword)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    isMounted.current = true
    setEmail(defaultEmail)
    setPassword(defaultPassword)

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
  }, [authView, appearance])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    switch (authView) {
      case 'sign_in':
        const { error: signInError } =
          await supabaseClient.auth.signInWithPassword({
            email,
            password,
          })
        if (signInError) setError(signInError.message)
        break
      case 'sign_up':
        const {
          data: { user: signUpUser, session: signUpSession },
          error: signUpError,
        } = await supabaseClient.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: redirectTo,
          },
        })
        if (signUpError) setError(signUpError.message)
        // Check if session is null -> email confirmation setting is turned on
        else if (signUpUser && !signUpSession)
          setMessage(
            i18n?.sign_up?.confirmation_text ||
              'Check your email for the confirmation link.'
          )
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

  const labels = i18n?.[authView]

  return (
    <form
      id={authView === 'sign_in' ? `auth-sign-in` : `auth-sign-up`}
      onSubmit={handleSubmit}
      autoComplete={'on'}
      style={{ width: '100%' }}
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
      <Container direction="vertical" gap="large" appearance={appearance}>
        <Container direction="vertical" gap="large" appearance={appearance}>
          <div>
            <Label htmlFor="email" appearance={appearance}>
              {labels?.email_label}
            </Label>
            <Input
              id="email"
              type="email"
              name="email"
              placeholder={labels?.email_input_placeholder}
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
              {labels?.password_label}
            </Label>
            <Input
              id="password"
              type="password"
              name="password"
              placeholder={labels?.password_input_placeholder}
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

        <Button
          type="submit"
          color="primary"
          loading={loading}
          appearance={appearance}
        >
          {loading ? labels?.loading_button_label : labels?.button_label}
        </Button>

        {showLinks && (
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
                {i18n?.magic_link?.link_text}
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
                {i18n?.forgotten_password?.link_text}
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
                {i18n?.sign_up?.link_text}
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
                {i18n?.sign_in?.link_text}
              </Anchor>
            )}
          </Container>
        )}
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
