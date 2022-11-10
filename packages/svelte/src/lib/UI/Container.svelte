<script lang="ts">
	type DivProps = svelte.JSX.HTMLAttributes<HTMLDivElement>;

	type $$Props = DivProps & {
		direction?: 'horizontal' | 'vertical';
		gap?: 'small' | 'medium' | 'large';
	};

	export let direction = 'horizontal';
	export let gap = 'small';
</script>

<div
	class={['container', direction, gap, $$restProps.class].filter(Boolean).join(' ')}
	{...$$restProps}
>
	<slot />
</div>

<style>
	div {
		display: flex;
	}

	div.horizontal {
		flex-direction: row;
		margin: 4px 0;
	}
	div.vertical {
		flex-direction: column;
		margin: 8px 0;
	}

	div.small {
		gap: 4px;
	}
	div.medium {
		gap: 8px;
	}
	div.large {
		gap: 16px;
	}
</style>
