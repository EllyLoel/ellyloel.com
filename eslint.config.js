import globals from "globals";
import js from "@eslint/js";

/** @type {import('@types/eslint').Linter.Config[]} */
export default [
	js.configs.recommended,
	// Base configuration for all JavaScript files
	{
		languageOptions: {
			ecmaVersion: 2024,
			sourceType: "module",
		},
		rules: {
			"no-console": "warn",
			"no-prototype-builtins": "off",
			"no-unused-vars": "warn",
			"sort-imports": "error",
			"sort-keys": "error",
			"sort-vars": "error",
		},
	},
	{
		files: ["src/input/js/**/*.js"],
		languageOptions: {
			globals: {
				...globals.browser,
			},
		},
	},
	{
		ignores: ["src/input/js/**/*.js"],
		languageOptions: {
			globals: {
				...globals.node,
			},
		},
	},
];
