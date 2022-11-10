<script lang="ts">
	type DivProps = svelte.JSX.HTMLAttributes<HTMLDivElement>;

	type $$Props = DivProps;
</script>

<div class="divider" {...$$restProps}>
	<slot />
</div>

<style>
	div {
		background: var(--color-dividerBackground);
		display: block;
		margin: 16px 0;
		height: 1px;
		width: 100%;
	}
</style>
