<script lang="ts">
	import type { SupabaseClient } from '@supabase/supabase-js';
	import Anchor from '$lib/UI/Anchor.svelte';
	import Button from '$lib/UI/Button.svelte';
	import Container from '$lib/UI/Container.svelte';
	import Input from '$lib/UI/Input.svelte';
	import Label from '$lib/UI/Label.svelte';
	import Message from '$lib/UI/Message.svelte';
	import { VIEWS, type I18nVariables, type ViewType } from '@supabase/auth-ui-shared';
	import type { Appearance } from '$lib/types';
	import type { Writable } from 'svelte/store';

	export let authView: Writable<ViewType>;
	export let email = '';
	export let password = '';
	export let supabaseClient: SupabaseClient;
	export let redirectTo: string | undefined = undefined;
	export let showLinks = true;
	export let magicLink = true;
	export let i18n: I18nVariables;
	export let appearance: Appearance;

	let message = '';
	let error = '';
	let loading = false;

	async function handleSubmit() {
		loading = true;
		error = '';

		switch ($authView) {
			case VIEWS.SIGN_IN:
				const { error: signInError } = await supabaseClient.auth.signInWithPassword({
					email,
					password
				});
				if (signInError) error = signInError.message;
				break;
			case VIEWS.SIGN_UP:
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
	<Container direction="vertical" gap="large" {appearance}>
		<Container direction="vertical" gap="large" {appearance}>
			<div>
				<Label for="email" {appearance}>{i18n?.[$authView]?.email_label}</Label>
				<Input
					id="email"
					type="email"
					name="email"
					placeholder={i18n?.[$authView]?.email_input_placeholder}
					bind:value={email}
					autocomplete="email"
					{appearance}
				/>
			</div>
			<div>
				<Label for="password" {appearance}>{i18n?.[$authView]?.password_label}</Label>
				<Input
					id="password"
					type="password"
					name="password"
					placeholder={i18n?.[$authView]?.password_input_placeholder}
					bind:value={password}
					autocomplete={$authView === VIEWS.SIGN_IN ? 'current-password' : 'new-password'}
					{appearance}
				/>
			</div>
		</Container>
		<Button type="submit" color="primary" {appearance}>{i18n?.[$authView]?.button_label}</Button>

		{#if showLinks}
			<Container direction="vertical" gap="small" {appearance}>
				{#if $authView === VIEWS.SIGN_IN && magicLink}
					<Anchor
						on:click={(e) => {
							e.preventDefault();
							authView.set(VIEWS.MAGIC_LINK);
						}}
						href="#auth-magic-link"
						{appearance}
						>{i18n?.magic_link?.link_text}
					</Anchor>
				{/if}
				{#if $authView === VIEWS.SIGN_IN}
					<Anchor
						on:click={(e) => {
							e.preventDefault();
							authView.set('forgotten_password');
						}}
						href="#auth-forgot-password"
						{appearance}
					>
						{i18n?.forgotten_password?.link_text}</Anchor
					>
					<Anchor
						on:click={(e) => {
							e.preventDefault();
							authView.set('sign_up');
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
							authView.set('sign_in');
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
