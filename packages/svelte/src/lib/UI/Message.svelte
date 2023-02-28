<script lang="ts">
	import type { Appearance } from '$lib/types';
	import { css } from '@stitches/core';
	import { generateClassNames } from '@supabase/auth-ui-shared';

	const messageDefaultStyles = css({
		fontFamily: '$bodyFontFamily',
		fontSize: '$baseBodySize',
		marginBottom: '$labelBottomMargin',
		display: 'block',
		textAlign: 'center',
		variants: {
			color: {
				default: {
					color: '$messageText'
				},
				danger: {
					color: '$messageTextDanger'
				}
			}
		}
	});

	type DivProps = svelte.JSX.HTMLAttributes<HTMLDivElement>;

	type $$Props = DivProps & {
		color?: 'default' | 'danger';
		appearance?: Appearance;
	};

	export let color: 'default' | 'danger' = 'default';
	export let appearance: Appearance = {};

	$: classNames = generateClassNames('message', messageDefaultStyles({ color }), appearance);
</script>

<span {...$$restProps} style={appearance?.style?.message} class={classNames.join(' ')}>
	<slot />
</span>
