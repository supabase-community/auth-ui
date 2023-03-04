<script lang="ts">
	import { Auth } from '@supabase/auth-ui-svelte';
	import { supabaseClient } from '../db';
	import { ThemeSupa, type SocialLayout, type ViewType } from '@supabase/auth-ui-shared';
	import MenuIcon from './MenuIcon.svelte';
	import ToggleButton from './ToggleButton.svelte';

	const classes: { [key: string]: string } = {
		'rgb(202, 37, 37)': 'container-redshadow',
		'rgb(65, 163, 35)': 'container-greenshadow',
		'rgb(8, 107, 177)': 'container-blueshadow',
		'rgb(235, 115, 29)': 'container-orangeshadow'
	};

	const colors = [
		'rgb(202, 37, 37)',
		'rgb(65, 163, 35)',
		'rgb(8, 107, 177)',
		'rgb(235, 115, 29)'
	] as const;

	const socialAlignments = ['horizontal', 'vertical'] as const;

	const radii = ['5px', '10px', '20px'] as const;

	const views: { id: ViewType; title: string }[] = [
		{ id: 'sign_in', title: 'Sign In' },
		{ id: 'sign_up', title: 'Sign Up' },
		{ id: 'magic_link', title: 'Magic Link' },
		{ id: 'forgotten_password', title: 'Forgotten Password' },
		{ id: 'update_password', title: 'Update Password' }
	];

	let brandColor = colors[0];
	let socialLayout = socialAlignments[1] satisfies SocialLayout;
	let borderRadius = radii[0];
	let view = views[0];
</script>

<svelte:head>
	<title>Auth UI Svelte</title>
</svelte:head>

<div class="dark:bg-scale-200 bg-scale-100 relative py-2 pb-16">
	<div
		class="sm:py-18 gap container relative mx-auto grid grid-cols-12 px-6 py-16 md:gap-16 md:py-24 lg:gap-16 lg:px-16 lg:py-24 xl:px-20"
	>
		<div class="relative col-span-12 mb-16 md:col-span-7 md:mb-0 lg:col-span-6">
			<div class="relative lg:mx-auto lg:max-w-md bg-zinc-900">
				<div class={classes[brandColor]}>
					<div class="border-scale-400 bg-scale-300 relative rounded-xl px-8 py-12 drop-shadow-sm">
						<div class="mb-6 flex flex-col gap-6">
							<div class="flex items-center gap-3">
								<h1 class="text-scale-1200 text-2xl">Acme Industries</h1>
							</div>
							<p class="text-scale-1100 text-auth-widget-test">Sign in today for Supa stuff</p>
						</div>
						<Auth
							{supabaseClient}
							theme="dark"
							view={view.id}
							appearance={{
								theme: ThemeSupa,
								style: {
									button: `border-radius: ${borderRadius}; border-color: rgba(0,0,0,0);`
								},
								variables: {
									default: {
										colors: {
											brand: brandColor,
											brandAccent: `gray`
										},
										radii: {
											borderRadiusButton: borderRadius,
											buttonBorderRadius: borderRadius,
											inputBorderRadius: borderRadius
										}
									}
								}
							}}
							providers={['apple', 'google', 'github']}
							{socialLayout}
						/>
					</div>
				</div>
			</div>
		</div>

		<div class="col-span-12 md:col-span-5 lg:col-span-6">
			<div class="!max-w-md">
				<h3 class="text-2xl mb-8">Auth UI Svelte</h3>
				<p class="!mb-0">Pre-built auth widgets to get started in minutes.</p>
				<p class="text-scale-900 mt-0">
					Customizable authentication UI component with custom themes and extensible styles to match
					your brand and aesthetic
				</p>
				<div class="mb-4 pt-6 flex items-center space-x-2">
					<small>Currently available in Svelte, Solid.js and React</small>
				</div>
			</div>

			<div class="grid gap-8 py-8 lg:grid-cols-2">
				<div class="flex flex-col gap-6">
					<div class="text-scale-1200 text-base">Brand color</div>
					<div class="flex items-center gap-3">
						<ToggleButton bind:selected={brandColor} defaultValue={colors[0]} color={colors[0]} />
						<ToggleButton bind:selected={brandColor} defaultValue={colors[1]} color={colors[1]} />
						<ToggleButton bind:selected={brandColor} defaultValue={colors[2]} color={colors[2]} />
						<ToggleButton bind:selected={brandColor} defaultValue={colors[3]} color={colors[3]} />
					</div>
				</div>

				<div class="flex flex-col gap-6">
					<div class="text-scale-1200 text-base">Rounded corners</div>
					<div class="flex items-center gap-3">
						<ToggleButton
							bind:selected={borderRadius}
							defaultValue={radii[0]}
							class="rounded-lg border-b-0 border-l-0"
						/>
						<ToggleButton
							bind:selected={borderRadius}
							defaultValue={radii[1]}
							class="rounded-xl border-b-0 border-l-0"
						/>
						<ToggleButton
							bind:selected={borderRadius}
							defaultValue={radii[2]}
							class="rounded-2xl border-b-0 border-l-0"
						/>
					</div>
				</div>

				<div class="flex flex-col gap-6">
					<div class="text-scale-1200 text-base">Social Auth Layout</div>
					<div class="flex items-center gap-3">
						<ToggleButton
							bind:selected={socialLayout}
							defaultValue={socialAlignments[0]}
							class="flex items-center justify-center"
						>
							<MenuIcon class="text-scale-900 dark:text-scale-1100 w-6 rotate-90" />
						</ToggleButton>
						<ToggleButton
							bind:selected={socialLayout}
							defaultValue={socialAlignments[1]}
							class="flex items-center justify-center"
						>
							<MenuIcon class="text-scale-900 dark:text-scale-1100 w-6" />
						</ToggleButton>
					</div>
				</div>

				<div class="flex flex-col gap-6">
					<div class="text-scale-1200 text-base">Component View</div>
					<div class="flex items-center gap-3">
						<div>
							<div class="relative inline-flex self-center">
								<select
									bind:value={view}
									class="text-lg rounded border-2 border-blue-700 text-gray-600 pl-5 pr-10 h-12 bg-white hover:border-gray-400 appearance-none"
								>
									{#each views as v}
										<option value={v}>{v.title}</option>
									{/each}
								</select>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.container-redshadow {
		min-width: 364px;
		box-shadow: -2px 1px 69px 5px rgb(202, 37, 37);
		border-radius: 1rem;
	}

	.container-greenshadow {
		min-width: 364px;
		box-shadow: -2px 1px 69px 5px rgb(65, 163, 35);
		border-radius: 1rem;
	}

	.container-blueshadow {
		min-width: 364px;
		box-shadow: -2px 1px 69px 5px rgb(8, 107, 177);
		border-radius: 1rem;
	}

	.container-orangeshadow {
		min-width: 364px;
		box-shadow: -2px 1px 69px 5px rgb(235, 115, 29);
		border-radius: 1rem;
	}
</style>
