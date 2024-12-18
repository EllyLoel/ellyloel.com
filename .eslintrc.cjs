module.exports = {
	root: true,
	plugins: ["prettier"],
	extends: ["eslint:recommended", "plugin:prettier/recommended"],
	ignorePatterns: [".eslintrc.cjs", "rollup.config.js"],
	rules: {
		"no-console": "warn",
		"prettier/prettier": "error",
		"no-unused-vars": "warn",
		"sort-imports": "error",
		"sort-keys": "error",
		"sort-vars": "error",
		"no-prototype-builtins": "off",
	},
	env: {
		node: true,
		es2022: true,
	},
	parserOptions: {
		sourceType: "module",
	},
};
