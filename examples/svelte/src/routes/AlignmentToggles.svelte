<script lang="ts">
	import SegmentedButton, { Icon, Segment } from '@smui/segmented-button';
	import HorizontalIcon from 'svelte-material-icons/AlignHorizontalCenter.svelte';
	import VerticalIcon from 'svelte-material-icons/AlignVerticalCenter.svelte';
	import { customSocialLayout } from './store';

	const socialAlignmanet: any[] = [
		{ name: 'vertical', component: VerticalIcon },
		{ name: 'horizontal', component: HorizontalIcon }
	];

	let selected = socialAlignmanet[0];

	$: if (selected) $customSocialLayout = selected.name;
</script>

<div>
	<h5>Social Auth Layout</h5>
	<SegmentedButton segments={socialAlignmanet} let:segment singleSelect bind:selected>
		<Segment {segment} touch>
			<svelte:component this={segment.component} color="white" size="2em" />
		</Segment>
	</SegmentedButton>
</div>
