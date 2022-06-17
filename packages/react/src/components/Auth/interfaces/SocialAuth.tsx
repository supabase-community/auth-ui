import { Provider, SupabaseClient } from '@supabase/supabase-js'
import { useState } from 'react'
import { Appearance, Localization, SocialLayout } from '../../../types'
import { capitalize } from '../../../utils'
import { Button, Container, Divider } from './../../UI'
import * as SocialIcons from './../Icons'

interface SocialAuthProps {
  supabaseClient: SupabaseClient
  socialLayout: SocialLayout
  providers?: Provider[]
  redirectTo: RedirectTo
  onlyThirdPartyProviders: boolean
  view: 'sign_in' | 'sign_up'
  i18n: Localization
  appearance?: Appearance
}

type RedirectTo = undefined | string

function SocialAuth({
  supabaseClient,
  socialLayout = 'vertical',
  providers,
  redirectTo,
  onlyThirdPartyProviders,
  view,
  i18n,
  appearance,
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
                      i18n[view]?.social_provider_text +
                        ' ' +
                        capitalize(provider)}
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
