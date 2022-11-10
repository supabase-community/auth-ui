<script lang="ts">
	type AnchorProps = svelte.JSX.HTMLAttributes<HTMLAnchorElement>;

	type $$Props = Omit<AnchorProps, 'href'> & {
		href: string;
	};

	export let href: string;
</script>

<a on:click class="anchor" {href} {...$$restProps}>
	<slot />
</a>

<style>
	a {
		font-family: var(--fonts-bodyFontFamily);
		font-size: var(--fontSizes-baseBodySize);
		margin-bottom: var(--space-anchorBottomMargin);
		color: var(--colors-anchorTextColor);
		display: block;
		text-align: center;
		text-decoration: underline;
	}
	a:hover {
		color: var(--colors-anchorTextHoverColor);
	}
</style>
