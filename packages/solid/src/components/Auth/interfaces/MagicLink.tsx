import { SupabaseClient } from '@supabase/supabase-js'
import { createSignal, Setter } from 'solid-js'
import { VIEWS } from '../../../constants'
import {
  Appearance,
  FormEvent,
  I18nVariables,
  RedirectTo,
  ViewType,
} from '../../../types'
import { Anchor, Button, Container, Input, Label, Message } from '../../UI'

function MagicLink(props: {
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

  const handleMagicLinkSignIn = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setMessage('')
    setLoading(true)
    const { error } = await props.supabaseClient.auth.signInWithOtp({
      email: email(),
      options: { emailRedirectTo: props.redirectTo },
    })
    if (error) setError(error.message)
    else setMessage('Check your email for the magic link')
    setLoading(false)
  }

  return (
    <form id="auth-magic-link" onSubmit={handleMagicLinkSignIn}>
      <Container gap="large" direction="vertical" appearance={props.appearance}>
        <Container
          gap="large"
          direction="vertical"
          appearance={props.appearance}
        >
          <div>
            <Label appearance={props.appearance}>
              {props.i18n?.magic_link?.email_input_label}
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder={props.i18n?.magic_link?.email_input_placeholder}
              onkeyup={(e) => setEmail(e.currentTarget.value)}
              appearance={props.appearance}
            />
          </div>
          <Button
            color="primary"
            type="submit"
            loading={loading()}
            appearance={props.appearance}
          >
            {props.i18n?.magic_link?.button_label}
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

export { MagicLink }
