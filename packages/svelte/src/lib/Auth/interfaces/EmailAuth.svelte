<script lang="ts">
	import type { SupabaseClient } from '@supabase/supabase-js';

	import { AuthView, type I18nVariables } from '$lib/types';
	import Anchor from '$lib/UI/Anchor.svelte';
	import Button from '$lib/UI/Button.svelte';
	import Container from '$lib/UI/Container.svelte';
	import Input from '$lib/UI/Input.svelte';
	import Label from '$lib/UI/Label.svelte';
	import Message from '$lib/UI/Message.svelte';
	import type { Writable } from 'svelte/store';

	export let i18n: I18nVariables;
	export let supabaseClient: SupabaseClient;
	export let authView: Writable<AuthView>;
	export let email = '';
	export let password = '';
	export let disable_signup = false;
	export let redirectTo: string | undefined = undefined;

	let magicLink = true;
	let message = '';
	let error = '';
	let loading = false;

	async function handleSubmit() {
		loading = true;
		error = '';

		switch ($authView) {
			case AuthView.SIGN_IN:
				const { error: signInError } = await supabaseClient.auth.signInWithPassword({
					email,
					password
				});
				if (signInError) error = signInError.message;
				break;
			case AuthView.SIGN_UP:
				if (disable_signup) return;

				const {
					data: { user: signUpUser, session: signUpSession },
					error: signUpError
				} = await supabaseClient.auth.signUp({
					email,
					password,
					options: {
						emailRedirectTo: redirectTo
					}
				});

				if (signUpError) error = signUpError.message;
				// Check if session is null -> email confirmation setting is turned on
				else if (signUpUser && !signUpSession)
					message = 'Check your email for the confirmation link.';
				break;
		}
	}
</script>

<form method="post" on:submit|preventDefault={handleSubmit}>
	<Container direction="vertical" gap="large">
		<Container direction="vertical" gap="large">
			<div>
				<Label htmlfor="email">{i18n?.[$authView]?.email_label}</Label>
				<Input type="email" name="email" bind:value={email} autocomplete="email" />
			</div>
			<div>
				<Label htmlfor="password">{i18n?.[$authView]?.password_label}</Label>
				<Input
					type="password"
					name="password"
					bind:value={password}
					autocomplete={$authView === AuthView.SIGN_IN ? 'current-password' : 'new-password'}
				/>
			</div>
		</Container>
		<Button type="submit" color="primary">{i18n?.[$authView]?.button_label}</Button>

		<Container direction="vertical" gap="small">
			{#if $authView === AuthView.SIGN_IN && magicLink}
				<Anchor
					on:click={(e) => {
						e.preventDefault();
						authView.set(AuthView.MAGIC_LINK);
					}}
					href="#auth-magic-link"
					>{i18n?.magic_link?.link_text}
				</Anchor>
			{/if}
			{#if $authView === AuthView.SIGN_IN}
				<Anchor
					on:click={(e) => {
						e.preventDefault();
						authView.set(AuthView.FORGOTTEN_PASSWORD);
					}}
					href="#auth-forgot-password"
				>
					{i18n?.forgotten_password?.link_text}</Anchor
				>
				{#if !disable_signup}
					<Anchor
						on:click={(e) => {
							e.preventDefault();
							authView.set(AuthView.SIGN_UP);
						}}
						href="#auth-sign-up"
					>
						{i18n?.sign_up?.link_text}
					</Anchor>
				{/if}
			{:else}
				<Anchor
					on:click={(e) => {
						e.preventDefault();
						authView.set(AuthView.SIGN_IN);
					}}
					href="#auth-sign-in"
				>
					{i18n?.sign_in?.link_text}
				</Anchor>
			{/if}
		</Container>
	</Container>

	{#if message}
		<Message>
			{message}
		</Message>
	{/if}
	{#if error}
		<Message color="danger">
			{error}
		</Message>
	{/if}
</form>

<style>
	form {
		width: 100%;
	}
</style>
