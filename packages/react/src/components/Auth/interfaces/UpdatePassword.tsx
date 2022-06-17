import { SupabaseClient } from '@supabase/supabase-js'
import React, { useState } from 'react'
import { Appearance, Localization } from '../../../types'
import { Button, Container, Input, Label, Message } from './../../UI'

function UpdatePassword({
  supabaseClient,
  i18n,
  appearance,
}: {
  supabaseClient: SupabaseClient
  i18n: Localization
  appearance: Appearance
}) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handlePasswordReset = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setMessage('')
    setLoading(true)
    const { error } = await supabaseClient.auth.update({ password })
    if (error) setError(error.message)
    else setMessage('Your password has been updated')
    setLoading(false)
  }

  return (
    <form id="auth-update-password" onSubmit={handlePasswordReset}>
      <Container gap="large" direction={'vertical'} appearance={appearance}>
        <Container gap="large" direction="vertical" appearance={appearance}>
          <div>
            <Label htmlFor="password" appearance={appearance}>
              {i18n?.update_password?.password_label}
            </Label>
            <Input
              name="password"
              id="password"
              placeholder={i18n?.update_password?.password_label}
              type="password"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
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
            {i18n?.update_password?.button_label}
          </Button>
        </Container>
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

export { UpdatePassword }
