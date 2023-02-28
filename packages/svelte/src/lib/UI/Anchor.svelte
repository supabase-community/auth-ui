<script lang="ts">
	import type { Appearance } from '$lib/types';
	import { css } from '@stitches/core';
	import { generateClassNames } from '@supabase/auth-ui-shared';

	const anchorHTMLAttributes = css({
		fontFamily: '$bodyFontFamily',
		fontSize: '$baseBodySize',
		marginBottom: '$anchorBottomMargin',
		color: '$anchorTextColor',
		display: 'block',
		textAlign: 'center',
		textDecoration: 'underline',
		'&:hover': {
			color: '$anchorTextHoverColor'
		}
	});

	type AnchorProps = svelte.JSX.HTMLAttributes<HTMLAnchorElement>;

	type $$Props = Omit<AnchorProps, 'href'> & {
		href: string;
		appearance?: Appearance;
	};

	export let href: string;
	export let appearance: Appearance = {};

	$: classNames = generateClassNames('anchor', anchorHTMLAttributes(), appearance);
</script>

<a on:click {href} {...$$restProps} style={appearance?.style?.anchor} class={classNames.join(' ')}>
	<slot />
</a>
