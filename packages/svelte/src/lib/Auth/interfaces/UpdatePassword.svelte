<script lang="ts">
	import type { SupabaseClient } from '@supabase/supabase-js';
	import Anchor from '$lib/UI/Anchor.svelte';
	import Button from '$lib/UI/Button.svelte';
	import Container from '$lib/UI/Container.svelte';
	import Input from '$lib/UI/Input.svelte';
	import Label from '$lib/UI/Label.svelte';
	import Message from '$lib/UI/Message.svelte';
	import type { Writable } from 'svelte/store';
	import { AuthView, type I18nVariables } from '$lib/types';

	export let i18n: I18nVariables;
	export let supabaseClient: SupabaseClient;
	export let authView: Writable<AuthView>;
	export let redirectTo: string | undefined = undefined;
	export let email = '';

	let message = '';
	let error = '';
	let loading = false;

	async function handleSubmit() {
		loading = true;
		error = '';
		message = '';
		const { error: resetPasswordError } = await supabaseClient.auth.resetPasswordForEmail(email, {
			redirectTo
		});
		if (resetPasswordError) error = resetPasswordError.message;
		else message = 'Check your email for the password reset link';
		loading = false;
	}
</script>

<form id="auth-forgot-password" method="post" on:submit|preventDefault={handleSubmit}>
	<Container direction="vertical" gap="large">
		<Container direction="vertical" gap="large">
			<div>
				<Label htmlfor="email">
					{i18n?.update_password?.password_label}
				</Label>
				<Input
					type="email"
					placeholder={i18n?.update_password?.password_label}
					name="email"
					bind:value={email}
					autocomplete="email"
				/>
			</div>
			<Button type="submit" color="primary" {loading}>
				{i18n?.forgotten_password?.button_label}
			</Button>
		</Container>

		<Anchor
			on:click={(e) => {
				e.preventDefault();
				authView.set(AuthView.SIGN_IN);
			}}
			href="#auth-magic-link">{i18n?.sign_in?.link_text}</Anchor
		>
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
	</Container>
</form>

<style>
	form {
		width: 100%;
	}
</style>
