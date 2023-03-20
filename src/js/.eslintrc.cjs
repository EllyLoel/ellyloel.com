module.exports = {
	plugins: ["prettier"],
	extends: ["eslint:recommended", "plugin:prettier/recommended"],
	ignorePatterns: [".eslintrc.cjs"],
	rules: {
		"no-console": "warn",
		"prettier/prettier": "error",
		"no-unused-vars": "warn",
		"sort-imports": "error",
		"sort-keys": "error",
		"sort-vars": "error",
	},
	env: {
		browser: true,
		es6: true,
		es2022: true,
	},
	parserOptions: {
		sourceType: "module",
	},
};
