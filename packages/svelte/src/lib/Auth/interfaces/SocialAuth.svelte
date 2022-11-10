<script lang="ts">
	import type { SupabaseClient, Provider } from '@supabase/supabase-js';
	import type { I18nVariables } from '$lib/types';
	import Button from '$lib/UI/Button.svelte';
	import Container from '$lib/UI/Container.svelte';
	import Icons from '$lib/Auth/Icons.svelte';

	export let iconsOnly = false;
	export let i18n: I18nVariables;
	export let supabaseClient: SupabaseClient;
	export let redirectTo: string | undefined = undefined;
	export let providers: Provider[] = [];

	let error = '';
	let loading = false;

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
</script>

{#if providers.length}
	<Container direction="vertical" gap="large">
		<Container direction="vertical" gap="small">
			{#if iconsOnly}
				<span>{i18n['sign_in']?.social_provider_text}</span>
			{/if}
			<div class:minimal={iconsOnly}>
				{#each providers as provider}
					{@const title = i18n['sign_in']?.social_provider_text + ' ' + capitalize(provider)}
					<Button
						title={iconsOnly ? title : undefined}
						aria-label={title}
						on:click={() => handleProviderSignIn(provider)}
						type="submit"
						color="default"
						{loading}
					>
						<Icons {provider} />
						{#if !iconsOnly}
							{title}
						{/if}
					</Button>
				{/each}
			</div>
		</Container>
	</Container>
{/if}

<style>
	span {
		text-align: center;
		margin-bottom: 4px;
	}
	div {
		display: grid;
		gap: 4px;
		grid-template-columns: repeat(auto-fit, minmax(200px, auto));
	}
	div.minimal {
		grid-template-columns: repeat(auto-fit, minmax(48px, auto));
	}
</style>
