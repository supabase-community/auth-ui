<script lang="ts">
	import type { SocialLayout } from '@supabase/auth-ui-shared';
	import { Segmented, SegmentedButton } from 'konsta/svelte';
	import HorizontalIcon from 'svelte-material-icons/AlignHorizontalCenter.svelte';
	import VerticalIcon from 'svelte-material-icons/AlignVerticalCenter.svelte';
	import { customSocialLayout } from './store';

	const socialAlignment: SocialLayout[] = ['vertical', 'horizontal'];
</script>

<div>
	<h5 class="text-xl font-bold my-10">Social Auth Layout</h5>
	<Segmented class="rounded-none md:justify-start">
		<SegmentedButton
			class="p-3 border-none w-auto"
			active={$customSocialLayout === socialAlignment[0]}
			onClick={() => ($customSocialLayout = socialAlignment[0])}
		>
			<VerticalIcon color="white" size="2em" />
		</SegmentedButton>
		<SegmentedButton
			class="p-3 border-none w-auto"
			active={$customSocialLayout === socialAlignment[1]}
			onClick={() => ($customSocialLayout = socialAlignment[1])}
		>
			<HorizontalIcon color="white" size="2em" />
		</SegmentedButton>
	</Segmented>
</div>
