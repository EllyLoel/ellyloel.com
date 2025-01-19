module.exports = {
	root: true,
	plugins: [],
	extends: ["eslint:recommended"],
	ignorePatterns: [".eslintrc.cjs", "rollup.config.js"],
	rules: {
		"no-console": "warn",
		"no-unused-vars": "warn",
		"sort-imports": "error",
		"sort-keys": "error",
		"sort-vars": "error",
		"no-prototype-builtins": "off",
	},
	env: {
		node: true,
		es2024: true,
	},
	parserOptions: {
		sourceType: "module",
	},
};
