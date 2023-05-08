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
	export let appearance: Appearance = {};
	export let theme: 'default' | string = 'default';
	export let localization: { variables?: I18nVariables } = {};
</script>

<Auth
	view="sign_in"
	showLinks={false}
	onlyThirdPartyProviders={true}
	{supabaseClient}
	{redirectTo}
	{socialLayout}
	{providers}
	{providerScopes}
	{queryParams}
	{appearance}
	{theme}
	{localization}
/>
