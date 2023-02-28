<script lang="ts">
	import { Segmented, SegmentedButton } from 'konsta/svelte';
	import RoundedCorner from 'svelte-material-icons/RoundedCorner.svelte';
	import { customBorderRadius } from './store';

	const radii: string[] = ['5px', '10px', '20px'];
</script>

<div>
	<h5 class="text-xl font-bold my-10">Rounded Corners</h5>
	<Segmented class="rounded-none md:justify-start">
		<SegmentedButton
			class="p-3 border-none w-auto"
			active={$customBorderRadius === radii[0]}
			onClick={() => ($customBorderRadius = radii[0])}
		>
			<RoundedCorner color="white" size="2em" />
		</SegmentedButton>
		<SegmentedButton
			class="p-3 border-none w-auto"
			active={$customBorderRadius === radii[1]}
			onClick={() => ($customBorderRadius = radii[1])}
		>
			<RoundedCorner color="white" size="2em" />
		</SegmentedButton>
		<SegmentedButton
			class="p-3 border-none w-auto"
			active={$customBorderRadius === radii[2]}
			onClick={() => ($customBorderRadius = radii[2])}
		>
			<RoundedCorner color="white" size="2em" />
		</SegmentedButton>
	</Segmented>
</div>
