<script lang="ts">
	import type { SupabaseClient } from '@supabase/supabase-js';
	import Anchor from '$lib/UI/Anchor.svelte';
	import Button from '$lib/UI/Button.svelte';
	import Container from '$lib/UI/Container.svelte';
	import Input from '$lib/UI/Input.svelte';
	import Label from '$lib/UI/Label.svelte';
	import Message from '$lib/UI/Message.svelte';
	import {
		VIEWS,
		type I18nVariables,
		type ViewType,
		type RedirectTo
	} from '@supabase/auth-ui-shared';
	import type { Appearance } from '$lib/types';

	export let authView: ViewType = 'sign_in';
	export let email = '';
	export let password = '';
	export let supabaseClient: SupabaseClient;
	export let redirectTo: RedirectTo = undefined;
	export let additionalData: { [key: string]: any } | undefined = undefined;
	export let showLinks = false;
	export let magicLink = true;
	export let i18n: I18nVariables;
	export let passwordLimit: boolean = false;
	export let appearance: Appearance;

	let message = '';
	let error = '';
	let loading = false;

	let lngKey: 'sign_in' | 'sign_up' = authView === 'sign_in' ? 'sign_in' : 'sign_up';

	async function handleSubmit() {
		loading = true;
		error = '';
		message = '';

		switch (authView) {
			case VIEWS.SIGN_IN:
				const { error: signInError } = await supabaseClient.auth.signInWithPassword({
					email,
					password
				});
				if (signInError) error = signInError.message;
				loading = false;
				break;
			case VIEWS.SIGN_UP:
				if (passwordLimit && password.length > 72) {
					error = 'Password exceeds maxmium length of 72 characters';
					loading = false;
					return;
				}
				let options: { emailRedirectTo: RedirectTo; data?: object } = {
					emailRedirectTo: redirectTo
				};
				if (additionalData) {
					options.data = additionalData;
				}
				const {
					data: { user: signUpUser, session: signUpSession },
					error: signUpError
				} = await supabaseClient.auth.signUp({
					email,
					password,
					options
				});

				if (signUpError) error = signUpError.message;
				// Check if session is null -> email confirmation setting is turned on
				else if (signUpUser && !signUpSession) message = i18n.sign_up?.confirmation_text as string;
				break;
		}
		loading = false;
	}
</script>

<form method="post" on:submit|preventDefault={handleSubmit}>
	<Container direction="vertical" gap="large" {appearance}>
		<Container direction="vertical" gap="large" {appearance}>
			<div>
				<Label for="email" {appearance}>{i18n?.[lngKey]?.email_label}</Label>
				<Input
					id="email"
					type="email"
					name="email"
					autofocus
					placeholder={i18n?.[lngKey]?.email_input_placeholder}
					bind:value={email}
					autocomplete="email"
					{appearance}
				/>
			</div>
			<div>
				<Label for="password" {appearance}>{i18n?.[lngKey]?.password_label}</Label>
				<Input
					id="password"
					type="password"
					name="password"
					placeholder={i18n?.[lngKey]?.password_input_placeholder}
					bind:value={password}
					autocomplete={authView === VIEWS.SIGN_IN ? 'current-password' : 'new-password'}
					{appearance}
				/>
			</div>
			<slot />
		</Container>
		<Button type="submit" color="primary" {loading} {appearance}
			>{loading ? i18n?.[lngKey]?.loading_button_label : i18n?.[lngKey]?.button_label}
		</Button>

		{#if showLinks}
			<Container direction="vertical" gap="small" {appearance}>
				{#if authView === VIEWS.SIGN_IN && magicLink}
					<Anchor
						on:click={(e) => {
							e.preventDefault();
							authView = VIEWS.MAGIC_LINK;
						}}
						href="#auth-magic-link"
						{appearance}
						>{i18n?.magic_link?.link_text}
					</Anchor>
				{/if}
				{#if authView === VIEWS.SIGN_IN}
					<Anchor
						on:click={(e) => {
							e.preventDefault();
							authView = VIEWS.FORGOTTEN_PASSWORD;
						}}
						href="#auth-forgot-password"
						{appearance}
					>
						{i18n?.forgotten_password?.link_text}</Anchor
					>
					<Anchor
						on:click={(e) => {
							e.preventDefault();
							authView = VIEWS.SIGN_UP;
						}}
						href="#auth-sign-up"
						{appearance}
					>
						{i18n?.sign_up?.link_text}
					</Anchor>
				{:else}
					<Anchor
						on:click={(e) => {
							e.preventDefault();
							authView = VIEWS.SIGN_IN;
						}}
						href="#auth-sign-in"
						{appearance}
					>
						{i18n?.sign_in?.link_text}
					</Anchor>
				{/if}
			</Container>
		{/if}
	</Container>

	{#if message}
		<Message {appearance}>
			{message}
		</Message>
	{/if}
	{#if error}
		<Message color="danger" {appearance}>
			{error}
		</Message>
	{/if}
</form>

<style>
	form {
		width: 100%;
	}
</style>
