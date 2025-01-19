module.exports = {
	plugins: [],
	extends: ["eslint:recommended"],
	ignorePatterns: [".eslintrc.cjs"],
	rules: {
		"no-console": "warn",
		"no-unused-vars": "warn",
		"sort-imports": "error",
		"sort-keys": "error",
		"sort-vars": "error",
	},
	env: {
		browser: true,
		es2024: true,
	},
	parserOptions: {
		sourceType: "module",
	},
};
