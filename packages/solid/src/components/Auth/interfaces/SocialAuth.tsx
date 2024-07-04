import { Provider, SupabaseClient } from '@supabase/supabase-js'
import { createSignal, For, Show } from 'solid-js'
import {
  I18nVariables,
  ProviderScopes,
  SocialLayout,
  template,
} from '@supabase/auth-ui-shared'
import { Appearance } from '../../../types'
import { Button, Container, Divider } from '../../UI'
import { Icons } from '../Icons'

interface SocialAuthProps {
  supabaseClient: SupabaseClient
  socialLayout: SocialLayout | string
  providers?: Provider[]
  providerScopes?: Partial<ProviderScopes>
  queryParams?: { [key: string]: string }
  redirectTo: RedirectTo
  onlyThirdPartyProviders: boolean
  view: 'sign_in' | 'sign_up' | 'magic_link'
  i18n: I18nVariables
  appearance?: Appearance
}

type RedirectTo = undefined | string

function SocialAuth(props: SocialAuthProps) {
  const [loading, setLoading] = createSignal(false)
  const [error, setError] = createSignal('')

  const currentView = props.view === 'magic_link' ? 'sign_in' : props.view

  const handleProviderSignIn = async (provider: Provider) => {
    setLoading(true)
    const { error } = await props.supabaseClient.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: props.redirectTo,
        scopes: props.providerScopes?.[provider],
        queryParams: props.queryParams,
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
      {props.providers && props.providers.length > 0 && (
        <>
          <Container
            gap="large"
            direction="vertical"
            appearance={props.appearance}
          >
            <Container
              direction={props.socialLayout}
              gap={props.socialLayout === 'vertical' ? 'small' : 'medium'}
              appearance={props.appearance}
            >
              <For each={props.providers}>
                {(provider: Provider) => {
                  return (
                    <Button
                      color="default"
                      loading={loading()}
                      onClick={() => handleProviderSignIn(provider)}
                      appearance={props.appearance}
                    >
                      <Icons provider={provider} />
                      {props.socialLayout === 'vertical' &&
                        template(
                          props.i18n[currentView]
                            ?.social_provider_text as string,
                          {
                            provider: capitalize(provider),
                          }
                        )}
                    </Button>
                  )
                }}
              </For>
            </Container>
          </Container>
          <Show when={!props.onlyThirdPartyProviders}>
            <Divider appearance={props.appearance} />
          </Show>
        </>
      )}
    </>
  )
}

export { SocialAuth }
