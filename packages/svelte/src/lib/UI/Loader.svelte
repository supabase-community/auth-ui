<script lang="ts">
	import type { Appearance } from '$lib/types';
	import { css } from '@stitches/core';
	import { generateClassNames } from '@supabase/auth-ui-shared';

	const loaderDefaultStyles = css({
		borderRadius: '50%',
		width: '10em',
		height: '10em',
		margin: '60px auto',
		fontSize: '10px',
		position: 'relative',
		textIndent: '-9999em',

		borderTop: '1.1em solid rgba(255, 255, 255, 0.2)',
		borderRight: '1.1em solid rgba(255, 255, 255, 0.2)',
		borderBottom: '1.1em solid rgba(255, 255, 255, 0.2)',
		borderLeft: '1.1em solid #ffffff',

		'-webkit-transform': 'translateZ(0)',
		'-ms-transform': 'translateZ(0)',
		transform: 'translateZ(0)',
		'-webkit-animation': 'load8 1.1s infinite linear',
		animation: 'load8 1.1s infinite linear',

		'&:after': {
			borderRadius: '50%',
			width: '10em',
			height: '10em'
		}
	});

	type DivProps = svelte.JSX.HTMLAttributes<HTMLDivElement>;

	type $$Props = DivProps & {
		appearance?: Appearance;
	};

	export let appearance: Appearance = {};

	$: classNames = generateClassNames('loader', loaderDefaultStyles(), appearance);
</script>

<div {...$$restProps} style={appearance?.style?.loader} class={classNames.join(' ')} />
