<script lang="ts">
	type DivProps = svelte.JSX.HTMLAttributes<HTMLDivElement>;

	type $$Props = DivProps;

	export let color: 'default' | 'danger' = 'default';
</script>

<span class="message {color}" {...$$restProps}>
	<slot />
</span>

<style>
	span {
		font-family: var(--fonts-bodyFontFamily);
		font-size: var(--fontSizes-baseBodySize);
		margin-bottom: var(--space-labelBottomMargin);
		display: block;
		text-align: center;
	}

	span.default {
		color: var(--colors-messageText);
	}
	span.danger {
		color: var(--colors-messageTextDanger);
	}
</style>
