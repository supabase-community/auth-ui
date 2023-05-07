import React, { ReactNode } from 'react'
import Auth from '../Auth'
import { Auth as AuthProps } from '../../../types'
import { PREPENDED_CLASS_NAMES } from '@supabase/auth-ui-shared'
import { css } from '@stitches/core'
import { CssComponent } from '@stitches/core/types/styled-component'

const containerDefaultStyles = css({
  borderRadius: '12px',
  boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
  width: '360px',
  padding: '28px 32px',
})

interface Card {
  className?: string | CssComponent
}

export const AuthCard = ({
  children,
  appearance,
}: {
  children?: ReactNode
  appearance?: Card
}) => {
  const classNames = [
    `${PREPENDED_CLASS_NAMES}_ui-card`,
    containerDefaultStyles(),
    appearance?.className,
  ]
  return <div className={classNames.join(' ')}>{children}</div>
}

export const SignUp = (
  props: Omit<AuthProps, 'view' | 'onlyThirdPartyProviders'>
) => {
  return (
    <Auth
      showLinks={false}
      {...props}
      onlyThirdPartyProviders={false}
      view="sign_up"
    />
  )
}

export const SignIn = (
  props: Omit<AuthProps, 'view' | 'onlyThirdPartyProviders'>
) => {
  return (
    <Auth
      showLinks={false}
      {...props}
      onlyThirdPartyProviders={false}
      view="sign_in"
    />
  )
}

export const MagicLink = (
  props: Omit<
    AuthProps,
    'view' | 'onlyThirdPartyProviders' | 'magicLink' | 'showLinks'
  >
) => {
  return <Auth {...props} view="magic_link" showLinks={false} />
}

export const SocialAuth = (
  props: Omit<
    AuthProps,
    'view' | 'onlyThirdPartyProviders' | 'magicLink' | 'showLinks'
  >
) => {
  return (
    <Auth
      {...props}
      view="sign_in"
      showLinks={false}
      onlyThirdPartyProviders={true}
    />
  )
}

export const ForgottenPassword = (props: Omit<AuthProps, 'view'>) => {
  return <Auth showLinks={false} {...props} view="forgotten_password" />
}

export const UpdatePassword = (props: Omit<AuthProps, 'view'>) => {
  return <Auth {...props} view="update_password" />
}
