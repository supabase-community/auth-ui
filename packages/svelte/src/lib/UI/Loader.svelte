<script lang="ts">
	type DivProps = svelte.JSX.HTMLAttributes<HTMLDivElement>;

	type $$Props = DivProps;
</script>

<div class="loader" {...$$restProps} />

<style>
	div {
		border-radius: 50%;
		width: 10em;
		height: 10em;
		margin: 60px auto;
		font-size: 10px;
		position: relative;
		text-indent: -9999em;

		border-top: 1.1em solid rgba(255, 255, 255, 0.2);
		border-right: 1.1em solid rgba(255, 255, 255, 0.2);
		border-bottom: 1.1em solid rgba(255, 255, 255, 0.2);
		border-left: 1.1em solid #ffffff;

		-webkit-transform: translateZ(0);
		-ms-transform: translateZ(0);
		transform: translateZ(0);
		-webkit-animation: load8 1.1s infinite linear;
		animation: load8 1.1s infinite linear;
	}
	div:after {
		border-radius: 50%;
		width: 10em;
		height: 10em;
	}
</style>
