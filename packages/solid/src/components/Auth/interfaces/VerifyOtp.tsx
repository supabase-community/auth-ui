import {
  EmailOtpType,
  MobileOtpType,
  SupabaseClient,
  VerifyOtpParams,
} from '@supabase/supabase-js'
import { createSignal, Setter } from 'solid-js'
import {
  I18nVariables,
  ViewType,
  VIEWS,
  OtpType,
} from '@supabase/auth-ui-shared'
import { Appearance, FormEvent } from '../../../types'
import { Anchor, Button, Container, Input, Label, Message } from '../../UI'

function VerifyOtp(props: {
  setAuthView: Setter<ViewType>
  supabaseClient: SupabaseClient
  otpType: OtpType
  i18n: I18nVariables
  appearance?: Appearance
  showLinks?: boolean
}) {
  const [email, setEmail] = createSignal('')
  const [phone, setPhone] = createSignal('')
  const [token, setToken] = createSignal('')
  const [error, setError] = createSignal('')
  const [message, setMessage] = createSignal('')
  const [loading, setLoading] = createSignal(false)

  const handleMagicLinkSignIn = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setMessage('')
    setLoading(true)

    let verifyOpts: VerifyOtpParams = {
      email: email(),
      token: token(),
      type: props.otpType as EmailOtpType,
    }
    if (['sms', 'phone_change'].includes(props.otpType)) {
      verifyOpts = {
        phone: phone(),
        token: token(),
        type: props.otpType as MobileOtpType,
      }
    }
    const { error } = await props.supabaseClient.auth.verifyOtp(verifyOpts)
    if (error) setError(error.message)
    setLoading(false)
  }

  return (
    <form id="auth-magic-link" onSubmit={handleMagicLinkSignIn}>
      <Container gap="large" direction="vertical" appearance={props.appearance}>
        {['sms', 'phone_change'].includes(props.otpType) ? (
          <div>
            <Label appearance={props.appearance} for="phone">
              {props.i18n?.verify_otp?.phone_input_label}
            </Label>
            <Input
              id="phone"
              name="phone"
              type="text"
              autofocus
              placeholder={props.i18n?.verify_otp?.phone_input_placeholder}
              onkeyup={(e) => setPhone(e.currentTarget.value)}
              appearance={props.appearance}
            />
          </div>
        ) : (
          <div>
            <Label appearance={props.appearance} for="email">
              {props.i18n?.verify_otp?.email_input_label}
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              autofocus
              placeholder={props.i18n?.verify_otp?.email_input_placeholder}
              onkeyup={(e) => setEmail(e.currentTarget.value)}
              appearance={props.appearance}
            />
          </div>
        )}
        <div>
          <Label appearance={props.appearance} for="token">
            {props.i18n?.verify_otp?.token_input_label}
          </Label>
          <Input
            id="token"
            name="token"
            type="text"
            placeholder={props.i18n?.verify_otp?.token_input_placeholder}
            onkeyup={(e) => setToken(e.currentTarget.value)}
            appearance={props.appearance}
          />
        </div>
        <Button
          color="primary"
          type="submit"
          loading={loading()}
          appearance={props.appearance}
        >
          {props.i18n?.verify_otp?.button_label}
        </Button>
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

export { VerifyOtp }
