<script lang="ts">
	import type { SupabaseClient, Provider } from '@supabase/supabase-js';

	import * as _defaultLocalization from '../Localization';
	import ThemeProvider from '$lib/ThemeProvider.svelte';
	import { AuthView, type AuthSettings, type Localization } from '$lib/types';
	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';
	import EmailAuth from './interfaces/EmailAuth.svelte';
	import ForgottenPassword from './interfaces/ForgottenPassword.svelte';
	import MagicLink from './interfaces/MagicLink.svelte';
	import SocialAuth from './interfaces/SocialAuth.svelte';
	import UpdatePassword from './interfaces/UpdatePassword.svelte';
	import { getSocialProvidersFromAuthSettings } from '$lib/utils';

	const defaultLocalization: Localization = { ..._defaultLocalization };

	export let supabaseClient: SupabaseClient;
	export let theme: 'supa' | 'minimal' = 'supa';
	export let dark: boolean | 'media' = false;
	export let localization: { lang?: keyof Localization } = {};
	export let redirectTo: string | undefined = undefined;
	export let providers: Provider[] = [];
	export let iconsOnly = false;
	export let settings: AuthSettings | undefined = undefined;

	$: if (!providers.length && settings?.external) {
		providers = getSocialProvidersFromAuthSettings(settings);
	}

	function getLanguage(lang?: keyof Localization) {
		if (lang && lang in defaultLocalization) {
			return defaultLocalization[lang];
		}

		if (typeof navigator !== 'undefined') {
			lang = navigator.language.split('-')[0];
			if (lang in defaultLocalization) {
				return defaultLocalization[lang];
			}
		}
		return defaultLocalization['en'];
	}

	$: i18n = getLanguage(localization.lang);

	const authView = setContext('supabase-auth-view', writable<AuthView>(AuthView.SIGN_IN));
</script>

<ThemeProvider {theme} {dark}>
	{#if $authView === AuthView.SIGN_IN}
		<SocialAuth {i18n} {supabaseClient} {providers} {redirectTo} {iconsOnly} />

		<EmailAuth {i18n} {supabaseClient} {authView} disable_signup={settings?.disable_signup} />
	{/if}
	{#if !settings?.disable_signup && $authView === AuthView.SIGN_UP}
		<EmailAuth {i18n} {supabaseClient} {authView} {redirectTo} />
	{/if}
	{#if $authView === AuthView.FORGOTTEN_PASSWORD}
		<ForgottenPassword {i18n} {supabaseClient} {authView} />
	{/if}
	{#if $authView === AuthView.MAGIC_LINK}
		<MagicLink {i18n} {supabaseClient} {authView} />
	{/if}
	{#if $authView === AuthView.UPDATE_PASSWORD}
		<UpdatePassword {i18n} {supabaseClient} {authView} />
	{/if}
</ThemeProvider>
