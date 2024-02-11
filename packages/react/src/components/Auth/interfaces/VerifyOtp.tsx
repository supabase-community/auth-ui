import {
  EmailOtpType,
  MobileOtpType,
  SupabaseClient,
  VerifyOtpParams,
} from '@supabase/supabase-js'
import React, { useState } from 'react'
import { VIEWS, I18nVariables, OtpType } from '@supabase/auth-ui-shared'
import { Appearance } from '../../../types'
import {
  Anchor,
  Button,
  Container,
  Input,
  Label,
  Message,
} from './../../UI/index.js'

function VerifyOtp({
  setAuthView = () => {},
  supabaseClient,
  otpType = 'email',
  i18n,
  appearance,
  showLinks = false,
}: {
  setAuthView?: any
  supabaseClient: SupabaseClient
  otpType: OtpType
  i18n?: I18nVariables
  appearance?: Appearance
  showLinks?: boolean
}) {
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [token, setToken] = useState('')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [loadingOtp, setLoadingOtp] = useState(false)
  const [loadingVerify, setLoadingVerify] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setMessage('')
    setLoadingVerify(true)

    let verifyOtps: VerifyOtpParams = {
      email,
      token,
      type: otpType as EmailOtpType,
    }
    if (['sms', 'phone_change'].includes(otpType)) {
      verifyOtps = {
        phone,
        token,
        type: otpType as MobileOtpType,
      }
    }
    const { error } = await supabaseClient.auth.verifyOtp(verifyOtps)
    if (error) setError(error.message)
    setLoadingVerify(false)
  }

  const sendOtp = async () => {
    setLoadingOtp(true)

    let verifyOtps: VerifyOtpParams = {
      email,
    }
    if (['sms', 'phone_change'].includes(otpType)) {
      verifyOtps = {
        phone,
      }
    }
    const { error } = await supabaseClient.auth.signInWithOtp(verifyOtps)
    if (error) setError(error.message)
    setLoadingOtp(false)
  }

  const labels = i18n?.verify_otp

  return (
    <form id="auth-magic-link" onSubmit={handleSubmit}>
      <Container gap="large" direction="vertical" appearance={appearance}>
        {['sms', 'phone_change'].includes(otpType) ? (
          <div>
            <Label htmlFor="phone" appearance={appearance}>
              {labels?.phone_input_label}
            </Label>
            <Input
              id="phone"
              name="phone"
              type="text"
              autoFocus
              placeholder={labels?.phone_input_placeholder}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPhone(e.target.value)
              }
              appearance={appearance}
            />
          </div>
        ) : (
          <div>
            <Label htmlFor="email" appearance={appearance}>
              {labels?.email_input_label}
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              autoFocus
              placeholder={labels?.email_input_placeholder}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
              appearance={appearance}
            />
          </div>
        )}
        <Button
          color="secondary"
          onClick={sendOtp}
          loading={loadingOtp}
          appearance={appearance}
        >
          {loadingOtp ? labels?.sending_button_label : labels?.send_button_label}
        </Button>
        <div>
          <Label htmlFor="token" appearance={appearance}>
            {labels?.token_input_label}
          </Label>
          <Input
            id="token"
            name="token"
            type="text"
            placeholder={labels?.token_input_placeholder}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setToken(e.target.value)
            }
            appearance={appearance}
          />
        </div>
        <Button
          color="primary"
          type="submit"
          loading={loadingVerify}
          appearance={appearance}
        >
          {loadingVerify ? labels?.loading_button_label : labels?.button_label}
        </Button>
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

export { VerifyOtp }
