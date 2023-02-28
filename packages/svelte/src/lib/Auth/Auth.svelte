<script lang="ts">
	import { createStitches, createTheme } from '@stitches/core';
	import type { SupabaseClient, Provider } from '@supabase/supabase-js';
	import {
		type I18nVariables,
		merge,
		VIEWS,
		en,
		type SocialLayout,
		type ViewType
	} from '@supabase/auth-ui-shared';
	import type { Appearance } from '$lib/types';
	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';
	import EmailAuth from './interfaces/EmailAuth.svelte';
	import ForgottenPassword from './interfaces/ForgottenPassword.svelte';
	import MagicLink from './interfaces/MagicLink.svelte';
	import SocialAuth from './interfaces/SocialAuth.svelte';
	import UpdatePassword from './interfaces/UpdatePassword.svelte';

	export let supabaseClient: SupabaseClient;
	export let socialLayout: SocialLayout = 'vertical';
	export let providers: Provider[] = [];
	export let view: ViewType = 'sign_in';
	export let redirectTo: string | undefined = undefined;
	export let onlyThirdPartyProviders = false;
	export let magicLink = false;
	export let showLinks = true;
	export let appearance: Appearance = {};
	export let theme: 'default' | string = 'default';
	export let localization: { variables?: I18nVariables } = {};

	$: i18n = merge(en, localization.variables ?? {});

	const authView = setContext('supabase-auth-view', writable<ViewType>(view));

	$: createStitches({
		theme: merge(appearance?.theme?.default ?? {}, appearance?.variables?.default ?? {})
	});

	$: themeVariables = createTheme(
		merge(
			// @ts-ignore
			appearance?.theme[theme],
			appearance?.variables?.[theme] ?? {}
		)
	);
</script>

<!-- <div class="home"> -->
<div class={theme !== 'default' ? themeVariables : ''}>
	{#if $authView === VIEWS.SIGN_IN}
		<SocialAuth
			{appearance}
			{supabaseClient}
			{providers}
			{socialLayout}
			{redirectTo}
			{onlyThirdPartyProviders}
			{i18n}
		/>

		{#if !onlyThirdPartyProviders}
			<EmailAuth
				{appearance}
				{supabaseClient}
				{authView}
				{redirectTo}
				{magicLink}
				{showLinks}
				{i18n}
			/>
		{/if}
	{/if}
	{#if $authView === VIEWS.SIGN_UP}
		<SocialAuth
			{appearance}
			{supabaseClient}
			{providers}
			{socialLayout}
			{redirectTo}
			{onlyThirdPartyProviders}
			{i18n}
		/>

		{#if !onlyThirdPartyProviders}
			<EmailAuth
				{appearance}
				{supabaseClient}
				{authView}
				{redirectTo}
				{magicLink}
				{showLinks}
				{i18n}
			/>
		{/if}
	{/if}
	{#if $authView === VIEWS.FORGOTTEN_PASSWORD}
		<ForgottenPassword {i18n} {supabaseClient} {authView} {appearance} />
	{/if}
	{#if $authView === VIEWS.MAGIC_LINK}
		<MagicLink {i18n} {supabaseClient} {authView} {appearance} {redirectTo} {showLinks} />
	{/if}
	{#if $authView === VIEWS.UPDATE_PASSWORD}
		<UpdatePassword {i18n} {supabaseClient} {authView} {appearance} {showLinks} />
	{/if}
</div>
