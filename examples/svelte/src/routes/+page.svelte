<script lang="ts">
	import { Auth } from '@supabase/auth-ui-svelte';
	import { supabaseClient } from '../db';
	import { ThemeSupa } from '@supabase/auth-ui-shared';
	import Selector from './Selector.svelte';
	import { customButtonColor, customBorderRadius, customSocialLayout } from './store';

	const classes: { [key: string]: string } = {
		'rgb(202, 37, 37)': 'container-redshadow',
		'rgb(65, 163, 35)': 'container-greenshadow',
		'rgb(8, 107, 177)': 'container-blueshadow',
		'rgb(235, 115, 29)': 'container-orangeshadow'
	};
</script>

<svelte:head>
	<title>Auth UI Svelte</title>
</svelte:head>

<div class="header">
	<div class="auth-container">
		<div class={classes[$customButtonColor]}>
			<Auth
				{supabaseClient}
				theme="dark"
				appearance={{
					theme: ThemeSupa,
					style: {
						button: `border-color: rgba(0,0,0,0); border-radius: ${$customBorderRadius};`
					},
					variables: {
						default: {
							colors: {
								brand: $customButtonColor,
								brandAccent: `gray`
							}
						}
					}
				}}
				providers={['apple', 'google', 'github']}
				socialLayout={$customSocialLayout}
			/>
		</div>
	</div>
	<Selector />
</div>
