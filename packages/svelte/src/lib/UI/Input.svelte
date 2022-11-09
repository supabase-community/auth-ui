<script lang="ts">
	type InputProps = svelte.JSX.HTMLAttributes<HTMLInputElement>;

	type $$Props = InputProps;

	export let value: InputProps['value'] = undefined;
</script>

<input class="input" {...$$restProps} bind:value />

<style>
	input {
		font-family: var(--fonts-inputFontFamily);
		background: var(--colors-inputBackground);
		border-radius: var(--radii-inputBorderRadius);
		padding: var(--space-inputPadding);
		cursor: text;
		border-width: var(--borderWidths-inputBorderWidth);
		border-color: var(--colors-inputBorder);
		border-style: solid;
		font-size: var(--fontSizes-baseInputSize);
		width: 100%;
		color: var(--inputText);
		box-sizing: border-box;
		transition-property: background-color, border;
		transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
		transition-duration: 100ms;
	}

	input:hover {
		border-color: var(--colors-inputBorderHover);
		outline: none;
	}
	input:focus {
		border-color: var(--colors-inputBorderFocus);
		outline: none;
	}
	input::placeholder {
		color: var(--colors-inputPlaceholder);
		letter-spacing: initial;
	}

	input[type='password'] {
		letter-spacing: 6px;
	}
</style>
