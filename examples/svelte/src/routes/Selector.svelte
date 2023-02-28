<script>
	import AlignmentToggles from './AlignmentToggles.svelte';
	import ColorToggles from './ColorToggles.svelte';
	import RadiusToggles from './RadiusToggles.svelte';
</script>

<div class="selectors-container">
	<h2>Auth UI Svelte</h2>
	<p>
		Customizable authentication UI component with custom themes and extensible styles to match your
		brand and aesthetic
	</p>
	<div class="solidrow">
		<!-- <img src={Logo} alt="React Logo" height={32} /> -->
		<p>
			Currently available in Solid.js and{' '}
			<a href="https://supabase.com/docs/guides/auth/auth-helpers/auth-ui#predefined-themes">
				React
			</a>
		</p>
	</div>
	<div class="toggles-grid">
		<ColorToggles />
		<RadiusToggles />
		<AlignmentToggles />
	</div>
</div>
