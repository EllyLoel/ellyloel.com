/** @type {import('vite').UserConfig} */
export default {
	viteOptions: {
		/**
		 * @see https://github.com/vitejs/vite/blob/ee1a686abf69db8a4026ed5462615766f222c29a/packages/vite/src/node/constants.ts#L97
		 */
		assetsInclude: ["**/*.xml"],

		build: {
			sourcemap: "true",
			manifest: true,
		},
	},
};
