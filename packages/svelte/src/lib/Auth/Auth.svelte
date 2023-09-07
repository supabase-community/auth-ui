<script lang="ts">
	import { createStitches, createTheme } from '@stitches/core';
	import type { SupabaseClient, Provider } from '@supabase/supabase-js';
	import {
		type I18nVariables,
		merge,
		VIEWS,
		en,
		type SocialLayout,
		type ViewType,
		type ProviderScopes,
		type OtpType
	} from '@supabase/auth-ui-shared';
	import type { Appearance } from '$lib/types';
	import EmailAuth from './interfaces/EmailAuth.svelte';
	import ForgottenPassword from './interfaces/ForgottenPassword.svelte';
	import MagicLink from './interfaces/MagicLink.svelte';
	import SocialAuth from './interfaces/SocialAuth.svelte';
	import UpdatePassword from './interfaces/UpdatePassword.svelte';
	import VerifyOtp from './interfaces/VerifyOtp.svelte';
	import { onMount } from 'svelte';

	export let supabaseClient: SupabaseClient;
	export let socialLayout: SocialLayout = 'vertical';
	export let providers: Provider[] = [];
	export let providerScopes: Partial<ProviderScopes> | undefined = undefined;
	export let queryParams: { [key: string]: string } | undefined = undefined;
	export let view: ViewType = 'sign_in';
	export let redirectTo: string | undefined = undefined;
	export let onlyThirdPartyProviders = false;
	export let magicLink = false;
	export let showLinks = true;
	export let appearance: Appearance = {};
	export let theme: 'default' | string = 'default';
	export let localization: { variables?: I18nVariables } = {};
	export let otpType: OtpType = 'email';
	export let additionalData: { [key: string]: any } | undefined = undefined;

	onMount(() => {
		const { data: authListener } = supabaseClient.auth.onAuthStateChange((event) => {
			if (event === 'PASSWORD_RECOVERY') {
				view = 'update_password';
			} else if (event === 'USER_UPDATED') {
				view = 'sign_in';
			}
		});

		() => authListener.subscription.unsubscribe();
	});

	$: i18n = merge(en, localization.variables ?? {});

	$: createStitches({
		theme: merge(appearance?.theme?.default ?? {}, appearance?.variables?.default ?? {})
	});

	$: themeVariables = createTheme(
		merge(
			// @ts-ignore
			appearance?.theme?.[theme],
			appearance?.variables?.[theme] ?? {}
		)
	);

	/**
	 * Simple boolean to detect if view 'sign_in' or 'sign_up' or 'magic_link' is used
	 *
	 * @returns boolean
	 */
	$: SignView = view === 'sign_in' || view === 'sign_up' || view === 'magic_link';
</script>

<div class={theme !== 'default' ? themeVariables : ''}>
	{#if SignView}
		<SocialAuth
			{appearance}
			{supabaseClient}
			{providers}
			{providerScopes}
			{queryParams}
			{socialLayout}
			{redirectTo}
			{onlyThirdPartyProviders}
			{i18n}
		/>
	{/if}
	{#if view === VIEWS.SIGN_IN}
		{#if !onlyThirdPartyProviders}
			<EmailAuth
				{appearance}
				{supabaseClient}
				bind:authView={view}
				{redirectTo}
				{magicLink}
				{showLinks}
				{i18n}
				{additionalData}
			/>
		{/if}
	{/if}
	{#if view === VIEWS.SIGN_UP}
		{#if !onlyThirdPartyProviders}
			<EmailAuth
				{appearance}
				{supabaseClient}
				bind:authView={view}
				{redirectTo}
				{magicLink}
				{showLinks}
				{additionalData}
				{i18n}><slot /></EmailAuth
			>
		{/if}
	{/if}
	{#if view === VIEWS.FORGOTTEN_PASSWORD}
		<ForgottenPassword {i18n} {supabaseClient} bind:authView={view} {showLinks} {appearance} {redirectTo} />
	{/if}
	{#if view === VIEWS.MAGIC_LINK}
		<MagicLink {i18n} {supabaseClient} bind:authView={view} {appearance} {redirectTo} {showLinks} />
	{/if}
	{#if view === VIEWS.UPDATE_PASSWORD}
		<UpdatePassword {i18n} {supabaseClient} bind:authView={view} {appearance} {showLinks} />
	{/if}
	{#if view === VIEWS.VERIFY_OTP}
		<VerifyOtp {i18n} {supabaseClient} bind:authView={view} {appearance} {showLinks} {otpType} />
	{/if}
</div>
