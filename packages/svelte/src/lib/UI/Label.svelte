<script lang="ts">
	import type { Appearance } from '$lib/types';
	import { css } from '@stitches/core';
	import { generateClassNames } from '@supabase/auth-ui-shared';

	const labelDefaultStyles = css({
		fontFamily: '$labelFontFamily',
		fontSize: '$baseLabelSize',
		marginBottom: '$labelBottomMargin',
		color: '$inputLabelText',
		display: 'block'
	});

	type LabelProps = svelte.JSX.HTMLAttributes<HTMLLabelElement>;

	type $$Props = LabelProps & {
		appearance?: Appearance;
	};

	export let appearance: Appearance = {};

	$: classNames = generateClassNames('label', labelDefaultStyles(), appearance);
</script>

<label {...$$restProps} style={appearance?.style?.label} class={classNames.join(' ')}>
	<slot />
</label>
