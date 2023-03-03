<script lang="ts">
	let klass = '';

	export { klass as class };
	export let color = 'transparent';
	export let selected = '';
	export let defaultValue = '';
</script>

<button
	class="h-10 w-10 rounded-full border transition hover:scale-105 {klass}"
	class:ring-scale-400={selected === defaultValue}
	class:border-scale-800={selected === defaultValue}
	class:ring-2={selected === defaultValue}
	class:drop-shadow-lg={selected === defaultValue}
	class:border-2={selected === defaultValue}
	style="background-color: {color};"
	on:click={() => {
		selected = defaultValue;
	}}
>
	<slot />
</button>
