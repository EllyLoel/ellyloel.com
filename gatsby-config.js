module.exports = {
	siteMetadata: {
		siteUrl: 'https://www.yourdomain.tld',
		title: 'My Gatsby Site',
	},
	plugins: [
		{
			resolve: `gatsby-plugin-mdx`,
			options: {
				extensions: [`.mdx`, `.md`],
			},
		},
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				name: `notes`,
				path: `${__dirname}/content/notes/`,
			},
		},
		{
			resolve: `gatsby-plugin-mdx`,
			options: {
				extensions: [`.mdx`, `.md`],
				gatsbyRemarkPlugins: [
					{
						resolve: 'gatsby-remark-double-brackets-link',
						options: {
							titleToURLPath: `${__dirname}/resolve-url.js`,
							stripBrackets: true,
						},
					},
				],
			},
		},
		`gatsby-plugin-catch-links`,
		{
			resolve: `gatsby-transformer-markdown-references`,
			options: {
				types: ['Mdx'], // or ['RemarkMarkdown'] (or both)
			},
		},
	],
};
