/* eslint-disable no-case-declarations */
import { SupabaseClient } from '@supabase/supabase-js'
import { createEffect, createSignal, Setter } from 'solid-js'
import {
  I18nVariables,
  RedirectTo,
  ViewSignUp,
  ViewSignIn,
  ViewsMap,
  ViewType,
} from '@supabase/auth-ui-shared'
import { Appearance, FormEvent } from '../../../types'
import { Anchor, Button, Container, Input, Label, Message } from '../../UI'

export interface EmailAuthProps {
  authView: ViewSignIn | ViewSignUp
  defaultEmail: string
  defaultPassword: string
  setAuthView: Setter<ViewType>
  setDefaultEmail: (email: string) => void
  setDefaultPassword: (password: string) => void
  supabaseClient: SupabaseClient
  showLinks?: boolean
  redirectTo?: RedirectTo
  magicLink?: boolean
  i18n: I18nVariables
  appearance?: Appearance
}

const VIEWS: ViewsMap = {
  SIGN_IN: 'sign_in',
  SIGN_UP: 'sign_up',
  FORGOTTEN_PASSWORD: 'forgotten_password',
  MAGIC_LINK: 'magic_link',
  UPDATE_PASSWORD: 'update_password',
}

function EmailAuth(props: EmailAuthProps) {
  const [isMounted, setIsMounted] = createSignal<boolean>(true)
  const [email, setEmail] = createSignal(props.defaultEmail)
  const [password, setPassword] = createSignal(props.defaultPassword)
  const [error, setError] = createSignal('')
  const [loading, setLoading] = createSignal(false)
  const [message, setMessage] = createSignal('')

  createEffect(() => {
    setEmail(props.defaultEmail)
    setPassword(props.defaultPassword)

    return () => {
      setIsMounted(() => false)
    }
  })

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    switch (props.authView) {
      case 'sign_in':
        const { error: signInError } =
          await props.supabaseClient.auth.signInWithPassword({
            email: email(),
            password: password(),
          })
        if (signInError) setError(signInError.message)
        break
      case 'sign_up':
        const {
          data: { user: signUpUser, session: signUpSession },
          error: signUpError,
        } = await props.supabaseClient.auth.signUp({
          email: email(),
          password: password(),
          options: {
            emailRedirectTo: props.redirectTo,
          },
        })
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
    if (isMounted()) setLoading(false)
  }

  const handleViewChange = (newView: ViewType) => {
    props.setDefaultEmail(email())
    props.setDefaultPassword(password())
    props.setAuthView(newView)
  }

  return (
    <form
      id={props.authView === 'sign_in' ? `auth-sign-in` : `auth-sign-up`}
      onSubmit={handleSubmit}
      autocomplete={'on'}
      style={{ width: '100%' }}
    >
      <Container direction="vertical" gap="large" appearance={props.appearance}>
        <Container
          direction="vertical"
          gap="large"
          appearance={props.appearance}
        >
          <div>
            <Label for="email" appearance={props.appearance}>
              {props.i18n?.[props.authView]?.email_label}
            </Label>
            <Input
              id="email"
              type="email"
              name="email"
              autofocus
              placeholder={
                props.i18n?.[props.authView]?.email_input_placeholder
              }
              value={email()}
              onkeyup={(e) => setEmail(() => e.currentTarget.value)}
              autocomplete="email"
              appearance={props.appearance}
            />
          </div>
          <div>
            <Label for="password" appearance={props.appearance}>
              {props.i18n?.[props.authView]?.password_label}
            </Label>
            <Input
              id="password"
              type="password"
              name="password"
              placeholder={
                props.i18n?.[props.authView]?.password_input_placeholder
              }
              value={password()}
              onkeyup={(e) => setPassword(() => e.currentTarget.value)}
              autocomplete={
                props.authView === 'sign_in'
                  ? 'current-password'
                  : 'new-password'
              }
              appearance={props.appearance}
            />
          </div>
        </Container>

        <Button
          type="submit"
          color="primary"
          loading={loading()}
          appearance={props.appearance}
        >
          {props.i18n?.[props.authView]?.button_label}
        </Button>

        {props.showLinks && (
          <Container
            direction="vertical"
            gap="small"
            appearance={props.appearance}
          >
            {props.authView === VIEWS.SIGN_IN && props.magicLink && (
              <Anchor
                href="#auth-magic-link"
                onClick={(e) => {
                  e.preventDefault()
                  props.setAuthView(VIEWS.MAGIC_LINK)
                }}
                appearance={props.appearance}
              >
                {props.i18n?.magic_link?.link_text}
              </Anchor>
            )}
            {props.authView === VIEWS.SIGN_IN && (
              <Anchor
                href="#auth-forgot-password"
                onClick={(e) => {
                  e.preventDefault()
                  props.setAuthView(VIEWS.FORGOTTEN_PASSWORD)
                }}
                appearance={props.appearance}
              >
                {props.i18n?.forgotten_password?.link_text}
              </Anchor>
            )}
            {props.authView === VIEWS.SIGN_IN ? (
              <Anchor
                href="#auth-sign-up"
                onClick={(e) => {
                  e.preventDefault()
                  handleViewChange(VIEWS.SIGN_UP)
                }}
                appearance={props.appearance}
              >
                {props.i18n?.sign_up?.link_text}
              </Anchor>
            ) : (
              <Anchor
                href="#auth-sign-in"
                onClick={(e) => {
                  e.preventDefault()
                  handleViewChange(VIEWS.SIGN_IN)
                }}
                appearance={props.appearance}
              >
                {props.i18n?.sign_in?.link_text}
              </Anchor>
            )}
          </Container>
        )}
      </Container>
      {message && <Message appearance={props.appearance}>{message()}</Message>}
      {error && (
        <Message color="danger" appearance={props.appearance}>
          {error()}
        </Message>
      )}
    </form>
  )
}

export { EmailAuth }
