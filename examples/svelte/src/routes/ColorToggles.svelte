<script lang="ts">
	import { Segmented, SegmentedButton } from 'konsta/svelte';
	import Circle from 'svelte-material-icons/Circle.svelte';
	import { customButtonColor } from './store';

	const colors: string[] = [
		'rgb(202, 37, 37)',
		'rgb(65, 163, 35)',
		'rgb(8, 107, 177)',
		'rgb(235, 115, 29)'
	];
</script>

<div>
	<h5 class="text-xl font-bold my-10">Brand Color</h5>
	<Segmented class="rounded-none md:justify-start">
		<SegmentedButton
			class="p-3 border-none w-auto"
			active={$customButtonColor === colors[0]}
			onClick={() => ($customButtonColor = colors[0])}
		>
			<Circle color={colors[0]} size="3em" />
		</SegmentedButton>
		<SegmentedButton
			class="p-3 border-none w-auto"
			active={$customButtonColor === colors[1]}
			onClick={() => ($customButtonColor = colors[1])}
		>
			<Circle color={colors[1]} size="3em" />
		</SegmentedButton>
		<SegmentedButton
			class="p-3 border-none w-auto"
			active={$customButtonColor === colors[2]}
			onClick={() => ($customButtonColor = colors[2])}
		>
			<Circle color={colors[2]} size="3em" />
		</SegmentedButton>
		<SegmentedButton
			class="p-3 border-none w-auto"
			active={$customButtonColor === colors[3]}
			onClick={() => ($customButtonColor = colors[3])}
		>
			<Circle color={colors[3]} size="3em" />
		</SegmentedButton>
	</Segmented>
</div>
