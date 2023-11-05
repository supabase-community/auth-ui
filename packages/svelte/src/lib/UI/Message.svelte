<script lang="ts">
	import type { Appearance } from '$lib/types';
	import { css } from '@stitches/core';
	import { generateClassNames } from '@supabase/auth-ui-shared';

	const messageDefaultStyles = css({
		fontFamily: '$bodyFontFamily',
		fontSize: '$baseInputSize',
		marginBottom: '$labelBottomMargin',
		display: 'block',
		textAlign: 'center',
		borderRadius: '0.375rem',
		padding: '1.5rem 1rem',
		lineHeight: '1rem',
		variants: {
			color: {
				default: {
					color: '$messageText',
					backgroundColor: '$messageBackground',
					border: '1px solid $messageBorder'
				},
				danger: {
					color: '$messageTextDanger',
					backgroundColor: '$messageBackgroundDanger',
					border: '1px solid $messageBorderDanger'
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
