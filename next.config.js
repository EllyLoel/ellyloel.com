const withPWA = require("next-pwa");
const withMDX = require("@next/mdx")({
    extension: /\.mdx?$/,
    options: {
        remarkPlugins: [],
        rehypePlugins: [],
    },
});

module.exports = withMDX(
    withPWA({
        reactStrictMode: true,
        pwa: {
            dest: "public",
            register: true,
            skipWaiting: true,
            disable: process.env.NODE_ENV === "development"
        },
        pageExtensions:["ts", "tsx", "js", "jsx", "md", "mdx"]
    })
);