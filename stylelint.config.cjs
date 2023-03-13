// @see https://github.com/stylelint/stylelint-config-standard
module.exports = {
	extends: "stylelint-config-standard",
	plugins: ["stylelint-order"],
	rules: {
		"custom-property-pattern": [
			"^_?([A-Z][a-z0-9]+)+$|^_?([a-z][a-z0-9]*)(-[a-z0-9]+)*$",
			{
				message: "Expected custom property name to be kebab-case or PascalCase",
			},
		],
		"order/order": ["custom-properties", "declarations"],
		"order/properties-alphabetical-order": true,
	},
};
