import { SupabaseClient } from '@supabase/supabase-js'
import React, { useEffect, useRef, useState } from 'react'
import { I18nVariables, merge } from '@supabase/auth-ui-shared'
import { Appearance } from '../../../types'
import { Button, Container, Input, Label, Message } from './../../UI'
import { createStitches, createTheme } from '@stitches/core'

function UpdatePassword({
  supabaseClient,
  i18n,
  appearance,
  theme = 'default',
}: {
  supabaseClient: SupabaseClient
  i18n: I18nVariables
  appearance?: Appearance
  theme?: 'default' | string
}) {
  const isMounted = useRef<boolean>(true)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    isMounted.current = true
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
  }, [appearance])

  const handlePasswordReset = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setMessage('')
    setLoading(true)
    const { error } = await supabaseClient.auth.updateUser({ password })
    if (error) setError(error.message)
    else setMessage('Your password has been updated')
    setLoading(false)
  }

  const labels = i18n?.update_password

  return (
    <form
      id="auth-update-password"
      onSubmit={handlePasswordReset}
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
      <Container gap="large" direction={'vertical'} appearance={appearance}>
        <Container gap="large" direction="vertical" appearance={appearance}>
          <div>
            <Label htmlFor="password" appearance={appearance}>
              {labels?.password_label}
            </Label>
            <Input
              name="password"
              placeholder={labels?.password_label}
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
            {loading ? labels?.loading_button_label : labels?.button_label}
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
