import { SupabaseClient } from '@supabase/supabase-js'
import React, { useState } from 'react'
import { Localization } from '../../../types'
import { Button, Container, Input, Label, Message } from './../../UI'

function UpdatePassword({
  supabaseClient,
  i18n,
}: {
  supabaseClient: SupabaseClient
  i18n: Localization
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
      <Container gap="large" direction={'vertical'}>
        <Container gap="large" direction="vertical">
          <div>
            <Label htmlFor="password">New password</Label>
            <Input
              name="password"
              placeholder="Enter your new password"
              type="password"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
            />
          </div>
          <Button type="submit" color="primary" loading={loading}>
            Update password
          </Button>
        </Container>
        {message && <Message>{message}</Message>}
        {error && <Message color="danger">{error}</Message>}
      </Container>
    </form>
  )
}

export { UpdatePassword }
