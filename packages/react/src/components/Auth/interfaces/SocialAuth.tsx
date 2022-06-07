import { Provider, SupabaseClient } from '@supabase/supabase-js'
import { useState } from 'react'
import { Localization, SocialLayout } from '../../../types'
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
        <>
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
        </>
      )}
    </>
  )
}

export { SocialAuth }
