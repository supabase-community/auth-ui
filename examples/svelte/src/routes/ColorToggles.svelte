<script lang="ts">
	import SegmentedButton, { Segment } from '@smui/segmented-button';
	import Circle from 'svelte-material-icons/Circle.svelte';
	import { customButtonColor } from './store';

	const colors: string[] = [
		'rgb(202, 37, 37)',
		'rgb(65, 163, 35)',
		'rgb(8, 107, 177)',
		'rgb(235, 115, 29)'
	];

	let selected = colors[1];

	$: if (selected) $customButtonColor = selected;
</script>

<div>
	<h5>Brand Color</h5>
	<SegmentedButton segments={colors} let:segment singleSelect bind:selected>
		<Segment {segment} touch>
			<Circle color={segment} size="2em" />
		</Segment>
	</SegmentedButton>
</div>
