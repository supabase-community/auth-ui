<script>
	import AlignmentToggles from './AlignmentToggles.svelte';
	import ColorToggles from './ColorToggles.svelte';
	import RadiusToggles from './RadiusToggles.svelte';
</script>

<div class="w-1/2 p-8">
	<h2 class="text-5xl font-bold my-9">Auth UI Svelte</h2>
	<p class="text-base my-4">
		Customizable authentication UI component with custom themes and extensible styles to match your
		brand and aesthetic
	</p>
	<div class="flex items-center">
		<!-- <img src={Logo} alt="React Logo" height={32} /> -->
		<p>
			Currently available in Solid.js and{' '}
			<a href="https://supabase.com/docs/guides/auth/auth-helpers/auth-ui#predefined-themes">
				React
			</a>
		</p>
	</div>
	<div class="grid gap-4 grid-cols-2">
		<ColorToggles />
		<RadiusToggles />
		<AlignmentToggles />
	</div>
</div>
