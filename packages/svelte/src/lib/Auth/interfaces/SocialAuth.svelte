<script lang="ts">
	import type { SupabaseClient, Provider } from '@supabase/supabase-js';
	import { template, type I18nVariables, type SocialLayout } from '@supabase/auth-ui-shared';
	import type { Appearance } from '$lib/types';
	import Button from '$lib/UI/Button.svelte';
	import Container from '$lib/UI/Container.svelte';
	import Icons from '$lib/Auth/Icons.svelte';
	import Divider from '$lib/UI/Divider.svelte';

	export let supabaseClient: SupabaseClient;
	export let socialLayout: SocialLayout;
	export let redirectTo: string | undefined = undefined;
	export let onlyThirdPartyProviders: boolean;
	export let i18n: I18nVariables;
	export let providers: Provider[] = [];
	export let appearance: Appearance;

	let error = '';
	let loading = false;

	$: verticalSocialLayout = socialLayout === 'vertical' ? true : false;

	async function handleProviderSignIn(provider: Provider) {
		loading = true;
		error = '';
		const { error: providerSigninError } = await supabaseClient.auth.signInWithOAuth({
			provider,
			options: {
				redirectTo
			}
		});
		if (providerSigninError) error = providerSigninError.message;
		loading = false;
	}

	function capitalize(word: string) {
		return word[0].toUpperCase() + word.slice(1).toLowerCase();
	}

	let iconTitle = (provider: string) =>
		template(i18n['sign_in']?.social_provider_text as string, {
			provider: capitalize(provider)
		});
</script>

{#if providers.length}
	<Container direction="vertical" gap="large" {appearance}>
		<Container
			direction={verticalSocialLayout ? 'vertical' : 'horizontal'}
			gap={verticalSocialLayout ? 'small' : 'medium'}
			{appearance}
		>
			{#each providers as provider}
				<Button
					aria-label={iconTitle(provider)}
					on:click={() => handleProviderSignIn(provider)}
					type="submit"
					color="default"
					{loading}
					{appearance}
				>
					<Icons {provider} />
					{#if verticalSocialLayout}
						{iconTitle(provider)}
					{/if}
				</Button>
			{/each}
		</Container>
	</Container>
	{#if !onlyThirdPartyProviders}
		<Divider {appearance} />
	{/if}
{/if}
