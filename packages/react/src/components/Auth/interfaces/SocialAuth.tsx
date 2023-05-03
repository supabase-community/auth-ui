import { Provider, SupabaseClient } from '@supabase/supabase-js'
import { useState } from 'react'
import {
  I18nVariables,
  ProviderScopes,
  SocialLayout,
  template,
} from '@supabase/auth-ui-shared'
import { Appearance } from '../../../types'
import { Button, Container, Divider } from './../../UI/index.js'
import * as SocialIcons from './../Icons.js'

interface SocialAuthProps {
  supabaseClient: SupabaseClient
  socialLayout?: SocialLayout
  providers?: Provider[]
  providerScopes?: Partial<ProviderScopes>
  queryParams?: { [key: string]: string }
  redirectTo?: RedirectTo
  onlyThirdPartyProviders?: boolean
  view?: 'sign_in' | 'sign_up'
  i18n?: I18nVariables
  appearance?: Appearance
}

type RedirectTo = undefined | string

function SocialAuth({
  supabaseClient,
  socialLayout = 'vertical',
  providers = ['github', 'google', 'azure'],
  providerScopes,
  queryParams,
  redirectTo,
  onlyThirdPartyProviders = true,
  view = 'sign_in',
  i18n,
  appearance,
}: SocialAuthProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const verticalSocialLayout = socialLayout === 'vertical' ? true : false

  const handleProviderSignIn = async (provider: Provider) => {
    setLoading(true)
    const { error } = await supabaseClient.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo,
        scopes: providerScopes?.[provider],
        queryParams,
      },
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
        <>
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
        </>
      )}
    </>
  )
}

export { SocialAuth }
