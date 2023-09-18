<script lang="ts">
	import type {
		EmailOtpType,
		MobileOtpType,
		SupabaseClient,
		VerifyOtpParams
	} from '@supabase/supabase-js';
	import Anchor from '$lib/UI/Anchor.svelte';
	import Button from '$lib/UI/Button.svelte';
	import Container from '$lib/UI/Container.svelte';
	import Input from '$lib/UI/Input.svelte';
	import Label from '$lib/UI/Label.svelte';
	import Message from '$lib/UI/Message.svelte';
	import { VIEWS, type I18nVariables, type ViewType, type OtpType } from '@supabase/auth-ui-shared';
	import type { Appearance } from '$lib/types';

	export let i18n: I18nVariables;
	export let supabaseClient: SupabaseClient;
	export let authView: ViewType;
	export let otpType: OtpType = 'email';
	export let appearance: Appearance;
	export let showLinks = false;
	export let email = '';
	export let phone = '';
	export let token = '';

	let message = '';
	let error = '';
	let loading = false;

	async function handleSubmit() {
		loading = true;
		error = '';
		message = '';

		let verifyOpts: VerifyOtpParams = {
			email,
			token,
			type: otpType as EmailOtpType
		};
		if (['sms', 'phone_change'].includes(otpType)) {
			verifyOpts = {
				phone,
				token,
				type: otpType as MobileOtpType
			};
		}
		const { error: err } = await supabaseClient.auth.verifyOtp(verifyOpts);
		if (err) error = err.message;
		loading = false;
	}
</script>

<form id="auth-magic-link" method="post" on:submit|preventDefault={handleSubmit}>
	<Container direction="vertical" gap="large" {appearance}>
		{#if ['sms', 'phone_change'].includes(otpType)}
			<div>
				<Label for="phone" {appearance}>{i18n?.verify_otp?.phone_input_label}</Label>
				<Input
					id="phone"
					type="text"
					name="phone"
					autofocus
					placeholder={i18n?.verify_otp?.phone_input_placeholder}
					bind:value={phone}
					autocomplete="phone"
					{appearance}
				/>
			</div>
		{:else}
			<div>
				<Label for="email" {appearance}>{i18n?.verify_otp?.email_input_label}</Label>
				<Input
					id="email"
					type="email"
					name="email"
					autofocus
					placeholder={i18n?.verify_otp?.email_input_placeholder}
					bind:value={email}
					autocomplete="email"
					{appearance}
				/>
			</div>
		{/if}
		<div>
			<Label for="token" {appearance}>{i18n?.verify_otp?.token_input_label}</Label>
			<Input
				id="token"
				type="text"
				name="token"
				placeholder={i18n?.verify_otp?.token_input_placeholder}
				bind:value={token}
				autocomplete="token"
				{appearance}
			/>
		</div>
		<Button type="submit" color="primary" {loading} {appearance}>
			{loading ? i18n?.verify_otp?.loading_button_label : i18n?.verify_otp?.button_label}
		</Button>

		{#if showLinks}
			<Anchor
				on:click={(e) => {
					e.preventDefault();
					authView = VIEWS.SIGN_IN;
				}}
				href="#auth-sign-in"
				{appearance}>{i18n?.sign_in?.link_text}</Anchor
			>
		{/if}
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
