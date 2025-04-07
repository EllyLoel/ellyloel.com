// @see https://github.com/stylelint/stylelint-config-standard
export default {
	extends: "stylelint-config-standard",
	plugins: ["stylelint-order", "stylelint-gamut"],
	rules: {
		"color-function-notation": "modern",
		"color-no-hex": true,
		"custom-property-pattern": [
			"^_?([A-Z][a-z0-9]+)+$|^_?([a-z][a-z0-9]*)(-[a-z0-9]+)*$",
			{
				message: "Expected custom property name to be kebab-case or PascalCase",
			},
		],
		"function-disallowed-list": ["rgba", "hsla", "rgb", "hsl"],
		"gamut/color-no-out-gamut-range": true,
		"order/order": ["custom-properties", "declarations"],
		"order/properties-alphabetical-order": true,
	},
};
