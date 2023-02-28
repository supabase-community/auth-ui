<script lang="ts">
	import type { Appearance } from '$lib/types';
	import { css } from '@stitches/core';
	import { generateClassNames } from '@supabase/auth-ui-shared';

	const dividerDefaultStyles = css({
		background: '$dividerBackground',
		display: 'block',
		margin: '16px 0',
		height: '1px',
		width: '100%'
	});

	type DivProps = svelte.JSX.HTMLAttributes<HTMLDivElement>;
	type $$Props = DivProps & {
		appearance?: Appearance;
	};

	export let appearance: Appearance = {};

	const classNames = generateClassNames('divider', dividerDefaultStyles(), appearance);
</script>

<div {...$$restProps} style={appearance?.style?.divider} class={classNames.join(' ')}>
	<slot />
</div>
