<script lang="ts">
	import '../app.css';
	import { App } from 'konsta/svelte';
	import { supabaseClient } from '../db';
	import { onMount } from 'svelte';
	import { invalidate } from '$app/navigation';

	onMount(() => {
		const {
			data: { subscription }
		} = supabaseClient.auth.onAuthStateChange(() => {
			invalidate('supabase:auth');
		});

		return () => {
			subscription.unsubscribe();
		};
	});
</script>

<App>
	<slot />
</App>
