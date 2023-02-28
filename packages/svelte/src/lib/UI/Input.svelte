<script lang="ts">
	import type { Appearance } from '$lib/types';
	import { css } from '@stitches/core';
	import { generateClassNames } from '@supabase/auth-ui-shared';

	const inputDefaultStyles = css({
		fontFamily: '$inputFontFamily',
		background: '$inputBackground',
		borderRadius: '$inputBorderRadius',
		padding: '$inputPadding',
		cursor: 'text',
		borderWidth: '$inputBorderWidth',
		borderColor: '$inputBorder',
		borderStyle: 'solid',
		fontSize: '$baseInputSize',
		width: '100%',
		color: '$inputText',
		boxSizing: 'border-box',
		'&:hover': {
			borderColor: '$inputBorderHover',
			outline: 'none'
		},
		'&:focus': {
			borderColor: '$inputBorderFocus',
			outline: 'none'
		},
		'&::placeholder': {
			color: '$inputPlaceholder',
			letterSpacing: 'initial'
		},
		transitionPproperty: 'background-color, border',
		transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
		transitionDuration: '100ms',
		variants: {
			type: {
				default: {
					letterSpacing: '0px'
				},
				password: {
					letterSpacing: '6px'
				}
			}
		}
	});

	type InputProps = svelte.JSX.HTMLAttributes<HTMLInputElement>;

	type $$Props = InputProps & {
		appearance?: Appearance;
	};

	export let value: InputProps['value'] = undefined;
	export let appearance: Appearance = {};

	$: classNames = generateClassNames(
		'input',
		inputDefaultStyles({
			type: 'default'
		}),
		appearance
	);
</script>

<input {...$$restProps} style={appearance?.style?.input} class={classNames.join(' ')} bind:value />
