<script lang="ts">
	import SegmentedButton, { Segment } from '@smui/segmented-button';
	import RoundedCorner from 'svelte-material-icons/RoundedCorner.svelte';
	import { customBorderRadius } from './store';

	const radii: string[] = ['5px', '10px', '20px'];

	let selected = radii[0];

	$: if (selected) $customBorderRadius = selected;
</script>

<div>
	<h5>Rounded Corners</h5>
	<SegmentedButton segments={radii} let:segment singleSelect bind:selected>
		<Segment {segment} touch>
			<RoundedCorner color="white" size="2em" />
		</Segment>
	</SegmentedButton>
</div>
