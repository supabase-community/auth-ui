<script lang="ts">
	type LabelProps = svelte.JSX.HTMLAttributes<HTMLLabelElement>;

	type $$Props = LabelProps;
</script>

<label class="label" {...$$restProps}>
	<slot />
</label>

<style>
	label {
		font-family: var(--fonts-labelFontFamily);
		font-size: var(--fontSizes-baseLabelSize);
		margin-bottom: var(--space-labelBottomMargin);
		color: var(--colors-inputLabelText);
		display: block;
	}
</style>
