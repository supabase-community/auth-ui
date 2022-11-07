import { createStitches, createTheme } from '@stitches/core'
import merge from 'lodash/merge'
import React, { useEffect, useState } from 'react'
import { Auth as AuthProps, Localization, I18nVariables } from '../../types'
import { VIEWS } from './../../constants'
import {
  EmailAuth,
  EmailAuthProps,
  ForgottenPassword,
  MagicLink,
  SocialAuth,
  UpdatePassword,
} from './interfaces'
import { UserContextProvider, useUser } from './UserContext'

import * as _defaultLocalization from '../../../common/lib/Localization'

const defaultLocalization: Localization = { ..._defaultLocalization }

export const { getCssText } = createStitches()

function Auth({
  supabaseClient,
  socialLayout = 'vertical',
  providers,
  view = 'sign_in',
  redirectTo,
  onlyThirdPartyProviders = false,
  magicLink = false,
  showLinks = true,
  appearance,
  theme = 'default',
  localization = { lang: 'en' },
}: AuthProps): JSX.Element | null {
  /**
   * Localization support
   */

  const i18n: I18nVariables = merge(
    defaultLocalization[localization.lang ?? 'en'],
    localization.variables ?? {}
  )

  // const themes = Object.values(appearance.themeFile ?? {}).map((theme) => {
  //   // return
  // })

  const [authView, setAuthView] = useState(view)
  const [defaultEmail, setDefaultEmail] = useState('')
  const [defaultPassword, setDefaultPassword] = useState('')
  const [themes, setThemes] = useState({})

  /**
   * Simple boolean to detect if authView 'sign_in' or 'sign_up' is used
   *
   * @returns boolean
   */
  const SignView = authView === 'sign_in' || authView === 'sign_up'

  useEffect(() => {
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
      theme: merge(
        appearance?.theme?.default ?? {},
        appearance?.variables?.default ?? {}
      ),
    })

    const themessss: any = {}
    const themeKeys = appearance?.theme && Object.keys(appearance?.theme)

    if (themeKeys) {
      appearance.theme &&
        Object.values(appearance.theme).map((theme, i) => {
          const key = themeKeys[i]
          // ignore default theme
          if (key === 'default') return {}

          const merged = merge(
            (appearance && appearance.theme && appearance.theme[key]) ?? {},
            (appearance && appearance.variables && appearance.variables[key]) ??
              {}
          )

          themessss[themeKeys[i]] = merged
        })
    }

    setThemes(themessss)
  }, [])

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
    // @ts-ignore
    <div
      className={
        theme !== 'default'
          ? createTheme(
              merge(
                // @ts-ignore
                appearance?.theme[theme],
                appearance?.variables?.[theme] ?? {}
              )
            )
          : ''
      }
    >
      {SignView && (
        <SocialAuth
          appearance={appearance}
          supabaseClient={supabaseClient}
          providers={providers}
          socialLayout={socialLayout}
          redirectTo={redirectTo}
          onlyThirdPartyProviders={onlyThirdPartyProviders}
          i18n={i18n}
          view={authView as 'sign_in' | 'sign_up'}
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
    showLinks,
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
          <EmailAuth {...emailProp} authView={'sign_in'} />
        </Container>
      )
    case VIEWS.SIGN_UP:
      return (
        <Container>
          <EmailAuth
            appearance={appearance}
            supabaseClient={supabaseClient}
            authView={'sign_up'}
            setAuthView={setAuthView}
            defaultEmail={defaultEmail}
            defaultPassword={defaultPassword}
            setDefaultEmail={setDefaultEmail}
            setDefaultPassword={setDefaultPassword}
            redirectTo={redirectTo}
            magicLink={magicLink}
            showLinks={showLinks}
            i18n={i18n}
          />
        </Container>
      )
    case VIEWS.FORGOTTEN_PASSWORD:
      return (
        <Container>
          <ForgottenPassword
            appearance={appearance}
            supabaseClient={supabaseClient}
            setAuthView={setAuthView}
            redirectTo={redirectTo}
            showLinks={showLinks}
            i18n={i18n}
          />
        </Container>
      )

    case VIEWS.MAGIC_LINK:
      return (
        <Container>
          <MagicLink
            appearance={appearance}
            supabaseClient={supabaseClient}
            setAuthView={setAuthView}
            redirectTo={redirectTo}
            showLinks={showLinks}
            i18n={i18n}
          />
        </Container>
      )

    case VIEWS.UPDATE_PASSWORD:
      return (
        <Container>
          <UpdatePassword
            appearance={appearance}
            supabaseClient={supabaseClient}
            i18n={i18n}
          />
        </Container>
      )
    default:
      return null
  }
}

// @ts-ignore
Auth.ForgottenPassword = ForgottenPassword
// @ts-ignore
Auth.UpdatePassword = UpdatePassword
// @ts-ignore
Auth.MagicLink = MagicLink
// @ts-ignore
Auth.UserContextProvider = UserContextProvider
// @ts-ignore
Auth.useUser = useUser

export default Auth
