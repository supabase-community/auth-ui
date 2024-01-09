import { SupabaseClient } from '@supabase/supabase-js'
import { createSignal, Show } from 'solid-js'
import { I18nVariables } from '@supabase/auth-ui-shared'
import { Appearance, FormEvent } from '../../../types'
import { Button, Container, Input, Label, Message } from '../../UI'

function UpdatePassword(props: {
  supabaseClient: SupabaseClient
  i18n: I18nVariables
  passwordLimit: boolean
  appearance?: Appearance
}) {
  const [password, setPassword] = createSignal('')
  const [error, setError] = createSignal('')
  const [message, setMessage] = createSignal('')
  const [loading, setLoading] = createSignal(false)

  const handlePasswordReset = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setMessage('')
    setLoading(true)
    if (props.passwordLimit && password().length > 72) {
      setError('Password exceeds maxmium length of 72 characters')
      setLoading(false)
      return
    }
    const { error } = await props.supabaseClient.auth.updateUser({
      password: password(),
    })
    if (error) setError(error.message)
    else setMessage(props.i18n.update_password?.confirmation_text as string)
    setLoading(false)
  }

  return (
    <form id="auth-update-password" onSubmit={handlePasswordReset}>
      <Container
        gap="large"
        direction={'vertical'}
        appearance={props.appearance}
      >
        <Container
          gap="large"
          direction="vertical"
          appearance={props.appearance}
        >
          <div>
            <Label for="password" appearance={props.appearance}>
              {props.i18n?.update_password?.password_label}
            </Label>
            <Input
              id="password"
              name="password"
              autofocus
              placeholder={
                props.i18n?.update_password?.password_input_placeholder
              }
              type="password"
              onkeyup={(e) => setPassword(e.currentTarget.value)}
              appearance={props.appearance}
            />
          </div>
          <Button
            type="submit"
            color="primary"
            loading={loading()}
            appearance={props.appearance}
          >
            {props.i18n?.update_password?.button_label}
          </Button>
        </Container>

        <Show when={message()}>
          <Message appearance={props.appearance}>{message()}</Message>
        </Show>
        <Show when={error()}>
          <Message appearance={props.appearance}>{message()}</Message>
        </Show>
      </Container>
    </form>
  )
}

export { UpdatePassword }
