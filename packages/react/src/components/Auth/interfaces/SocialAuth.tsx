import { Provider, SupabaseClient } from '@supabase/supabase-js'
import { useEffect, useRef, useState } from 'react'
import {
  en,
  I18nVariables,
  merge,
  SocialLayout,
  template,
} from '@supabase/auth-ui-shared'
import { Appearance } from '../../../types'
import { Button, Container, Divider } from './../../UI'
import * as SocialIcons from './../Icons'
import { createStitches, createTheme } from '@stitches/core'

interface SocialAuthProps {
  supabaseClient: SupabaseClient
  socialLayout?: SocialLayout
  providers?: Provider[]
  redirectTo?: RedirectTo
  onlyThirdPartyProviders?: boolean
  view?: 'sign_in' | 'sign_up'
  i18n?: I18nVariables
  appearance?: Appearance
  theme?: 'default' | string
}

type RedirectTo = undefined | string

function SocialAuth({
  supabaseClient,
  socialLayout = 'vertical',
  providers = ['github', 'google', 'azure'],
  redirectTo,
  onlyThirdPartyProviders = true,
  view = 'sign_in',
  i18n,
  appearance,
  theme = 'default',
}: SocialAuthProps) {
  const isMounted = useRef<boolean>(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Setting default lang to english
  i18n = merge(en, i18n ?? {})

  const verticalSocialLayout = socialLayout === 'vertical' ? true : false

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

  const handleProviderSignIn = async (provider: Provider) => {
    setLoading(true)
    const { error } = await supabaseClient.auth.signInWithOAuth({
      provider,
      options: { redirectTo },
    })
    if (error) setError(error.message)
    setLoading(false)
  }

  function capitalize(word: string) {
    const lower = word.toLowerCase()
    return word.charAt(0).toUpperCase() + lower.slice(1)
  }

  return (
    <>
      {providers && providers.length > 0 && (
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
              : undefined
          }
        >
          <Container gap="large" direction="vertical" appearance={appearance}>
            <Container
              direction={verticalSocialLayout ? 'vertical' : 'horizontal'}
              gap={verticalSocialLayout ? 'small' : 'medium'}
              appearance={appearance}
            >
              {providers.map((provider: Provider) => {
                const AuthIcon = SocialIcons[provider]
                return (
                  <Button
                    key={provider}
                    color="default"
                    icon={AuthIcon ? <AuthIcon /> : ''}
                    loading={loading}
                    onClick={() => handleProviderSignIn(provider)}
                    appearance={appearance}
                  >
                    {verticalSocialLayout &&
                      template(i18n?.[view]?.social_provider_text as string, {
                        provider: capitalize(provider),
                      })}
                  </Button>
                )
              })}
            </Container>
          </Container>
          {!onlyThirdPartyProviders && <Divider appearance={appearance} />}
        </div>
      )}
    </>
  )
}

export { SocialAuth }
