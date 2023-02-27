import { SupabaseClient } from '@supabase/supabase-js'
import { createSignal, onMount, Setter } from 'solid-js'
import {
  I18nVariables,
  RedirectTo,
  ViewType,
  VIEWS,
} from '@supabase/auth-ui-shared'
import { Appearance, FormEvent } from '../../../types'
import { Anchor, Button, Container, Input, Label, Message } from '../../UI'

function ForgottenPassword(props: {
  setAuthView: Setter<ViewType>
  supabaseClient: SupabaseClient
  redirectTo?: RedirectTo
  i18n: I18nVariables
  appearance?: Appearance
  showLinks?: boolean
}) {
  const [email, setEmail] = createSignal('')
  const [error, setError] = createSignal('')
  const [message, setMessage] = createSignal('')
  const [loading, setLoading] = createSignal(false)
  let inputRef: HTMLInputElement

  onMount(() => {
    inputRef.focus()
  })

  const handlePasswordReset = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setMessage('')
    setLoading(true)
    const { error } = await props.supabaseClient.auth.resetPasswordForEmail(
      email(),
      {
        redirectTo: props.redirectTo,
      }
    )
    if (error) setError(error.message)
    else setMessage('Check your email for the password reset link')
    setLoading(false)
  }

  return (
    <form id="auth-forgot-password" onSubmit={handlePasswordReset}>
      <Container gap="large" direction="vertical" appearance={props.appearance}>
        <Container
          gap="large"
          direction="vertical"
          appearance={props.appearance}
        >
          <div>
            <Label for="email" appearance={props.appearance}>
              {props.i18n?.forgotten_password?.email_label}
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              ref={(el) => (inputRef = el)}
              placeholder={
                props.i18n?.forgotten_password?.email_input_placeholder
              }
              onkeyup={(e) => setEmail(e.currentTarget.value)}
              appearance={props.appearance}
            />
          </div>
          <Button
            type="submit"
            color="primary"
            loading={loading()}
            appearance={props.appearance}
          >
            {props.i18n?.forgotten_password?.button_label}
          </Button>
        </Container>
        {props.showLinks && (
          <Anchor
            href="#auth-sign-in"
            onClick={(e) => {
              e.preventDefault()
              props.setAuthView(VIEWS.SIGN_IN)
            }}
            appearance={props.appearance}
          >
            {props.i18n?.sign_in?.link_text}
          </Anchor>
        )}
        {message && (
          <Message appearance={props.appearance}>{message()}</Message>
        )}
        {error && (
          <Message color="danger" appearance={props.appearance}>
            {error()}
          </Message>
        )}
      </Container>
    </form>
  )
}

export { ForgottenPassword }
