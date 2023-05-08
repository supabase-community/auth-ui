<script lang="ts">
	import type { SupabaseClient } from '@supabase/supabase-js';
	import type { I18nVariables, OtpType } from '@supabase/auth-ui-shared';
	import type { Appearance } from '$lib/types';
	import Auth from '../Auth.svelte';

	export let supabaseClient: SupabaseClient;
	export let otpType: OtpType = 'email';
	export let appearance: Appearance = {};
	export let theme: 'default' | string = 'default';
	export let localization: { variables?: I18nVariables } = {};
</script>

<Auth
	{supabaseClient}
	showLinks={false}
	magicLink={false}
	view="verify_otp"
	{otpType}
	{appearance}
	{theme}
	{localization}
/>
