<script lang="ts">
	import type { SupabaseClient } from '@supabase/supabase-js';
	import type { I18nVariables } from '@supabase/auth-ui-shared';
	import type { Appearance } from '$lib/types';
	import Auth from '../Auth.svelte';

	export let supabaseClient: SupabaseClient;
	export let redirectTo: string | undefined = undefined;
	export let showLinks = false;
	export let appearance: Appearance = {};
	export let theme: 'default' | string = 'default';
	export let localization: { variables?: I18nVariables } = {};
</script>

<Auth
	view="forgotten_password"
	{showLinks}
	{supabaseClient}
	{redirectTo}
	{appearance}
	{theme}
	{localization}
/>
