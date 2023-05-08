<script lang="ts">
	import type { Provider, SupabaseClient } from '@supabase/supabase-js';
	import type {
		I18nVariables,
		ProviderScopes,
		SocialLayout,
		ViewType
	} from '@supabase/auth-ui-shared';
	import type { Appearance } from '$lib/types';
	import Auth from '../Auth.svelte';

	export let supabaseClient: SupabaseClient;
	export let socialLayout: SocialLayout = 'vertical';
	export let providers: Provider[] = [];
	export let providerScopes: Partial<ProviderScopes> | undefined = undefined;
	export let queryParams: { [key: string]: string } | undefined = undefined;
	export let redirectTo: string | undefined = undefined;
	export let magicLink = false;
	export let showLinks = false;
	export let appearance: Appearance = {};
	export let theme: 'default' | string = 'default';
	export let localization: { variables?: I18nVariables } = {};
</script>

<Auth
	view="sign_up"
	onlyThirdPartyProviders={false}
	{supabaseClient}
	{showLinks}
	{redirectTo}
	{socialLayout}
	{providers}
	{providerScopes}
	{queryParams}
	{magicLink}
	{appearance}
	{theme}
	{localization}
/>
