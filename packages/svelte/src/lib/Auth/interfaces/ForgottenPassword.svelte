<script lang="ts">
	import type { SupabaseClient } from '@supabase/supabase-js';
	import Anchor from '$lib/UI/Anchor.svelte';
	import Button from '$lib/UI/Button.svelte';
	import Container from '$lib/UI/Container.svelte';
	import Input from '$lib/UI/Input.svelte';
	import Label from '$lib/UI/Label.svelte';
	import Message from '$lib/UI/Message.svelte';
	import type { Writable } from 'svelte/store';
	import { VIEWS, type I18nVariables, type ViewType } from '@supabase/auth-ui-shared';
	import type { Appearance } from '$lib/types';

	export let i18n: I18nVariables;
	export let supabaseClient: SupabaseClient;
	export let authView: Writable<ViewType>;
	export let redirectTo: string | undefined = undefined;
	export let email = '';
	export let appearance: Appearance;

	let magicLink = true;
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
	<Container direction="vertical" gap="large" {appearance}>
		<Container direction="vertical" gap="large" {appearance}>
			<div>
				<Label for="email" {appearance}>{i18n?.forgotten_password?.email_label}</Label>
				<Input type="email" name="email" bind:value={email} autocomplete="email" {appearance} />
			</div>
			<Button type="submit" color="primary" {loading} {appearance}>
				{i18n?.forgotten_password?.button_label}
			</Button>
		</Container>

		<Anchor
			on:click={(e) => {
				e.preventDefault();
				authView.set(VIEWS.SIGN_IN);
			}}
			href="#auth-magic-link"
			{appearance}>{i18n?.sign_in?.link_text}</Anchor
		>
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
	</Container>
</form>

<style>
	form {
		width: 100%;
	}
</style>
