import React, { useEffect, useRef, useState } from 'react'
import { SupabaseClient, Provider } from '@supabase/supabase-js'

import {
  Button,
  Label,
  Input,
  Container,
  Anchor,
  Message,
  Divider,
} from './../UI'

import { UserContextProvider, useUser } from './UserContext'
import * as SocialIcons from './Icons'
import { createStitches, createTheme } from '@stitches/core'
import * as defaultLocalization from './../../../../react/lib/Localization'
import {
  Localization,
  SocialButtonSize,
  SocialLayout,
  ViewType,
  ViewsMap,
  CustomTheme,
} from '../../types'

const VIEWS: ViewsMap = {
  SIGN_IN: 'sign_in',
  SIGN_UP: 'sign_up',
  FORGOTTEN_PASSWORD: 'forgotten_password',
  MAGIC_LINK: 'magic_link',
  UPDATE_PASSWORD: 'update_password',
}

type RedirectTo = undefined | string

export interface Props {
  supabaseClient: SupabaseClient
  className?: string
  children?: React.ReactNode
  style?: React.CSSProperties
  socialLayout?: SocialLayout
  socialColors?: boolean
  socialButtonSize?: SocialButtonSize
  providers?: Provider[]
  view?: ViewType
  redirectTo?: RedirectTo
  onlyThirdPartyProviders?: boolean
  magicLink?: boolean
  /**
   * setting the theme that the Auth components use
   */
  theme?: string | 'default' | 'dark'
  /**
   * this is for importing a custom theme
   */
  customTheme?: CustomTheme
  /**
   * This will toggle on the dark variation of the theme
   */
  dark?: boolean
  /**
   * Override the labels and button text
   */
  localizationOverride?: Localization
  lang?: 'en' | 'ja' // es
}

function Auth({
  supabaseClient,
  className,
  style,
  socialLayout = 'vertical',
  socialColors = false,
  socialButtonSize = 'medium',
  providers,
  view = 'sign_in',
  redirectTo,
  onlyThirdPartyProviders = false,
  magicLink = false,
  theme,
  dark = false,
  lang = 'en',
}: Props): JSX.Element | null {
  /**
   * Localization support
   */
  const i18n: Localization = defaultLocalization[lang]

  /**
   * Create default theme
   *
   * createStitches()
   * https://stitches.dev/docs/api#theme
   *
   * to add a new theme use  createTheme({})
   * https://stitches.dev/docs/api#theme
   */
  createStitches({
    theme: {
      colors: {
        brand: 'purple',
        brandAccent: 'darkmagenta',
        brandButtonText: 'white',

        defaultButtonBackground: 'white',
        defaultButtonBorder: 'lightgray',
        defaultButtonText: 'gray',

        dividerBackground: '#eaeaea',

        inputBackground: 'transparent',
        inputBorder: 'lightgray',
        inputText: 'gray',
        inputPlaceholder: 'darkgray',
      },
      space: {
        small: '4px',
        medium: '8px',
        large: '16px',
      },
      fontSizes: {
        baseInputSize: '14px',
        baseLabelSize: '12px',
      },
      fonts: {},
      fontWeights: {},
      lineHeights: {},
      letterSpacings: {},
      sizes: {},
      borderWidths: {},
      borderStyles: {},
      radii: {},
      shadows: {},
      zIndices: {},
      transitions: {},
    },
  })

  const darkTheme = createTheme({
    colors: {
      brand: 'hsl(252 62% 55%)',
      brandAccent: 'hsl(252 62% 45%)',
      brandButtonText: 'white',
      defaultButtonBackground: '#080808',
      defaultButtonBorder: 'black',
      defaultButtonText: 'white',
      dividerBackground: 'black',
      inputBackground: 'transparent',
      inputBorder: 'gray',
      inputText: 'white',
      inputPlaceholder: 'darkgray',
    },
  })

  const [authView, setAuthView] = useState(view)
  const [defaultEmail, setDefaultEmail] = useState('')
  const [defaultPassword, setDefaultPassword] = useState('')

  /**
   * Simple boolean to detect if authView 'sign_in' or 'sign_up' is used
   *
   * @returns boolean
   */
  const SignView = authView === 'sign_in' || authView === 'sign_up'

  /**
   * Wraps around all auth components
   * renders the social auth providers if SignView is true
   *
   * also handles the theme override
   *
   * @param children
   * @returns React.ReactNode
   */
  const Container = ({ children }: { children: React.ReactNode }) => (
    <div className={dark ? darkTheme : ''}>
      {SignView && (
        <SocialAuth
          supabaseClient={supabaseClient}
          providers={providers}
          socialLayout={socialLayout}
          redirectTo={redirectTo}
          onlyThirdPartyProviders={onlyThirdPartyProviders}
          i18n={i18n}
          view={authView as "sign_in" | "sign_up"}
        />
      )}
      {!onlyThirdPartyProviders && children}
    </div>
  )

  useEffect(() => {
    /**
     * Overrides the authview if it is changed externally
     */
    setAuthView(view)
  }, [view])

  const emailProp: Omit<EmailAuthProps, 'authView' | 'id'> = {
    supabaseClient,
    setAuthView,
    defaultEmail,
    defaultPassword,
    setDefaultEmail,
    setDefaultPassword,
    redirectTo,
    magicLink,
    i18n,
  }

  /**
   * View handler, displays the correct Auth view
   * all views are wrapped in <Container/>
   */
  switch (authView) {
    case VIEWS.SIGN_IN:
      return (
        <Container>
          <EmailAuth {...emailProp} authView="sign_in" id="auth-sign-in" />
        </Container>
      )
    case VIEWS.SIGN_UP:
      return (
        <Container>
          <EmailAuth {...emailProp} authView="sign_up" id="auth-sign-up" />
        </Container>
      )
    case VIEWS.FORGOTTEN_PASSWORD:
      return (
        <Container>
          <ForgottenPassword
            supabaseClient={supabaseClient}
            setAuthView={setAuthView}
            redirectTo={redirectTo}
            i18n={i18n}
          />
        </Container>
      )

    case VIEWS.MAGIC_LINK:
      return (
        <Container>
          <MagicLink
            supabaseClient={supabaseClient}
            setAuthView={setAuthView}
            redirectTo={redirectTo}
            i18n={i18n}
          />
        </Container>
      )

    case VIEWS.UPDATE_PASSWORD:
      return (
        <Container>
          <UpdatePassword supabaseClient={supabaseClient} i18n={i18n} />
        </Container>
      )
    default:
      return null
  }
}

interface SocialAuthProps {
  supabaseClient: SupabaseClient
  socialLayout: SocialLayout
  providers?: Provider[]
  redirectTo: RedirectTo
  onlyThirdPartyProviders: boolean
  view: 'sign_in' | 'sign_up'
  i18n: Localization
}

function SocialAuth({
  supabaseClient,
  socialLayout = 'vertical',
  providers,
  redirectTo,
  onlyThirdPartyProviders,
  view,
  i18n,
}: SocialAuthProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const verticalSocialLayout = socialLayout === 'vertical' ? true : false

  const handleProviderSignIn = async (provider: Provider) => {
    setLoading(true)
    const { error } = await supabaseClient.auth.signIn(
      { provider },
      { redirectTo }
    )
    if (error) setError(error.message)
    setLoading(false)
  }

  function capitalize(word: string) {
    const lower = word.toLowerCase()
    return word.charAt(0).toUpperCase() + lower.slice(1)
  }

  console.log('i18n', i18n[view])

  return (
    <>
      {providers && providers.length > 0 && (
        <React.Fragment>
          <Container gap="large" direction="vertical">
            <Container
              direction={verticalSocialLayout ? 'vertical' : 'horizontal'}
              gap={verticalSocialLayout ? 'small' : 'medium'}
            >
              {providers.map((provider: Provider) => {
                // @ts-ignore
                const AuthIcon = SocialIcons[provider]
                return (
                  <Button
                    key={provider}
                    color="default"
                    icon={AuthIcon ? <AuthIcon /> : ''}
                    // loading={loading}
                    onClick={() => handleProviderSignIn(provider)}
                    className="flex items-center"
                  >
                    {verticalSocialLayout &&
                      i18n[view]?.social_provider_text +
                        ' ' +
                        capitalize(provider)}
                  </Button>
                )
              })}
            </Container>
          </Container>
          {!onlyThirdPartyProviders && <Divider />}
        </React.Fragment>
      )}
    </>
  )
}

interface EmailAuthProps {
  authView: 'sign_up' | 'sign_in'
  defaultEmail: string
  defaultPassword: string
  id: 'auth-sign-up' | 'auth-sign-in'
  setAuthView: any
  setDefaultEmail: (email: string) => void
  setDefaultPassword: (password: string) => void
  supabaseClient: SupabaseClient
  redirectTo?: RedirectTo
  magicLink?: boolean
  i18n: Localization
}

function EmailAuth({
  authView,
  defaultEmail,
  defaultPassword,
  id,
  setAuthView,
  setDefaultEmail,
  setDefaultPassword,
  supabaseClient,
  redirectTo,
  magicLink,
  i18n,
}: EmailAuthProps) {
  const isMounted = useRef<boolean>(true)
  const [email, setEmail] = useState(defaultEmail)
  const [password, setPassword] = useState(defaultPassword)
  const [rememberMe, setRememberMe] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    setEmail(defaultEmail)
    setPassword(defaultPassword)

    return () => {
      isMounted.current = false
    }
  }, [authView])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    switch (authView) {
      case 'sign_in':
        const { error: signInError } = await supabaseClient.auth.signIn(
          {
            email,
            password,
          },
          { redirectTo }
        )
        if (signInError) setError(signInError.message)
        break
      case 'sign_up':
        const {
          user: signUpUser,
          session: signUpSession,
          error: signUpError,
        } = await supabaseClient.auth.signUp(
          {
            email,
            password,
          },
          { redirectTo }
        )
        if (signUpError) setError(signUpError.message)
        // Check if session is null -> email confirmation setting is turned on
        else if (signUpUser && !signUpSession)
          setMessage('Check your email for the confirmation link.')
        break
    }

    /*
     * it is possible the auth component may have been unmounted at this point
     * check if component is mounted before setting a useState
     */
    if (isMounted.current) setLoading(false)
  }

  const handleViewChange = (newView: ViewType) => {
    setDefaultEmail(email)
    setDefaultPassword(password)
    setAuthView(newView)
  }

  return (
    <form
      id={id}
      onSubmit={handleSubmit}
      autoComplete={'on'}
      style={{ width: '100%' }}
    >
      <Container direction="vertical" gap="large">
        <Container direction="vertical" gap="medium">
          <div>
            <Label htmlFor="email">{i18n[authView]?.email_label}</Label>
            <Input
              autoFocus
              type="email"
              name="email"
              defaultValue={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
              autoComplete="email"
            />
          </div>
          <div>
            <Label htmlFor="password">{i18n[authView]?.password_label}</Label>
            <Input
              type="password"
              name="password"
              defaultValue={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
              autoComplete={
                authView === 'sign_in' ? 'current-password' : 'new-password'
              }
            />
          </div>
        </Container>

        <Button type="submit" color="primary">
          {i18n[authView]?.button_text}
        </Button>

        <Container direction="vertical" gap="small">
          {authView === VIEWS.SIGN_IN && magicLink && (
            <Anchor
              href="#auth-magic-link"
              onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                e.preventDefault()
                setAuthView(VIEWS.MAGIC_LINK)
              }}
            >
              {i18n.magic_link?.link_text}
            </Anchor>
          )}
          {authView === VIEWS.SIGN_IN && (
            <Anchor
              href="#auth-forgot-password"
              onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                e.preventDefault()
                setAuthView(VIEWS.FORGOTTEN_PASSWORD)
              }}
            >
              {i18n.forgotten_password?.link_text}
            </Anchor>
          )}
          {authView === VIEWS.SIGN_IN ? (
            <Anchor
              href="#auth-sign-up"
              onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                e.preventDefault()
                handleViewChange(VIEWS.SIGN_UP)
              }}
            >
              {i18n.sign_up?.link_text}
            </Anchor>
          ) : (
            <Anchor
              href="#auth-sign-in"
              onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                e.preventDefault()
                handleViewChange(VIEWS.SIGN_IN)
              }}
            >
              {i18n.sign_in?.link_text}
            </Anchor>
          )}
        </Container>
      </Container>
      {message && <Message>{message}</Message>}
      {error && <Message color="danger">{error}</Message>}
    </form>
  )
}

function MagicLink({
  setAuthView,
  supabaseClient,
  redirectTo,
  i18n,
}: {
  setAuthView: any
  supabaseClient: SupabaseClient
  redirectTo?: RedirectTo
  i18n: Localization
}) {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleMagicLinkSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setMessage('')
    setLoading(true)
    const { error } = await supabaseClient.auth.signIn(
      { email },
      { redirectTo }
    )
    if (error) setError(error.message)
    else setMessage('Check your email for the magic link')
    setLoading(false)
  }

  return (
    <form id="auth-magic-link" onSubmit={handleMagicLinkSignIn}>
      <Container gap="large" direction="vertical">
        <Container gap="large" direction="vertical">
          <div>
            <Label>Email address</Label>
            <Input
              type="email"
              placeholder="Your email address"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
            />
          </div>
          <Button color="primary" type="submit" loading={loading}>
            Send magic link
          </Button>
        </Container>
        <Anchor
          href="#auth-sign-in"
          onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
            e.preventDefault()
            setAuthView(VIEWS.SIGN_IN)
          }}
        >
          Sign in with password
        </Anchor>
        {message && <Message>{message}</Message>}
        {error && <Message color="danger">{error}</Message>}
      </Container>
    </form>
  )
}

function ForgottenPassword({
  setAuthView,
  supabaseClient,
  redirectTo,
  i18n,
}: {
  setAuthView: any
  supabaseClient: SupabaseClient
  redirectTo?: RedirectTo
  i18n: Localization
}) {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handlePasswordReset = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setMessage('')
    setLoading(true)
    const { error } = await supabaseClient.auth.api.resetPasswordForEmail(
      email,
      { redirectTo }
    )
    if (error) setError(error.message)
    else setMessage('Check your email for the password reset link')
    setLoading(false)
  }

  return (
    <form id="auth-forgot-password" onSubmit={handlePasswordReset}>
      <Container gap="large" direction="vertical">
        <Container gap="large" direction="vertical">
          <div>
            <Label htmlFor="email">Your email address</Label>
            <Input
              name="email"
              type="email"
              placeholder="Your email address"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
            />
          </div>
          <Button type="submit" color="primary" loading={loading}>
            Send reset password instructions
          </Button>
        </Container>
        <Anchor
          href="#auth-sign-in"
          onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
            e.preventDefault()
            setAuthView(VIEWS.SIGN_IN)
          }}
        >
          Go back to sign in
        </Anchor>
        {message && <Message>{message}</Message>}
        {error && <Message color="danger">{error}</Message>}
      </Container>
    </form>
  )
}

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

Auth.ForgottenPassword = ForgottenPassword
Auth.UpdatePassword = UpdatePassword
Auth.MagicLink = MagicLink
Auth.UserContextProvider = UserContextProvider
Auth.useUser = useUser

export default Auth
