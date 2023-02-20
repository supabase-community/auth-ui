import { SupabaseClient } from '@supabase/supabase-js'
import { createSignal, onMount, Show } from 'solid-js'
import { Appearance, FormEvent, I18nVariables } from '../../../types'
import { Button, Container, Input, Label, Message } from '../../UI'

function UpdatePassword(props: {
  supabaseClient: SupabaseClient
  i18n: I18nVariables
  appearance?: Appearance
}) {
  const [password, setPassword] = createSignal('')
  const [error, setError] = createSignal('')
  const [message, setMessage] = createSignal('')
  const [loading, setLoading] = createSignal(false)
  let inputRef: HTMLInputElement

  const handlePasswordReset = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setMessage('')
    setLoading(true)
    const { error } = await props.supabaseClient.auth.updateUser({
      password: password(),
    })
    if (error) setError(error.message)
    else setMessage('Your password has been updated')
    setLoading(false)
  }

  onMount(() => {
    inputRef.focus()
  })

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
              ref={(el) => (inputRef = el)}
              placeholder={props.i18n?.update_password?.password_label}
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
        {/* {message && <Message appearance={appearance}>{message}</Message>} */}
        <Show when={message()}>
          <Message appearance={props.appearance}>{message()}</Message>
        </Show>
        <Show when={error()}>
          <Message appearance={props.appearance}>{message()}</Message>
        </Show>
        {/* {error && (
          <Message color="danger" appearance={appearance}>
            {error}
          </Message>
        )} */}
      </Container>
    </form>
  )
}

export { UpdatePassword }
