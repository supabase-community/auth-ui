<script lang="ts">
	export let theme: 'supa' | 'minimal' = 'supa';
	export let dark: boolean | 'media' = false;
</script>

<div class={theme} class:darkMedia={dark === 'media'} class:dark={dark === true}>
	<slot />
</div>

<style>
	div {
		display: contents;
	}

	div.supa {
		/* color */
		--colors-brand: hsl(153 60% 53%);
		--colors-brandAccent: hsl(154 54.8% 45.1%);
		--colors-brandButtonText: white;
		--colors-defaultButtonBackground: white;
		--colors-defaultButtonBackgroundHover: #eaeaea;
		--colors-defaultButtonBorder: lightgray;
		--colors-defaultButtonText: gray;
		--colors-dividerBackground: #eaeaea;
		--colors-inputBackground: transparent;
		--colors-inputBorder: lightgray;
		--colors-inputBorderHover: gray;
		--colors-inputBorderFocus: gray;
		--colors-inputText: black;
		--colors-inputLabelText: gray;
		--colors-inputPlaceholder: darkgray;
		--colors-messageText: gray;
		--colors-messageTextDanger: red;
		--colors-anchorTextColor: gray;
		--colors-anchorTextHoverColor: darkgray;

		/* space */
		--space-spaceSmall: 4px;
		--space-spaceMedium: 8px;
		--space-spaceLarge: 16px;
		--space-labelBottomMargin: 8px;
		--space-anchorBottomMargin: 4px;
		--space-emailInputSpacing: 4px;
		--space-socialAuthSpacing: 4px;
		--space-buttonPadding: 10px 15px;
		--space-inputPadding: 10px 15px;

		/* fontSizes */
		--fontSizes-baseBodySize: 13px;
		--fontSizes-baseInputSize: 14px;
		--fontSizes-baseLabelSize: 14px;
		--fontSizes-baseButtonSize: 14px;

		/* fonts */
		--fonts-bodyFontFamily: ui-sans-serif, sans-serif;
		--fonts-buttonFontFamily: ui-sans-serif, sans-serif;
		--fonts-inputFontFamily: ui-sans-serif, sans-serif;
		--fonts-labelFontFamily: ui-sans-serif, sans-serif;

		/* fontWeights */
		/* lineHeights */
		/* letterSpacings */
		/* sizes */
		/* borderWidths */
		--borderWidths-buttonBorderWidth: 1px;
		--borderWidths-inputBorderWidth: 1px;

		/* borderStyles */
		/* radii */
		--radii-borderRadiusButton: 4px;
		--radii-buttonBorderRadius: 4px;
		--radii-inputBorderRadius: 4px;

		/* shadows */
		/* zIndices */
		/* transitions */
	}

	div.minimal {
		/* colors */
		--colors-brand: black;
		--colors-brandAccent: #333333;
		--colors-brandButtonText: white;
		--colors-defaultButtonBackground: white;
		--colors-defaultButtonBorder: lightgray;
		--colors-defaultButtonText: gray;
		--colors-dividerBackground: #eaeaea;
		--colors-inputBackground: transparent;
		--colors-inputBorder: lightgray;
		--colors-inputText: black;
		--colors-inputPlaceholder: darkgray;
		/* space */
		--space-spaceSmall: 4px;
		--space-spaceMedium: 8px;
		--space-spaceLarge: 16px;

		/* fontSizes */
		--fontSizes-baseInputSize: 14px;
		--fontSizes-baseLabelSize: 12px;

		/* fonts */
		/* fontWeights */
		/* lineHeights */
		/* letterSpacings */
		/* sizes */
		/* borderWidths */
		/* borderStyles */
		/* radii */
		/* shadows */
		/* zIndices */
		/* transitions */
	}

	@media (prefers-color-scheme: dark) {
		div.darkMedia.supa {
			/* --colors-brand: white;
			--colors-brandAccent: #afafaf; */
			--colors-brandButtonText: black;
			--colors-defaultButtonBackground: #080808;
			--colors-defaultButtonBackgroundHover: #141414;
			--colors-defaultButtonBorder: black;
			--colors-defaultButtonText: white;
			--colors-dividerBackground: black;
			--colors-inputBackground: transparent;
			--colors-inputBorder: gray;
			--colors-inputText: black;
			--colors-inputPlaceholder: darkgray;
		}
		div.darkMedia.minimal {
			--colors-brand: white;
			--colors-brandAccent: #afafaf;
			--colors-brandButtonText: black;
			--colors-defaultButtonBackground: #080808;
			--colors-defaultButtonBackgroundHover: #141414;
			--colors-defaultButtonBorder: black;
			--colors-defaultButtonText: white;
			--colors-dividerBackground: black;
			--colors-inputBackground: transparent;
			--colors-inputBorder: gray;
			--colors-inputText: black;
			--colors-inputPlaceholder: darkgray;
		}
	}

	div.dark.supa {
		/* --colors-brand: white; */
		/* --colors-brandAccent: #afafaf; */
		--colors-brandButtonText: black;
		--colors-defaultButtonBackground: #080808;
		--colors-defaultButtonBackgroundHover: #141414;
		--colors-defaultButtonBorder: black;
		--colors-defaultButtonText: white;
		--colors-dividerBackground: black;
		--colors-inputBackground: transparent;
		--colors-inputBorder: gray;
		--colors-inputText: black;
		--colors-inputPlaceholder: darkgray;
	}
	div.dark.minimal {
		--colors-brand: white;
		--colors-brandAccent: #afafaf;
		--colors-brandButtonText: black;
		--colors-defaultButtonBackground: #080808;
		--colors-defaultButtonBackgroundHover: #141414;
		--colors-defaultButtonBorder: black;
		--colors-defaultButtonText: white;
		--colors-dividerBackground: black;
		--colors-inputBackground: transparent;
		--colors-inputBorder: gray;
		--colors-inputText: black;
		--colors-inputPlaceholder: darkgray;
	}
</style>
