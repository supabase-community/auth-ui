<script lang="ts">
	import Auth from '$lib';
	import type { PageData } from './$types';
	import { supabaseClient } from '../db';

	export let data: PageData;

	async function logout() {
		await supabaseClient.auth.signOut();
	}
</script>

{#if data.session}
	<button on:click={logout}>Logout</button>

	<code>
		<pre>{JSON.stringify(data.session, null, 2)}</pre>
	</code>
{:else}
	<div>
		<Auth
			{supabaseClient}
			theme="supa"
			dark="media"
			iconsOnly
			settings={data.authSettings}
			localization={{ lang: data.lang }}
		/>
	</div>
{/if}

<style>
	code {
		padding: 4px;
		display: block;
		overflow: auto;
	}

	div {
		padding: 0.5em 1em;
		border-radius: 0.5em;
		max-width: 65ch;
		margin: 4em auto;
	}
	@media (prefers-color-scheme: dark) {
		div {
			background-color: #2a2a2a;
		}
	}
</style>
